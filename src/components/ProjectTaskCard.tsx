import { useState, useRef, useCallback } from 'react'
import type { ProjectTask } from '../types'
import type { useProgress } from '../hooks/useProgress'

// Props do card de tarefa de projeto
interface ProjectTaskCardProps {
  task: ProjectTask
  progress: ReturnType<typeof useProgress>
}

// Labels e cores das dificuldades
const difficultyConfig = {
  easy: { label: 'Fácil', className: 'text-emerald-400' },
  medium: { label: 'Médio', className: 'text-amber-400' },
  hard: { label: 'Difícil', className: 'text-red-400' },
}

// Ícones por tipo de recurso
const resourceTypeIcon: Record<string, string> = {
  article: '📄',
  video: '▶️',
  docs: '📚',
  course: '🎓',
}

export function ProjectTaskCard({ task, progress }: ProjectTaskCardProps) {
  const [expanded, setExpanded] = useState(false)
  const noteRef = useRef<HTMLTextAreaElement>(null)
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const completed = progress.isCompleted(task.id)
  const noteContent = progress.getNote(task.id)

  // Alterna conclusão da tarefa
  const handleToggle = useCallback(() => {
    void progress.toggleTopic(task.id)
  }, [progress, task.id])

  // Auto-save da nota com debounce
  const handleNoteChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const content = e.target.value
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current)
      }
      saveTimeoutRef.current = setTimeout(() => {
        void progress.saveNote(task.id, content)
      }, 800)
    },
    [progress, task.id]
  )

  // Salva nota ao perder foco
  const handleNoteBlur = useCallback(() => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current)
    }
    const content = noteRef.current?.value ?? ''
    void progress.saveNote(task.id, content)
  }, [progress, task.id])

  const difficulty = difficultyConfig[task.difficulty]

  return (
    <div
      className={`rounded-xl border transition-all duration-200 ${
        completed
          ? 'bg-zinc-900/50 border-zinc-700/50'
          : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700'
      }`}
    >
      {/* Cabeçalho do card */}
      <div className="flex items-start gap-3 p-4">
        {/* Checkbox */}
        <button
          onClick={handleToggle}
          className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-md border-2 transition-all duration-150 flex items-center justify-center ${
            completed
              ? 'bg-indigo-600 border-indigo-600'
              : 'border-zinc-600 hover:border-indigo-500 bg-transparent'
          }`}
          aria-label={completed ? `Marcar ${task.title} como incompleto` : `Marcar ${task.title} como completo`}
        >
          {completed && (
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>

        {/* Conteúdo principal */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h3
              className={`font-medium text-sm ${completed ? 'text-zinc-500 line-through' : 'text-zinc-100'}`}
            >
              {task.title}
            </h3>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className={`text-xs font-medium ${difficulty.className}`}>{difficulty.label}</span>
            <span className="text-xs text-zinc-600">•</span>
            <span className="text-xs text-zinc-500">{task.estimatedHours}h estimadas</span>
          </div>
        </div>

        {/* Botão expandir */}
        <button
          onClick={() => setExpanded((e) => !e)}
          className="flex-shrink-0 p-1 rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition-colors"
          aria-label={expanded ? 'Recolher detalhes' : 'Expandir detalhes'}
          aria-expanded={expanded}
        >
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Conteúdo expandido */}
      {expanded && (
        <div className="border-t border-zinc-800 px-4 py-4 space-y-4">
          {/* Descrição */}
          <div>
            <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
              Descrição
            </h4>
            <p className="text-sm text-zinc-400 leading-relaxed">{task.description}</p>
          </div>

          {/* Critério de conclusão */}
          <div>
            <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
              Critério de conclusão
            </h4>
            <p className="text-sm text-emerald-400/80 leading-relaxed">{task.criteria}</p>
          </div>

          {/* Recursos */}
          {task.resources.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                Recursos
              </h4>
              <div className="space-y-1.5">
                {task.resources.map((resource, i) => (
                  <a
                    key={i}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 hover:underline transition-colors group"
                  >
                    <span className="text-base leading-none">
                      {resourceTypeIcon[resource.type] ?? '🔗'}
                    </span>
                    <span>{resource.title}</span>
                    {resource.free && (
                      <span className="text-xs text-emerald-600 bg-emerald-500/10 px-1.5 py-0.5 rounded font-medium">
                        grátis
                      </span>
                    )}
                    <svg
                      className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity ml-auto"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Nota pessoal */}
          <div>
            <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
              Minha nota
            </h4>
            <textarea
              ref={noteRef}
              defaultValue={noteContent}
              onChange={handleNoteChange}
              onBlur={handleNoteBlur}
              placeholder="Adicione suas anotações, dificuldades ou observações sobre esta tarefa..."
              rows={3}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-300 placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 resize-none transition-colors"
            />
            <p className="text-xs text-zinc-600 mt-1">Salvo automaticamente</p>
          </div>
        </div>
      )}
    </div>
  )
}
