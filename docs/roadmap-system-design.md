## Roadmap 5 — System Design

### Fase 1 — Fundação (Júnior)

#### Tópico 1.1 — Escalabilidade: vertical vs horizontal
- **Nível:** júnior
- **Dificuldade:** fácil
- **Tempo estimado:** 3h
- **Descrição:** Escalabilidade é a capacidade de um sistema crescer para lidar com mais carga. Escalar verticalmente significa usar hardware mais potente. Escalar horizontalmente significa adicionar mais máquinas.
- **Por que importa:** Entender escalabilidade é o ponto de partida para qualquer conversa de system design em entrevistas. É terminologia básica esperada de devs plenos.
- **O que saber sem pesquisar:**
  - Diferença entre scale up (vertical) e scale out (horizontal)
  - O que é stateless vs stateful e por que stateless escala melhor
  - O que é um load balancer e como distribui requisições
  - O que é o Teorema de CAP simplificado
  - O que é latência vs throughput
- **Recursos:**
  - [ByteByteGo — System Design Fundamentals (YouTube)](https://www.youtube.com/c/ByteByteGo) — canal gratuito
  - [System Design Primer — GitHub](https://github.com/donnemartin/system-design-primer) — repositório gratuito

#### Tópico 1.2 — DNS, CDN e como a web funciona
- **Nível:** júnior
- **Dificuldade:** fácil
- **Tempo estimado:** 3h
- **Descrição:** Entender o caminho que uma requisição percorre desde o browser até o servidor é fundamental para diagnosticar problemas de performance e configurar infraestrutura corretamente.
- **Por que importa:** Problemas de DNS, CDN e TLS são comuns em produção. Entender o fluxo completo é esperado de qualquer dev que trabalha com sistemas web reais.
- **O que saber sem pesquisar:**
  - O que é DNS e como funciona a resolução (recursiva vs iterativa)
  - O que é TTL no contexto de DNS
  - O que é CDN e como funciona (edge servers, cache hit/miss)
  - O que é TLS/SSL handshake simplificado
  - Diferença entre HTTP/1.1, HTTP/2 e HTTP/3
- **Recursos:**
  - [Cloudflare — Learning Center](https://www.cloudflare.com/learning/) — artigos gratuitos
  - [Fireship — DNS em 100 Segundos (YouTube)](https://www.youtube.com/watch?v=UVR9lhUGAyU) — vídeo

---

### Fase 2 — Pleno

#### Tópico 2.1 — Padrões de System Design: os clássicos de entrevista
- **Nível:** pleno
- **Dificuldade:** difícil
- **Tempo estimado:** 15h
- **Descrição:** Entrevistas de system design em empresas internacionais pedem para projetar sistemas como "Design the Twitter Feed", "Design a URL Shortener" ou "Design WhatsApp". Entender os blocos de construção e como combiná-los é essencial.
- **Por que importa:** É o tipo de entrevista mais comum para vagas de pleno/sênior em empresas de tecnologia internacionais (FAANG, unicórnios, scale-ups). Não estudar system design é o maior erro de quem mira o exterior.
- **O que saber sem pesquisar:**
  - Como estruturar uma resposta de system design (clarify → estimate → design → deep dive)
  - O que é uma fila de mensagens e quando usar (desacoplar, picos de tráfego)
  - O que é consistent hashing e por que é usado em sistemas distribuídos
  - O que é sharding de banco e suas estratégias (por range, por hash)
  - O que é replicação de banco (primary-replica) e seus trade-offs
  - O que é um API Gateway e suas responsabilidades
  - Diferença entre monolito, SOA e microsserviços — e quando cada um faz sentido
- **Recursos:**
  - [System Design Primer — GitHub](https://github.com/donnemartin/system-design-primer) — repositório gratuito completo
  - [ByteByteGo — System Design Interview (YouTube)](https://www.youtube.com/c/ByteByteGo) — canal gratuito
  - [Grokking System Design — Educative (pago, mas tem resumos no GitHub)](https://github.com/sharanyaa/grok_sdi_educative) — referência

#### Tópico 2.2 — Microsserviços: trade-offs reais
- **Nível:** pleno
- **Dificuldade:** difícil
- **Tempo estimado:** 8h
- **Descrição:** Microsserviços dividem um sistema em serviços menores e independentes. Não são sempre a solução certa — o "distributed monolith" é um erro comum ao adotar microsserviços sem compreensão profunda.
- **Por que importa:** Microsserviços são o modelo arquitetural dominante em empresas de tecnologia. Devs plenos precisam entender os trade-offs, não só os benefícios.
- **O que saber sem pesquisar:**
  - Por que microsserviços são mais difíceis de operar que monolitos
  - O que é um "distributed monolith" e por que é pior que qualquer dos dois
  - Padrões de comunicação: síncrono (REST/gRPC) vs assíncrono (eventos)
  - O que é Saga Pattern e como lidar com transações distribuídas
  - O que é service discovery e por que é necessário
  - Quando NÃO usar microsserviços (times pequenos, domínio não definido)
- **Recursos:**
  - [Martin Fowler — Microservices](https://martinfowler.com/articles/microservices.html) — artigo original
  - [Martin Fowler — MonolithFirst](https://martinfowler.com/bliki/MonolithFirst.html) — artigo
  - [Sam Newman — Building Microservices (resumo)](https://www.oreilly.com/library/view/building-microservices-2nd/9781492047834/) — livro referência

#### Tópico 2.3 — Segurança: fundamentos para devs
- **Nível:** pleno
- **Dificuldade:** médio
- **Tempo estimado:** 6h
- **Descrição:** Segurança não é responsabilidade exclusiva de times de segurança. Devs plenos precisam escrever código seguro por padrão, conhecendo as vulnerabilidades mais comuns.
- **Por que importa:** Vulnerabilidades de segurança têm custo altíssimo — financeiro, reputacional e legal. Empresas sérias rejeitam PRs com problemas de segurança óbvios.
- **O que saber sem pesquisar:**
  - OWASP Top 10: as 10 vulnerabilidades mais comuns em aplicações web
  - O que é SQL Injection e como prevenir (prepared statements, não concatenação)
  - O que é XSS (Cross-Site Scripting) e como prevenir (sanitização, CSP)
  - O que é CSRF e como prevenir (tokens, SameSite cookies)
  - O que é o princípio do menor privilégio aplicado a banco de dados e cloud
  - Como armazenar senhas corretamente (bcrypt, não MD5/SHA1)
  - O que nunca deve ir em logs (PII, tokens, senhas)
- **Recursos:**
  - [OWASP Top 10](https://owasp.org/www-project-top-ten/) — referência oficial gratuita
  - [PortSwigger Web Security Academy](https://portswigger.net/web-security) — curso gratuito interativo
  - [Fireship — 100 Security Concepts (YouTube)](https://www.youtube.com/watch?v=VqB3FXgqPjE) — vídeo

---

### Fase 3 — Avançado (Sênior)

#### Tópico 3.1 — Estimativa de capacidade (Back-of-the-envelope)
- **Nível:** sênior
- **Dificuldade:** médio
- **Tempo estimado:** 4h
- **Descrição:** Estimativa de capacidade é a habilidade de calcular rapidamente quantos servidores, espaço e banda um sistema precisa. É cobrado em toda entrevista de system design de nível sênior.
- **Por que importa:** Sem estimativas, é impossível projetar um sistema dimensionado corretamente. Empresas como Google e Meta cobram isso explicitamente nas primeiras fases do design.
- **O que saber sem pesquisar:**
  - Números que todo dev deve saber: latência de memória, disco, rede, SSD
  - Conversões: 1M requests/dia ≈ 12 req/s; 1B usuarios com 10% ativos = 100M DAU
  - Como estimar: QPS (Queries Per Second), storage, bandwidth
  - Regra dos 3: capacidade * 3 para ter headroom
  - O que é SLA e como calcular disponibilidade (99.9% = 8.7h downtime/ano)
- **Recursos:**
  - [Jeff Dean — Numbers Everyone Should Know](http://highscalability.com/blog/2011/1/26/google-pro-tip-use-back-of-the-envelope-calculations-to-choo.html) — artigo
  - [Latency Numbers Every Programmer Should Know](https://github.com/sirupsen/napkin-math) — referência GitHub
  - [ByteByteGo — Back of Envelope Estimation (YouTube)](https://www.youtube.com/watch?v=UC5xf8FbdJc) — vídeo

---