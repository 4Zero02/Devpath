import { useState, useEffect, useCallback } from 'react'
import type { User } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'
import type { UserProgress, UserNote } from '../types'

// Hook de progresso — gerencia progresso e notas do usuário no Supabase
interface UseProgressReturn {
  progress: UserProgress[]
  notes: UserNote[]
  loading: boolean
  toggleTopic: (topicId: string) => Promise<void>
  saveNote: (topicId: string, content: string) => Promise<void>
  isCompleted: (topicId: string) => boolean
  getNote: (topicId: string) => string
}

export function useProgress(user: User | null): UseProgressReturn {
  const [progress, setProgress] = useState<UserProgress[]>([])
  const [notes, setNotes] = useState<UserNote[]>([])
  const [loading, setLoading] = useState(true)

  // Carrega progresso e notas do usuário autenticado
  useEffect(() => {
    if (!user) {
      setProgress([])
      setNotes([])
      setLoading(false)
      return
    }

    const fetchData = async (): Promise<void> => {
      setLoading(true)

      const [progressResult, notesResult] = await Promise.all([
        supabase.from('progress').select('topic_id, completed').eq('user_id', user.id),
        supabase.from('notes').select('topic_id, content').eq('user_id', user.id),
      ])

      if (progressResult.data) {
        setProgress(
          progressResult.data.map((row) => ({
            topicId: row.topic_id as string,
            completed: row.completed as boolean,
          }))
        )
      }

      if (notesResult.data) {
        setNotes(
          notesResult.data.map((row) => ({
            topicId: row.topic_id as string,
            content: row.content as string,
          }))
        )
      }

      setLoading(false)
    }

    void fetchData()
  }, [user])

  // Alterna o estado de conclusão de um tópico
  const toggleTopic = useCallback(
    async (topicId: string): Promise<void> => {
      if (!user) return

      const current = progress.find((p) => p.topicId === topicId)
      const newCompleted = !current?.completed

      // Atualiza otimisticamente o estado local
      setProgress((prev) => {
        const exists = prev.find((p) => p.topicId === topicId)
        if (exists) {
          return prev.map((p) => (p.topicId === topicId ? { ...p, completed: newCompleted } : p))
        }
        return [...prev, { topicId, completed: newCompleted }]
      })

      // Persiste no Supabase com upsert
      await supabase.from('progress').upsert(
        {
          user_id: user.id,
          topic_id: topicId,
          completed: newCompleted,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'user_id,topic_id' }
      )
    },
    [user, progress]
  )

  // Salva a nota de um tópico
  const saveNote = useCallback(
    async (topicId: string, content: string): Promise<void> => {
      if (!user) return

      // Atualiza otimisticamente o estado local
      setNotes((prev) => {
        const exists = prev.find((n) => n.topicId === topicId)
        if (exists) {
          return prev.map((n) => (n.topicId === topicId ? { ...n, content } : n))
        }
        return [...prev, { topicId, content }]
      })

      // Persiste no Supabase com upsert
      await supabase.from('notes').upsert(
        {
          user_id: user.id,
          topic_id: topicId,
          content,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'user_id,topic_id' }
      )
    },
    [user]
  )

  // Verifica se um tópico está completo
  const isCompleted = useCallback(
    (topicId: string): boolean => {
      return progress.find((p) => p.topicId === topicId)?.completed ?? false
    },
    [progress]
  )

  // Retorna o conteúdo da nota de um tópico
  const getNote = useCallback(
    (topicId: string): string => {
      return notes.find((n) => n.topicId === topicId)?.content ?? ''
    },
    [notes]
  )

  return { progress, notes, loading, toggleTopic, saveNote, isCompleted, getNote }
}
