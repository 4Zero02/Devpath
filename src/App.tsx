import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import { useProgress } from './hooks/useProgress'
import { AuthPage } from './components/AuthPage'
import { Layout } from './components/Layout'
import { DashboardPage } from './components/DashboardPage'
import { RoadmapPage } from './components/RoadmapPage'
import { ProjectPage } from './components/ProjectPage'
import {
  backendRoadmap,
  frontendRoadmap,
  devopsRoadmap,
  databaseRoadmap,
  systemDesignRoadmap,
} from './data/roadmaps'
import { payflowProject, taskflowProject, nexusProject } from './data/projects'

// Tela de carregamento enquanto verifica autenticação
function LoadingScreen() {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
      <div className="flex items-center gap-3">
        <svg className="w-6 h-6 animate-spin text-indigo-500" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
        <span className="text-zinc-500 text-sm">Carregando...</span>
      </div>
    </div>
  )
}

// Componente interno com roteamento — separado para poder usar useProgress com o usuário
function AppRoutes() {
  const { user, loading, signOut } = useAuth()
  const progress = useProgress(user)

  if (loading) return <LoadingScreen />

  if (!user) return <AuthPage />

  return (
    <Layout user={user} onSignOut={() => void signOut()}>
      <Routes>
        <Route path="/" element={<DashboardPage user={user} progress={progress} />} />
        <Route
          path="/roadmap/backend"
          element={<RoadmapPage roadmap={backendRoadmap} progress={progress} />}
        />
        <Route
          path="/roadmap/frontend"
          element={<RoadmapPage roadmap={frontendRoadmap} progress={progress} />}
        />
        <Route
          path="/roadmap/devops"
          element={<RoadmapPage roadmap={devopsRoadmap} progress={progress} />}
        />
        <Route
          path="/roadmap/database"
          element={<RoadmapPage roadmap={databaseRoadmap} progress={progress} />}
        />
        <Route
          path="/roadmap/system-design"
          element={<RoadmapPage roadmap={systemDesignRoadmap} progress={progress} />}
        />
        <Route
          path="/project/payflow"
          element={<ProjectPage project={payflowProject} progress={progress} />}
        />
        <Route
          path="/project/taskflow"
          element={<ProjectPage project={taskflowProject} progress={progress} />}
        />
        <Route
          path="/project/nexus"
          element={<ProjectPage project={nexusProject} progress={progress} />}
        />
        {/* Redireciona rotas desconhecidas para o dashboard */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  )
}

// Componente raiz com o router
export function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}
