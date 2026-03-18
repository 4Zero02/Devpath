import type { Roadmap } from '../../types'

// Dados estáticos do roadmap de Backend — nunca buscar do banco
export const backendRoadmap: Roadmap = {
  id: 'backend',
  title: 'Backend (Java + TypeScript/Node.js)',
  description:
    'Domine os fundamentos e práticas avançadas de desenvolvimento backend com Java/Spring Boot e TypeScript/NestJS. Da fundação júnior até arquitetura sênior.',
  phases: [
    {
      id: 'backend_phase_0',
      title: 'Fase 1 — Fundação (Júnior)',
      topics: [
        {
          id: 'backend_0_0',
          title: 'HTTP e REST na prática',
          level: 'junior',
          difficulty: 'easy',
          estimatedHours: 4,
          description:
            'HTTP é o protocolo que sustenta toda comunicação web. REST é um estilo arquitetural que define como APIs devem ser estruturadas usando os verbos HTTP corretamente.',
          whyItMatters:
            'Todo dev backend trabalha com APIs REST diariamente. Entender os verbos, status codes e semântica correta é o mínimo esperado em qualquer entrevista.',
          mustKnowWithout: [
            'Diferença entre GET, POST, PUT, PATCH e DELETE e quando usar cada um',
            'O que significa idempotência e quais verbos são idempotentes',
            'Status codes mais comuns: 200, 201, 204, 400, 401, 403, 404, 409, 422, 500',
            'Diferença entre 401 (não autenticado) e 403 (não autorizado)',
            'O que são headers HTTP e para que servem (Content-Type, Authorization, Accept)',
            'Diferença entre query params, path params e request body',
          ],
          resources: [
            {
              type: 'article',
              title: 'MDN — HTTP Overview',
              url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview',
              free: true,
            },
            {
              type: 'article',
              title: 'REST API Tutorial',
              url: 'https://restapitutorial.com/',
              free: true,
            },
            {
              type: 'article',
              title: 'HTTP Status Codes Cheat Sheet',
              url: 'https://www.restapitutorial.com/httpstatuscodes.html',
              free: true,
            },
            {
              type: 'video',
              title: 'Fireship — HTTP Crash Course',
              url: 'https://www.youtube.com/watch?v=iYM2zFP3Zn0',
              free: true,
            },
          ],
        },
        {
          id: 'backend_0_1',
          title: 'SOLID na prática',
          level: 'junior',
          difficulty: 'medium',
          estimatedHours: 6,
          description:
            'SOLID são 5 princípios de design de código que resultam em sistemas mais fáceis de manter, testar e evoluir. São frequentemente cobrados em entrevistas técnicas.',
          whyItMatters:
            'Código que viola SOLID é difícil de testar, difícil de mudar sem quebrar outras partes e difícil de entender. Empresas de produto exigem que devs plenos identifiquem violações em code review.',
          mustKnowWithout: [
            'Explicar cada um dos 5 princípios com um exemplo concreto de código',
            'Identificar violações de SRP (classe fazendo coisas demais), OCP (if/else gigante de tipos) e DIP (classe de alto nível dependendo de implementação concreta)',
            'Diferença entre interface e implementação e como isso se relaciona com DIP',
            'Por que SOLID facilita testes unitários',
          ],
          resources: [
            {
              type: 'article',
              title: 'Baeldung — SOLID Principles',
              url: 'https://www.baeldung.com/solid-principles',
              free: true,
            },
            {
              type: 'article',
              title: 'Digital Ocean — SOLID com TypeScript',
              url: 'https://www.digitalocean.com/community/conceptual-articles/s-o-l-i-d-the-first-five-principles-of-object-oriented-design',
              free: true,
            },
            {
              type: 'video',
              title: 'Fireship — SOLID em 8 min',
              url: 'https://www.youtube.com/watch?v=oP2HMV-TrPo',
              free: true,
            },
          ],
        },
        {
          id: 'backend_0_2',
          title: 'Injeção de Dependência e IoC',
          level: 'junior',
          difficulty: 'medium',
          estimatedHours: 4,
          description:
            'Injeção de Dependência (DI) é um padrão onde dependências são fornecidas externamente em vez de instanciadas pela classe. Inversão de Controle (IoC) é o princípio mais amplo onde o framework gerencia o ciclo de vida dos objetos.',
          whyItMatters:
            'Spring Boot e NestJS são baseados em IoC containers. Sem entender DI, você não consegue estruturar código testável ou entender como o framework funciona por baixo.',
          mustKnowWithout: [
            'Diferença entre `new MinhaClasse()` e injeção via construtor',
            'O que é um IoC container e como ele funciona',
            'No Spring: @Component, @Service, @Repository, @Bean e quando usar cada um',
            'No NestJS: @Injectable(), providers, módulos e como registrar dependências',
            'Por que DI via construtor é preferida a DI via campo (@Autowired no campo)',
          ],
          resources: [
            {
              type: 'article',
              title: 'Baeldung — Spring DI',
              url: 'https://www.baeldung.com/inversion-control-and-dependency-injection-in-spring',
              free: true,
            },
            {
              type: 'docs',
              title: 'NestJS — Providers',
              url: 'https://docs.nestjs.com/providers',
              free: true,
            },
          ],
        },
        {
          id: 'backend_0_3',
          title: 'Tratamento de Erros e Exceções',
          level: 'junior',
          difficulty: 'easy',
          estimatedHours: 3,
          description:
            'Erros bem tratados fazem a diferença entre uma API que é um prazer de usar e uma que é impossível de debugar. Inclui exceções customizadas, respostas padronizadas e logging adequado.',
          whyItMatters:
            'APIs com tratamento de erro ruim são rejeitadas em code review. O padrão RFC 7807 (Problem Details) é amplamente adotado no mercado.',
          mustKnowWithout: [
            'Diferença entre exceções checadas e não-checadas em Java',
            'Como criar exceções customizadas com status HTTP correto',
            'No Spring: @ControllerAdvice e @ExceptionHandler',
            'No NestJS: HttpException, ExceptionFilter',
            'Estrutura do RFC 7807: type, title, status, detail, instance',
            'O que nunca deve aparecer em respostas de erro de produção (stack trace, dados internos)',
          ],
          resources: [
            {
              type: 'article',
              title: 'RFC 7807 — Problem Details',
              url: 'https://www.rfc-editor.org/rfc/rfc7807',
              free: true,
            },
            {
              type: 'article',
              title: 'Baeldung — Error Handling Spring Boot',
              url: 'https://www.baeldung.com/exception-handling-for-rest-with-spring',
              free: true,
            },
            {
              type: 'docs',
              title: 'NestJS — Exception Filters',
              url: 'https://docs.nestjs.com/exception-filters',
              free: true,
            },
          ],
        },
      ],
    },
    {
      id: 'backend_phase_1',
      title: 'Fase 2 — Pleno',
      topics: [
        {
          id: 'backend_1_0',
          title: 'Testes: unitários, integração e e2e',
          level: 'mid',
          difficulty: 'medium',
          estimatedHours: 10,
          description:
            'Testes automatizados são o que separa código amador de código profissional. Unitários testam lógica isolada, integração testam componentes juntos com banco real, e2e testam fluxos completos.',
          whyItMatters:
            'É o gap mais crítico de devs vindos do setor público ou empresas sem cultura de engenharia. Empresas de produto exigem testes como critério de merge de PR.',
          mustKnowWithout: [
            'Diferença entre mock, stub e spy',
            'Pirâmide de testes: por que ter mais unitários que e2e',
            'Em Java: JUnit 5 (@Test, @BeforeEach, @ExtendWith), Mockito (@Mock, @InjectMocks, when().thenReturn())',
            'Em TS: Jest (describe, it, expect, jest.fn(), jest.spyOn())',
            'O que é Testcontainers e quando usar',
            'O que é cobertura de código e por que 100% não é o objetivo',
            'Padrão AAA: Arrange, Act, Assert',
          ],
          resources: [
            {
              type: 'article',
              title: 'Baeldung — JUnit 5',
              url: 'https://www.baeldung.com/junit-5',
              free: true,
            },
            {
              type: 'article',
              title: 'Baeldung — Mockito Series',
              url: 'https://www.baeldung.com/mockito-series',
              free: true,
            },
            {
              type: 'docs',
              title: 'Testcontainers — Getting Started',
              url: 'https://testcontainers.com/getting-started/',
              free: true,
            },
            {
              type: 'video',
              title: 'Amigoscode — Testing Spring Boot',
              url: 'https://www.youtube.com/watch?v=Geq60OVyBPg',
              free: true,
            },
            {
              type: 'docs',
              title: 'Jest — Official Docs',
              url: 'https://jestjs.io/docs/getting-started',
              free: true,
            },
          ],
        },
        {
          id: 'backend_1_1',
          title: 'Autenticação e Autorização (JWT + OAuth2)',
          level: 'mid',
          difficulty: 'hard',
          estimatedHours: 8,
          description:
            'JWT (JSON Web Token) é o padrão de mercado para autenticação stateless em APIs. OAuth2 é o protocolo para autorização delegada (login com Google, GitHub, etc.).',
          whyItMatters:
            'Implementar auth errado tem consequências de segurança graves. Qualquer sistema real precisa de auth, e saber implementar corretamente é critério de pleno.',
          mustKnowWithout: [
            'Estrutura do JWT: header, payload, signature',
            'Diferença entre autenticação e autorização',
            'Por que não armazenar dados sensíveis no payload do JWT',
            'O que é refresh token e por que existe',
            'Fluxos OAuth2: Authorization Code, Client Credentials, Implicit (deprecated)',
            'No Spring: SecurityFilterChain, OncePerRequestFilter, BCryptPasswordEncoder',
            'No NestJS: PassportStrategy, AuthGuard, JwtModule',
            'O que é RBAC (Role-Based Access Control)',
          ],
          resources: [
            {
              type: 'article',
              title: 'JWT.io — Introduction',
              url: 'https://jwt.io/introduction',
              free: true,
            },
            {
              type: 'video',
              title: 'Amigoscode — Spring Security 6',
              url: 'https://www.youtube.com/watch?v=KxqlJblhzfI',
              free: true,
            },
            {
              type: 'docs',
              title: 'NestJS — Authentication',
              url: 'https://docs.nestjs.com/security/authentication',
              free: true,
            },
            {
              type: 'article',
              title: 'OAuth2 Simplified',
              url: 'https://aaronparecki.com/oauth-2-simplified/',
              free: true,
            },
          ],
        },
        {
          id: 'backend_1_2',
          title: 'Design de APIs (versionamento, paginação, HATEOAS)',
          level: 'mid',
          difficulty: 'medium',
          estimatedHours: 5,
          description:
            'Boas APIs são previsíveis, consistentes e evoluem sem quebrar clients existentes. Inclui estratégias de versionamento, paginação padronizada e boas práticas de nomenclatura.',
          whyItMatters:
            'Em empresas com múltiplos clients (mobile, web, parceiros), a API é um contrato. Quebrar esse contrato tem custo alto. Saber versionar e paginar corretamente é critério de pleno.',
          mustKnowWithout: [
            'Estratégias de versionamento: URL (/v1/), header, query param — e trade-offs de cada',
            'Estrutura de resposta paginada: { data, total, page, limit, totalPages }',
            'Diferença entre offset pagination e cursor pagination',
            'Nomenclatura de recursos: plural, substantivos, sem verbos (/users não /getUsers)',
            'O que é HATEOAS e quando faz sentido usar',
            'Como documentar com OpenAPI/Swagger',
          ],
          resources: [
            {
              type: 'article',
              title: 'Microsoft — REST API Guidelines',
              url: 'https://github.com/microsoft/api-guidelines',
              free: true,
            },
            {
              type: 'article',
              title: 'Baeldung — REST Pagination',
              url: 'https://www.baeldung.com/rest-api-pagination-in-spring',
              free: true,
            },
            {
              type: 'docs',
              title: 'Swagger — OpenAPI Specification',
              url: 'https://swagger.io/specification/',
              free: true,
            },
          ],
        },
        {
          id: 'backend_1_3',
          title: 'Mensageria: eventos assíncronos (RabbitMQ / Kafka)',
          level: 'mid',
          difficulty: 'hard',
          estimatedHours: 8,
          description:
            'Comunicação assíncrona via filas e tópicos desacopla serviços e aumenta resiliência. RabbitMQ é baseado em filas (AMQP), Kafka em log distribuído de eventos.',
          whyItMatters:
            'Sistemas modernos usam eventos para comunicação entre serviços. É esperado de devs plenos entender quando usar mensageria e como implementar producers e consumers.',
          mustKnowWithout: [
            'Diferença entre fila (queue) e tópico (topic/exchange)',
            'O que é dead letter queue e por que existe',
            'Diferença entre RabbitMQ e Kafka em termos de casos de uso',
            'O que é idempotência em consumers e por que é crítica',
            'O que é at-least-once delivery e como lidar com duplicatas',
            'No Spring: @RabbitListener, RabbitTemplate, @KafkaListener',
            'No NestJS: @nestjs/microservices, ClientProxy',
          ],
          resources: [
            {
              type: 'docs',
              title: 'RabbitMQ — Tutorials',
              url: 'https://www.rabbitmq.com/tutorials',
              free: true,
            },
            {
              type: 'article',
              title: 'Confluent — Kafka Introduction',
              url: 'https://developer.confluent.io/what-is-apache-kafka/',
              free: true,
            },
            {
              type: 'video',
              title: 'Amigoscode — RabbitMQ',
              url: 'https://www.youtube.com/watch?v=Cie5v59mrTg',
              free: true,
            },
          ],
        },
        {
          id: 'backend_1_4',
          title: 'Cache (Redis)',
          level: 'mid',
          difficulty: 'medium',
          estimatedHours: 5,
          description:
            'Cache reduz latência e carga no banco armazenando resultados de operações custosas em memória. Redis é o padrão de mercado para cache distribuído.',
          whyItMatters:
            'APIs sem cache podem não sobreviver a picos de tráfego. Saber quando e como cachear é critério de pleno. Cachear errado pode gerar bugs sutis e difíceis de reproduzir.',
          mustKnowWithout: [
            'Diferença entre cache local (em memória da app) e cache distribuído (Redis)',
            'Estratégias de cache: Cache-Aside, Write-Through, Write-Behind',
            'O que é TTL (Time to Live) e como definir um valor adequado',
            'O que é cache invalidation e por que é difícil',
            'O que é cache stampede e como evitar',
            'Estruturas de dados do Redis: String, Hash, List, Set, Sorted Set',
            'No Spring: @Cacheable, @CacheEvict, @CachePut',
          ],
          resources: [
            {
              type: 'docs',
              title: 'Redis — Data Types',
              url: 'https://redis.io/docs/data-types/',
              free: true,
            },
            {
              type: 'article',
              title: 'Baeldung — Spring Cache',
              url: 'https://www.baeldung.com/spring-cache-tutorial',
              free: true,
            },
            {
              type: 'video',
              title: 'ByteByteGo — Cache Strategies',
              url: 'https://www.youtube.com/watch?v=a9__D53WsMs',
              free: true,
            },
          ],
        },
      ],
    },
    {
      id: 'backend_phase_2',
      title: 'Fase 3 — Avançado (Sênior)',
      topics: [
        {
          id: 'backend_2_0',
          title: 'Arquitetura Hexagonal (Ports & Adapters)',
          level: 'senior',
          difficulty: 'hard',
          estimatedHours: 8,
          description:
            'Arquitetura Hexagonal isola a lógica de negócio de detalhes de infraestrutura (banco, HTTP, filas) através de ports (interfaces) e adapters (implementações). O core do sistema não conhece Spring, JPA ou qualquer framework.',
          whyItMatters:
            'É o padrão de arquitetura de empresas que constroem sistemas de alta qualidade. Facilita enormemente os testes e permite trocar a infraestrutura sem tocar no negócio.',
          mustKnowWithout: [
            'Diferença entre arquitetura em camadas tradicional e hexagonal',
            'O que são ports de entrada (driving) e saída (driven)',
            'Por que a camada de domínio não pode depender de JPA ou Spring',
            'Como mapear entidades de domínio para entidades JPA e vice-versa',
            'Diferença entre Application Service e Domain Service',
          ],
          resources: [
            {
              type: 'article',
              title: 'Alistair Cockburn — Hexagonal Architecture',
              url: 'https://alistair.cockburn.us/hexagonal-architecture/',
              free: true,
            },
            {
              type: 'article',
              title: 'Netflix Tech Blog — Clean Architecture',
              url: 'https://netflixtechblog.com/ready-for-changes-with-hexagonal-architecture-b315ec967749',
              free: true,
            },
            {
              type: 'video',
              title: 'TomaszNurkiewicz — Hexagonal Architecture em Java',
              url: 'https://www.youtube.com/watch?v=th4AgBcrEHA',
              free: true,
            },
          ],
        },
        {
          id: 'backend_2_1',
          title: 'Resiliência: Circuit Breaker, Retry, Timeout',
          level: 'senior',
          difficulty: 'hard',
          estimatedHours: 6,
          description:
            'Sistemas distribuídos falham. Resiliência é a capacidade de continuar funcionando (degradado ou não) quando dependências externas falham.',
          whyItMatters:
            'Em sistemas com múltiplos serviços, falhas em cascata podem derrubar tudo. Patterns de resiliência são obrigatórios em sistemas de produção.',
          mustKnowWithout: [
            'O que é Circuit Breaker e seus 3 estados (Closed, Open, Half-Open)',
            'Diferença entre retry com backoff exponencial e retry simples',
            'O que é timeout e por que toda chamada externa precisa ter um',
            'O que é bulkhead pattern',
            'No Spring: Resilience4j (@CircuitBreaker, @Retry, @TimeLimiter)',
          ],
          resources: [
            {
              type: 'docs',
              title: 'Resilience4j — Docs',
              url: 'https://resilience4j.readme.io/docs',
              free: true,
            },
            {
              type: 'article',
              title: 'Martin Fowler — Circuit Breaker',
              url: 'https://martinfowler.com/bliki/CircuitBreaker.html',
              free: true,
            },
            {
              type: 'video',
              title: 'ByteByteGo — Resilience Patterns',
              url: 'https://www.youtube.com/watch?v=BsqXx6GIvho',
              free: true,
            },
          ],
        },
      ],
    },
  ],
}
