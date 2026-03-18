import type { Roadmap } from '../../types'

// Dados estáticos do roadmap de Banco de Dados — nunca buscar do banco
export const databaseRoadmap: Roadmap = {
  id: 'database',
  title: 'Banco de Dados',
  description:
    'Domine SQL avançado, modelagem relacional, otimização de queries, transações e NoSQL. As habilidades de banco que diferenciam devs plenos dos juniores.',
  phases: [
    {
      id: 'database_phase_0',
      title: 'Fase 1 — Fundação (Júnior)',
      topics: [
        {
          id: 'database_0_0',
          title: 'SQL além do SELECT básico',
          level: 'junior',
          difficulty: 'medium',
          estimatedHours: 8,
          description:
            'A maioria dos devs sabe fazer SELECT e INSERT, mas SQL tem muito mais poder. JOINs complexos, agregações, CTEs e window functions são diferenciais reais.',
          whyItMatters:
            'Saber SQL bem reduz a necessidade de buscar dados em código (N+1 problem). Em entrevistas técnicas, SQL é quase sempre testado.',
          mustKnowWithout: [
            'Diferença entre INNER JOIN, LEFT JOIN, RIGHT JOIN e FULL OUTER JOIN',
            'O que é GROUP BY e como usar com agregações (COUNT, SUM, AVG, MAX, MIN)',
            'O que é HAVING e diferença com WHERE',
            'O que é uma CTE (Common Table Expression) com WITH',
            'O que são window functions: ROW_NUMBER(), RANK(), LAG(), LEAD()',
            'Diferença entre UNION e UNION ALL',
            'O que é uma subquery correlacionada e quando evitar',
          ],
          resources: [
            {
              type: 'course',
              title: 'SQLZoo — Interactive SQL Tutorial',
              url: 'https://sqlzoo.net/',
              free: true,
            },
            {
              type: 'article',
              title: 'Mode — SQL Tutorial',
              url: 'https://mode.com/sql-tutorial/',
              free: true,
            },
            {
              type: 'course',
              title: 'Pgexercises — PostgreSQL Exercises',
              url: 'https://pgexercises.com/',
              free: true,
            },
          ],
        },
        {
          id: 'database_0_1',
          title: 'Modelagem de dados relacional',
          level: 'junior',
          difficulty: 'medium',
          estimatedHours: 6,
          description:
            'Modelagem relacional define como organizar dados em tabelas, relacionamentos e restrições. Um modelo ruim causa problemas que são caros de corrigir depois.',
          whyItMatters:
            'Decisões de modelagem são difíceis de reverter em produção. Saber modelar corretamente desde o início evita retrabalho e problemas de performance.',
          mustKnowWithout: [
            'O que são chaves primárias, estrangeiras e suas constraints',
            'Tipos de relacionamentos: 1:1, 1:N, N:N (tabela de junção)',
            'O que são as formas normais: 1NF, 2NF, 3NF — e quando desnormalizar intencionalmente',
            'Diferença entre UUID e SERIAL/BIGSERIAL como chave primária — trade-offs',
            'O que são NOT NULL, UNIQUE, CHECK e DEFAULT constraints',
            'O que é CASCADE em foreign keys (DELETE CASCADE, UPDATE CASCADE)',
          ],
          resources: [
            {
              type: 'article',
              title: 'Lucidchart — Database Design Tutorial',
              url: 'https://www.lucidchart.com/pages/database-diagram/database-design',
              free: true,
            },
            {
              type: 'video',
              title: 'Database Design — freeCodeCamp',
              url: 'https://www.youtube.com/watch?v=ztHopE5Wnpc',
              free: true,
            },
          ],
        },
      ],
    },
    {
      id: 'database_phase_1',
      title: 'Fase 2 — Pleno',
      topics: [
        {
          id: 'database_1_0',
          title: 'Índices e otimização de queries',
          level: 'mid',
          difficulty: 'hard',
          estimatedHours: 8,
          description:
            'Índices são a principal ferramenta para otimizar performance de queries. Criar índices errados desperdiça espaço e torna writes mais lentos. Não criar quando necessário torna reads impossíveis.',
          whyItMatters:
            'Queries lentas são um dos problemas mais comuns em produção. Saber analisar e otimizar é obrigatório para devs plenos que trabalham com dados reais.',
          mustKnowWithout: [
            'O que é um índice B-tree e como ele acelera buscas',
            'Como usar EXPLAIN ANALYZE no PostgreSQL para analisar queries',
            'O que é Sequential Scan vs Index Scan vs Index Only Scan',
            'O que são índices compostos e a importância da ordem das colunas',
            'O que é um índice parcial (WHERE no CREATE INDEX)',
            'Quando índices pioram a performance (writes frequentes em tabela grande)',
            'O que é N+1 problem e como detectar/resolver',
          ],
          resources: [
            {
              type: 'article',
              title: 'Use The Index, Luke',
              url: 'https://use-the-index-luke.com/',
              free: true,
            },
            {
              type: 'article',
              title: 'Postgres EXPLAIN Visualizer',
              url: 'https://explain.dalibo.com/',
              free: true,
            },
            {
              type: 'article',
              title: 'Baeldung — JPA N+1 Problem',
              url: 'https://www.baeldung.com/spring-hibernate-n1-problem',
              free: true,
            },
          ],
        },
        {
          id: 'database_1_1',
          title: 'Transações e isolamento',
          level: 'mid',
          difficulty: 'hard',
          estimatedHours: 6,
          description:
            'Transações garantem que operações relacionadas são atômicas, consistentes, isoladas e duráveis (ACID). Entender os níveis de isolamento é crítico para sistemas concorrentes.',
          whyItMatters:
            'Bugs de concorrência são difíceis de reproduzir e devastadores em produção (dinheiro duplicado, dados corrompidos). É tema recorrente em entrevistas de backend pleno/sênior.',
          mustKnowWithout: [
            'O que significa ACID: Atomicity, Consistency, Isolation, Durability',
            'O que é uma race condition e como transações ajudam',
            'Problemas de concorrência: Dirty Read, Non-repeatable Read, Phantom Read',
            'Níveis de isolamento: Read Uncommitted, Read Committed, Repeatable Read, Serializable',
            'O que é deadlock e como evitar (ordenar locks, timeout)',
            'Diferença entre pessimistic locking (SELECT FOR UPDATE) e optimistic locking (version field)',
          ],
          resources: [
            {
              type: 'docs',
              title: 'PostgreSQL — Transaction Isolation',
              url: 'https://www.postgresql.org/docs/current/transaction-iso.html',
              free: true,
            },
            {
              type: 'article',
              title: 'Baeldung — Optimistic vs Pessimistic Locking',
              url: 'https://www.baeldung.com/jpa-optimistic-locking',
              free: true,
            },
          ],
        },
        {
          id: 'database_1_2',
          title: 'Migrations e evolução de schema',
          level: 'mid',
          difficulty: 'medium',
          estimatedHours: 4,
          description:
            'Migrations são a forma controlada e versionada de evoluir o schema do banco ao longo do tempo. Fazer migrations erradas em produção pode resultar em downtime ou perda de dados.',
          whyItMatters:
            'Todo sistema evolui. Saber fazer migrations seguras (especialmente em sistemas com dados reais) é obrigatório para devs plenos.',
          mustKnowWithout: [
            'Por que nunca editar uma migration já aplicada em produção',
            'O que é uma zero-downtime migration e como fazer (ex: adicionar coluna nullable antes de popular)',
            'Diferença entre Flyway (SQL) e Liquibase (XML/YAML/SQL)',
            'No Prisma: prisma migrate dev vs prisma migrate deploy (nunca use dev em produção)',
            'O que é rollback de migration e por que é difícil em SGBDs relacionais',
          ],
          resources: [
            {
              type: 'docs',
              title: 'Flyway — Docs',
              url: 'https://flywaydb.org/documentation/',
              free: true,
            },
            {
              type: 'docs',
              title: 'Prisma — Migrations',
              url: 'https://www.prisma.io/docs/concepts/components/prisma-migrate',
              free: true,
            },
          ],
        },
      ],
    },
    {
      id: 'database_phase_2',
      title: 'Fase 3 — Avançado (Sênior)',
      topics: [
        {
          id: 'database_2_0',
          title: 'NoSQL: quando e como usar',
          level: 'senior',
          difficulty: 'medium',
          estimatedHours: 6,
          description:
            'NoSQL não é substituto do SQL — é uma ferramenta diferente para problemas diferentes. MongoDB (documentos), Redis (chave-valor/cache), Cassandra (wide-column), DynamoDB (managed).',
          whyItMatters:
            'Escolher o banco errado para o problema certo é um erro arquitetural caro. Saber os trade-offs é esperado de devs sêniors.',
          mustKnowWithout: [
            'Quando NoSQL faz sentido vs relacional',
            'O que é eventual consistency e BASE (vs ACID)',
            'Diferença entre Document Store, Key-Value, Wide-Column e Graph databases',
            'O que é o teorema CAP (Consistency, Availability, Partition Tolerance)',
            'Casos de uso clássicos: Redis para cache/sessão, MongoDB para documentos variáveis, Cassandra para séries temporais',
          ],
          resources: [
            {
              type: 'article',
              title: 'MongoDB — What is NoSQL?',
              url: 'https://www.mongodb.com/resources/basics/databases/nosql-explained',
              free: true,
            },
            {
              type: 'video',
              title: 'ByteByteGo — CAP Theorem',
              url: 'https://www.youtube.com/watch?v=BHqjEjzAicA',
              free: true,
            },
          ],
        },
      ],
    },
  ],
}
