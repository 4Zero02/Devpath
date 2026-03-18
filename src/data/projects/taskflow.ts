import type { Project } from '../../types'

// Dados estáticos do projeto taskflow-api — nunca buscar do banco
export const taskflowProject: Project = {
  id: 'taskflow',
  title: 'taskflow-api',
  description:
    'Gerenciador de tarefas colaborativo em tempo real com NestJS. Projetos, tasks, times e notificações live via WebSockets — integrado ao payflow via Kafka.',
  stack: 'TypeScript · NestJS · PostgreSQL · Redis · WebSockets (Socket.io) · Kafka',
  domain: 'Gerenciamento de tarefas colaborativo em tempo real',
  phases: [
    {
      id: 'taskflow_phase_0',
      title: 'Fase 1 — Fundação',
      tasks: [
        {
          id: 'taskflow_0_0',
          title: 'Setup NestJS com TypeScript estrito',
          difficulty: 'easy',
          estimatedHours: 1,
          description:
            'nest new taskflow-api. tsconfig.json: strict: true, noImplicitAny: true, strictNullChecks: true. ESLint com @typescript-eslint/no-explicit-any: error. Módulos: AuthModule, UsersModule, ProjectsModule, TasksModule, NotificationsModule, WebSocketModule. Configuração via @nestjs/config + validação com Joi — variável obrigatória ausente impede o boot.',
          criteria: 'npm run start:dev sobe. npm run lint sem warnings. Boot falha com mensagem clara se variável ausente.',
          resources: [
            {
              type: 'docs',
              title: 'NestJS — Configuration',
              url: 'https://docs.nestjs.com/techniques/configuration',
              free: true,
            },
          ],
        },
        {
          id: 'taskflow_0_1',
          title: 'Prisma com schema completo',
          difficulty: 'medium',
          estimatedHours: 1.5,
          description:
            'Models: User, Project (com deletedAt para soft delete), ProjectMember (role enum OWNER|ADMIN|MEMBER), Task (status TODO|IN_PROGRESS|IN_REVIEW|DONE, priority LOW|MEDIUM|HIGH|URGENT), Comment, ActivityLog. PrismaService com onModuleInit e enableShutdownHooks.',
          criteria:
            'npx prisma migrate dev cria todas as tabelas. npx prisma studio mostra todos os models com relações.',
          resources: [
            {
              type: 'docs',
              title: 'NestJS — Prisma Recipe',
              url: 'https://docs.nestjs.com/recipes/prisma',
              free: true,
            },
            {
              type: 'docs',
              title: 'Prisma — Relations',
              url: 'https://www.prisma.io/docs/concepts/components/prisma-schema/relations',
              free: true,
            },
          ],
        },
        {
          id: 'taskflow_0_2',
          title: 'DTOs rigorosos com class-validator',
          difficulty: 'medium',
          estimatedHours: 1,
          description:
            'Zero any. DTOs com class-validator: CreateTaskDto, UpdateTaskDto (PartialType), FilterTasksDto (todos @IsOptional()). Omit<User, "password"> para respostas. ValidationPipe global com whitelist: true e forbidNonWhitelisted: true. Enum types do Prisma reexportados como constantes TypeScript.',
          criteria:
            'Campo extra no body retorna 400. Campo obrigatório ausente retorna 400 com mensagem específica por campo.',
          resources: [
            {
              type: 'docs',
              title: 'NestJS — Validation',
              url: 'https://docs.nestjs.com/techniques/validation',
              free: true,
            },
          ],
        },
      ],
    },
    {
      id: 'taskflow_phase_1',
      title: 'Fase 2 — Autenticação',
      tasks: [
        {
          id: 'taskflow_1_0',
          title: 'OAuth2 com GitHub e Google',
          difficulty: 'hard',
          estimatedHours: 2.5,
          description:
            'Sem email/senha — apenas OAuth2. passport-github2 e passport-google-oauth20. Fluxo: GET /auth/github → redirect → callback → upsert usuário por email → retorna JWT. JWT: access token (15min) + refresh token (7 dias) no Redis. GET /auth/me retorna usuário autenticado. Mesmo email via providers diferentes cria apenas um usuário.',
          criteria:
            'Login com GitHub e Google funcionam end-to-end. Upsert por email funciona — dois providers, um usuário.',
          resources: [
            {
              type: 'docs',
              title: 'NestJS — Authentication',
              url: 'https://docs.nestjs.com/security/authentication',
              free: true,
            },
            {
              type: 'docs',
              title: 'passport-github2',
              url: 'https://github.com/passport/passport-github2',
              free: true,
            },
          ],
        },
        {
          id: 'taskflow_1_1',
          title: 'Guards, Decorators e RBAC por projeto',
          difficulty: 'hard',
          estimatedHours: 2,
          description:
            'JwtAuthGuard global com @Public() decorator para exceções. ProjectRoleGuard: verifica role do usuário no projeto — OWNER pode deletar, ADMIN gerencia membros, MEMBER cria tasks. @SetMetadata("requiredRole", ProjectRole.ADMIN) + Reflector no guard. @CurrentUser() extrai usuário do request.',
          criteria:
            'MEMBER tentando deletar projeto retorna 403. OWNER do projeto A não acessa projeto B (404 — não vaze existência).',
          resources: [
            {
              type: 'docs',
              title: 'NestJS — Authorization',
              url: 'https://docs.nestjs.com/security/authorization',
              free: true,
            },
          ],
        },
        {
          id: 'taskflow_1_2',
          title: 'Rate Limiting com Redis',
          difficulty: 'medium',
          estimatedHours: 1,
          description:
            '@nestjs/throttler com ThrottlerStorageRedisService (funciona com múltiplas instâncias). Limites: auth — 10 req/min por IP; tasks — 60 req/min por usuário. @Throttle() para sobrescrever por endpoint. 429 com header Retry-After.',
          criteria: '11ª request retorna 429. Rate limit por usuário não afeta outros.',
          resources: [
            {
              type: 'docs',
              title: 'NestJS — Rate Limiting',
              url: 'https://docs.nestjs.com/security/rate-limiting',
              free: true,
            },
          ],
        },
      ],
    },
    {
      id: 'taskflow_phase_2',
      title: 'Fase 3 — CRUD e Regras de Negócio',
      tasks: [
        {
          id: 'taskflow_2_0',
          title: 'Projects com membros e soft delete',
          difficulty: 'medium',
          estimatedHours: 2,
          description:
            'CRUD completo. POST /projects — criador vira OWNER automaticamente. POST /projects/:id/members — adiciona membro com role (só OWNER/ADMIN). DELETE /projects/:id/members/:userId — OWNER não pode ser removido. GET /projects — apenas projetos onde o usuário é membro. Soft delete: deletedAt — projetos deletados não aparecem mas dados preservados.',
          criteria: 'Usuário não-membro recebe 404 (não 403). Soft delete funciona. OWNER não removível.',
          resources: [
            {
              type: 'docs',
              title: 'Prisma — Soft Delete Middleware',
              url: 'https://www.prisma.io/docs/concepts/components/prisma-client/middleware/soft-delete-middleware',
              free: true,
            },
          ],
        },
        {
          id: 'taskflow_2_1',
          title: 'Tasks com cursor pagination e full-text search',
          difficulty: 'hard',
          estimatedHours: 2,
          description:
            'Filtros combinados: status, priority, assigneeId, dueDateBefore, dueDateAfter, search (full-text no título e descrição). Cursor-based pagination: GET /tasks?cursor=<taskId>&limit=20. Resposta: { data, nextCursor, hasMore }. Ordenação: sortBy=dueDate|priority|createdAt, order=asc|desc.',
          criteria:
            'Full-text search retorna tasks relevantes. Segunda página não repete items. EXPLAIN ANALYZE mostra uso de índices.',
          resources: [
            {
              type: 'docs',
              title: 'Prisma — Cursor Pagination',
              url: 'https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination',
              free: true,
            },
          ],
        },
        {
          id: 'taskflow_2_2',
          title: 'Histórico de atividade via Prisma Middleware',
          difficulty: 'medium',
          estimatedHours: 1.5,
          description:
            'Prisma middleware intercepta updates em Task e insere automaticamente em ActivityLog (taskId, userId, action, oldValue, newValue). GET /tasks/:id/activity retorna histórico ordenado. Nenhum service precisa chamar ActivityLog explicitamente — o middleware cuida.',
          criteria:
            'Mover task de TODO para IN_PROGRESS registra atividade com oldValue e newValue automaticamente. Histórico completo acessível via API.',
          resources: [
            {
              type: 'docs',
              title: 'Prisma — Middleware',
              url: 'https://www.prisma.io/docs/concepts/components/prisma-client/middleware',
              free: true,
            },
          ],
        },
      ],
    },
    {
      id: 'taskflow_phase_3',
      title: 'Fase 4 — WebSockets e Tempo Real',
      tasks: [
        {
          id: 'taskflow_3_0',
          title: 'Gateway WebSocket autenticado',
          difficulty: 'hard',
          estimatedHours: 2.5,
          description:
            '@WebSocketGateway com Socket.io. Auth no handshake via JWT no header Authorization — WsJwtGuard rejeita antes de aceitar a conexão. Rooms por projeto: socket.join(`project:${projectId}`) após verificar membership. Eventos emitidos: task:created, task:updated, task:deleted, comment:created, member:joined, member:left.',
          criteria:
            'Cliente sem JWT rejeitado no handshake. Dois clientes no mesmo projeto recebem eventos em tempo real.',
          resources: [
            {
              type: 'docs',
              title: 'NestJS — WebSockets',
              url: 'https://docs.nestjs.com/websockets/gateways',
              free: true,
            },
            {
              type: 'docs',
              title: 'Socket.io — Rooms',
              url: 'https://socket.io/docs/v4/rooms/',
              free: true,
            },
          ],
        },
        {
          id: 'taskflow_3_1',
          title: 'Integração REST + WebSocket + Presença',
          difficulty: 'hard',
          estimatedHours: 2,
          description:
            'Cada operação REST que modifica dados emite evento WebSocket para a room do projeto. O evento carrega o objeto completo. Presença: conexão/desconexão emite user:online/user:offline. Cache de usuários online no Redis com TTL de 30s (renovado por heartbeat do cliente a cada 15s).',
          criteria:
            'Criar task via REST → todos os clients conectados recebem task:created em < 100ms. Fechar browser → user:offline em até 30s.',
          resources: [
            {
              type: 'docs',
              title: 'Socket.io — Emit Cheatsheet',
              url: 'https://socket.io/docs/v4/emit-cheatsheet/',
              free: true,
            },
          ],
        },
        {
          id: 'taskflow_3_2',
          title: 'Consumer Kafka cross-service',
          difficulty: 'hard',
          estimatedHours: 1.5,
          description:
            'Consumir transfer.completed do payflow-api via @nestjs/microservices Kafka. Usuário recebedor online → emit notification:transfer via WebSocket. Idempotência: transferId já processados no Redis com TTL de 24h. Extrair traceId do header Kafka para correlação de logs.',
          criteria:
            'Transferência no payflow → notificação WebSocket no taskflow em tempo real. Mesmo evento processado duas vezes não gera notificação duplicada.',
          resources: [
            {
              type: 'docs',
              title: 'NestJS — Kafka Microservice',
              url: 'https://docs.nestjs.com/microservices/kafka',
              free: true,
            },
          ],
        },
      ],
    },
    {
      id: 'taskflow_phase_4',
      title: 'Fase 5 — Testes',
      tasks: [
        {
          id: 'taskflow_4_0',
          title: 'Testes unitários (Jest + jest-mock-extended)',
          difficulty: 'medium',
          estimatedHours: 2,
          description:
            'mockDeep<PrismaService>() para type-safety. Cenários obrigatórios TasksService: criar task válida, criar em projeto sem permissão (ForbiddenException), mover para status inválido, atribuir a não-membro. WebSocket Gateway: mock do Server — verificar que emit foi chamado com payload correto.',
          criteria: 'npm test passa. Zero chamadas reais a banco, Redis ou Kafka.',
          resources: [
            {
              type: 'docs',
              title: 'jest-mock-extended',
              url: 'https://github.com/marchaos/jest-mock-extended',
              free: true,
            },
          ],
        },
        {
          id: 'taskflow_4_1',
          title: 'Testes e2e com Testcontainers',
          difficulty: 'hard',
          estimatedHours: 2.5,
          description:
            'Containers: PostgreSQL, Redis, Kafka. Mock de providers OAuth com nock. Fluxo: login → criar projeto → adicionar membro → criar task → comentar → mover status → verificar histórico. Teste WebSocket: dois clientes (socket.io-client) no mesmo projeto → criar task com cliente 1 → cliente 2 recebe task:created em < 500ms.',
          criteria: 'Todos os fluxos passam com Docker. Teste WebSocket determinístico.',
          resources: [
            {
              type: 'docs',
              title: 'socket.io-client — Docs',
              url: 'https://socket.io/docs/v4/client-api/',
              free: true,
            },
            {
              type: 'docs',
              title: 'nock',
              url: 'https://github.com/nock/nock',
              free: true,
            },
          ],
        },
        {
          id: 'taskflow_4_2',
          title: 'Pact (lado consumer)',
          difficulty: 'hard',
          estimatedHours: 2,
          description:
            'Define o contrato esperado do payflow-api: POST /transfers — body com value, payerId, payeeId; response 201 com id, status: "COMPLETED", amount. GET /users/:id — response 200 com id, email, type. Gera pacts/payflow-api.json. CI publica no Pact Broker (pactflow.io free tier).',
          criteria: 'npm run test:pact gera o contrato. Contrato publicado após CI verde.',
          resources: [
            {
              type: 'docs',
              title: 'Pact JS',
              url: 'https://docs.pact.io/implementation_guides/javascript',
              free: true,
            },
          ],
        },
      ],
    },
    {
      id: 'taskflow_phase_5',
      title: 'Fase 6 — Observabilidade e CI/CD',
      tasks: [
        {
          id: 'taskflow_5_0',
          title: 'Structured logging com correlação cross-service',
          difficulty: 'medium',
          estimatedHours: 1.5,
          description:
            'winston com format.json(). Middleware extrai traceparent header das requests do payflow e popula contexto de logging. Quando consumir Kafka do payflow, extrai traceId do header da mensagem. Campos: timestamp, level, service, traceId, requestId, userId, message.',
          criteria:
            'Log de notificação Kafka tem o mesmo traceId do log original do payflow. Rastreabilidade completa cross-service.',
          resources: [
            {
              type: 'docs',
              title: 'OpenTelemetry — Propagation',
              url: 'https://opentelemetry.io/docs/concepts/context-propagation/',
              free: true,
            },
          ],
        },
        {
          id: 'taskflow_5_1',
          title: 'Métricas e CI/CD',
          difficulty: 'medium',
          estimatedHours: 2,
          description:
            'prom-client com: taskflow_tasks_created_total (counter por projeto), taskflow_websocket_connections_active (gauge), taskflow_kafka_messages_processed_total (counter por resultado). CI: lint → typecheck → test → test:e2e → test:pact → build-docker → deploy. Environments staging e production. Imagem no ghcr.io.',
          criteria: 'Grafana mostra WebSocket connections ativas. CI falha se Pact tests falharem.',
          resources: [
            {
              type: 'docs',
              title: 'prom-client',
              url: 'https://github.com/siimon/prom-client',
              free: true,
            },
          ],
        },
      ],
    },
  ],
}
