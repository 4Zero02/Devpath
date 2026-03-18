## Projeto 3 — nexus-platform

**Stack:** Kubernetes (minikube) / Helm / Nginx Ingress / Prometheus + Grafana + Loki + Jaeger / GitOps
**Domínio:** Infraestrutura de produção orquestrando payflow-api e taskflow-api
**Roadmaps cobertos:** DevOps, System Design
**Pré-requisito:** Projetos 1 e 2 com imagens publicadas no ghcr.io

---

### Fase 1 — Kubernetes Local

**Tempo estimado:** 6–8h

#### Tarefa 1.1 — Cluster minikube e primeiros manifests
- **Dificuldade:** médio | **Tempo:** 2h
- **Descrição:** `minikube start --cpus=4 --memory=8g`. Namespaces: `apps`, `infra`, `observability`. Manifests para `payflow-api`: `Deployment` (2 replicas, `RollingUpdate` com `maxSurge: 1, maxUnavailable: 0`), `Service` (ClusterIP), `ConfigMap`, `Secret`. Liveness probe: `/actuator/health/liveness`. Readiness probe: `/actuator/health/readiness`. Resource limits obrigatórios: `requests: { cpu: 250m, memory: 512Mi }`, `limits: { cpu: 500m, memory: 1Gi }`.
- **Critério de conclusão:** 2 replicas rodando. Matar um pod → Kubernetes recria. `kubectl rollout status` retorna "successfully rolled out".
- **Recursos:**
  - [Kubernetes — Deployments](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/) — docs
  - [minikube — Getting Started](https://minikube.sigs.k8s.io/docs/start/) — docs

#### Tarefa 1.2 — Helm charts para os dois serviços
- **Dificuldade:** difícil | **Tempo:** 3h
- **Descrição:** Helm charts para `payflow-api` e `taskflow-api`. `values.yaml` base + `values-staging.yaml` + `values-production.yaml`. Templates: `deployment.yaml`, `service.yaml`, `configmap.yaml`, `hpa.yaml` (HPA: 2→10 replicas com CPU > 70%). `helm upgrade --install payflow-api ./charts/payflow-api -f values-staging.yaml`.
- **Critério de conclusão:** `helm lint` passa. `helm diff upgrade` mostra mudanças antes de aplicar. HPA escala replicas sob carga simulada.
- **Recursos:**
  - [Helm — Getting Started](https://helm.sh/docs/chart_template_guide/getting_started/) — docs
  - [Helm Diff Plugin](https://github.com/databus23/helm-diff) — plugin

#### Tarefa 1.3 — Nginx Ingress + cert-manager
- **Dificuldade:** difícil | **Tempo:** 2h
- **Descrição:** `ingress-nginx` via Helm. Ingress: `api.payflow.local/` → payflow-api, `api.taskflow.local/` → taskflow-api. `/etc/hosts` apontando para IP do minikube. TLS com certificado self-signed via `cert-manager`. Annotations: rate limiting (`limit-rps: "100"`), timeout (`proxy-read-timeout: "30"`).
- **Critério de conclusão:** `curl https://api.payflow.local/actuator/health -k` retorna 200. Rate limiting do Ingress independente do da aplicação.
- **Recursos:**
  - [Nginx Ingress — Installation](https://kubernetes.github.io/ingress-nginx/deploy/) — docs
  - [cert-manager — Docs](https://cert-manager.io/docs/) — docs

---

### Fase 2 — Infraestrutura de Dados no Kubernetes

**Tempo estimado:** 5–6h

#### Tarefa 2.1 — PostgreSQL e Redis em alta disponibilidade
- **Dificuldade:** difícil | **Tempo:** 2h30
- **Descrição:** PostgreSQL via Helm (`bitnami/postgresql`) com `StatefulSet`, `PersistentVolumeClaim` de 10Gi, 1 primário + 1 replica read-only. Configure payflow para usar replica em reads. Redis via Helm (`bitnami/redis`) com modo Sentinel (1 master + 2 replicas). Secrets via `kubectl create secret generic` — nunca commitar valores.
- **Critério de conclusão:** Matar pod primário do Redis → Sentinel promove replica em < 30s sem downtime da aplicação.
- **Recursos:**
  - [Bitnami — PostgreSQL Helm](https://github.com/bitnami/charts/tree/main/bitnami/postgresql) — docs
  - [Redis — Sentinel](https://redis.io/docs/management/sentinel/) — docs

#### Tarefa 2.2 — Kafka em cluster no Kubernetes
- **Dificuldade:** difícil | **Tempo:** 2h30
- **Descrição:** Kafka via Helm (`bitnami/kafka`) com KRaft, 3 brokers, retenção de 7 dias. Tópicos criados via Kubernetes `Job` executado no boot. Kafka UI via Helm no namespace `infra`. Serviços apontam para `kafka.infra.svc.cluster.local:9092`.
- **Critério de conclusão:** 3 brokers como StatefulSet. Matar 1 broker → aplicações continuam sem erros. Kafka UI acessível via port-forward.
- **Recursos:**
  - [Bitnami — Kafka Helm](https://github.com/bitnami/charts/tree/main/bitnami/kafka) — docs

---

### Fase 3 — Observabilidade Completa

**Tempo estimado:** 8–10h

#### Tarefa 3.1 — kube-prometheus-stack + dashboards
- **Dificuldade:** médio | **Tempo:** 2h
- **Descrição:** `kube-prometheus-stack` via Helm (Prometheus + Grafana + AlertManager + exporters do cluster). `ServiceMonitor` para scrape automático do payflow e taskflow. Dashboards obrigatórios: (1) visão geral do cluster (CPU, memória, rede por pod), (2) payflow (req/s, latência p99, erros, transferências/min), (3) taskflow (req/s, WebSockets ativos, Kafka lag), (4) Kafka (messages in/out, consumer lag). Alertas: 5xx > 1% por 5min → alerta. Kafka consumer lag > 1000 → alerta.
- **Critério de conclusão:** Todos os dashboards funcionando. Alerta disparado quando simulado erro em cascata.
- **Recursos:**
  - [kube-prometheus-stack](https://github.com/prometheus-community/helm-charts/tree/main/charts/kube-prometheus-stack) — Helm chart

#### Tarefa 3.2 — Loki para agregação de logs
- **Dificuldade:** médio | **Tempo:** 2h
- **Descrição:** `loki-stack` via Helm (Loki + Promtail). Promtail coleta logs de todos containers automaticamente. Loki como datasource no Grafana. Queries LogQL obrigatórias: (1) todos os logs ERROR do payflow, (2) logs por `requestId`, (3) logs cross-service por `traceId`. Dashboard com painel de logs ao lado de métricas — selecione spike de erros e veja logs correspondentes.
- **Critério de conclusão:** `{app="payflow-api"} |= "ERROR"` retorna logs. Busca por `traceId` mostra logs dos dois serviços.
- **Recursos:**
  - [Loki — Getting Started](https://grafana.com/docs/loki/latest/get-started/) — docs
  - [LogQL](https://grafana.com/docs/loki/latest/query/) — docs

#### Tarefa 3.3 — Jaeger com tracing cross-service
- **Dificuldade:** difícil | **Tempo:** 3h
- **Descrição:** Jaeger via Helm. Ambos os serviços exportam via OTLP para `jaeger-collector.observability.svc:4318`. Trace de transferência cruza os dois serviços: payflow (HTTP → DB → Redis → Kafka) → taskflow (Kafka → WebSocket). Sampling: 100% staging, 10% produção (via variável de ambiente). Link do Grafana para Jaeger por `traceId`.
- **Critério de conclusão:** Trace completo cross-service no Jaeger. Latência de cada operação detalhada. Link Grafana → Jaeger funciona.
- **Recursos:**
  - [Jaeger — Kubernetes](https://www.jaegertracing.io/docs/latest/kubernetes/) — docs

---

### Fase 4 — GitOps e Deploy Automatizado

**Tempo estimado:** 6–8h

#### Tarefa 4.1 — Repositório GitOps
- **Dificuldade:** difícil | **Tempo:** 3h
- **Descrição:** Crie `nexus-gitops` com Helm values por environment: `environments/staging/payflow/values.yaml`, `environments/production/payflow/values.yaml`, etc. CI do payflow (push na main) atualiza `image.tag` no `nexus-gitops` via commit automático → deploy staging automático. Deploy production via PR com aprovação manual no `nexus-gitops`.
- **Critério de conclusão:** Push no payflow → staging atualiza automaticamente. Production requer PR aprovado.
- **Recursos:**
  - [GitOps — Principles](https://opengitops.dev/) — spec
  - [ArgoCD — Getting Started](https://argo-cd.readthedocs.io/en/stable/getting_started/) — docs (opcional)

#### Tarefa 4.2 — Rollback automático com smoke tests
- **Dificuldade:** difícil | **Tempo:** 2h30
- **Descrição:** Após `helm upgrade`, execute smoke tests: `kubectl rollout status`, health check, teste de integração básico. Se qualquer teste falhar em 5 minutos → `helm rollback` automático. Notificação do resultado como comentário no PR via GitHub API. Badge de deploy no README com versão atual em staging e produção.
- **Critério de conclusão:** Deploy com imagem quebrada → rollback automático em < 3 minutos. Comentário no PR com resultado.
- **Recursos:**
  - [Helm — Rollback](https://helm.sh/docs/helm/helm_rollback/) — docs

#### Tarefa 4.3 — Terraform para infraestrutura cloud (opcional, avançado)
- **Dificuldade:** difícil | **Tempo:** 3h
- **Descrição:** Provisione infraestrutura com Terraform. Recursos: banco de dados (RDS ou Supabase), cache (ElastiCache ou Upstash Redis), variáveis exportadas como outputs. `terraform.tfvars` no `.gitignore`. Secrets via variáveis de ambiente no CI (`TF_VAR_*`). `terraform plan` em PRs (sem aplicar). `terraform apply` automático no merge para staging.
- **Critério de conclusão:** `terraform plan` mostra zero diff após infra estável. `terraform destroy && terraform apply` recria tudo sem intervenção.
- **Recursos:**
  - [Terraform — Getting Started](https://developer.hashicorp.com/terraform/tutorials) — docs
  - [Terraform Best Practices](https://www.terraform-best-practices.com/) — livro gratuito