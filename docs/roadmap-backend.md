## Roadmap 1 — Backend (Java + TypeScript/Node.js)

### Fase 1 — Fundação (Júnior)

#### Tópico 1.1 — HTTP e REST na prática
- **Nível:** júnior
- **Dificuldade:** fácil
- **Tempo estimado:** 4h
- **Descrição:** HTTP é o protocolo que sustenta toda comunicação web. REST é um estilo arquitetural que define como APIs devem ser estruturadas usando os verbos HTTP corretamente.
- **Por que importa:** Todo dev backend trabalha com APIs REST diariamente. Entender os verbos, status codes e semântica correta é o mínimo esperado em qualquer entrevista.
- **O que saber sem pesquisar:**
  - Diferença entre GET, POST, PUT, PATCH e DELETE e quando usar cada um
  - O que significa idempotência e quais verbos são idempotentes
  - Status codes mais comuns: 200, 201, 204, 400, 401, 403, 404, 409, 422, 500
  - Diferença entre 401 (não autenticado) e 403 (não autorizado)
  - O que são headers HTTP e para que servem (Content-Type, Authorization, Accept)
  - Diferença entre query params, path params e request body
- **Recursos:**
  - [MDN — HTTP Overview](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview) — artigo
  - [REST API Tutorial](https://restapitutorial.com/) — site
  - [HTTP Status Codes Cheat Sheet](https://www.restapitutorial.com/httpstatuscodes.html) — referência
  - [Fireship — HTTP Crash Course (YouTube)](https://www.youtube.com/watch?v=iYM2zFP3Zn0) — vídeo

#### Tópico 1.2 — SOLID na prática
- **Nível:** júnior
- **Dificuldade:** médio
- **Tempo estimado:** 6h
- **Descrição:** SOLID são 5 princípios de design de código que resultam em sistemas mais fáceis de manter, testar e evoluir. São frequentemente cobrados em entrevistas técnicas.
- **Por que importa:** Código que viola SOLID é difícil de testar, difícil de mudar sem quebrar outras partes e difícil de entender. Empresas de produto exigem que devs plenos identifiquem violações em code review.
- **O que saber sem pesquisar:**
  - Explicar cada um dos 5 princípios com um exemplo concreto de código
  - Identificar violações de SRP (classe fazendo coisas demais), OCP (if/else gigante de tipos) e DIP (classe de alto nível dependendo de implementação concreta)
  - Diferença entre interface e implementação e como isso se relaciona com DIP
  - Por que SOLID facilita testes unitários
- **Recursos:**
  - [Baeldung — SOLID Principles](https://www.baeldung.com/solid-principles) — artigo (Java)
  - [Digital Ocean — SOLID com TypeScript](https://www.digitalocean.com/community/conceptual-articles/s-o-l-i-d-the-first-five-principles-of-object-oriented-design) — artigo
  - [Fireship — SOLID em 8 min (YouTube)](https://www.youtube.com/watch?v=oP2HMV-TrPo) — vídeo

#### Tópico 1.3 — Injeção de Dependência e IoC
- **Nível:** júnior
- **Dificuldade:** médio
- **Tempo estimado:** 4h
- **Descrição:** Injeção de Dependência (DI) é um padrão onde dependências são fornecidas externamente em vez de instanciadas pela classe. Inversão de Controle (IoC) é o princípio mais amplo onde o framework gerencia o ciclo de vida dos objetos.
- **Por que importa:** Spring Boot e NestJS são baseados em IoC containers. Sem entender DI, você não consegue estruturar código testável ou entender como o framework funciona por baixo.
- **O que saber sem pesquisar:**
  - Diferença entre `new MinhaClasse()` e injeção via construtor
  - O que é um IoC container e como ele funciona
  - No Spring: `@Component`, `@Service`, `@Repository`, `@Bean` e quando usar cada um
  - No NestJS: `@Injectable()`, providers, módulos e como registrar dependências
  - Por que DI via construtor é preferida a DI via campo (`@Autowired` no campo)
- **Recursos:**
  - [Spring — Understanding Dependency Injection](https://spring.io/blog/2011/08/26/spring-framework-the-good-parts) — artigo
  - [Baeldung — Spring DI](https://www.baeldung.com/inversion-control-and-dependency-injection-in-spring) — artigo
  - [NestJS — Providers](https://docs.nestjs.com/providers) — docs

#### Tópico 1.4 — Tratamento de Erros e Exceções
- **Nível:** júnior
- **Dificuldade:** fácil
- **Tempo estimado:** 3h
- **Descrição:** Erros bem tratados fazem a diferença entre uma API que é um prazer de usar e uma que é impossível de debugar. Inclui exceções customizadas, respostas padronizadas e logging adequado.
- **Por que importa:** APIs com tratamento de erro ruim são rejeitadas em code review. O padrão RFC 7807 (Problem Details) é amplamente adotado no mercado.
- **O que saber sem pesquisar:**
  - Diferença entre exceções checadas e não-checadas em Java
  - Como criar exceções customizadas com status HTTP correto
  - No Spring: `@ControllerAdvice` e `@ExceptionHandler`
  - No NestJS: `HttpException`, `ExceptionFilter`
  - Estrutura do RFC 7807: `type`, `title`, `status`, `detail`, `instance`
  - O que nunca deve aparecer em respostas de erro de produção (stack trace, dados internos)
- **Recursos:**
  - [RFC 7807 — Problem Details](https://www.rfc-editor.org/rfc/rfc7807) — spec
  - [Baeldung — Error Handling Spring Boot](https://www.baeldung.com/exception-handling-for-rest-with-spring) — artigo
  - [NestJS — Exception Filters](https://docs.nestjs.com/exception-filters) — docs

---

### Fase 2 — Pleno

#### Tópico 2.1 — Testes: unitários, integração e e2e
- **Nível:** pleno
- **Dificuldade:** médio
- **Tempo estimado:** 10h
- **Descrição:** Testes automatizados são o que separa código amador de código profissional. Unitários testam lógica isolada, integração testam componentes juntos com banco real, e2e testam fluxos completos.
- **Por que importa:** É o gap mais crítico de devs vindos do setor público ou empresas sem cultura de engenharia. Empresas de produto exigem testes como critério de merge de PR.
- **O que saber sem pesquisar:**
  - Diferença entre mock, stub e spy
  - Pirâmide de testes: por que ter mais unitários que e2e
  - Em Java: JUnit 5 (`@Test`, `@BeforeEach`, `@ExtendWith`), Mockito (`@Mock`, `@InjectMocks`, `when().thenReturn()`)
  - Em TS: Jest (`describe`, `it`, `expect`, `jest.fn()`, `jest.spyOn()`)
  - O que é Testcontainers e quando usar
  - O que é cobertura de código e por que 100% não é o objetivo
  - Padrão AAA: Arrange, Act, Assert
- **Recursos:**
  - [Baeldung — JUnit 5](https://www.baeldung.com/junit-5) — artigo
  - [Baeldung — Mockito Series](https://www.baeldung.com/mockito-series) — artigos
  - [Testcontainers — Getting Started](https://testcontainers.com/getting-started/) — docs
  - [Amigoscode — Testing Spring Boot (YouTube)](https://www.youtube.com/watch?v=Geq60OVyBPg) — vídeo gratuito
  - [Jest — Official Docs](https://jestjs.io/docs/getting-started) — docs

#### Tópico 2.2 — Autenticação e Autorização (JWT + OAuth2)
- **Nível:** pleno
- **Dificuldade:** difícil
- **Tempo estimado:** 8h
- **Descrição:** JWT (JSON Web Token) é o padrão de mercado para autenticação stateless em APIs. OAuth2 é o protocolo para autorização delegada (login com Google, GitHub, etc.).
- **Por que importa:** Implementar auth errado tem consequências de segurança graves. Qualquer sistema real precisa de auth, e saber implementar corretamente é critério de pleno.
- **O que saber sem pesquisar:**
  - Estrutura do JWT: header, payload, signature
  - Diferença entre autenticação e autorização
  - Por que não armazenar dados sensíveis no payload do JWT
  - O que é refresh token e por que existe
  - Fluxos OAuth2: Authorization Code, Client Credentials, Implicit (deprecated)
  - No Spring: `SecurityFilterChain`, `OncePerRequestFilter`, `BCryptPasswordEncoder`
  - No NestJS: `PassportStrategy`, `AuthGuard`, `JwtModule`
  - O que é RBAC (Role-Based Access Control)
- **Recursos:**
  - [JWT.io — Introduction](https://jwt.io/introduction) — artigo
  - [Amigoscode — Spring Security 6 (YouTube)](https://www.youtube.com/watch?v=KxqlJblhzfI) — vídeo gratuito
  - [NestJS — Authentication](https://docs.nestjs.com/security/authentication) — docs
  - [OAuth2 Simplified](https://aaronparecki.com/oauth-2-simplified/) — artigo

#### Tópico 2.3 — Design de APIs (versionamento, paginação, HATEOAS)
- **Nível:** pleno
- **Dificuldade:** médio
- **Tempo estimado:** 5h
- **Descrição:** Boas APIs são previsíveis, consistentes e evoluem sem quebrar clients existentes. Inclui estratégias de versionamento, paginação padronizada e boas práticas de nomenclatura.
- **Por que importa:** Em empresas com múltiplos clients (mobile, web, parceiros), a API é um contrato. Quebrar esse contrato tem custo alto. Saber versionar e paginar corretamente é critério de pleno.
- **O que saber sem pesquisar:**
  - Estratégias de versionamento: URL (`/v1/`), header, query param — e trade-offs de cada
  - Estrutura de resposta paginada: `{ data, total, page, limit, totalPages }`
  - Diferença entre offset pagination e cursor pagination
  - Nomeclatura de recursos: plural, substantivos, sem verbos (`/users` não `/getUsers`)
  - O que é HATEOAS e quando faz sentido usar
  - Como documentar com OpenAPI/Swagger
- **Recursos:**
  - [Microsoft — REST API Guidelines](https://github.com/microsoft/api-guidelines) — referência
  - [Baeldung — REST Pagination](https://www.baeldung.com/rest-api-pagination-in-spring) — artigo
  - [Swagger — OpenAPI Specification](https://swagger.io/specification/) — docs

#### Tópico 2.4 — Mensageria: eventos assíncronos (RabbitMQ / Kafka)
- **Nível:** pleno
- **Dificuldade:** difícil
- **Tempo estimado:** 8h
- **Descrição:** Comunicação assíncrona via filas e tópicos desacopla serviços e aumenta resiliência. RabbitMQ é baseado em filas (AMQP), Kafka em log distribuído de eventos.
- **Por que importa:** Sistemas modernos usam eventos para comunicação entre serviços. É esperado de devs plenos entender quando usar mensageria e como implementar producers e consumers.
- **O que saber sem pesquisar:**
  - Diferença entre fila (queue) e tópico (topic/exchange)
  - O que é dead letter queue e por que existe
  - Diferença entre RabbitMQ e Kafka em termos de casos de uso
  - O que é idempotência em consumers e por que é crítica
  - O que é at-least-once delivery e como lidar com duplicatas
  - No Spring: `@RabbitListener`, `RabbitTemplate`, `@KafkaListener`
  - No NestJS: `@nestjs/microservices`, `ClientProxy`
- **Recursos:**
  - [RabbitMQ — Tutorials](https://www.rabbitmq.com/tutorials) — docs
  - [Confluent — Kafka Introduction](https://developer.confluent.io/what-is-apache-kafka/) — artigo
  - [Amigoscode — RabbitMQ (YouTube)](https://www.youtube.com/watch?v=Cie5v59mrTg) — vídeo gratuito

#### Tópico 2.5 — Cache (Redis)
- **Nível:** pleno
- **Dificuldade:** médio
- **Tempo estimado:** 5h
- **Descrição:** Cache reduz latência e carga no banco armazenando resultados de operações custosas em memória. Redis é o padrão de mercado para cache distribuído.
- **Por que importa:** APIs sem cache podem não sobreviver a picos de tráfego. Saber quando e como cachear é critério de pleno. Cachear errado pode gerar bugs sutis e difíceis de reproduzir.
- **O que saber sem pesquisar:**
  - Diferença entre cache local (em memória da app) e cache distribuído (Redis)
  - Estratégias de cache: Cache-Aside, Write-Through, Write-Behind
  - O que é TTL (Time to Live) e como definir um valor adequado
  - O que é cache invalidation e por que é difícil
  - O que é cache stampede e como evitar
  - Estruturas de dados do Redis: String, Hash, List, Set, Sorted Set
  - No Spring: `@Cacheable`, `@CacheEvict`, `@CachePut`
- **Recursos:**
  - [Redis — Data Types](https://redis.io/docs/data-types/) — docs
  - [Baeldung — Spring Cache](https://www.baeldung.com/spring-cache-tutorial) — artigo
  - [ByteByteGo — Cache Strategies (YouTube)](https://www.youtube.com/watch?v=a9__D53WsMs) — vídeo

---

### Fase 3 — Avançado (Sênior)

#### Tópico 3.1 — Arquitetura Hexagonal (Ports & Adapters)
- **Nível:** sênior
- **Dificuldade:** difícil
- **Tempo estimado:** 8h
- **Descrição:** Arquitetura Hexagonal isola a lógica de negócio de detalhes de infraestrutura (banco, HTTP, filas) através de ports (interfaces) e adapters (implementações). O core do sistema não conhece Spring, JPA ou qualquer framework.
- **Por que importa:** É o padrão de arquitetura de empresas que constroem sistemas de alta qualidade. Facilita enormemente os testes e permite trocar a infraestrutura sem tocar no negócio.
- **O que saber sem pesquisar:**
  - Diferença entre arquitetura em camadas tradicional e hexagonal
  - O que são ports de entrada (driving) e saída (driven)
  - Por que a camada de domínio não pode depender de JPA ou Spring
  - Como mapear entidades de domínio para entidades JPA e vice-versa
  - Diferença entre Application Service e Domain Service
- **Recursos:**
  - [Alistair Cockburn — Hexagonal Architecture](https://alistair.cockburn.us/hexagonal-architecture/) — artigo original
  - [Netflix Tech Blog — Clean Architecture](https://netflixtechblog.com/ready-for-changes-with-hexagonal-architecture-b315ec967749) — artigo
  - [TomaszNurkiewicz — Hexagonal Architecture em Java (YouTube)](https://www.youtube.com/watch?v=th4AgBcrEHA) — vídeo

#### Tópico 3.2 — Resiliência: Circuit Breaker, Retry, Timeout
- **Nível:** sênior
- **Dificuldade:** difícil
- **Tempo estimado:** 6h
- **Descrição:** Sistemas distribuídos falham. Resiliência é a capacidade de continuar funcionando (degradado ou não) quando dependências externas falham.
- **Por que importa:** Em sistemas com múltiplos serviços, falhas em cascata podem derrubar tudo. Patterns de resiliência são obrigatórios em sistemas de produção.
- **O que saber sem pesquisar:**
  - O que é Circuit Breaker e seus 3 estados (Closed, Open, Half-Open)
  - Diferença entre retry com backoff exponencial e retry simples
  - O que é timeout e por que toda chamada externa precisa ter um
  - O que é bulkhead pattern
  - No Spring: Resilience4j (`@CircuitBreaker`, `@Retry`, `@TimeLimiter`)
- **Recursos:**
  - [Resilience4j — Docs](https://resilience4j.readme.io/docs) — docs
  - [Martin Fowler — Circuit Breaker](https://martinfowler.com/bliki/CircuitBreaker.html) — artigo
  - [ByteByteGo — Resilience Patterns (YouTube)](https://www.youtube.com/watch?v=BsqXx6GIvho) — vídeo

---