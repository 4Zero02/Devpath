/// <reference types="vite/client" />

// Tipagem das variáveis de ambiente do Vite
interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
