## Projeto 2 — taskflow-api

**Stack:** TypeScript / NestJS / PostgreSQL / Redis / WebSockets (Socket.io) / Kafka
**Domínio:** Gerenciador de tarefas colaborativo em tempo real — projetos, tasks, times, notificações live
**Roadmaps cobertos:** Backend, Banco de Dados, DevOps, System Design
**Repositório:** `github.com/seu-usuario/taskflow-api` — README em inglês

---

### Fase 1 — Fundação

**Tempo estimado:** 4–5h

#### Tarefa 1.1 — Setup NestJS com TypeScript estrito
- **Dificuldade:** fácil | **Tempo:** 1h
- **Descrição:** `nest new taskflow-api`. `tsconfig.json`: `strict: true`, `noImplicitAny: true`, `strictNullChecks: true`. ESLint com `@typescript-eslint/no-explicit-any: error`. Módulos: `AuthModule`, `UsersModule`, `ProjectsModule`, `TasksModule`, `NotificationsModule`, `WebSocketModule`. `docker-compose.yml`: postgres, redis, kafka (mesmo do payflow). Configuração via `@nestjs/config` + validação com `Joi` — variável obrigatória ausente impede o boot.
- **Critério de conclusão:** `npm run start:dev` sobe. `npm run lint` sem warnings. Boot falha com mensagem clara se variável obrigatória ausente.
- **Recursos:**
  - [NestJS — Configuration](https://docs.nestjs.com/techniques/configuration) — docs

#### Tarefa 1.2 — Prisma com schema completo
- **Dificuldade:** médio | **Tempo:** 1h30
- **Descrição:** Models: `User` (id UUID, email único, name, avatarUrl, createdAt), `Project` (id, name, description, ownerId, createdAt, deletedAt para soft delete), `ProjectMember` (projectId, userId, role enum OWNER|ADMIN|MEMBER — tabela de junção), `Task` (id, title, description, status enum TODO|IN_PROGRESS|IN_REVIEW|DONE, priority enum LOW|MEDIUM|HIGH|URGENT, dueDate nullable, projectId, assigneeId nullable, createdAt, updatedAt), `Comment` (id, content, taskId, authorId, createdAt), `ActivityLog` (id, taskId, userId, action, oldValue, newValue, createdAt). `PrismaService` com `onModuleInit` e `enableShutdownHooks`.
- **Critério de conclusão:** `npx prisma migrate dev` cria todas as tabelas. `npx prisma studio` mostra todos os models com relações.
- **Recursos:**
  - [NestJS — Prisma Recipe](https://docs.nestjs.com/recipes/prisma) — docs
  - [Prisma — Relations](https://www.prisma.io/docs/concepts/components/prisma-schema/relations) — docs

#### Tarefa 1.3 — DTOs rigorosos com class-validator
- **Dificuldade:** médio | **Tempo:** 1h
- **Descrição:** Zero `any`. DTOs com `class-validator`: `CreateTaskDto`, `UpdateTaskDto` (`PartialType`), `FilterTasksDto` (todos `@IsOptional()`). `Omit<User, 'password'>` para respostas. `ValidationPipe` global com `whitelist: true` e `forbidNonWhitelisted: true`. Enum types do Prisma reexportados como constantes TypeScript.
- **Critério de conclusão:** Campo extra no body retorna 400. Campo obrigatório ausente retorna 400 com mensagem específica por campo.
- **Recursos:**
  - [NestJS — Validation](https://docs.nestjs.com/techniques/validation) — docs

---

### Fase 2 — Autenticação

**Tempo estimado:** 4–5h

#### Tarefa 2.1 — OAuth2 com GitHub e Google
- **Dificuldade:** difícil | **Tempo:** 2h30
- **Descrição:** Sem email/senha — apenas OAuth2. `passport-github2` e `passport-google-oauth20`. Fluxo: `GET /auth/github` → redirect GitHub → callback → upsert usuário por email → retorna JWT. Mesmo para Google. JWT: access token (15min) + refresh token (7 dias) no Redis. `GET /auth/me` retorna usuário autenticado. Mesmo email via providers diferentes cria apenas um usuário.
- **Critério de conclusão:** Login com GitHub e Google funcionam end-to-end. Upsert por email funciona — dois providers, um usuário.
- **Recursos:**
  - [NestJS — Authentication](https://docs.nestjs.com/security/authentication) — docs
  - [passport-github2](https://github.com/passport/passport-github2) — docs

#### Tarefa 2.2 — Guards, Decorators e RBAC por projeto
- **Dificuldade:** difícil | **Tempo:** 2h
- **Descrição:** `JwtAuthGuard` global com `@Public()` decorator para exceções. `ProjectRoleGuard`: verifica role do usuário no projeto antes de executar — OWNER pode deletar, ADMIN gerencia membros, MEMBER cria tasks. `@SetMetadata('requiredRole', ProjectRole.ADMIN)` + `Reflector` no guard. `@CurrentUser()` extrai usuário do request.
- **Critério de conclusão:** MEMBER tentando deletar projeto retorna 403. OWNER do projeto A não acessa projeto B (404 — não vaze existência).
- **Recursos:**
  - [NestJS — Authorization](https://docs.nestjs.com/security/authorization) — docs

#### Tarefa 2.3 — Rate Limiting com Redis
- **Dificuldade:** médio | **Tempo:** 1h
- **Descrição:** `@nestjs/throttler` com `ThrottlerStorageRedisService` (funciona com múltiplas instâncias). Limites: auth — 10 req/min por IP; tasks — 60 req/min por usuário. `@Throttle()` para sobrescrever por endpoint. `429` com header `Retry-After`.
- **Critério de conclusão:** 11ª request retorna 429. Rate limit por usuário não afeta outros.
- **Recursos:**
  - [NestJS — Rate Limiting](https://docs.nestjs.com/security/rate-limiting) — docs

---

### Fase 3 — CRUD e Regras de Negócio

**Tempo estimado:** 5–6h

#### Tarefa 3.1 — Projects com membros e soft delete
- **Dificuldade:** médio | **Tempo:** 2h
- **Descrição:** CRUD completo. `POST /projects` — criador vira OWNER automaticamente. `POST /projects/:id/members` — adiciona membro com role (só OWNER/ADMIN). `DELETE /projects/:id/members/:userId` — OWNER não pode ser removido. `GET /projects` — apenas projetos onde o usuário é membro. Soft delete: `deletedAt` — projetos deletados não aparecem mas dados preservados.
- **Critério de conclusão:** Usuário não-membro recebe 404 (não 403). Soft delete funciona. OWNER não removível.
- **Recursos:**
  - [Prisma — Soft Delete Middleware](https://www.prisma.io/docs/concepts/components/prisma-client/middleware/soft-delete-middleware) — docs

#### Tarefa 3.2 — Tasks com cursor pagination e full-text search
- **Dificuldade:** difícil | **Tempo:** 2h
- **Descrição:** Filtros combinados: `status`, `priority`, `assigneeId`, `dueDateBefore`, `dueDateAfter`, `search` (full-text no título e descrição). **Cursor-based pagination** (não offset): `GET /tasks?cursor=<taskId>&limit=20`. Resposta: `{ data, nextCursor, hasMore }`. Ordenação: `sortBy=dueDate|priority|createdAt`, `order=asc|desc`.
- **Critério de conclusão:** Full-text search retorna tasks relevantes. Segunda página não repete items. `EXPLAIN ANALYZE` mostra uso de índices.
- **Recursos:**
  - [Prisma — Cursor Pagination](https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination) — docs

#### Tarefa 3.3 — Histórico de atividade via Prisma Middleware
- **Dificuldade:** médio | **Tempo:** 1h30
- **Descrição:** Prisma middleware intercepta updates em `Task` e insere automaticamente em `ActivityLog` (taskId, userId, action, oldValue, newValue). `GET /tasks/:id/activity` retorna histórico ordenado. Comentários com cursor pagination. Nenhum service precisa chamar `ActivityLog` explicitamente — o middleware cuida.
- **Critério de conclusão:** Mover task de TODO para IN_PROGRESS registra atividade com oldValue e newValue automaticamente. Histórico completo acessível via API.
- **Recursos:**
  - [Prisma — Middleware](https://www.prisma.io/docs/concepts/components/prisma-client/middleware) — docs

---

### Fase 4 — WebSockets e Tempo Real

**Tempo estimado:** 6–7h

#### Tarefa 4.1 — Gateway WebSocket autenticado
- **Dificuldade:** difícil | **Tempo:** 2h30
- **Descrição:** `@WebSocketGateway` com Socket.io. Auth no handshake via JWT no header `Authorization` — `WsJwtGuard` rejeita antes de aceitar a conexão. Rooms por projeto: `socket.join(`project:${projectId}`)` após verificar membership. Eventos emitidos: `task:created`, `task:updated`, `task:deleted`, `comment:created`, `member:joined`, `member:left`. Evento recebido: `task:subscribe` (entrar na room de uma task específica).
- **Critério de conclusão:** Cliente sem JWT rejeitado no handshake. Dois clientes no mesmo projeto recebem eventos em tempo real.
- **Recursos:**
  - [NestJS — WebSockets](https://docs.nestjs.com/websockets/gateways) — docs
  - [Socket.io — Rooms](https://socket.io/docs/v4/rooms/) — docs

#### Tarefa 4.2 — Integração REST + WebSocket + Presença
- **Dificuldade:** difícil | **Tempo:** 2h
- **Descrição:** Cada operação REST que modifica dados emite evento WebSocket para a room do projeto. O evento carrega o objeto completo — clients não precisam fazer nova request. Presença: conexão/desconexão emite `user:online`/`user:offline`. Cache de usuários online no Redis com TTL de 30s (renovado por heartbeat do cliente a cada 15s).
- **Critério de conclusão:** Criar task via REST → todos os clients conectados recebem `task:created` em < 100ms. Fechar browser → `user:offline` em até 30s.
- **Recursos:**
  - [Socket.io — Emit Cheatsheet](https://socket.io/docs/v4/emit-cheatsheet/) — docs

#### Tarefa 4.3 — Consumer Kafka cross-service
- **Dificuldade:** difícil | **Tempo:** 1h30
- **Descrição:** Consuma `transfer.completed` do payflow-api via `@nestjs/microservices` Kafka. Usuário recebedor online → emit `notification:transfer` via WebSocket. Idempotência: `transferId` já processados no Redis com TTL de 24h. Extraia `traceId` do header Kafka para correlação de logs.
- **Critério de conclusão:** Transferência no payflow → notificação WebSocket no taskflow em tempo real. Mesmo evento processado duas vezes não gera notificação duplicada.
- **Recursos:**
  - [NestJS — Kafka Microservice](https://docs.nestjs.com/microservices/kafka) — docs

---

### Fase 5 — Testes

**Tempo estimado:** 7–8h

#### Tarefa 5.1 — Testes unitários (Jest + jest-mock-extended)
- **Dificuldade:** médio | **Tempo:** 2h
- **Descrição:** `mockDeep<PrismaService>()` para type-safety. Cenários obrigatórios `TasksService`: criar task válida, criar em projeto sem permissão (`ForbiddenException`), mover para status inválido, atribuir a não-membro. WebSocket Gateway: mock do `Server` — verificar que `emit` foi chamado com payload correto.
- **Critério de conclusão:** `npm test` passa. Zero chamadas reais a banco, Redis ou Kafka.
- **Recursos:**
  - [jest-mock-extended](https://github.com/marchaos/jest-mock-extended) — docs

#### Tarefa 5.2 — Testes e2e com Testcontainers
- **Dificuldade:** difícil | **Tempo:** 2h30
- **Descrição:** Containers: PostgreSQL, Redis, Kafka. Mock de providers OAuth com `nock`. Fluxo: login → criar projeto → adicionar membro → criar task → comentar → mover status → verificar histórico. Teste WebSocket: dois clientes (`socket.io-client`) no mesmo projeto → criar task com cliente 1 → cliente 2 recebe `task:created` em < 500ms. Teste rate limiting: 61 requests → 61ª retorna 429.
- **Critério de conclusão:** Todos os fluxos passam com Docker. Teste WebSocket determinístico.
- **Recursos:**
  - [socket.io-client — Docs](https://socket.io/docs/v4/client-api/) — docs
  - [nock](https://github.com/nock/nock) — docs

#### Tarefa 5.3 — Pact (lado consumer)
- **Dificuldade:** difícil | **Tempo:** 2h
- **Descrição:** Define o contrato esperado do payflow-api: `POST /transfers` — body com `value`, `payerId`, `payeeId`; response 201 com `id`, `status: "COMPLETED"`, `amount`. `GET /users/:id` — response 200 com `id`, `email`, `type`. Gera `pacts/payflow-api.json`. CI publica no Pact Broker (pactflow.io free tier).
- **Critério de conclusão:** `npm run test:pact` gera o contrato. Contrato publicado após CI verde.
- **Recursos:**
  - [Pact JS](https://docs.pact.io/implementation_guides/javascript) — docs
  - [PactFlow — Free Tier](https://pactflow.io/) — serviço gratuito

---

### Fase 6 — Observabilidade e CI/CD

**Tempo estimado:** 5–6h

#### Tarefa 6.1 — Structured logging com correlação cross-service
- **Dificuldade:** médio | **Tempo:** 1h30
- **Descrição:** `winston` com `format.json()`. Middleware extrai `traceparent` header das requests do payflow e popula contexto de logging. Quando consumir Kafka do payflow, extrai `traceId` do header da mensagem. Campos: `timestamp`, `level`, `service`, `traceId`, `requestId`, `userId`, `message`.
- **Critério de conclusão:** Log de notificação Kafka tem o mesmo `traceId` do log original do payflow. Rastreabilidade completa cross-service.
- **Recursos:**
  - [OpenTelemetry — Propagation](https://opentelemetry.io/docs/concepts/context-propagation/) — docs

#### Tarefa 6.2 — Métricas e CI/CD
- **Dificuldade:** médio | **Tempo:** 2h
- **Descrição:** `prom-client` com: `taskflow_tasks_created_total` (counter por projeto), `taskflow_websocket_connections_active` (gauge), `taskflow_kafka_messages_processed_total` (counter por resultado). CI: `lint` → `typecheck` → `test` → `test:e2e` → `test:pact` → `build-docker` → `deploy`. Environments `staging` e `production`. Imagem no ghcr.io.
- **Critério de conclusão:** Grafana mostra WebSocket connections ativas. CI falha se Pact tests falharem.
- **Recursos:**
  - [prom-client](https://github.com/siimon/prom-client) — docs

---