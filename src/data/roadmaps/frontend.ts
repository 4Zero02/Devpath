import type { Roadmap } from '../../types'

// Dados estáticos do roadmap de Frontend — nunca buscar do banco
export const frontendRoadmap: Roadmap = {
  id: 'frontend',
  title: 'Frontend (React + Next.js)',
  description:
    'Domine React, TypeScript e Next.js com foco em performance, acessibilidade e boas práticas. Da fundação até Server Components e otimização avançada.',
  phases: [
    {
      id: 'frontend_phase_0',
      title: 'Fase 1 — Fundação (Júnior)',
      topics: [
        {
          id: 'frontend_0_0',
          title: 'React: fundamentos reais',
          level: 'junior',
          difficulty: 'easy',
          estimatedHours: 6,
          description:
            'React é uma biblioteca de UI baseada em componentes e renderização declarativa. Entender o modelo mental correto é mais importante que decorar a API.',
          whyItMatters:
            'É o framework mais usado no mercado. Sem entender o modelo de re-renderização, você vai criar bugs sutis de performance e estado.',
          mustKnowWithout: [
            'O que é o Virtual DOM e por que existe',
            'Diferença entre props e state',
            'Quando um componente re-renderiza',
            'O que é lifting state up e quando fazer',
            'Diferença entre componente controlado e não-controlado em formulários',
            'O que é key prop e por que é importante em listas',
          ],
          resources: [
            {
              type: 'docs',
              title: 'React Docs — Learn React',
              url: 'https://react.dev/learn',
              free: true,
            },
            {
              type: 'course',
              title: 'Scrimba — Learn React for Free',
              url: 'https://scrimba.com/learn/learnreact',
              free: true,
            },
            {
              type: 'video',
              title: 'Fireship — React in 100 Seconds',
              url: 'https://www.youtube.com/watch?v=Tn6-PIqc4UM',
              free: true,
            },
          ],
        },
        {
          id: 'frontend_0_1',
          title: 'Hooks essenciais na prática',
          level: 'junior',
          difficulty: 'medium',
          estimatedHours: 8,
          description:
            'Hooks são a forma moderna de adicionar estado e efeitos colaterais a componentes funcionais. Usar hooks errado é uma das fontes mais comuns de bugs em React.',
          whyItMatters:
            'Todo código React moderno usa hooks. Entender quando e como usar cada um é obrigatório. Usar useEffect errado causa loops infinitos e memory leaks.',
          mustKnowWithout: [
            'useState: como funciona a atualização de estado (batch, closure stale)',
            'useEffect: dependency array, cleanup function, quando NÃO usar',
            'useRef: diferença entre ref e state (ref não causa re-render)',
            'useMemo e useCallback: quando realmente fazem diferença (não usar em tudo)',
            'useContext: para que serve e limitações de performance',
            'Como criar custom hooks e quando extrair lógica',
          ],
          resources: [
            {
              type: 'docs',
              title: 'React Docs — Hooks Reference',
              url: 'https://react.dev/reference/react',
              free: true,
            },
            {
              type: 'article',
              title: 'Josh W Comeau — The Interactive Guide to useEffect',
              url: 'https://www.joshwcomeau.com/react/the-interactive-guide-to-use-effect/',
              free: true,
            },
            {
              type: 'article',
              title: 'TkDodo — Practical React Query',
              url: 'https://tkdodo.eu/blog/practical-react-query',
              free: true,
            },
          ],
        },
        {
          id: 'frontend_0_2',
          title: 'TypeScript com React',
          level: 'junior',
          difficulty: 'medium',
          estimatedHours: 5,
          description:
            'TypeScript adiciona tipagem estática ao JavaScript, prevenindo erros em tempo de compilação. Com React, tipar componentes, props e eventos corretamente é essencial.',
          whyItMatters:
            'Virtualmente todo projeto React profissional usa TypeScript. Código sem tipos é rejeitado em code review nas empresas mais rigorosas.',
          mustKnowWithout: [
            'Como tipar props de componentes com interface e type',
            'Diferença entre React.FC e tipagem direta de props (prefira a segunda)',
            'Como tipar useState com tipos genéricos: useState<User | null>(null)',
            'Como tipar eventos: React.ChangeEvent<HTMLInputElement>, React.MouseEvent',
            'O que são generics e como usar em componentes reutilizáveis',
            'Partial<T>, Required<T>, Pick<T>, Omit<T> na prática',
          ],
          resources: [
            {
              type: 'article',
              title: 'React TypeScript Cheatsheet',
              url: 'https://react-typescript-cheatsheet.netlify.app/',
              free: true,
            },
            {
              type: 'course',
              title: 'Total TypeScript — Beginners',
              url: 'https://www.totaltypescript.com/tutorials/beginners-typescript',
              free: true,
            },
          ],
        },
      ],
    },
    {
      id: 'frontend_phase_1',
      title: 'Fase 2 — Pleno',
      topics: [
        {
          id: 'frontend_1_0',
          title: 'Gerenciamento de estado global',
          level: 'mid',
          difficulty: 'medium',
          estimatedHours: 6,
          description:
            'Quando o estado precisa ser compartilhado entre muitos componentes, Context API pode não ser suficiente. Zustand, Jotai e Redux Toolkit são as principais opções do mercado.',
          whyItMatters:
            'Escolher a ferramenta errada resulta em código complexo e performance ruim. Saber quando Context é suficiente e quando precisar de algo externo é critério de pleno.',
          mustKnowWithout: [
            'Por que Context API tem problemas de performance em re-renders',
            'Diferença entre Zustand, Jotai e Redux Toolkit (trade-offs)',
            'O que é o padrão Flux e por que Redux foi criado',
            'Quando estado global é necessário vs. estado local + lifting',
            'O que é server state vs. client state (React Query cuida do primeiro)',
          ],
          resources: [
            {
              type: 'docs',
              title: 'Zustand — Docs',
              url: 'https://docs.pmnd.rs/zustand/getting-started/introduction',
              free: true,
            },
            {
              type: 'article',
              title: 'TkDodo — Does Not Need to be Global',
              url: 'https://tkdodo.eu/blog/dont-over-use-state',
              free: true,
            },
            {
              type: 'docs',
              title: 'Redux Toolkit — Quick Start',
              url: 'https://redux-toolkit.js.org/tutorials/quick-start',
              free: true,
            },
          ],
        },
        {
          id: 'frontend_1_1',
          title: 'Next.js: SSR, SSG, ISR e App Router',
          level: 'mid',
          difficulty: 'hard',
          estimatedHours: 10,
          description:
            'Next.js estende o React com renderização no servidor. Cada estratégia (SSR, SSG, ISR) tem trade-offs de performance, SEO e complexidade. O App Router introduziu Server Components, mudando fundamentalmente o modelo mental.',
          whyItMatters:
            'Next.js domina o mercado de React em produção. Entender as estratégias de renderização é obrigatório para devs plenos que trabalham com performance e SEO.',
          mustKnowWithout: [
            'Diferença entre SSR (Server-Side Rendering), SSG (Static Site Generation) e ISR (Incremental Static Regeneration)',
            'O que são React Server Components e como diferem dos Client Components',
            'Quando usar "use client" e por que evitar ao máximo',
            'O que é streaming com Suspense e como funciona',
            'Diferença entre layout.tsx e page.tsx no App Router',
            'Como funciona o cache no Next.js 14+ (fetch caching, revalidation)',
          ],
          resources: [
            {
              type: 'docs',
              title: 'Next.js Docs — App Router',
              url: 'https://nextjs.org/docs/app',
              free: true,
            },
            {
              type: 'article',
              title: 'Vercel — Understanding Next.js Data Fetching',
              url: 'https://vercel.com/blog/nextjs-app-router-data-fetching',
              free: true,
            },
            {
              type: 'article',
              title: 'Josh W Comeau — Making Sense of React Server Components',
              url: 'https://www.joshwcomeau.com/react/server-components/',
              free: true,
            },
          ],
        },
        {
          id: 'frontend_1_2',
          title: 'Performance em React',
          level: 'mid',
          difficulty: 'hard',
          estimatedHours: 6,
          description:
            'Aplicações React lentas são um problema de produto. Entender o modelo de re-renderização, lazy loading, code splitting e memoização é essencial para apps performáticos.',
          whyItMatters:
            'Performance impacta diretamente a experiência do usuário e métricas de negócio. Devs plenos precisam identificar e corrigir problemas de performance.',
          mustKnowWithout: [
            'Como o React decide quando re-renderizar um componente',
            'O que é React.memo e quando realmente ajuda',
            'Diferença entre useMemo (valor) e useCallback (função)',
            'O que é code splitting e como implementar com React.lazy + Suspense',
            'O que são Core Web Vitals: LCP, FID/INP, CLS',
            'Como usar o React DevTools Profiler para identificar gargalos',
          ],
          resources: [
            {
              type: 'docs',
              title: 'React Docs — Performance',
              url: 'https://react.dev/reference/react/memo',
              free: true,
            },
            {
              type: 'article',
              title: 'web.dev — Core Web Vitals',
              url: 'https://web.dev/vitals/',
              free: true,
            },
            {
              type: 'article',
              title: 'Nadia Makarevich — React Re-renders Guide',
              url: 'https://www.developerway.com/posts/react-re-renders-guide',
              free: true,
            },
          ],
        },
      ],
    },
    {
      id: 'frontend_phase_2',
      title: 'Fase 3 — Avançado (Sênior)',
      topics: [
        {
          id: 'frontend_2_0',
          title: 'Acessibilidade (a11y)',
          level: 'senior',
          difficulty: 'medium',
          estimatedHours: 5,
          description:
            'Acessibilidade garante que a aplicação pode ser usada por pessoas com deficiências. É requisito legal em vários países e cada vez mais cobrado em empresas de produto.',
          whyItMatters:
            'Empresas internacionais tratam a11y como obrigatório, não opcional. É um diferencial real de devs que querem trabalhar no exterior.',
          mustKnowWithout: [
            'O que é ARIA e quando usar atributos aria-*',
            'Regra fundamental: ARIA nativo (elementos HTML semânticos) é sempre preferível a ARIA explícito',
            'O que é tab order e como o tabIndex funciona',
            'Como testar acessibilidade: axe DevTools, leitores de tela (NVDA, VoiceOver)',
            'Contraste mínimo de cores: WCAG 2.1 AA (4.5:1 para texto normal)',
          ],
          resources: [
            {
              type: 'course',
              title: 'web.dev — Accessibility',
              url: 'https://web.dev/accessibility/',
              free: true,
            },
            {
              type: 'docs',
              title: 'MDN — ARIA',
              url: 'https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA',
              free: true,
            },
          ],
        },
      ],
    },
  ],
}
