## Projetos Práticos

Três projetos de alta complexidade que formam uma progressão coerente. Cada um é portfólio independente e, juntos, demonstram maturidade técnica de nível pleno/sênior.

**Progressão:** payflow-api (Java/Spring — backend enterprise) → taskflow-api (NestJS/TS — backend moderno com real-time) → nexus-platform (os dois integrados com infraestrutura Kubernetes completa)

**Tecnologias no conjunto:** Java 21, Spring Boot 3, NestJS, TypeScript, PostgreSQL, Redis, Kafka, WebSockets (Socket.io), Docker, Kubernetes (minikube), Helm, GitHub Actions, Prometheus, Grafana, Loki, Jaeger, OpenTelemetry, Nginx Ingress, Testcontainers, Pact (contract testing), JaCoCo, Jest, Supertest, Terraform (opcional).

---

## Projeto 1 — payflow-api

**Stack:** Java 21 / Spring Boot 3 / PostgreSQL / Redis / Kafka
**Domínio:** Plataforma de pagamentos — transferências, carteiras digitais, antifraude, notificações
**Roadmaps cobertos:** Backend, Banco de Dados, DevOps, System Design
**Repositório:** `github.com/seu-usuario/payflow-api` — README em inglês

---

### Fase 1 — Fundação

**Tempo estimado:** 4–5h

#### Tarefa 1.1 — Setup e estrutura de pacotes
- **Dificuldade:** fácil | **Tempo:** 45min
- **Descrição:** Spring Initializr com: `Spring Web`, `Spring Data JPA`, `PostgreSQL Driver`, `Validation`, `Lombok`, `Spring Boot Actuator`, `Spring Boot DevTools`. Estruture em pacotes por domínio: `user/`, `wallet/`, `transfer/`, `notification/` — cada um com seu `controller`, `service`, `repository`, `dto`. `docker-compose.yml` com: `postgres:16-alpine`, `redis:7-alpine`, e a própria app. Variáveis de ambiente no `application.yml` via `${VAR:default}`. Arquivo `.env.example` commitado, `.env` no `.gitignore`.
- **Critério de conclusão:** `docker-compose up` sobe tudo sem erros.
- **Recursos:**
  - [Spring Initializr](https://start.spring.io) — ferramenta
  - [Baeldung — Spring Boot Docker Compose](https://www.baeldung.com/spring-boot-docker-compose) — artigo

#### Tarefa 1.2 — Modelagem com JPA e Flyway
- **Dificuldade:** médio | **Tempo:** 1h30
- **Descrição:** Entidades: `User` (id UUID, firstName, lastName, email único, passwordHash, type enum COMMON|MERCHANT, createdAt), `Wallet` (id UUID, userId OneToOne, balance BigDecimal — nunca Double para dinheiro), `Transfer` (id UUID, payerId, payeeId, amount BigDecimal, status enum PENDING|AUTHORIZED|COMPLETED|FAILED, createdAt, updatedAt). Flyway com migrations separadas: `V1__create_users.sql`, `V2__create_wallets.sql`, `V3__create_transfers.sql`. Índices explícitos no SQL: `idx_transfers_payer_id`, `idx_transfers_status`, `idx_users_email`. Trigger de `updated_at` no PostgreSQL para `transfers`. `ddl-auto=validate` — Spring valida sem gerar DDL.
- **Critério de conclusão:** `EXPLAIN ANALYZE SELECT * FROM transfers WHERE payer_id = $1` mostra Index Scan. Trigger de `updated_at` atualiza sem intervenção da aplicação.
- **Recursos:**
  - [Baeldung — JPA Entities](https://www.baeldung.com/jpa-entities) — artigo
  - [Flyway — Docs](https://flywaydb.org/documentation/) — docs
  - [Use The Index, Luke](https://use-the-index-luke.com/) — livro gratuito online

#### Tarefa 1.3 — Tratamento de erros padronizado (RFC 7807)
- **Dificuldade:** médio | **Tempo:** 1h
- **Descrição:** Crie exceções customizadas: `InsufficientBalanceException`, `PayerNotFoundException`, `MerchantCannotTransferException`, `TransferNotAuthorizedException`. `GlobalExceptionHandler` com `@ControllerAdvice` mapeando cada exceção para `ProblemDetail` (RFC 7807 — nativo no Spring Boot 3). Campos: `type`, `title`, `status`, `detail`, `instance` (URI da request). `server.error.include-stacktrace=never` em todos os profiles.
- **Critério de conclusão:** Qualquer exceção de domínio retorna JSON no formato RFC 7807. Stack trace nunca aparece na resposta.
- **Recursos:**
  - [Spring Boot 3 — ProblemDetail](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/http/ProblemDetail.html) — docs
  - [RFC 7807](https://www.rfc-editor.org/rfc/rfc7807) — spec

---

### Fase 2 — Autenticação e Segurança

**Tempo estimado:** 5–6h

#### Tarefa 2.1 — Spring Security + JWT com refresh token
- **Dificuldade:** difícil | **Tempo:** 2h30
- **Descrição:** `POST /auth/register` e `POST /auth/login`. `BCryptPasswordEncoder` (strength 12). JWT com `jjwt 0.12.x`: access token (15min) + refresh token (7 dias). Refresh token armazenado no Redis com TTL — permite logout real. `SecurityFilterChain` stateless com `JwtAuthenticationFilter extends OncePerRequestFilter`. `POST /auth/refresh` troca refresh token por novo access token (rotation — o token usado é invalidado). `POST /auth/logout` invalida o refresh token no Redis.
- **Critério de conclusão:** Logout invalida o token — request subsequente com o mesmo token retorna 401. Refresh token só funciona uma vez (rotation).
- **Recursos:**
  - [JJWT GitHub](https://github.com/jwtk/jjwt) — docs
  - [Amigoscode — Spring Security 6 (YouTube)](https://www.youtube.com/watch?v=KxqlJblhzfI) — vídeo gratuito

#### Tarefa 2.2 — Rate Limiting com Redis (Token Bucket)
- **Dificuldade:** difícil | **Tempo:** 2h
- **Descrição:** Implemente rate limiting com `Bucket4j` + `RedisProxyManager` (funciona com múltiplas instâncias). Limites: `/auth/login` — 5 req/min por IP (brute force); `/transfers` — 10 req/min por usuário; geral — 100 req/min por usuário autenticado. Retornar `429` com headers `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`. Implementar via `HandlerInterceptor`.
- **Critério de conclusão:** 6ª tentativa de login em 1 minuto retorna 429 com headers corretos. Limites por usuário são independentes (Redis compartilhado entre instâncias).
- **Recursos:**
  - [Bucket4j — Docs](https://bucket4j.com/) — docs
  - [Baeldung — Rate Limiting com Bucket4j](https://www.baeldung.com/spring-bucket4j) — artigo

#### Tarefa 2.3 — Headers de segurança e hardening
- **Dificuldade:** médio | **Tempo:** 1h
- **Descrição:** Headers via Spring Security: `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Strict-Transport-Security`, `Content-Security-Policy`. CORS restritivo com allowlist por variável de ambiente. Actuator: exponha apenas `/health`, `/info`, `/prometheus` — proteja com basic auth separado. `server.error.include-message=never` em produção.
- **Critério de conclusão:** [securityheaders.com](https://securityheaders.com) dá nota A. CORS bloqueia origem não autorizada com 403.
- **Recursos:**
  - [OWASP — Security Headers](https://owasp.org/www-project-secure-headers/) — referência

---

### Fase 3 — Lógica de Negócio

**Tempo estimado:** 6–7h

#### Tarefa 3.1 — Transferências com Optimistic Locking
- **Dificuldade:** difícil | **Tempo:** 2h30
- **Descrição:** `POST /transfers` com `@Transactional`. Validações em ordem: pagador existe, recebedor existe, pagador é COMMON, pagador ≠ recebedor, saldo suficiente. Use **Optimistic Locking** (`@Version` na `Wallet`) para concorrência — duas transferências simultâneas da mesma carteira resultam em `OptimisticLockException` (retornar 409). Salve a transferência passando pelos estados: `PENDING` → `AUTHORIZED` → `COMPLETED` (ou `FAILED`). Nunca pule estados.
- **Critério de conclusão:** 10 threads tentando transferir da mesma carteira — saldo nunca fica negativo. Apenas uma transferência concorrente é aprovada, as outras retornam 409.
- **Recursos:**
  - [Baeldung — Optimistic Locking JPA](https://www.baeldung.com/jpa-optimistic-locking) — artigo

#### Tarefa 3.2 — Autorizador externo com Resilience4j
- **Dificuldade:** difícil | **Tempo:** 2h
- **Descrição:** Consulte `GET https://util.devi.tools/api/v2/authorize` com `RestClient`. Adicione Resilience4j: `@CircuitBreaker` (abre após 5 falhas em 10s, half-open por 30s), `@Retry` (3 tentativas com backoff exponencial de 500ms), `@TimeLimiter` (timeout de 3s). Circuit aberto retorna 503 imediatamente sem tentar. Log de cada tentativa e resultado com nível INFO.
- **Critério de conclusão:** 5 falhas consecutivas abrem o circuit. Requests seguintes falham em < 10ms (sem timeout). Circuit fecha automaticamente após 30s.
- **Recursos:**
  - [Resilience4j — Docs](https://resilience4j.readme.io/docs) — docs
  - [Baeldung — Resilience4j](https://www.baeldung.com/resilience4j) — artigo

#### Tarefa 3.3 — Cache de saldo com Redis
- **Dificuldade:** médio | **Tempo:** 1h30
- **Descrição:** `@Cacheable(value = "walletBalance", key = "#walletId")` com TTL de 60s. `@CacheEvict` em ambas as carteiras ao finalizar transferência. `RedisCacheManager` com serialização JSON (não Java serialization). Métricas de cache hit/miss via Micrometer (`payflow.cache.wallet.hit`, `payflow.cache.wallet.miss`).
- **Critério de conclusão:** Segunda consulta não bate no banco (verificar via `spring.jpa.show-sql=true`). Cache invalidado após transferência. Métricas visíveis no `/actuator/prometheus`.
- **Recursos:**
  - [Baeldung — Spring Cache Redis](https://www.baeldung.com/spring-boot-redis-cache) — artigo

---

### Fase 4 — Kafka e Eventos Assíncronos

**Tempo estimado:** 5–6h

#### Tarefa 4.1 — Setup Kafka no docker-compose
- **Dificuldade:** médio | **Tempo:** 1h
- **Descrição:** Kafka com `confluentinc/cp-kafka:7.x` em modo KRaft (sem Zookeeper). Adicione `kafka-ui` (provectus/kafka-ui) na porta 8090. Tópicos: `transfer.completed`, `transfer.failed`, `notification.send`. Retenção de 7 dias, 1 partição em dev. Configure `spring-kafka`.
- **Critério de conclusão:** Kafka UI em localhost:8090 mostra os tópicos criados. Aplicação conecta sem erros.
- **Recursos:**
  - [Spring Kafka — Docs](https://docs.spring.io/spring-kafka/docs/current/reference/html/) — docs

#### Tarefa 4.2 — Transactional Outbox Pattern
- **Dificuldade:** difícil | **Tempo:** 2h30
- **Descrição:** Nunca publique no Kafka dentro de um `@Transactional` diretamente — se a transação fizer commit mas o Kafka falhar, o evento se perde. **Transactional Outbox**: ao completar transferência, salve o evento na tabela `outbox_events` (id, aggregateId, eventType, payload JSON, status PENDING|SENT|FAILED, createdAt) na **mesma transação** do negócio. Um `@Scheduled` job (a cada 5s) lê eventos `PENDING` e publica no Kafka, marcando como `SENT`. Use o `id` do evento como Kafka message key para idempotência no consumer.
- **Critério de conclusão:** Matar o Kafka durante uma transferência — evento fica na outbox. Kafka volta → scheduler publica. Zero eventos perdidos ou duplicados.
- **Recursos:**
  - [Microservices.io — Transactional Outbox](https://microservices.io/patterns/data/transactional-outbox.html) — pattern
  - [Baeldung — Outbox Pattern Spring](https://www.baeldung.com/spring-boot-transactional-outbox-pattern) — artigo

#### Tarefa 4.3 — Consumer com Dead Letter Topic
- **Dificuldade:** médio | **Tempo:** 1h30
- **Descrição:** `@KafkaListener` no tópico `notification.send`. Processa notificações de transferências. Configure Dead Letter Topic (DLT): 3 falhas → mensagem vai para `notification.send.DLT`. Mensagem no DLT gera log com nível ERROR. `ack-mode: manual` — offset só commitado após processamento bem-sucedido.
- **Critério de conclusão:** Mensagem malformada vai para DLT após 3 tentativas. Offset não commitado em falha — mensagem reprocessada ao reiniciar o consumer.
- **Recursos:**
  - [Spring Kafka — Error Handling](https://docs.spring.io/spring-kafka/docs/current/reference/html/#error-handling) — docs
  - [Baeldung — Kafka Dead Letter Queue](https://www.baeldung.com/spring-kafka-dead-letter-publishing) — artigo

---

### Fase 5 — Testes

**Tempo estimado:** 8–10h

#### Tarefa 5.1 — Testes unitários (JUnit 5 + Mockito)
- **Dificuldade:** médio | **Tempo:** 2h
- **Descrição:** `@ExtendWith(MockitoExtension.class)`. Cenários obrigatórios para `TransferService`: happy path, saldo insuficiente, pagador MERCHANT, pagador = recebedor, autorizador negando, autorizador timeout, circuit aberto. `verify()` garante que outbox foi chamado apenas em transferência bem-sucedida. Padrão AAA rigoroso.
- **Critério de conclusão:** Todos os cenários cobertos. Zero chamadas reais a banco, Redis ou Kafka.
- **Recursos:**
  - [Baeldung — Mockito Series](https://www.baeldung.com/mockito-series) — artigos
  - [JUnit 5 — User Guide](https://junit.org/junit5/docs/current/user-guide/) — docs

#### Tarefa 5.2 — Testes de integração (Testcontainers)
- **Dificuldade:** difícil | **Tempo:** 3h
- **Descrição:** `@SpringBootTest(webEnvironment = RANDOM_PORT)` + `@Testcontainers`. Containers: `PostgreSQLContainer`, `GenericContainer` Redis, `KafkaContainer`. `@DynamicPropertySource` sobrescreve URLs. Fluxo completo: register → login → criar dois usuários → transferir → verificar saldos no banco → verificar evento no Kafka com `KafkaTestUtils.getRecords`. Teste de concorrência: 10 threads transferindo da mesma carteira simultaneamente — saldo final sempre correto.
- **Critério de conclusão:** Testes passam com Docker. Concorrência nunca resulta em saldo negativo.
- **Recursos:**
  - [Testcontainers — Spring Boot](https://testcontainers.com/guides/testing-spring-boot-rest-api-using-testcontainers/) — docs
  - [Testcontainers — Kafka](https://java.testcontainers.org/modules/kafka/) — docs

#### Tarefa 5.3 — Contract Testing com Pact (provider)
- **Dificuldade:** difícil | **Tempo:** 2h
- **Descrição:** O `taskflow-api` vai gerar o contrato (consumer). O `payflow-api` verifica esse contrato aqui (provider). Configure `@PactVerifyProvider` que carrega o `pact.json` gerado pelo taskflow e verifica que a API real cumpre o contrato. Integre no CI: build do payflow falha se o contrato do consumer for quebrado. Isso simula um ambiente real onde mudanças breaking na API são detectadas automaticamente.
- **Critério de conclusão:** Mudar o formato de resposta sem atualizar o contrato quebra o CI. Provider verification passa com contrato atual.
- **Recursos:**
  - [Pact JVM — Docs](https://docs.pact.io/implementation_guides/jvm) — docs

#### Tarefa 5.4 — Cobertura com JaCoCo (80%)
- **Dificuldade:** fácil | **Tempo:** 30min
- **Descrição:** `jacoco-maven-plugin` com `COVEREDRATIO` mínima de 80% para `service/`. Exclua controllers, DTOs, entidades, configs. `mvn verify` falha abaixo do limite. Badge de cobertura no README via Shields.io.
- **Critério de conclusão:** `mvn verify` falha com cobertura < 80% em services. Badge atualizado a cada CI.
- **Recursos:**
  - [Baeldung — JaCoCo](https://www.baeldung.com/jacoco) — artigo

---

### Fase 6 — Observabilidade

**Tempo estimado:** 5–6h

#### Tarefa 6.1 — Structured logging com MDC
- **Dificuldade:** médio | **Tempo:** 1h30
- **Descrição:** `logstash-logback-encoder` para logs JSON. Campos: `timestamp`, `level`, `service` ("payflow-api"), `traceId`, `spanId`, `userId`, `requestId` (UUID por request), `message`. `OncePerRequestFilter` gera `requestId` e adiciona ao MDC — todos os logs da request herdam o campo. `requestId` como header de resposta `X-Request-Id`.
- **Critério de conclusão:** Todos os logs de uma transferência têm o mesmo `requestId`. `jq '.requestId'` retorna UUID nas respostas.
- **Recursos:**
  - [logstash-logback-encoder](https://github.com/logfellow/logstash-logback-encoder) — docs
  - [Baeldung — MDC](https://www.baeldung.com/mdc-in-log4j-2-logback) — artigo

#### Tarefa 6.2 — Métricas customizadas com Micrometer
- **Dificuldade:** médio | **Tempo:** 1h30
- **Descrição:** Métricas obrigatórias: `payflow.transfers.total` (counter, tags: `status=completed|failed`), `payflow.transfers.amount` (distribution summary em centavos), `payflow.auth.login.attempts` (counter, tag: `result=success|failure`), cache hit/miss da wallet. Endpoint `/actuator/prometheus`. Adicione `prometheus` e `grafana` ao docker-compose. Dashboard Grafana: req/s por endpoint, latência p50/p99, taxa de erros 5xx, transferências/min, cache hit rate.
- **Critério de conclusão:** Grafana em localhost:3001 mostra todas as métricas em tempo real. Spike visível após burst de transferências.
- **Recursos:**
  - [Micrometer — Docs](https://micrometer.io/docs) — docs
  - [Grafana — Fundamentals](https://grafana.com/tutorials/grafana-fundamentals/) — tutorial gratuito

#### Tarefa 6.3 — Distributed Tracing com OpenTelemetry + Jaeger
- **Dificuldade:** difícil | **Tempo:** 2h
- **Descrição:** `opentelemetry-javaagent.jar` via `-javaagent` no Dockerfile. Jaeger (`jaegertracing/all-in-one`) no docker-compose. Spans customizados em: `TransferService.execute()`, chamada ao autorizador, publicação no Kafka. Propague `traceId` via header `traceparent` (W3C Trace Context) para o taskflow-api usar.
- **Critério de conclusão:** Jaeger UI em localhost:16686 mostra trace completo: HTTP → DB → Redis → HTTP autorizador → Kafka. Latência de cada operação detalhada.
- **Recursos:**
  - [OpenTelemetry — Java Agent](https://opentelemetry.io/docs/zero-code/java/agent/) — docs
  - [Jaeger — Getting Started](https://www.jaegertracing.io/docs/getting-started/) — docs

---

### Fase 7 — CI/CD e Deploy

**Tempo estimado:** 4–5h

#### Tarefa 7.1 — Dockerfile multi-stage otimizado
- **Dificuldade:** médio | **Tempo:** 1h
- **Descrição:** Stage `deps`: copie `pom.xml` e baixe dependências (camada cacheável). Stage `build`: copie source e rode `mvn package -DskipTests`. Stage `runtime`: `eclipse-temurin:21-jre-alpine`. JVM flags para containers: `-XX:+UseContainerSupport -XX:MaxRAMPercentage=75.0`. Usuário não-root: `addgroup app && adduser -S app -G app`. Imagem final < 200MB. `.dockerignore` excluindo `target/`, `.git/`.
- **Critério de conclusão:** Rebuild sem mudar `pom.xml` usa cache (3x mais rápido). Container não roda como root. Imagem < 200MB.
- **Recursos:**
  - [Docker — Multi-stage Builds](https://docs.docker.com/build/building/multi-stage/) — docs

#### Tarefa 7.2 — GitHub Actions com múltiplos environments
- **Dificuldade:** difícil | **Tempo:** 2h30
- **Descrição:** Pipeline com 4 jobs: `test` (Testcontainers — Docker no runner) → `build-docker` → `deploy-staging` → `deploy-production` (requer aprovação manual). Environments `staging` e `production` configurados no GitHub com secrets separados. Imagem publicada no ghcr.io com tags `sha-{commit}` e `latest`. Cache Maven com hash do `pom.xml`. `deploy-staging` dispara automaticamente em push na main. Badge de CI no README.
- **Critério de conclusão:** Merge na main → deploy automático em staging. Production exige aprovação. Imagem no ghcr.io com tag do commit.
- **Recursos:**
  - [GitHub Actions — Environments](https://docs.github.com/en/actions/deployment/targeting-different-environments/using-environments-for-deployment) — docs
  - [GitHub — Container Registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry) — docs

---