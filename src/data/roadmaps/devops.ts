import type { Roadmap } from '../../types'

// Dados estáticos do roadmap de DevOps — nunca buscar do banco
export const devopsRoadmap: Roadmap = {
  id: 'devops',
  title: 'DevOps / Infra',
  description:
    'Domine Docker, CI/CD, observabilidade, cloud AWS e Kubernetes. As habilidades de infraestrutura que transformam um dev backend em um profissional completo.',
  phases: [
    {
      id: 'devops_phase_0',
      title: 'Fase 1 — Fundação (Júnior)',
      topics: [
        {
          id: 'devops_0_0',
          title: 'Git avançado: além do add/commit/push',
          level: 'junior',
          difficulty: 'medium',
          estimatedHours: 5,
          description:
            'Git é a ferramenta mais usada em desenvolvimento. A maioria dos devs só sabe o básico — dominar rebase, cherry-pick, bisect e hooks coloca você em um nível diferente.',
          whyItMatters:
            'Em empresas com code review e CI/CD, saber trabalhar com branches, resolver conflitos e manter um histórico limpo é obrigatório.',
          mustKnowWithout: [
            'Diferença entre merge e rebase e quando usar cada um',
            'O que é git rebase -i (rebase interativo) e para que serve',
            'Como fazer cherry-pick de um commit específico',
            'Como usar git bisect para encontrar o commit que introduziu um bug',
            'O que é git stash e como funciona',
            'Conventional Commits: formato feat:, fix:, chore:, etc.',
            'O que é .gitignore e como funciona o .gitkeep',
          ],
          resources: [
            {
              type: 'article',
              title: 'Atlassian — Git Tutorials',
              url: 'https://www.atlassian.com/git/tutorials',
              free: true,
            },
            {
              type: 'course',
              title: 'Oh My Git! — Jogo interativo',
              url: 'https://ohmygit.org/',
              free: true,
            },
            {
              type: 'article',
              title: 'Conventional Commits',
              url: 'https://www.conventionalcommits.org/',
              free: true,
            },
          ],
        },
        {
          id: 'devops_0_1',
          title: 'Docker: containers na prática',
          level: 'junior',
          difficulty: 'medium',
          estimatedHours: 8,
          description:
            'Docker empacota aplicações e suas dependências em containers isolados, garantindo que o código roda igual em qualquer ambiente. É o pré-requisito para qualquer trabalho moderno de DevOps.',
          whyItMatters:
            '"Funciona na minha máquina" não existe em times com Docker. É pré-requisito para CI/CD, Kubernetes e praticamente qualquer vaga de backend pleno.',
          mustKnowWithout: [
            'Diferença entre imagem e container',
            'O que é um Dockerfile e como funciona layer caching',
            'O que é multi-stage build e por que reduz o tamanho da imagem',
            'Diferença entre CMD e ENTRYPOINT',
            'O que é docker-compose e como orquestrar múltiplos serviços',
            'O que são volumes e networks no Docker',
            'Como fazer healthcheck de um serviço',
            'Diferença entre COPY e ADD (prefira COPY)',
          ],
          resources: [
            {
              type: 'docs',
              title: 'Docker — Official Get Started',
              url: 'https://docs.docker.com/get-started/',
              free: true,
            },
            {
              type: 'video',
              title: 'TechWorld with Nana — Docker Tutorial',
              url: 'https://www.youtube.com/watch?v=3c-iBn73dDE',
              free: true,
            },
            {
              type: 'course',
              title: 'Play with Docker',
              url: 'https://labs.play-with-docker.com/',
              free: true,
            },
          ],
        },
      ],
    },
    {
      id: 'devops_phase_1',
      title: 'Fase 2 — Pleno',
      topics: [
        {
          id: 'devops_1_0',
          title: 'CI/CD com GitHub Actions',
          level: 'mid',
          difficulty: 'medium',
          estimatedHours: 6,
          description:
            'CI (Integração Contínua) garante que o código é sempre testado e buildado automaticamente. CD (Entrega/Deploy Contínuo) automatiza o deploy para ambientes de staging e produção.',
          whyItMatters:
            'Times sem CI/CD são mais lentos e propensos a regressões. Configurar pipelines é habilidade esperada de devs plenos em empresas modernas.',
          mustKnowWithout: [
            'Diferença entre CI, CD (Continuous Delivery) e CD (Continuous Deployment)',
            'Estrutura de um workflow do GitHub Actions: on, jobs, steps',
            'O que são secrets e como usá-los (nunca hardcode credenciais)',
            'O que é cache de dependências em CI e como configurar',
            'Diferença entre needs (dependência entre jobs) e if (condição)',
            'O que é um matrix build (testar em múltiplas versões/SOs)',
            'Como fazer deploy automático para Vercel, Railway ou EC2 via Actions',
          ],
          resources: [
            {
              type: 'docs',
              title: 'GitHub Actions — Docs',
              url: 'https://docs.github.com/en/actions',
              free: true,
            },
            {
              type: 'video',
              title: 'TechWorld with Nana — CI/CD',
              url: 'https://www.youtube.com/watch?v=R8_veQiYBjI',
              free: true,
            },
          ],
        },
        {
          id: 'devops_1_1',
          title: 'Observabilidade: Logs, Métricas e Tracing',
          level: 'mid',
          difficulty: 'hard',
          estimatedHours: 8,
          description:
            'Observabilidade é a capacidade de entender o estado interno de um sistema a partir de suas saídas (logs, métricas, traces). Os três pilares formam o que é chamado de "The Three Pillars of Observability".',
          whyItMatters:
            'Sem observabilidade, debugar problemas em produção é impossível. É o que separa sistemas amadores de sistemas profissionais.',
          mustKnowWithout: [
            'Os 3 pilares: Logs, Métricas e Traces distribuídos',
            'O que é structured logging (JSON) e por que é melhor que texto livre',
            'O que é um trace distribuído e como o traceId conecta serviços',
            'Métricas RED: Rate, Errors, Duration — o mínimo para qualquer API',
            'O que é Prometheus (coleta de métricas) e Grafana (visualização)',
            'O que é OpenTelemetry e por que é o padrão futuro',
            'O que nunca deve aparecer em logs: senhas, tokens, CPF, cartão de crédito',
          ],
          resources: [
            {
              type: 'article',
              title: 'OpenTelemetry — What is Observability?',
              url: 'https://opentelemetry.io/docs/concepts/observability-primer/',
              free: true,
            },
            {
              type: 'course',
              title: 'Grafana — Getting Started',
              url: 'https://grafana.com/tutorials/grafana-fundamentals/',
              free: true,
            },
            {
              type: 'video',
              title: 'ByteByteGo — Logging Best Practices',
              url: 'https://www.youtube.com/watch?v=uu5V-b4zt3k',
              free: true,
            },
          ],
        },
        {
          id: 'devops_1_2',
          title: 'Cloud: AWS essencial',
          level: 'mid',
          difficulty: 'medium',
          estimatedHours: 10,
          description:
            'AWS é o provedor de cloud dominante no mercado global. Conhecer os serviços essenciais é pré-requisito para vagas remotas internacionais.',
          whyItMatters:
            'A maioria das empresas de tecnologia roda na AWS. Devs plenos que entendem cloud são mais valiosos e têm mais opções de emprego, especialmente no exterior.',
          mustKnowWithout: [
            'O que é IAM (Identity and Access Management) e o princípio do menor privilégio',
            'Diferença entre EC2, ECS (Fargate) e Lambda — quando usar cada um',
            'O que é S3 e casos de uso (arquivos estáticos, backups, data lake)',
            'O que é RDS vs DynamoDB e quando escolher cada um',
            'O que é VPC, subnet pública vs privada, security group',
            'O que é load balancer (ALB) e auto scaling',
            'O que é CloudWatch para logs e métricas',
          ],
          resources: [
            {
              type: 'course',
              title: 'AWS Free Tier',
              url: 'https://aws.amazon.com/free/',
              free: true,
            },
            {
              type: 'course',
              title: 'AWS Skill Builder — Cloud Practitioner',
              url: 'https://explore.skillbuilder.aws/learn/course/external/view/elearning/134/aws-cloud-practitioner-essentials',
              free: true,
            },
            {
              type: 'video',
              title: 'TechWorld with Nana — AWS Tutorial',
              url: 'https://www.youtube.com/watch?v=ZB5ONbD_SMY',
              free: true,
            },
          ],
        },
      ],
    },
    {
      id: 'devops_phase_2',
      title: 'Fase 3 — Avançado (Sênior)',
      topics: [
        {
          id: 'devops_2_0',
          title: 'Kubernetes: orquestração de containers',
          level: 'senior',
          difficulty: 'hard',
          estimatedHours: 15,
          description:
            'Kubernetes automatiza o deploy, scaling e gerenciamento de containers em produção. É o padrão da indústria para sistemas que precisam de alta disponibilidade.',
          whyItMatters:
            'Empresas que rodam sistemas críticos usam Kubernetes. É diferencial forte para vagas de backend sênior e obrigatório para roles de DevOps/Platform Engineer.',
          mustKnowWithout: [
            'Componentes básicos: Pod, Deployment, Service, Ingress, ConfigMap, Secret',
            'Diferença entre Deployment e StatefulSet',
            'O que é kubectl e comandos básicos: get, describe, logs, exec, apply',
            'O que são liveness e readiness probes',
            'O que é HPA (Horizontal Pod Autoscaler)',
            'Diferença entre ClusterIP, NodePort e LoadBalancer',
          ],
          resources: [
            {
              type: 'docs',
              title: 'Kubernetes — Official Tutorial',
              url: 'https://kubernetes.io/docs/tutorials/',
              free: true,
            },
            {
              type: 'video',
              title: 'TechWorld with Nana — Kubernetes Crash Course',
              url: 'https://www.youtube.com/watch?v=s_o8dwzRlu4',
              free: true,
            },
            {
              type: 'course',
              title: 'Play with Kubernetes',
              url: 'https://labs.play-with-k8s.com/',
              free: true,
            },
          ],
        },
      ],
    },
  ],
}
