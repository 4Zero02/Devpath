import type { Project } from '../../types'

// Dados estáticos do projeto payflow-api — nunca buscar do banco
export const payflowProject: Project = {
  id: 'payflow',
  title: 'payflow-api',
  description:
    'Plataforma de pagamentos com Java/Spring Boot. Transferências, carteiras digitais, antifraude e notificações — com segurança, mensageria e observabilidade de nível produção.',
  stack: 'Java 21 · Spring Boot 3 · PostgreSQL · Redis · Kafka',
  domain: 'Pagamentos — transferências, carteiras digitais, antifraude, notificações',
  phases: [
    {
      id: 'payflow_phase_0',
      title: 'Fase 1 — Fundação',
      tasks: [
        {
          id: 'payflow_0_0',
          title: 'Setup e estrutura de pacotes',
          difficulty: 'easy',
          estimatedHours: 1,
          description:
            'Spring Initializr com Spring Web, Spring Data JPA, PostgreSQL Driver, Validation, Lombok, Actuator e DevTools. Estrutura em pacotes por domínio: user/, wallet/, transfer/, notification/. docker-compose.yml com postgres:16-alpine, redis:7-alpine e a app. Variáveis via ${VAR:default} no application.yml.',
          criteria: 'docker-compose up sobe tudo sem erros.',
          resources: [
            {
              type: 'article',
              title: 'Baeldung — Spring Boot Docker Compose',
              url: 'https://www.baeldung.com/spring-boot-docker-compose',
              free: true,
            },
          ],
        },
        {
          id: 'payflow_0_1',
          title: 'Modelagem com JPA e Flyway',
          difficulty: 'medium',
          estimatedHours: 1.5,
          description:
            'Entidades User (UUID, enum COMMON|MERCHANT), Wallet (balance BigDecimal — nunca Double para dinheiro), Transfer (status enum PENDING|AUTHORIZED|COMPLETED|FAILED). Migrations Flyway separadas: V1__create_users, V2__create_wallets, V3__create_transfers. Índices explícitos no SQL. Trigger de updated_at no PostgreSQL. ddl-auto=validate.',
          criteria:
            'EXPLAIN ANALYZE em transfers mostra Index Scan. Trigger de updated_at atualiza sem intervenção da aplicação.',
          resources: [
            {
              type: 'article',
              title: 'Baeldung — JPA Entities',
              url: 'https://www.baeldung.com/jpa-entities',
              free: true,
            },
            {
              type: 'docs',
              title: 'Flyway — Docs',
              url: 'https://flywaydb.org/documentation/',
              free: true,
            },
            {
              type: 'article',
              title: 'Use The Index, Luke',
              url: 'https://use-the-index-luke.com/',
              free: true,
            },
          ],
        },
        {
          id: 'payflow_0_2',
          title: 'Tratamento de erros padronizado (RFC 7807)',
          difficulty: 'medium',
          estimatedHours: 1,
          description:
            'Exceções customizadas: InsufficientBalanceException, PayerNotFoundException, MerchantCannotTransferException, TransferNotAuthorizedException. GlobalExceptionHandler com @ControllerAdvice mapeando para ProblemDetail (RFC 7807 — nativo no Spring Boot 3). server.error.include-stacktrace=never em todos os profiles.',
          criteria: 'Qualquer exceção de domínio retorna JSON no formato RFC 7807. Stack trace nunca aparece na resposta.',
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
          ],
        },
      ],
    },
    {
      id: 'payflow_phase_1',
      title: 'Fase 2 — Autenticação e Segurança',
      tasks: [
        {
          id: 'payflow_1_0',
          title: 'Spring Security + JWT com refresh token',
          difficulty: 'hard',
          estimatedHours: 2.5,
          description:
            'POST /auth/register e /auth/login. BCryptPasswordEncoder (strength 12). JWT com jjwt 0.12.x: access token (15min) + refresh token (7 dias) no Redis. SecurityFilterChain stateless com JwtAuthenticationFilter extends OncePerRequestFilter. POST /auth/refresh com token rotation — token usado é invalidado. POST /auth/logout invalida o refresh token no Redis.',
          criteria:
            'Logout invalida o token — request subsequente retorna 401. Refresh token só funciona uma vez (rotation).',
          resources: [
            {
              type: 'docs',
              title: 'JJWT GitHub',
              url: 'https://github.com/jwtk/jjwt',
              free: true,
            },
            {
              type: 'video',
              title: 'Amigoscode — Spring Security 6 (YouTube)',
              url: 'https://www.youtube.com/watch?v=KxqlJblhzfI',
              free: true,
            },
          ],
        },
        {
          id: 'payflow_1_1',
          title: 'Rate Limiting com Redis (Token Bucket)',
          difficulty: 'hard',
          estimatedHours: 2,
          description:
            'Bucket4j + RedisProxyManager (funciona com múltiplas instâncias). Limites: /auth/login — 5 req/min por IP; /transfers — 10 req/min por usuário; geral — 100 req/min. Retornar 429 com headers X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset. Implementar via HandlerInterceptor.',
          criteria:
            '6ª tentativa de login em 1 minuto retorna 429 com headers corretos. Limites por usuário são independentes (Redis compartilhado entre instâncias).',
          resources: [
            {
              type: 'docs',
              title: 'Bucket4j — Docs',
              url: 'https://bucket4j.com/',
              free: true,
            },
            {
              type: 'article',
              title: 'Baeldung — Rate Limiting com Bucket4j',
              url: 'https://www.baeldung.com/spring-bucket4j',
              free: true,
            },
          ],
        },
        {
          id: 'payflow_1_2',
          title: 'Headers de segurança e hardening',
          difficulty: 'medium',
          estimatedHours: 1,
          description:
            'Headers via Spring Security: X-Content-Type-Options: nosniff, X-Frame-Options: DENY, Strict-Transport-Security, Content-Security-Policy. CORS restritivo com allowlist por variável de ambiente. Actuator: exponha apenas /health, /info, /prometheus — proteja com basic auth separado. server.error.include-message=never em produção.',
          criteria: 'securityheaders.com dá nota A. CORS bloqueia origem não autorizada com 403.',
          resources: [
            {
              type: 'article',
              title: 'OWASP — Security Headers',
              url: 'https://owasp.org/www-project-secure-headers/',
              free: true,
            },
          ],
        },
      ],
    },
    {
      id: 'payflow_phase_2',
      title: 'Fase 3 — Lógica de Negócio',
      tasks: [
        {
          id: 'payflow_2_0',
          title: 'Transferências com Optimistic Locking',
          difficulty: 'hard',
          estimatedHours: 2.5,
          description:
            'POST /transfers com @Transactional. Validações em ordem: pagador existe, recebedor existe, pagador é COMMON, pagador ≠ recebedor, saldo suficiente. Optimistic Locking (@Version na Wallet) — duas transferências simultâneas da mesma carteira resultam em OptimisticLockException (409). Estados: PENDING → AUTHORIZED → COMPLETED (ou FAILED).',
          criteria:
            '10 threads tentando transferir da mesma carteira — saldo nunca fica negativo. Apenas uma transferência concorrente é aprovada, as outras retornam 409.',
          resources: [
            {
              type: 'article',
              title: 'Baeldung — Optimistic Locking JPA',
              url: 'https://www.baeldung.com/jpa-optimistic-locking',
              free: true,
            },
          ],
        },
        {
          id: 'payflow_2_1',
          title: 'Autorizador externo com Resilience4j',
          difficulty: 'hard',
          estimatedHours: 2,
          description:
            'Consultar GET https://util.devi.tools/api/v2/authorize com RestClient. Resilience4j: @CircuitBreaker (abre após 5 falhas em 10s, half-open por 30s), @Retry (3 tentativas com backoff exponencial de 500ms), @TimeLimiter (timeout de 3s). Circuit aberto retorna 503 imediatamente sem tentar. Log de cada tentativa com nível INFO.',
          criteria:
            '5 falhas consecutivas abrem o circuit. Requests seguintes falham em < 10ms (sem timeout). Circuit fecha automaticamente após 30s.',
          resources: [
            {
              type: 'docs',
              title: 'Resilience4j — Docs',
              url: 'https://resilience4j.readme.io/docs',
              free: true,
            },
            {
              type: 'article',
              title: 'Baeldung — Resilience4j',
              url: 'https://www.baeldung.com/resilience4j',
              free: true,
            },
          ],
        },
        {
          id: 'payflow_2_2',
          title: 'Cache de saldo com Redis',
          difficulty: 'medium',
          estimatedHours: 1.5,
          description:
            '@Cacheable(value = "walletBalance", key = "#walletId") com TTL de 60s. @CacheEvict em ambas as carteiras ao finalizar transferência. RedisCacheManager com serialização JSON (não Java serialization). Métricas de cache hit/miss via Micrometer (payflow.cache.wallet.hit, payflow.cache.wallet.miss).',
          criteria:
            'Segunda consulta não bate no banco (verificar via spring.jpa.show-sql=true). Cache invalidado após transferência. Métricas visíveis em /actuator/prometheus.',
          resources: [
            {
              type: 'article',
              title: 'Baeldung — Spring Cache Redis',
              url: 'https://www.baeldung.com/spring-boot-redis-cache',
              free: true,
            },
          ],
        },
      ],
    },
    {
      id: 'payflow_phase_3',
      title: 'Fase 4 — Kafka e Eventos Assíncronos',
      tasks: [
        {
          id: 'payflow_3_0',
          title: 'Setup Kafka no docker-compose',
          difficulty: 'medium',
          estimatedHours: 1,
          description:
            'Kafka com confluentinc/cp-kafka:7.x em modo KRaft (sem Zookeeper). kafka-ui (provectus/kafka-ui) na porta 8090. Tópicos: transfer.completed, transfer.failed, notification.send. Retenção de 7 dias, 1 partição em dev. Configurar spring-kafka.',
          criteria: 'Kafka UI em localhost:8090 mostra os tópicos criados. Aplicação conecta sem erros.',
          resources: [
            {
              type: 'docs',
              title: 'Spring Kafka — Docs',
              url: 'https://docs.spring.io/spring-kafka/docs/current/reference/html/',
              free: true,
            },
          ],
        },
        {
          id: 'payflow_3_1',
          title: 'Transactional Outbox Pattern',
          difficulty: 'hard',
          estimatedHours: 2.5,
          description:
            'Nunca publicar no Kafka dentro de @Transactional diretamente. Ao completar transferência, salvar evento na tabela outbox_events (id, aggregateId, eventType, payload JSON, status PENDING|SENT|FAILED) na mesma transação do negócio. @Scheduled job (a cada 5s) lê eventos PENDING e publica, marcando como SENT. ID do evento como Kafka message key para idempotência.',
          criteria:
            'Matar o Kafka durante uma transferência — evento fica na outbox. Kafka volta → scheduler publica. Zero eventos perdidos ou duplicados.',
          resources: [
            {
              type: 'article',
              title: 'Microservices.io — Transactional Outbox',
              url: 'https://microservices.io/patterns/data/transactional-outbox.html',
              free: true,
            },
            {
              type: 'article',
              title: 'Baeldung — Outbox Pattern Spring',
              url: 'https://www.baeldung.com/spring-boot-transactional-outbox-pattern',
              free: true,
            },
          ],
        },
        {
          id: 'payflow_3_2',
          title: 'Consumer com Dead Letter Topic',
          difficulty: 'medium',
          estimatedHours: 1.5,
          description:
            '@KafkaListener no tópico notification.send. Dead Letter Topic: 3 falhas → mensagem vai para notification.send.DLT. Mensagem no DLT gera log ERROR. ack-mode: manual — offset só commitado após processamento bem-sucedido.',
          criteria:
            'Mensagem malformada vai para DLT após 3 tentativas. Offset não commitado em falha — mensagem reprocessada ao reiniciar o consumer.',
          resources: [
            {
              type: 'docs',
              title: 'Spring Kafka — Error Handling',
              url: 'https://docs.spring.io/spring-kafka/docs/current/reference/html/#error-handling',
              free: true,
            },
            {
              type: 'article',
              title: 'Baeldung — Kafka Dead Letter Queue',
              url: 'https://www.baeldung.com/spring-kafka-dead-letter-publishing',
              free: true,
            },
          ],
        },
      ],
    },
    {
      id: 'payflow_phase_4',
      title: 'Fase 5 — Testes',
      tasks: [
        {
          id: 'payflow_4_0',
          title: 'Testes unitários (JUnit 5 + Mockito)',
          difficulty: 'medium',
          estimatedHours: 2,
          description:
            '@ExtendWith(MockitoExtension.class). Cenários para TransferService: happy path, saldo insuficiente, pagador MERCHANT, pagador = recebedor, autorizador negando, autorizador timeout, circuit aberto. verify() garante que outbox foi chamado apenas em transferência bem-sucedida. Padrão AAA rigoroso.',
          criteria: 'Todos os cenários cobertos. Zero chamadas reais a banco, Redis ou Kafka.',
          resources: [
            {
              type: 'article',
              title: 'Baeldung — Mockito Series',
              url: 'https://www.baeldung.com/mockito-series',
              free: true,
            },
            {
              type: 'docs',
              title: 'JUnit 5 — User Guide',
              url: 'https://junit.org/junit5/docs/current/user-guide/',
              free: true,
            },
          ],
        },
        {
          id: 'payflow_4_1',
          title: 'Testes de integração (Testcontainers)',
          difficulty: 'hard',
          estimatedHours: 3,
          description:
            '@SpringBootTest(webEnvironment = RANDOM_PORT) + @Testcontainers. Containers: PostgreSQLContainer, GenericContainer Redis, KafkaContainer. @DynamicPropertySource sobrescreve URLs. Fluxo completo: register → login → criar dois usuários → transferir → verificar saldos no banco → verificar evento no Kafka. Teste de concorrência: 10 threads simultâneas.',
          criteria: 'Testes passam com Docker. Concorrência nunca resulta em saldo negativo.',
          resources: [
            {
              type: 'docs',
              title: 'Testcontainers — Spring Boot',
              url: 'https://testcontainers.com/guides/testing-spring-boot-rest-api-using-testcontainers/',
              free: true,
            },
            {
              type: 'docs',
              title: 'Testcontainers — Kafka',
              url: 'https://java.testcontainers.org/modules/kafka/',
              free: true,
            },
          ],
        },
        {
          id: 'payflow_4_2',
          title: 'Contract Testing com Pact (provider)',
          difficulty: 'hard',
          estimatedHours: 2,
          description:
            'O taskflow-api gera o contrato (consumer). O payflow-api verifica aqui (provider). @PactVerifyProvider carrega o pact.json gerado pelo taskflow e verifica que a API real cumpre o contrato. CI falha se o contrato do consumer for quebrado.',
          criteria:
            'Mudar o formato de resposta sem atualizar o contrato quebra o CI. Provider verification passa com contrato atual.',
          resources: [
            {
              type: 'docs',
              title: 'Pact JVM — Docs',
              url: 'https://docs.pact.io/implementation_guides/jvm',
              free: true,
            },
          ],
        },
        {
          id: 'payflow_4_3',
          title: 'Cobertura com JaCoCo (80%)',
          difficulty: 'easy',
          estimatedHours: 0.5,
          description:
            'jacoco-maven-plugin com COVEREDRATIO mínima de 80% para service/. Excluir controllers, DTOs, entidades e configs. mvn verify falha abaixo do limite. Badge de cobertura no README via Shields.io.',
          criteria: 'mvn verify falha com cobertura < 80% em services. Badge atualizado a cada CI.',
          resources: [
            {
              type: 'article',
              title: 'Baeldung — JaCoCo',
              url: 'https://www.baeldung.com/jacoco',
              free: true,
            },
          ],
        },
      ],
    },
    {
      id: 'payflow_phase_5',
      title: 'Fase 6 — Observabilidade',
      tasks: [
        {
          id: 'payflow_5_0',
          title: 'Structured logging com MDC',
          difficulty: 'medium',
          estimatedHours: 1.5,
          description:
            'logstash-logback-encoder para logs JSON. Campos: timestamp, level, service ("payflow-api"), traceId, spanId, userId, requestId (UUID por request). OncePerRequestFilter gera requestId e adiciona ao MDC — todos os logs da request herdam o campo. requestId como header de resposta X-Request-Id.',
          criteria:
            'Todos os logs de uma transferência têm o mesmo requestId. jq \'.requestId\' retorna UUID nas respostas.',
          resources: [
            {
              type: 'docs',
              title: 'logstash-logback-encoder',
              url: 'https://github.com/logfellow/logstash-logback-encoder',
              free: true,
            },
            {
              type: 'article',
              title: 'Baeldung — MDC',
              url: 'https://www.baeldung.com/mdc-in-log4j-2-logback',
              free: true,
            },
          ],
        },
        {
          id: 'payflow_5_1',
          title: 'Métricas customizadas com Micrometer',
          difficulty: 'medium',
          estimatedHours: 1.5,
          description:
            'Métricas: payflow.transfers.total (counter, tags: status=completed|failed), payflow.transfers.amount (distribution summary em centavos), payflow.auth.login.attempts (counter, tag: result=success|failure), cache hit/miss. Endpoint /actuator/prometheus. Prometheus + Grafana no docker-compose. Dashboard: req/s, latência p50/p99, erros 5xx, transferências/min, cache hit rate.',
          criteria:
            'Grafana em localhost:3001 mostra todas as métricas em tempo real. Spike visível após burst de transferências.',
          resources: [
            {
              type: 'docs',
              title: 'Micrometer — Docs',
              url: 'https://micrometer.io/docs',
              free: true,
            },
            {
              type: 'article',
              title: 'Grafana — Fundamentals',
              url: 'https://grafana.com/tutorials/grafana-fundamentals/',
              free: true,
            },
          ],
        },
        {
          id: 'payflow_5_2',
          title: 'Distributed Tracing com OpenTelemetry + Jaeger',
          difficulty: 'hard',
          estimatedHours: 2,
          description:
            'opentelemetry-javaagent.jar via -javaagent no Dockerfile. Jaeger (jaegertracing/all-in-one) no docker-compose. Spans customizados em TransferService.execute(), chamada ao autorizador, publicação no Kafka. Propagação do traceId via header traceparent (W3C Trace Context) para o taskflow-api.',
          criteria:
            'Jaeger UI em localhost:16686 mostra trace completo: HTTP → DB → Redis → HTTP autorizador → Kafka. Latência de cada operação detalhada.',
          resources: [
            {
              type: 'docs',
              title: 'OpenTelemetry — Java Agent',
              url: 'https://opentelemetry.io/docs/zero-code/java/agent/',
              free: true,
            },
            {
              type: 'docs',
              title: 'Jaeger — Getting Started',
              url: 'https://www.jaegertracing.io/docs/getting-started/',
              free: true,
            },
          ],
        },
      ],
    },
    {
      id: 'payflow_phase_6',
      title: 'Fase 7 — CI/CD e Deploy',
      tasks: [
        {
          id: 'payflow_6_0',
          title: 'Dockerfile multi-stage otimizado',
          difficulty: 'medium',
          estimatedHours: 1,
          description:
            'Stage deps: copiar pom.xml e baixar dependências (camada cacheável). Stage build: copiar source e rodar mvn package -DskipTests. Stage runtime: eclipse-temurin:21-jre-alpine. JVM flags: -XX:+UseContainerSupport -XX:MaxRAMPercentage=75.0. Usuário não-root. .dockerignore excluindo target/, .git/. Imagem final < 200MB.',
          criteria: 'Rebuild sem mudar pom.xml usa cache (3x mais rápido). Container não roda como root. Imagem < 200MB.',
          resources: [
            {
              type: 'docs',
              title: 'Docker — Multi-stage Builds',
              url: 'https://docs.docker.com/build/building/multi-stage/',
              free: true,
            },
          ],
        },
        {
          id: 'payflow_6_1',
          title: 'GitHub Actions com múltiplos environments',
          difficulty: 'hard',
          estimatedHours: 2.5,
          description:
            'Pipeline com 4 jobs: test (Testcontainers — Docker no runner) → build-docker → deploy-staging → deploy-production (requer aprovação manual). Environments staging e production com secrets separados. Imagem no ghcr.io com tags sha-{commit} e latest. Cache Maven com hash do pom.xml. Badge de CI no README.',
          criteria:
            'Merge na main → deploy automático em staging. Production exige aprovação. Imagem no ghcr.io com tag do commit.',
          resources: [
            {
              type: 'docs',
              title: 'GitHub Actions — Environments',
              url: 'https://docs.github.com/en/actions/deployment/targeting-different-environments/using-environments-for-deployment',
              free: true,
            },
            {
              type: 'docs',
              title: 'GitHub — Container Registry',
              url: 'https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry',
              free: true,
            },
          ],
        },
      ],
    },
  ],
}
