## Roadmap 4 — Banco de Dados

### Fase 1 — Fundação (Júnior)

#### Tópico 1.1 — SQL além do SELECT básico
- **Nível:** júnior
- **Dificuldade:** médio
- **Tempo estimado:** 8h
- **Descrição:** A maioria dos devs sabe fazer SELECT e INSERT, mas SQL tem muito mais poder. JOINs complexos, agregações, CTEs e window functions são diferenciais reais.
- **Por que importa:** Saber SQL bem reduz a necessidade de buscar dados em código (N+1 problem). Em entrevistas técnicas, SQL é quase sempre testado.
- **O que saber sem pesquisar:**
  - Diferença entre `INNER JOIN`, `LEFT JOIN`, `RIGHT JOIN` e `FULL OUTER JOIN`
  - O que é `GROUP BY` e como usar com agregações (`COUNT`, `SUM`, `AVG`, `MAX`, `MIN`)
  - O que é `HAVING` e diferença com `WHERE`
  - O que é uma CTE (Common Table Expression) com `WITH`
  - O que são window functions: `ROW_NUMBER()`, `RANK()`, `LAG()`, `LEAD()`
  - Diferença entre `UNION` e `UNION ALL`
  - O que é uma subquery correlacionada e quando evitar
- **Recursos:**
  - [SQLZoo — Interactive SQL Tutorial](https://sqlzoo.net/) — exercícios gratuitos
  - [Mode — SQL Tutorial](https://mode.com/sql-tutorial/) — artigos
  - [Pgexercises — PostgreSQL Exercises](https://pgexercises.com/) — exercícios gratuitos

#### Tópico 1.2 — Modelagem de dados relacional
- **Nível:** júnior
- **Dificuldade:** médio
- **Tempo estimado:** 6h
- **Descrição:** Modelagem relacional define como organizar dados em tabelas, relacionamentos e restrições. Um modelo ruim causa problemas que são caros de corrigir depois.
- **Por que importa:** Decisões de modelagem são difíceis de reverter em produção. Saber modelar corretamente desde o início evita retrabalho e problemas de performance.
- **O que saber sem pesquisar:**
  - O que são chaves primárias, estrangeiras e suas constraints
  - Tipos de relacionamentos: 1:1, 1:N, N:N (tabela de junção)
  - O que são as formas normais: 1NF, 2NF, 3NF — e quando desnormalizar intencionalmente
  - Diferença entre `UUID` e `SERIAL/BIGSERIAL` como chave primária — trade-offs
  - O que são `NOT NULL`, `UNIQUE`, `CHECK` e `DEFAULT` constraints
  - O que é `CASCADE` em foreign keys (DELETE CASCADE, UPDATE CASCADE)
- **Recursos:**
  - [Lucidchart — Database Design Tutorial](https://www.lucidchart.com/pages/database-diagram/database-design) — artigo
  - [Database Design — freeCodeCamp (YouTube)](https://www.youtube.com/watch?v=ztHopE5Wnpc) — vídeo gratuito

---

### Fase 2 — Pleno

#### Tópico 2.1 — Índices e otimização de queries
- **Nível:** pleno
- **Dificuldade:** difícil
- **Tempo estimado:** 8h
- **Descrição:** Índices são a principal ferramenta para otimizar performance de queries. Criar índices errados desperdiça espaço e torna writes mais lentos. Não criar quando necessário torna reads impossíveis.
- **Por que importa:** Queries lentas são um dos problemas mais comuns em produção. Saber analisar e otimizar é obrigatório para devs plenos que trabalham com dados reais.
- **O que saber sem pesquisar:**
  - O que é um índice B-tree e como ele acelera buscas
  - Como usar `EXPLAIN ANALYZE` no PostgreSQL para analisar queries
  - O que é Sequential Scan vs Index Scan vs Index Only Scan
  - O que são índices compostos e a importância da ordem das colunas
  - O que é um índice parcial (`WHERE` no CREATE INDEX)
  - Quando índices pioram a performance (writes frequentes em tabela grande)
  - O que é N+1 problem e como detectar/resolver
- **Recursos:**
  - [Use The Index, Luke](https://use-the-index-luke.com/) — livro gratuito online
  - [Postgres EXPLAIN Visualizer](https://explain.dalibo.com/) — ferramenta gratuita
  - [Baeldung — JPA N+1 Problem](https://www.baeldung.com/spring-hibernate-n1-problem) — artigo

#### Tópico 2.2 — Transações e isolamento
- **Nível:** pleno
- **Dificuldade:** difícil
- **Tempo estimado:** 6h
- **Descrição:** Transações garantem que operações relacionadas são atômicas, consistentes, isoladas e duráveis (ACID). Entender os níveis de isolamento é crítico para sistemas concorrentes.
- **Por que importa:** Bugs de concorrência são difíceis de reproduzir e devastadores em produção (dinheiro duplicado, dados corrompidos). É tema recorrente em entrevistas de backend pleno/sênior.
- **O que saber sem pesquisar:**
  - O que significa ACID: Atomicity, Consistency, Isolation, Durability
  - O que é uma race condition e como transações ajudam
  - Problemas de concorrência: Dirty Read, Non-repeatable Read, Phantom Read
  - Níveis de isolamento: Read Uncommitted, Read Committed, Repeatable Read, Serializable
  - O que é deadlock e como evitar (ordenar locks, timeout)
  - Diferença entre pessimistic locking (`SELECT FOR UPDATE`) e optimistic locking (version field)
- **Recursos:**
  - [PostgreSQL — Transaction Isolation](https://www.postgresql.org/docs/current/transaction-iso.html) — docs
  - [Martin Fowler — Patterns of Enterprise Application Architecture (capítulos de concorrência)](https://martinfowler.com/eaaCatalog/) — referência
  - [Baeldung — Optimistic vs Pessimistic Locking](https://www.baeldung.com/jpa-optimistic-locking) — artigo

#### Tópico 2.3 — Migrations e evolução de schema
- **Nível:** pleno
- **Dificuldade:** médio
- **Tempo estimado:** 4h
- **Descrição:** Migrations são a forma controlada e versionada de evoluir o schema do banco ao longo do tempo. Fazer migrations erradas em produção pode resultar em downtime ou perda de dados.
- **Por que importa:** Todo sistema evolui. Saber fazer migrations seguras (especialmente em sistemas com dados reais) é obrigatório para devs plenos.
- **O que saber sem pesquisar:**
  - Por que nunca editar uma migration já aplicada em produção
  - O que é uma zero-downtime migration e como fazer (ex: adicionar coluna nullable antes de popular)
  - Diferença entre Flyway (SQL) e Liquibase (XML/YAML/SQL)
  - No Prisma: `prisma migrate dev` vs `prisma migrate deploy` (nunca use dev em produção)
  - O que é rollback de migration e por que é difícil em SGBDs relacionais
- **Recursos:**
  - [Flyway — Docs](https://flywaydb.org/documentation/) — docs
  - [Prisma — Migrations](https://www.prisma.io/docs/concepts/components/prisma-migrate) — docs
  - [Braintree — Zero Downtime Migrations](https://medium.com/paypal-tech/online-schema-changes-for-mysql-at-braintree-b8cba23e4f17) — artigo

---

### Fase 3 — Avançado (Sênior)

#### Tópico 3.1 — NoSQL: quando e como usar
- **Nível:** sênior
- **Dificuldade:** médio
- **Tempo estimado:** 6h
- **Descrição:** NoSQL não é substituto do SQL — é uma ferramenta diferente para problemas diferentes. MongoDB (documentos), Redis (chave-valor/cache), Cassandra (wide-column), DynamoDB (managed).
- **Por que importa:** Escolher o banco errado para o problema certo é um erro arquitetural caro. Saber os trade-offs é esperado de devs sêniors.
- **O que saber sem pesquisar:**
  - Quando NoSQL faz sentido vs relacional
  - O que é eventual consistency e BASE (vs ACID)
  - Diferença entre Document Store, Key-Value, Wide-Column e Graph databases
  - O que é o teorema CAP (Consistency, Availability, Partition Tolerance)
  - Casos de uso clássicos: Redis para cache/sessão, MongoDB para documentos variáveis, Cassandra para séries temporais
- **Recursos:**
  - [MongoDB — What is NoSQL?](https://www.mongodb.com/resources/basics/databases/nosql-explained) — artigo
  - [ByteByteGo — CAP Theorem (YouTube)](https://www.youtube.com/watch?v=BHqjEjzAicA) — vídeo

---