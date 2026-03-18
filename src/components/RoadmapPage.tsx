import { useState } from 'react'
import type { Roadmap } from '../types'
import type { useProgress } from '../hooks/useProgress'
import { TopicCard } from './TopicCard'
import { ProgressBar } from './ProgressBar'

// Props da página de roadmap
interface RoadmapPageProps {
  roadmap: Roadmap
  progress: ReturnType<typeof useProgress>
}

export function RoadmapPage({ roadmap, progress }: RoadmapPageProps) {
  // Fases inicialmente abertas
  const [expandedPhases, setExpandedPhases] = useState<Set<string>>(
    () => new Set(roadmap.phases.map((p) => p.id))
  )

  // Calcula totais de progresso
  const totalTopics = roadmap.phases.reduce((sum, phase) => sum + phase.topics.length, 0)
  const completedTopics = roadmap.phases.reduce(
    (sum, phase) =>
      sum + phase.topics.filter((topic) => progress.isCompleted(topic.id)).length,
    0
  )
  const percentage = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0

  const togglePhase = (phaseId: string) => {
    setExpandedPhases((prev) => {
      const next = new Set(prev)
      if (next.has(phaseId)) {
        next.delete(phaseId)
      } else {
        next.add(phaseId)
      }
      return next
    })
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Cabeçalho do roadmap */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">{roadmap.title}</h1>
        <p className="text-zinc-400 text-sm mb-4">{roadmap.description}</p>

        {/* Progresso geral */}
        <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-zinc-300">Progresso geral</span>
            <span className="text-sm font-bold text-white tabular-nums">
              {completedTopics}/{totalTopics} tópicos
            </span>
          </div>
          <ProgressBar value={percentage} showLabel size="md" />
          {percentage === 100 && (
            <p className="text-emerald-400 text-xs mt-2 font-medium">
              Roadmap concluído!
            </p>
          )}
        </div>
      </div>

      {/* Fases */}
      <div className="space-y-4">
        {roadmap.phases.map((phase) => {
          const phaseTotal = phase.topics.length
          const phaseCompleted = phase.topics.filter((t) => progress.isCompleted(t.id)).length
          const phasePercentage =
            phaseTotal > 0 ? Math.round((phaseCompleted / phaseTotal) * 100) : 0
          const isOpen = expandedPhases.has(phase.id)

          return (
            <div
              key={phase.id}
              className="bg-zinc-900/50 rounded-xl border border-zinc-800 overflow-hidden"
            >
              {/* Cabeçalho da fase */}
              <button
                onClick={() => togglePhase(phase.id)}
                className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-zinc-800/50 transition-colors text-left"
                aria-expanded={isOpen}
              >
                {/* Ícone de estado */}
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                    phasePercentage === 100
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : phasePercentage > 0
                        ? 'bg-indigo-500/20 text-indigo-400'
                        : 'bg-zinc-800 text-zinc-500'
                  }`}
                >
                  {phasePercentage === 100 ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    roadmap.phases.indexOf(phase) + 1
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h2 className="text-sm font-semibold text-zinc-200 truncate">{phase.title}</h2>
                    <span className="text-xs text-zinc-500 flex-shrink-0 tabular-nums">
                      {phaseCompleted}/{phaseTotal}
                    </span>
                  </div>
                  <ProgressBar value={phasePercentage} size="sm" />
                </div>

                <svg
                  className={`flex-shrink-0 w-4 h-4 text-zinc-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Lista de tópicos */}
              {isOpen && (
                <div className="px-4 pb-4 space-y-2 border-t border-zinc-800">
                  <div className="pt-3 space-y-2">
                    {phase.topics.map((topic) => (
                      <TopicCard key={topic.id} topic={topic} progress={progress} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Rodapé com total de horas */}
      <div className="mt-6 text-center text-xs text-zinc-600">
        {roadmap.phases.reduce(
          (sum, phase) => sum + phase.topics.reduce((s, t) => s + t.estimatedHours, 0),
          0
        )}
        h de conteúdo estimado no total
      </div>
    </div>
  )
}
