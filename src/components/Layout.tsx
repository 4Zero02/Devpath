import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import type { User } from '@supabase/supabase-js'

// Props do layout principal
interface LayoutProps {
  user: User
  onSignOut: () => void
  children: React.ReactNode
}

// Itens de navegação dos roadmaps
const navItems = [
  { path: '/roadmap/backend', label: 'Backend' },
  { path: '/roadmap/frontend', label: 'Frontend' },
  { path: '/roadmap/devops', label: 'DevOps' },
  { path: '/roadmap/database', label: 'Banco de Dados' },
  { path: '/roadmap/system-design', label: 'System Design' },
]

export function Layout({ user, onSignOut, children }: LayoutProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Obtém o nome de exibição do usuário
  const displayName =
    user.user_metadata?.full_name as string | undefined ??
    user.user_metadata?.name as string | undefined ??
    user.email?.split('@')[0] ??
    'Usuário'

  const avatarUrl = user.user_metadata?.avatar_url as string | undefined

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Barra de navegação */}
      <nav className="sticky top-0 z-40 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <NavLink to="/" className="flex items-center gap-2 flex-shrink-0">
              <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                  />
                </svg>
              </div>
              <span className="font-bold text-white text-sm">DevPath</span>
            </NavLink>

            {/* Navegação desktop */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map(({ path, label }) => (
                <NavLink
                  key={path}
                  to={path}
                  className={({ isActive }) =>
                    `px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-indigo-600/20 text-indigo-400'
                        : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </div>

            {/* Área do usuário */}
            <div className="flex items-center gap-2">
              {/* Botão menu mobile */}
              <button
                onClick={() => setMobileMenuOpen((o) => !o)}
                className="md:hidden p-2 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors"
                aria-label="Abrir menu"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>

              {/* Avatar e dropdown */}
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen((o) => !o)}
                  className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-zinc-800 transition-colors"
                >
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt={displayName}
                      className="w-7 h-7 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center">
                      <span className="text-xs font-medium text-white">
                        {displayName.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  <span className="hidden sm:block text-sm text-zinc-300 max-w-[120px] truncate">
                    {displayName}
                  </span>
                  <svg
                    className={`hidden sm:block w-4 h-4 text-zinc-500 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown menu */}
                {dropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setDropdownOpen(false)}
                    />
                    <div className="absolute right-0 top-full mt-1 z-50 w-48 bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl overflow-hidden">
                      <div className="px-3 py-2 border-b border-zinc-800">
                        <p className="text-xs text-zinc-500 truncate">{user.email}</p>
                      </div>
                      <button
                        onClick={() => {
                          setDropdownOpen(false)
                          onSignOut()
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          />
                        </svg>
                        Sair
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Menu mobile expandido */}
          {mobileMenuOpen && (
            <div className="md:hidden py-2 border-t border-zinc-800">
              {navItems.map(({ path, label }) => (
                <NavLink
                  key={path}
                  to={path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-lg text-sm font-medium transition-colors mb-0.5 ${
                      isActive
                        ? 'bg-indigo-600/20 text-indigo-400'
                        : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Conteúdo principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">{children}</main>
    </div>
  )
}
