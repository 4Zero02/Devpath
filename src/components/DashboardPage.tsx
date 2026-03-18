import { useNavigate } from 'react-router-dom'
import type { User } from '@supabase/supabase-js'
import type { Roadmap, Project } from '../types'
import type { useProgress } from '../hooks/useProgress'
import { allRoadmaps } from '../data/roadmaps'
import { allProjects } from '../data/projects'
import { ProgressBar } from './ProgressBar'

// Props do dashboard
interface DashboardPageProps {
  user: User
  progress: ReturnType<typeof useProgress>
}

// Configuração visual de cada projeto
const projectConfig: Record<string, { icon: string; path: string; color: string; stack: string }> = {
  payflow: {
    icon: '💳',
    path: '/project/payflow',
    color: 'from-indigo-500/10 to-indigo-600/5 border-indigo-500/20 hover:border-indigo-500/40',
    stack: 'Java · Spring Boot · Kafka',
  },
  taskflow: {
    icon: '✅',
    path: '/project/taskflow',
    color: 'from-sky-500/10 to-sky-600/5 border-sky-500/20 hover:border-sky-500/40',
    stack: 'NestJS · WebSockets · Kafka',
  },
  nexus: {
    icon: '☸️',
    path: '/project/nexus',
    color: 'from-purple-500/10 to-purple-600/5 border-purple-500/20 hover:border-purple-500/40',
    stack: 'Kubernetes · Helm · GitOps',
  },
}

// Card de resumo de um projeto
function ProjectCard({ project, progress }: { project: Project; progress: ReturnType<typeof useProgress> }) {
  const navigate = useNavigate()
  const config = projectConfig[project.id]

  if (!config) return null

  const totalTasks = project.phases.reduce((sum, phase) => sum + phase.tasks.length, 0)
  const completedTasks = project.phases.reduce(
    (sum, phase) => sum + phase.tasks.filter((task) => progress.isCompleted(task.id)).length,
    0
  )
  const percentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  return (
    <button
      onClick={() => navigate(config.path)}
      className={`w-full text-left bg-gradient-to-br ${config.color} border rounded-xl p-5 transition-all duration-200 hover:scale-[1.01] hover:shadow-lg hover:shadow-zinc-950/50 group`}
    >
      {/* Cabeçalho */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{config.icon}</span>
          <div>
            <h3 className="font-semibold text-zinc-200 text-sm leading-tight font-mono group-hover:text-white transition-colors">
              {project.title}
            </h3>
            <p className="text-xs text-zinc-600 mt-0.5">{config.stack}</p>
          </div>
        </div>

        {/* Percentual */}
        <div className="text-right">
          <span
            className={`text-lg font-bold tabular-nums ${
              percentage === 100 ? 'text-emerald-400' : percentage > 0 ? 'text-white' : 'text-zinc-600'
            }`}
          >
            {percentage}%
          </span>
        </div>
      </div>

      {/* Barra de progresso */}
      <ProgressBar value={percentage} size="sm" className="mb-2" />

      {/* Contagem */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-zinc-500">
          {completedTasks} de {totalTasks} tarefas
        </span>
        {percentage === 100 && (
          <span className="text-xs text-emerald-400 font-medium">Concluído ✓</span>
        )}
        {percentage > 0 && percentage < 100 && (
          <span className="text-xs text-zinc-500">Em progresso</span>
        )}
        {percentage === 0 && <span className="text-xs text-zinc-600">Não iniciado</span>}
      </div>
    </button>
  )
}

// Configuração visual de cada roadmap
const roadmapConfig: Record<string, { icon: string; path: string; color: string }> = {
  backend: {
    icon: '⚙️',
    path: '/roadmap/backend',
    color: 'from-indigo-500/10 to-indigo-600/5 border-indigo-500/20 hover:border-indigo-500/40',
  },
  frontend: {
    icon: '🎨',
    path: '/roadmap/frontend',
    color: 'from-sky-500/10 to-sky-600/5 border-sky-500/20 hover:border-sky-500/40',
  },
  devops: {
    icon: '🚀',
    path: '/roadmap/devops',
    color: 'from-orange-500/10 to-orange-600/5 border-orange-500/20 hover:border-orange-500/40',
  },
  database: {
    icon: '🗄️',
    path: '/roadmap/database',
    color: 'from-emerald-500/10 to-emerald-600/5 border-emerald-500/20 hover:border-emerald-500/40',
  },
  'system-design': {
    icon: '🏗️',
    path: '/roadmap/system-design',
    color: 'from-purple-500/10 to-purple-600/5 border-purple-500/20 hover:border-purple-500/40',
  },
}

// Card de resumo de um roadmap
function RoadmapCard({ roadmap, progress }: { roadmap: Roadmap; progress: ReturnType<typeof useProgress> }) {
  const navigate = useNavigate()
  const config = roadmapConfig[roadmap.id]

  if (!config) return null

  const totalTopics = roadmap.phases.reduce((sum, phase) => sum + phase.topics.length, 0)
  const completedTopics = roadmap.phases.reduce(
    (sum, phase) =>
      sum + phase.topics.filter((topic) => progress.isCompleted(topic.id)).length,
    0
  )
  const percentage = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0
  const totalHours = roadmap.phases.reduce(
    (sum, phase) => sum + phase.topics.reduce((s, t) => s + t.estimatedHours, 0),
    0
  )

  return (
    <button
      onClick={() => navigate(config.path)}
      className={`w-full text-left bg-gradient-to-br ${config.color} border rounded-xl p-5 transition-all duration-200 hover:scale-[1.01] hover:shadow-lg hover:shadow-zinc-950/50 group`}
    >
      {/* Cabeçalho */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{config.icon}</span>
          <div>
            <h3 className="font-semibold text-zinc-200 text-sm leading-tight group-hover:text-white transition-colors">
              {roadmap.title}
            </h3>
            <p className="text-xs text-zinc-600 mt-0.5">{totalHours}h estimadas</p>
          </div>
        </div>

        {/* Percentual */}
        <div className="text-right">
          <span
            className={`text-lg font-bold tabular-nums ${
              percentage === 100 ? 'text-emerald-400' : percentage > 0 ? 'text-white' : 'text-zinc-600'
            }`}
          >
            {percentage}%
          </span>
        </div>
      </div>

      {/* Barra de progresso */}
      <ProgressBar value={percentage} size="sm" className="mb-2" />

      {/* Contagem */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-zinc-500">
          {completedTopics} de {totalTopics} tópicos
        </span>
        {percentage === 100 && (
          <span className="text-xs text-emerald-400 font-medium">Concluído ✓</span>
        )}
        {percentage > 0 && percentage < 100 && (
          <span className="text-xs text-zinc-500">Em progresso</span>
        )}
        {percentage === 0 && <span className="text-xs text-zinc-600">Não iniciado</span>}
      </div>
    </button>
  )
}

export function DashboardPage({ user, progress }: DashboardPageProps) {
  const displayName =
    (user.user_metadata?.full_name as string | undefined) ??
    (user.user_metadata?.name as string | undefined) ??
    user.email?.split('@')[0] ??
    'Desenvolvedor'

  // Calcula progresso total
  const totalTopics = allRoadmaps.reduce(
    (sum, roadmap) =>
      sum + roadmap.phases.reduce((s, phase) => s + phase.topics.length, 0),
    0
  )
  const completedTopics = allRoadmaps.reduce(
    (sum, roadmap) =>
      sum +
      roadmap.phases.reduce(
        (s, phase) => s + phase.topics.filter((t) => progress.isCompleted(t.id)).length,
        0
      ),
    0
  )
  const overallPercentage = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0

  // Calcula streak de roadmaps com progresso
  const roadmapsInProgress = allRoadmaps.filter((roadmap) =>
    roadmap.phases.some((phase) => phase.topics.some((t) => progress.isCompleted(t.id)))
  ).length

  return (
    <div className="max-w-3xl mx-auto">
      {/* Boas-vindas */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">
          Olá, {displayName.split(' ')[0]}
        </h1>
        <p className="text-zinc-400 text-sm">
          Continue de onde parou. Cada tópico completo é um passo mais perto do sênior.
        </p>
      </div>

      {/* Cards de resumo */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-4 text-center">
          <div className="text-2xl font-bold text-white tabular-nums">{completedTopics}</div>
          <div className="text-xs text-zinc-500 mt-0.5">tópicos completos</div>
        </div>
        <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-4 text-center">
          <div className="text-2xl font-bold text-white tabular-nums">{overallPercentage}%</div>
          <div className="text-xs text-zinc-500 mt-0.5">progresso geral</div>
        </div>
        <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-4 text-center">
          <div className="text-2xl font-bold text-white tabular-nums">{roadmapsInProgress}</div>
          <div className="text-xs text-zinc-500 mt-0.5">roadmaps iniciados</div>
        </div>
      </div>

      {/* Barra de progresso geral */}
      {overallPercentage > 0 && (
        <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-zinc-400">Progresso total</span>
            <span className="text-sm font-bold text-white">
              {completedTopics}/{totalTopics}
            </span>
          </div>
          <ProgressBar value={overallPercentage} showLabel size="md" />
        </div>
      )}

      {/* Grade de roadmaps */}
      <div>
        <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-3">
          Roadmaps
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {allRoadmaps.map((roadmap) => (
            <RoadmapCard key={roadmap.id} roadmap={roadmap} progress={progress} />
          ))}
        </div>
      </div>

      {/* Grade de projetos */}
      <div className="mt-8">
        <div className="flex items-center gap-2 mb-3">
          <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">
            Projetos Práticos
          </h2>
          <span className="text-xs bg-zinc-800 border border-zinc-700 rounded-full px-2 py-0.5 text-zinc-500">
            portfólio
          </span>
        </div>
        <p className="text-xs text-zinc-600 mb-3">
          Três projetos de alta complexidade que demonstram maturidade técnica de nível pleno/sênior.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {allProjects.map((project) => (
            <ProjectCard key={project.id} project={project} progress={progress} />
          ))}
        </div>
      </div>

      {/* Dica de início */}
      {completedTopics === 0 && !progress.loading && (
        <div className="mt-6 bg-indigo-600/10 border border-indigo-600/20 rounded-xl p-4 text-center">
          <p className="text-indigo-300 text-sm">
            Comece marcando os tópicos que você já domina.
          </p>
          <p className="text-indigo-500 text-xs mt-1">
            Abra qualquer roadmap e marque os que você já sabe.
          </p>
        </div>
      )}
    </div>
  )
}
