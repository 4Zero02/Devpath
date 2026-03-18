import type { Roadmap } from '../../types'

// Dados estáticos do roadmap de System Design — nunca buscar do banco
export const systemDesignRoadmap: Roadmap = {
  id: 'system-design',
  title: 'System Design',
  description:
    'Aprenda a projetar sistemas escaláveis e resilientes. Escalabilidade, DNS/CDN, padrões de entrevista, microsserviços, segurança e estimativas de capacidade.',
  phases: [
    {
      id: 'system-design_phase_0',
      title: 'Fase 1 — Fundação (Júnior)',
      topics: [
        {
          id: 'system-design_0_0',
          title: 'Escalabilidade: vertical vs horizontal',
          level: 'junior',
          difficulty: 'easy',
          estimatedHours: 3,
          description:
            'Escalabilidade é a capacidade de um sistema crescer para lidar com mais carga. Escalar verticalmente significa usar hardware mais potente. Escalar horizontalmente significa adicionar mais máquinas.',
          whyItMatters:
            'Entender escalabilidade é o ponto de partida para qualquer conversa de system design em entrevistas. É terminologia básica esperada de devs plenos.',
          mustKnowWithout: [
            'Diferença entre scale up (vertical) e scale out (horizontal)',
            'O que é stateless vs stateful e por que stateless escala melhor',
            'O que é um load balancer e como distribui requisições',
            'O que é o Teorema de CAP simplificado',
            'O que é latência vs throughput',
          ],
          resources: [
            {
              type: 'video',
              title: 'ByteByteGo — System Design Fundamentals',
              url: 'https://www.youtube.com/c/ByteByteGo',
              free: true,
            },
            {
              type: 'article',
              title: 'System Design Primer — GitHub',
              url: 'https://github.com/donnemartin/system-design-primer',
              free: true,
            },
          ],
        },
        {
          id: 'system-design_0_1',
          title: 'DNS, CDN e como a web funciona',
          level: 'junior',
          difficulty: 'easy',
          estimatedHours: 3,
          description:
            'Entender o caminho que uma requisição percorre desde o browser até o servidor é fundamental para diagnosticar problemas de performance e configurar infraestrutura corretamente.',
          whyItMatters:
            'Problemas de DNS, CDN e TLS são comuns em produção. Entender o fluxo completo é esperado de qualquer dev que trabalha com sistemas web reais.',
          mustKnowWithout: [
            'O que é DNS e como funciona a resolução (recursiva vs iterativa)',
            'O que é TTL no contexto de DNS',
            'O que é CDN e como funciona (edge servers, cache hit/miss)',
            'O que é TLS/SSL handshake simplificado',
            'Diferença entre HTTP/1.1, HTTP/2 e HTTP/3',
          ],
          resources: [
            {
              type: 'article',
              title: 'Cloudflare — Learning Center',
              url: 'https://www.cloudflare.com/learning/',
              free: true,
            },
            {
              type: 'video',
              title: 'Fireship — DNS em 100 Segundos',
              url: 'https://www.youtube.com/watch?v=UVR9lhUGAyU',
              free: true,
            },
          ],
        },
      ],
    },
    {
      id: 'system-design_phase_1',
      title: 'Fase 2 — Pleno',
      topics: [
        {
          id: 'system-design_1_0',
          title: 'Padrões de System Design: os clássicos de entrevista',
          level: 'mid',
          difficulty: 'hard',
          estimatedHours: 15,
          description:
            'Entrevistas de system design em empresas internacionais pedem para projetar sistemas como "Design the Twitter Feed", "Design a URL Shortener" ou "Design WhatsApp". Entender os blocos de construção e como combiná-los é essencial.',
          whyItMatters:
            'É o tipo de entrevista mais comum para vagas de pleno/sênior em empresas de tecnologia internacionais (FAANG, unicórnios, scale-ups). Não estudar system design é o maior erro de quem mira o exterior.',
          mustKnowWithout: [
            'Como estruturar uma resposta de system design (clarify → estimate → design → deep dive)',
            'O que é uma fila de mensagens e quando usar (desacoplar, picos de tráfego)',
            'O que é consistent hashing e por que é usado em sistemas distribuídos',
            'O que é sharding de banco e suas estratégias (por range, por hash)',
            'O que é replicação de banco (primary-replica) e seus trade-offs',
            'O que é um API Gateway e suas responsabilidades',
            'Diferença entre monolito, SOA e microsserviços — e quando cada um faz sentido',
          ],
          resources: [
            {
              type: 'article',
              title: 'System Design Primer — GitHub',
              url: 'https://github.com/donnemartin/system-design-primer',
              free: true,
            },
            {
              type: 'video',
              title: 'ByteByteGo — System Design Interview',
              url: 'https://www.youtube.com/c/ByteByteGo',
              free: true,
            },
          ],
        },
        {
          id: 'system-design_1_1',
          title: 'Microsserviços: trade-offs reais',
          level: 'mid',
          difficulty: 'hard',
          estimatedHours: 8,
          description:
            'Microsserviços dividem um sistema em serviços menores e independentes. Não são sempre a solução certa — o "distributed monolith" é um erro comum ao adotar microsserviços sem compreensão profunda.',
          whyItMatters:
            'Microsserviços são o modelo arquitetural dominante em empresas de tecnologia. Devs plenos precisam entender os trade-offs, não só os benefícios.',
          mustKnowWithout: [
            'Por que microsserviços são mais difíceis de operar que monolitos',
            'O que é um "distributed monolith" e por que é pior que qualquer dos dois',
            'Padrões de comunicação: síncrono (REST/gRPC) vs assíncrono (eventos)',
            'O que é Saga Pattern e como lidar com transações distribuídas',
            'O que é service discovery e por que é necessário',
            'Quando NÃO usar microsserviços (times pequenos, domínio não definido)',
          ],
          resources: [
            {
              type: 'article',
              title: 'Martin Fowler — Microservices',
              url: 'https://martinfowler.com/articles/microservices.html',
              free: true,
            },
            {
              type: 'article',
              title: 'Martin Fowler — MonolithFirst',
              url: 'https://martinfowler.com/bliki/MonolithFirst.html',
              free: true,
            },
          ],
        },
        {
          id: 'system-design_1_2',
          title: 'Segurança: fundamentos para devs',
          level: 'mid',
          difficulty: 'medium',
          estimatedHours: 6,
          description:
            'Segurança não é responsabilidade exclusiva de times de segurança. Devs plenos precisam escrever código seguro por padrão, conhecendo as vulnerabilidades mais comuns.',
          whyItMatters:
            'Vulnerabilidades de segurança têm custo altíssimo — financeiro, reputacional e legal. Empresas sérias rejeitam PRs com problemas de segurança óbvios.',
          mustKnowWithout: [
            'OWASP Top 10: as 10 vulnerabilidades mais comuns em aplicações web',
            'O que é SQL Injection e como prevenir (prepared statements, não concatenação)',
            'O que é XSS (Cross-Site Scripting) e como prevenir (sanitização, CSP)',
            'O que é CSRF e como prevenir (tokens, SameSite cookies)',
            'O que é o princípio do menor privilégio aplicado a banco de dados e cloud',
            'Como armazenar senhas corretamente (bcrypt, não MD5/SHA1)',
            'O que nunca deve ir em logs (PII, tokens, senhas)',
          ],
          resources: [
            {
              type: 'article',
              title: 'OWASP Top 10',
              url: 'https://owasp.org/www-project-top-ten/',
              free: true,
            },
            {
              type: 'course',
              title: 'PortSwigger Web Security Academy',
              url: 'https://portswigger.net/web-security',
              free: true,
            },
            {
              type: 'video',
              title: 'Fireship — 100 Security Concepts',
              url: 'https://www.youtube.com/watch?v=VqB3FXgqPjE',
              free: true,
            },
          ],
        },
      ],
    },
    {
      id: 'system-design_phase_2',
      title: 'Fase 3 — Avançado (Sênior)',
      topics: [
        {
          id: 'system-design_2_0',
          title: 'Estimativa de capacidade (Back-of-the-envelope)',
          level: 'senior',
          difficulty: 'medium',
          estimatedHours: 4,
          description:
            'Estimativa de capacidade é a habilidade de calcular rapidamente quantos servidores, espaço e banda um sistema precisa. É cobrado em toda entrevista de system design de nível sênior.',
          whyItMatters:
            'Sem estimativas, é impossível projetar um sistema dimensionado corretamente. Empresas como Google e Meta cobram isso explicitamente nas primeiras fases do design.',
          mustKnowWithout: [
            'Números que todo dev deve saber: latência de memória, disco, rede, SSD',
            'Conversões: 1M requests/dia ≈ 12 req/s; 1B usuários com 10% ativos = 100M DAU',
            'Como estimar: QPS (Queries Per Second), storage, bandwidth',
            'Regra dos 3: capacidade * 3 para ter headroom',
            'O que é SLA e como calcular disponibilidade (99.9% = 8.7h downtime/ano)',
          ],
          resources: [
            {
              type: 'article',
              title: 'Jeff Dean — Numbers Everyone Should Know',
              url: 'http://highscalability.com/blog/2011/1/26/google-pro-tip-use-back-of-the-envelope-calculations-to-choo.html',
              free: true,
            },
            {
              type: 'article',
              title: 'Latency Numbers Every Programmer Should Know',
              url: 'https://github.com/sirupsen/napkin-math',
              free: true,
            },
            {
              type: 'video',
              title: 'ByteByteGo — Back of Envelope Estimation',
              url: 'https://www.youtube.com/watch?v=UC5xf8FbdJc',
              free: true,
            },
          ],
        },
      ],
    },
  ],
}
