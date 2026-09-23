# Plan - gerenciamento de tarefas

## Decisões Técnicas

### Arquitetura em Camadas

Seguindo a `constitution.md`:

1. **Domínio** (`src/domain/task.ts`): Tipos puros, sem IO.
   - `Task` type com id, title, done, createdAt
   - `TaskFilter` type com 'all' | 'open' | 'done'

2. **Dados** (`src/data/taskStore.ts`): Persistência abstrata, em-memória.
   - Interface `ITaskStore` com métodos: create, list, get, update, remove
   - Implementação `InMemoryTaskStore` usando Map

3. **Serviço** (`src/service/taskService.ts`): Regras de negócio, sem IO direto.
   - `createTask(title)`: validar título, delegar create ao store
   - `listTasks(filter)`: listar e filtrar, retornar resultado
   - `completeTask(id)`: buscar, marcar como done, atualizar
   - `removeTask(id)`: buscar, remover

4. **HTTP** (`src/index.ts`): Transporte, rotas, validação de entrada.
   - `POST /tasks`: criar
   - `GET /tasks?filter=all|open|done`: listar
   - `POST /tasks/:id/complete`: completar
   - `DELETE /tasks/:id`: remover
   - Validação com Zod na entrada, erros traduzidos para HTTP status

5. **CLI** (`src/cli.ts`): Interface terminal, mesmo serviço.
   - `create <title>`
   - `list [all|open|done]`
   - `complete <id>`
   - `remove <id>`

### Validação e Erros

- **Entrada**: Zod schema na borda (HTTP e CLI)
- **Falhas previsíveis**: Traduzir em classes de erro simples
  - `invalid_title`: title vazio
  - `not_found`: id não existe
- **HTTP Status**: 201 create, 200 read/update, 204 delete, 400 input, 404 not_found, 500 internal

### Persistência

- Em-memória: Map<id, Task>
- Sem sincronização com arquivo (fora de escopo)
- Ordenação: por createdAt ascendente

### Testes

- Cobertura mínima: criar, listar (3 filtros), completar, remover, erros esperados
- Framework: `node:test` via `tsx`
- Rodados em `npm run test`

### Tipo

- TypeScript ESM strict
- Sem dependências além de `zod`, `@types/node`, `typescript`, `tsx`

## Checklist de Implementação

- [ ] T1: Domain + Store implementados e testados
- [ ] T2: Service para criar/listar implementado e testado
- [ ] T3: Service para completar/remover implementado e testado
- [ ] T4: HTTP routes implementadas, validação e error handling
- [ ] T5: CLI commands implementados, testes E2E
- [ ] T6: Cobertura completa, npm run test + typecheck verdes

## Dependências Entre Tarefas

```
T1 (domain + store)
├── T2 (create + list service)
│   └── T4 (HTTP routes)
│       └── T6 (testes)
├── T3 (complete + remove service)
│   └── T4 (HTTP routes)
│       └── T6 (testes)
└── T5 (CLI)
    └── T6 (testes)
```

Ordem de execução recomendada: **T1 → T2 → T3 → T4 → T5 → T6**

## Questões Técnicas Resolvidas

- **UUID vs incremental**: UUID para escalabilidade e sem coordenação
- **Timestamp format**: ISO 8601 (new Date().toISOString())
- **In-memory data structure**: Map para O(1) lookup
- **Error handling**: Exceções em service, tradução na borda
- **CLI parsing**: argv simples, sem framework (yargs/commander overkill)
