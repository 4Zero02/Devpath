## Roadmap 2 — Frontend (React + Next.js)

### Fase 1 — Fundação (Júnior)

#### Tópico 1.1 — React: fundamentos reais
- **Nível:** júnior
- **Dificuldade:** fácil
- **Tempo estimado:** 6h
- **Descrição:** React é uma biblioteca de UI baseada em componentes e renderização declarativa. Entender o modelo mental correto é mais importante que decorar a API.
- **Por que importa:** É o framework mais usado no mercado. Sem entender o modelo de re-renderização, você vai criar bugs sutis de performance e estado.
- **O que saber sem pesquisar:**
  - O que é o Virtual DOM e por que existe
  - Diferença entre props e state
  - Quando um componente re-renderiza
  - O que é lifting state up e quando fazer
  - Diferença entre componente controlado e não-controlado em formulários
  - O que é key prop e por que é importante em listas
- **Recursos:**
  - [React Docs — Learn React](https://react.dev/learn) — docs oficiais
  - [Scrimba — Learn React for Free](https://scrimba.com/learn/learnreact) — curso gratuito
  - [Fireship — React in 100 Seconds (YouTube)](https://www.youtube.com/watch?v=Tn6-PIqc4UM) — vídeo

#### Tópico 1.2 — Hooks essenciais na prática
- **Nível:** júnior
- **Dificuldade:** médio
- **Tempo estimado:** 8h
- **Descrição:** Hooks são a forma moderna de adicionar estado e efeitos colaterais a componentes funcionais. Usar hooks errado é uma das fontes mais comuns de bugs em React.
- **Por que importa:** Todo código React moderno usa hooks. Entender quando e como usar cada um é obrigatório. Usar `useEffect` errado causa loops infinitos e memory leaks.
- **O que saber sem pesquisar:**
  - `useState`: como funciona a atualização de estado (batch, closure stale)
  - `useEffect`: dependency array, cleanup function, quando NÃO usar
  - `useRef`: diferença entre ref e state (ref não causa re-render)
  - `useMemo` e `useCallback`: quando realmente fazem diferença (não usar em tudo)
  - `useContext`: para que serve e limitações de performance
  - Como criar custom hooks e quando extrair lógica
- **Recursos:**
  - [React Docs — Hooks Reference](https://react.dev/reference/react) — docs
  - [Josh W Comeau — The Interactive Guide to useEffect](https://www.joshwcomeau.com/react/the-interactive-guide-to-use-effect/) — artigo
  - [TkDodo — Practical React Query](https://tkdodo.eu/blog/practical-react-query) — artigo

#### Tópico 1.3 — TypeScript com React
- **Nível:** júnior
- **Dificuldade:** médio
- **Tempo estimado:** 5h
- **Descrição:** TypeScript adiciona tipagem estática ao JavaScript, prevenindo erros em tempo de compilação. Com React, tipar componentes, props e eventos corretamente é essencial.
- **Por que importa:** Virtualmente todo projeto React profissional usa TypeScript. Código sem tipos é rejeitado em code review nas empresas mais rigorosas.
- **O que saber sem pesquisar:**
  - Como tipar props de componentes com `interface` e `type`
  - Diferença entre `React.FC` e tipagem direta de props (prefira a segunda)
  - Como tipar `useState` com tipos genéricos: `useState<User | null>(null)`
  - Como tipar eventos: `React.ChangeEvent<HTMLInputElement>`, `React.MouseEvent`
  - O que são generics e como usar em componentes reutilizáveis
  - `Partial<T>`, `Required<T>`, `Pick<T>`, `Omit<T>` na prática
- **Recursos:**
  - [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/) — referência
  - [Total TypeScript — Beginners](https://www.totaltypescript.com/tutorials/beginners-typescript) — curso gratuito

---

### Fase 2 — Pleno

#### Tópico 2.1 — Gerenciamento de estado global
- **Nível:** pleno
- **Dificuldade:** médio
- **Tempo estimado:** 6h
- **Descrição:** Quando o estado precisa ser compartilhado entre muitos componentes, Context API pode não ser suficiente. Zustand, Jotai e Redux Toolkit são as principais opções do mercado.
- **Por que importa:** Escolher a ferramenta errada resulta em código complexo e performance ruim. Saber quando Context é suficiente e quando precisar de algo externo é critério de pleno.
- **O que saber sem pesquisar:**
  - Por que Context API tem problemas de performance em re-renders
  - Diferença entre Zustand, Jotai e Redux Toolkit (trade-offs)
  - O que é o padrão Flux e por que Redux foi criado
  - Quando estado global é necessário vs. estado local + lifting
  - O que é server state vs. client state (React Query cuida do primeiro)
- **Recursos:**
  - [Zustand — Docs](https://docs.pmnd.rs/zustand/getting-started/introduction) — docs
  - [TkDodo — Does Not Need to be Global (artigo)](https://tkdodo.eu/blog/dont-over-use-state) — artigo
  - [Redux Toolkit — Quick Start](https://redux-toolkit.js.org/tutorials/quick-start) — docs

#### Tópico 2.2 — Next.js: SSR, SSG, ISR e App Router
- **Nível:** pleno
- **Dificuldade:** difícil
- **Tempo estimado:** 10h
- **Descrição:** Next.js estende o React com renderização no servidor. Cada estratégia (SSR, SSG, ISR) tem trade-offs de performance, SEO e complexidade. O App Router introduziu Server Components, mudando fundamentalmente o modelo mental.
- **Por que importa:** Next.js domina o mercado de React em produção. Entender as estratégias de renderização é obrigatório para devs plenos que trabalham com performance e SEO.
- **O que saber sem pesquisar:**
  - Diferença entre SSR (Server-Side Rendering), SSG (Static Site Generation) e ISR (Incremental Static Regeneration)
  - O que são React Server Components e como diferem dos Client Components
  - Quando usar `"use client"` e por que evitar ao máximo
  - O que é streaming com Suspense e como funciona
  - Diferença entre `layout.tsx` e `page.tsx` no App Router
  - Como funciona o cache no Next.js 14+ (fetch caching, revalidation)
- **Recursos:**
  - [Next.js Docs — App Router](https://nextjs.org/docs/app) — docs oficiais
  - [Vercel — Understanding Next.js Data Fetching](https://vercel.com/blog/nextjs-app-router-data-fetching) — artigo
  - [Josh W Comeau — Making Sense of React Server Components](https://www.joshwcomeau.com/react/server-components/) — artigo

#### Tópico 2.3 — Performance em React
- **Nível:** pleno
- **Dificuldade:** difícil
- **Tempo estimado:** 6h
- **Descrição:** Aplicações React lentas são um problema de produto. Entender o modelo de re-renderização, lazy loading, code splitting e memoização é essencial para apps performáticos.
- **Por que importa:** Performance impacta diretamente a experiência do usuário e métricas de negócio. Devs plenos precisam identificar e corrigir problemas de performance.
- **O que saber sem pesquisar:**
  - Como o React decide quando re-renderizar um componente
  - O que é `React.memo` e quando realmente ajuda
  - Diferença entre `useMemo` (valor) e `useCallback` (função)
  - O que é code splitting e como implementar com `React.lazy` + `Suspense`
  - O que são Core Web Vitals: LCP, FID/INP, CLS
  - Como usar o React DevTools Profiler para identificar gargalos
- **Recursos:**
  - [React Docs — Performance](https://react.dev/reference/react/memo) — docs
  - [web.dev — Core Web Vitals](https://web.dev/vitals/) — artigo
  - [Nadia Makarevich — React Re-renders Guide](https://www.developerway.com/posts/react-re-renders-guide) — artigo

---

### Fase 3 — Avançado (Sênior)

#### Tópico 3.1 — Acessibilidade (a11y)
- **Nível:** sênior
- **Dificuldade:** médio
- **Tempo estimado:** 5h
- **Descrição:** Acessibilidade garante que a aplicação pode ser usada por pessoas com deficiências. É requisito legal em vários países e cada vez mais cobrado em empresas de produto.
- **Por que importa:** Empresas internacionais tratam a11y como obrigatório, não opcional. É um diferencial real de devs que querem trabalhar no exterior.
- **O que saber sem pesquisar:**
  - O que é ARIA e quando usar atributos `aria-*`
  - Regra fundamental: ARIA nativo (elementos HTML semânticos) é sempre preferível a ARIA explícito
  - O que é tab order e como o `tabIndex` funciona
  - Como testar acessibilidade: axe DevTools, leitores de tela (NVDA, VoiceOver)
  - Contraste mínimo de cores: WCAG 2.1 AA (4.5:1 para texto normal)
- **Recursos:**
  - [web.dev — Accessibility](https://web.dev/accessibility/) — curso gratuito
  - [MDN — ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA) — docs

---