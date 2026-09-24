# Plan - persistência de tarefas via arquivo JSON no CLI

## Decisões Técnicas

### Arquitetura em Camadas

A funcionalidade será adicionada mantendo o padrão já estabelecido pela arquitetura do projeto:

1. **Domínio** (`src/domain/task.ts`)
   - Continuar com `Task` e `TaskFilter` já existentes.
   - Sem IO direto.

2. **Dados / Persistência** (`src/data/taskStore.ts`)
   - Manter a abstração `ITaskStore`.
   - Implementar uma variante de armazenamento em arquivo JSON, sem quebrar a interface atual do store em memória.
   - O objetivo é que a camada de serviço continue usando o mesmo contrato de operações: create, list, get, update, remove.

3. **Serviço** (`src/service/taskService.ts`)
   - Continuar com regras de negócio existentes.
   - A troca da implementação do data store não deve exigir mudança na API do serviço.

4. **CLI** (`src/cli.ts`)
   - Continuar com os comandos atuais `create`, `list`, `complete`, `remove`.
   - A diferença será que a execução passa a usar um `TaskStore` persistente em arquivo, não a instância em memória global.

### Persistência

- O arquivo de dados será salvo em um caminho fixo dentro do projeto, por exemplo: `./data/tasks.json`.
- O conteúdo do arquivo será um array de tarefas em JSON.
- Em caso de inexistência, o sistema deve criar automaticamente o diretório/arquivo.
- Em caso de arquivo corrompido ou inválido, a aplicação deve falhar de forma controlada, sem ocultar a falha.
- A escrita deve ser atomicamente segura: escrever em arquivo temporário e depois renomear para `tasks.json`.

### Tratamento de Erros

- `invalid_title`: criação com título vazio.
- `not_found`: tarefa inexistente para update/remove/complete.
- `invalid_file`: arquivo JSON inválido ou quebrado.
- `persist_error`: falha ao gravar.

Esses erros devem continuar sendo tratados na borda do CLI, mantendo a mesma UX do sistema atual.

### Regras de Compatibilidade

- A implementação deve manter o comportamento atual do CLI para todos os comandos já existentes.
- O modelo de dados da tarefa deve permanecer igual: `id`, `title`, `done`, `createdAt`.
- A diferença será apenas a origem do armazenamento.

### Testes

- Criar testes para:
  - criação de arquivo quando não existir
  - leitura de tarefas persistidas
  - listagem com `all`, `open` e `done`
  - conclusão e remoção persistindo corretamente
  - arquivo JSON inválido gera erro previsível

## Checklist de Implementação

- [ ] T1: definir caminho e formato do arquivo JSON
- [ ] T2: criar implementation de store persistente em arquivo
- [ ] T3: integrar o CLI para usar o store persistente
- [ ] T4: testar read/write e erros de persistência
- [ ] T5: validar `npm run test` e `npm run typecheck`

## Dependências Entre Tarefas

```
T1 (arquivo + formato)
  └─ T2 (store persistente)
       └─ T3 (CLI)
            └─ T4 (testes)
                 └─ T5 (validação)
```

Ordem recomendada: **T1 → T2 → T3 → T4 → T5**

## Questões Técnicas Resolvidas

- **Local do arquivo**: usar um diretório estável dentro do projeto, como `data/tasks.json`.
- **Persistência em CLI**: usar o mesmo contrato de `ITaskStore` para manter o serviço desacoplado.
- **Atomicidade**: escrita em arquivo temporário antes do rename.
- **Compatibilidade**: manter os mesmos comandos do CLI sem quebrar interface atual.
- **Teste**: incluir os casos de persistência e erro de JSON não válido.
