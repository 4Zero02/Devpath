## Roadmap 3 — DevOps / Infra

### Fase 1 — Fundação (Júnior)

#### Tópico 1.1 — Git avançado: além do add/commit/push
- **Nível:** júnior
- **Dificuldade:** médio
- **Tempo estimado:** 5h
- **Descrição:** Git é a ferramenta mais usada em desenvolvimento. A maioria dos devs só sabe o básico — dominar rebase, cherry-pick, bisect e hooks coloca você em um nível diferente.
- **Por que importa:** Em empresas com code review e CI/CD, saber trabalhar com branches, resolver conflitos e manter um histórico limpo é obrigatório.
- **O que saber sem pesquisar:**
  - Diferença entre `merge` e `rebase` e quando usar cada um
  - O que é `git rebase -i` (rebase interativo) e para que serve
  - Como fazer `cherry-pick` de um commit específico
  - Como usar `git bisect` para encontrar o commit que introduziu um bug
  - O que é `git stash` e como funciona
  - Conventional Commits: formato `feat:`, `fix:`, `chore:`, etc.
  - O que é `.gitignore` e como funciona o `.gitkeep`
- **Recursos:**
  - [Atlassian — Git Tutorials](https://www.atlassian.com/git/tutorials) — artigos
  - [Oh My Git! — Jogo interativo](https://ohmygit.org/) — jogo gratuito
  - [Conventional Commits](https://www.conventionalcommits.org/) — spec

#### Tópico 1.2 — Docker: containers na prática
- **Nível:** júnior
- **Dificuldade:** médio
- **Tempo estimado:** 8h
- **Descrição:** Docker empacota aplicações e suas dependências em containers isolados, garantindo que o código roda igual em qualquer ambiente. É o pré-requisito para qualquer trabalho moderno de DevOps.
- **Por que importa:** "Funciona na minha máquina" não existe em times com Docker. É pré-requisito para CI/CD, Kubernetes e praticamente qualquer vaga de backend pleno.
- **O que saber sem pesquisar:**
  - Diferença entre imagem e container
  - O que é um Dockerfile e como funciona layer caching
  - O que é multi-stage build e por que reduz o tamanho da imagem
  - Diferença entre `CMD` e `ENTRYPOINT`
  - O que é `docker-compose` e como orquestrar múltiplos serviços
  - O que são volumes e networks no Docker
  - Como fazer healthcheck de um serviço
  - Diferença entre `COPY` e `ADD` (prefira COPY)
- **Recursos:**
  - [Docker — Official Get Started](https://docs.docker.com/get-started/) — docs
  - [TechWorld with Nana — Docker Tutorial (YouTube)](https://www.youtube.com/watch?v=3c-iBn73dDE) — vídeo gratuito
  - [Play with Docker](https://labs.play-with-docker.com/) — laboratório online gratuito

---

### Fase 2 — Pleno

#### Tópico 2.1 — CI/CD com GitHub Actions
- **Nível:** pleno
- **Dificuldade:** médio
- **Tempo estimado:** 6h
- **Descrição:** CI (Integração Contínua) garante que o código é sempre testado e buildado automaticamente. CD (Entrega/Deploy Contínuo) automatiza o deploy para ambientes de staging e produção.
- **Por que importa:** Times sem CI/CD são mais lentos e propensos a regressões. Configurar pipelines é habilidade esperada de devs plenos em empresas modernas.
- **O que saber sem pesquisar:**
  - Diferença entre CI, CD (Continuous Delivery) e CD (Continuous Deployment)
  - Estrutura de um workflow do GitHub Actions: `on`, `jobs`, `steps`
  - O que são `secrets` e como usá-los (nunca hardcode credenciais)
  - O que é cache de dependências em CI e como configurar
  - Diferença entre `needs` (dependência entre jobs) e `if` (condição)
  - O que é um matrix build (testar em múltiplas versões/SOs)
  - Como fazer deploy automático para Vercel, Railway ou EC2 via Actions
- **Recursos:**
  - [GitHub Actions — Docs](https://docs.github.com/en/actions) — docs
  - [TechWorld with Nana — CI/CD (YouTube)](https://www.youtube.com/watch?v=R8_veQiYBjI) — vídeo gratuito

#### Tópico 2.2 — Observabilidade: Logs, Métricas e Tracing
- **Nível:** pleno
- **Dificuldade:** difícil
- **Tempo estimado:** 8h
- **Descrição:** Observabilidade é a capacidade de entender o estado interno de um sistema a partir de suas saídas (logs, métricas, traces). Os três pilares formam o que é chamado de "The Three Pillars of Observability".
- **Por que importa:** Sem observabilidade, debugar problemas em produção é impossível. É o que separa sistemas amadores de sistemas profissionais.
- **O que saber sem pesquisar:**
  - Os 3 pilares: Logs, Métricas e Traces distribuídos
  - O que é structured logging (JSON) e por que é melhor que texto livre
  - O que é um trace distribuído e como o traceId conecta serviços
  - Métricas RED: Rate, Errors, Duration — o mínimo para qualquer API
  - O que é Prometheus (coleta de métricas) e Grafana (visualização)
  - O que é OpenTelemetry e por que é o padrão futuro
  - O que nunca deve aparecer em logs: senhas, tokens, CPF, cartão de crédito
- **Recursos:**
  - [OpenTelemetry — What is Observability?](https://opentelemetry.io/docs/concepts/observability-primer/) — artigo
  - [Grafana — Getting Started](https://grafana.com/tutorials/grafana-fundamentals/) — tutorial gratuito
  - [ByteByteGo — Logging Best Practices (YouTube)](https://www.youtube.com/watch?v=uu5V-b4zt3k) — vídeo

#### Tópico 2.3 — Cloud: AWS essencial
- **Nível:** pleno
- **Dificuldade:** médio
- **Tempo estimado:** 10h
- **Descrição:** AWS é o provedor de cloud dominante no mercado global. Conhecer os serviços essenciais é pré-requisito para vagas remotas internacionais.
- **Por que importa:** A maioria das empresas de tecnologia roda na AWS. Devs plenos que entendem cloud são mais valiosos e têm mais opções de emprego, especialmente no exterior.
- **O que saber sem pesquisar:**
  - O que é IAM (Identity and Access Management) e o princípio do menor privilégio
  - Diferença entre EC2, ECS (Fargate) e Lambda — quando usar cada um
  - O que é S3 e casos de uso (arquivos estáticos, backups, data lake)
  - O que é RDS vs DynamoDB e quando escolher cada um
  - O que é VPC, subnet pública vs privada, security group
  - O que é load balancer (ALB) e auto scaling
  - O que é CloudWatch para logs e métricas
- **Recursos:**
  - [AWS Free Tier](https://aws.amazon.com/free/) — laboratório gratuito
  - [AWS Skill Builder — Cloud Practitioner](https://explore.skillbuilder.aws/learn/course/external/view/elearning/134/aws-cloud-practitioner-essentials) — curso gratuito
  - [TechWorld with Nana — AWS Tutorial (YouTube)](https://www.youtube.com/watch?v=ZB5ONbD_SMY) — vídeo gratuito

---

### Fase 3 — Avançado (Sênior)

#### Tópico 3.1 — Kubernetes: orquestração de containers
- **Nível:** sênior
- **Dificuldade:** difícil
- **Tempo estimado:** 15h
- **Descrição:** Kubernetes automatiza o deploy, scaling e gerenciamento de containers em produção. É o padrão da indústria para sistemas que precisam de alta disponibilidade.
- **Por que importa:** Empresas que rodam sistemas críticos usam Kubernetes. É diferencial forte para vagas de backend sênior e obrigatório para roles de DevOps/Platform Engineer.
- **O que saber sem pesquisar:**
  - Componentes básicos: Pod, Deployment, Service, Ingress, ConfigMap, Secret
  - Diferença entre Deployment e StatefulSet
  - O que é `kubectl` e comandos básicos: `get`, `describe`, `logs`, `exec`, `apply`
  - O que são liveness e readiness probes
  - O que é HPA (Horizontal Pod Autoscaler)
  - Diferença entre `ClusterIP`, `NodePort` e `LoadBalancer`
- **Recursos:**
  - [Kubernetes — Official Tutorial](https://kubernetes.io/docs/tutorials/) — docs
  - [TechWorld with Nana — Kubernetes Crash Course (YouTube)](https://www.youtube.com/watch?v=s_o8dwzRlu4) — vídeo gratuito
  - [Play with Kubernetes](https://labs.play-with-k8s.com/) — laboratório gratuito

---