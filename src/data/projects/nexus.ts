import type { Project } from '../../types'

// Dados estáticos do projeto nexus-platform — nunca buscar do banco
export const nexusProject: Project = {
  id: 'nexus',
  title: 'nexus-platform',
  description:
    'Infraestrutura de produção orquestrando payflow-api e taskflow-api em Kubernetes. Helm, GitOps, observabilidade completa com Prometheus + Grafana + Loki + Jaeger.',
  stack: 'Kubernetes (minikube) · Helm · Nginx Ingress · Prometheus · Grafana · Loki · Jaeger',
  domain: 'Infraestrutura — orquestração dos dois projetos com observabilidade completa',
  phases: [
    {
      id: 'nexus_phase_0',
      title: 'Fase 1 — Kubernetes Local',
      tasks: [
        {
          id: 'nexus_0_0',
          title: 'Cluster minikube e primeiros manifests',
          difficulty: 'medium',
          estimatedHours: 2,
          description:
            'minikube start --cpus=4 --memory=8g. Namespaces: apps, infra, observability. Manifests para payflow-api: Deployment (2 replicas, RollingUpdate com maxSurge: 1, maxUnavailable: 0), Service (ClusterIP), ConfigMap, Secret. Liveness probe: /actuator/health/liveness. Readiness probe: /actuator/health/readiness. Resource limits obrigatórios.',
          criteria:
            '2 replicas rodando. Matar um pod → Kubernetes recria. kubectl rollout status retorna "successfully rolled out".',
          resources: [
            {
              type: 'docs',
              title: 'Kubernetes — Deployments',
              url: 'https://kubernetes.io/docs/concepts/workloads/controllers/deployment/',
              free: true,
            },
            {
              type: 'docs',
              title: 'minikube — Getting Started',
              url: 'https://minikube.sigs.k8s.io/docs/start/',
              free: true,
            },
          ],
        },
        {
          id: 'nexus_0_1',
          title: 'Helm charts para os dois serviços',
          difficulty: 'hard',
          estimatedHours: 3,
          description:
            'Helm charts para payflow-api e taskflow-api. values.yaml base + values-staging.yaml + values-production.yaml. Templates: deployment.yaml, service.yaml, configmap.yaml, hpa.yaml (HPA: 2→10 replicas com CPU > 70%). helm upgrade --install payflow-api ./charts/payflow-api -f values-staging.yaml.',
          criteria:
            'helm lint passa. helm diff upgrade mostra mudanças antes de aplicar. HPA escala replicas sob carga simulada.',
          resources: [
            {
              type: 'docs',
              title: 'Helm — Getting Started',
              url: 'https://helm.sh/docs/chart_template_guide/getting_started/',
              free: true,
            },
          ],
        },
        {
          id: 'nexus_0_2',
          title: 'Nginx Ingress + cert-manager',
          difficulty: 'hard',
          estimatedHours: 2,
          description:
            'ingress-nginx via Helm. Ingress: api.payflow.local/ → payflow-api, api.taskflow.local/ → taskflow-api. /etc/hosts apontando para IP do minikube. TLS com certificado self-signed via cert-manager. Annotations: rate limiting (limit-rps: "100"), timeout (proxy-read-timeout: "30").',
          criteria:
            'curl https://api.payflow.local/actuator/health -k retorna 200. Rate limiting do Ingress independente do da aplicação.',
          resources: [
            {
              type: 'docs',
              title: 'Nginx Ingress — Installation',
              url: 'https://kubernetes.github.io/ingress-nginx/deploy/',
              free: true,
            },
            {
              type: 'docs',
              title: 'cert-manager — Docs',
              url: 'https://cert-manager.io/docs/',
              free: true,
            },
          ],
        },
      ],
    },
    {
      id: 'nexus_phase_1',
      title: 'Fase 2 — Infraestrutura de Dados',
      tasks: [
        {
          id: 'nexus_1_0',
          title: 'PostgreSQL e Redis em alta disponibilidade',
          difficulty: 'hard',
          estimatedHours: 2.5,
          description:
            'PostgreSQL via Helm (bitnami/postgresql) com StatefulSet, PersistentVolumeClaim de 10Gi, 1 primário + 1 replica read-only. Configure payflow para usar replica em reads. Redis via Helm (bitnami/redis) com modo Sentinel (1 master + 2 replicas). Secrets via kubectl create secret generic — nunca commitar valores.',
          criteria: 'Matar pod primário do Redis → Sentinel promove replica em < 30s sem downtime da aplicação.',
          resources: [
            {
              type: 'docs',
              title: 'Bitnami — PostgreSQL Helm',
              url: 'https://github.com/bitnami/charts/tree/main/bitnami/postgresql',
              free: true,
            },
            {
              type: 'docs',
              title: 'Redis — Sentinel',
              url: 'https://redis.io/docs/management/sentinel/',
              free: true,
            },
          ],
        },
        {
          id: 'nexus_1_1',
          title: 'Kafka em cluster no Kubernetes',
          difficulty: 'hard',
          estimatedHours: 2.5,
          description:
            'Kafka via Helm (bitnami/kafka) com KRaft, 3 brokers, retenção de 7 dias. Tópicos criados via Kubernetes Job executado no boot. Kafka UI via Helm no namespace infra. Serviços apontam para kafka.infra.svc.cluster.local:9092.',
          criteria:
            '3 brokers como StatefulSet. Matar 1 broker → aplicações continuam sem erros. Kafka UI acessível via port-forward.',
          resources: [
            {
              type: 'docs',
              title: 'Bitnami — Kafka Helm',
              url: 'https://github.com/bitnami/charts/tree/main/bitnami/kafka',
              free: true,
            },
          ],
        },
      ],
    },
    {
      id: 'nexus_phase_2',
      title: 'Fase 3 — Observabilidade Completa',
      tasks: [
        {
          id: 'nexus_2_0',
          title: 'kube-prometheus-stack + dashboards',
          difficulty: 'medium',
          estimatedHours: 2,
          description:
            'kube-prometheus-stack via Helm (Prometheus + Grafana + AlertManager + exporters do cluster). ServiceMonitor para scrape automático do payflow e taskflow. Dashboards: visão geral do cluster, payflow (req/s, latência p99, erros, transferências/min), taskflow (req/s, WebSockets ativos, Kafka lag), Kafka (messages in/out, consumer lag). Alertas: 5xx > 1% por 5min, Kafka consumer lag > 1000.',
          criteria: 'Todos os dashboards funcionando. Alerta disparado quando simulado erro em cascata.',
          resources: [
            {
              type: 'docs',
              title: 'kube-prometheus-stack',
              url: 'https://github.com/prometheus-community/helm-charts/tree/main/charts/kube-prometheus-stack',
              free: true,
            },
          ],
        },
        {
          id: 'nexus_2_1',
          title: 'Loki para agregação de logs',
          difficulty: 'medium',
          estimatedHours: 2,
          description:
            'loki-stack via Helm (Loki + Promtail). Promtail coleta logs de todos os containers automaticamente. Loki como datasource no Grafana. Queries LogQL obrigatórias: todos os logs ERROR do payflow, logs por requestId, logs cross-service por traceId. Dashboard com painel de logs ao lado de métricas.',
          criteria:
            '{app="payflow-api"} |= "ERROR" retorna logs. Busca por traceId mostra logs dos dois serviços.',
          resources: [
            {
              type: 'docs',
              title: 'Loki — Getting Started',
              url: 'https://grafana.com/docs/loki/latest/get-started/',
              free: true,
            },
            {
              type: 'docs',
              title: 'LogQL',
              url: 'https://grafana.com/docs/loki/latest/query/',
              free: true,
            },
          ],
        },
        {
          id: 'nexus_2_2',
          title: 'Jaeger com tracing cross-service',
          difficulty: 'hard',
          estimatedHours: 3,
          description:
            'Jaeger via Helm. Ambos os serviços exportam via OTLP para jaeger-collector.observability.svc:4318. Trace de transferência cruza os dois serviços: payflow (HTTP → DB → Redis → Kafka) → taskflow (Kafka → WebSocket). Sampling: 100% staging, 10% produção. Link do Grafana para Jaeger por traceId.',
          criteria:
            'Trace completo cross-service no Jaeger. Latência de cada operação detalhada. Link Grafana → Jaeger funciona.',
          resources: [
            {
              type: 'docs',
              title: 'Jaeger — Kubernetes',
              url: 'https://www.jaegertracing.io/docs/latest/kubernetes/',
              free: true,
            },
          ],
        },
      ],
    },
    {
      id: 'nexus_phase_3',
      title: 'Fase 4 — GitOps e Deploy Automatizado',
      tasks: [
        {
          id: 'nexus_3_0',
          title: 'Repositório GitOps',
          difficulty: 'hard',
          estimatedHours: 3,
          description:
            'Criar nexus-gitops com Helm values por environment: environments/staging/payflow/values.yaml, environments/production/payflow/values.yaml, etc. CI do payflow (push na main) atualiza image.tag no nexus-gitops via commit automático → deploy staging automático. Deploy production via PR com aprovação manual no nexus-gitops.',
          criteria:
            'Push no payflow → staging atualiza automaticamente. Production requer PR aprovado.',
          resources: [
            {
              type: 'article',
              title: 'GitOps — Principles',
              url: 'https://opengitops.dev/',
              free: true,
            },
          ],
        },
        {
          id: 'nexus_3_1',
          title: 'Rollback automático com smoke tests',
          difficulty: 'hard',
          estimatedHours: 2.5,
          description:
            'Após helm upgrade, executar smoke tests: kubectl rollout status, health check, teste de integração básico. Se qualquer teste falhar em 5 minutos → helm rollback automático. Notificação do resultado como comentário no PR via GitHub API. Badge de deploy no README com versão atual em staging e produção.',
          criteria:
            'Deploy com imagem quebrada → rollback automático em < 3 minutos. Comentário no PR com resultado.',
          resources: [
            {
              type: 'docs',
              title: 'Helm — Rollback',
              url: 'https://helm.sh/docs/helm/helm_rollback/',
              free: true,
            },
          ],
        },
        {
          id: 'nexus_3_2',
          title: 'Terraform para infraestrutura cloud (opcional)',
          difficulty: 'hard',
          estimatedHours: 3,
          description:
            'Provisionar infraestrutura com Terraform. Recursos: banco de dados (RDS ou Supabase), cache (ElastiCache ou Upstash Redis), variáveis exportadas como outputs. terraform.tfvars no .gitignore. Secrets via variáveis de ambiente no CI (TF_VAR_*). terraform plan em PRs (sem aplicar). terraform apply automático no merge para staging.',
          criteria:
            'terraform plan mostra zero diff após infra estável. terraform destroy && terraform apply recria tudo sem intervenção.',
          resources: [
            {
              type: 'docs',
              title: 'Terraform — Getting Started',
              url: 'https://developer.hashicorp.com/terraform/tutorials',
              free: true,
            },
            {
              type: 'article',
              title: 'Terraform Best Practices',
              url: 'https://www.terraform-best-practices.com/',
              free: true,
            },
          ],
        },
      ],
    },
  ],
}
