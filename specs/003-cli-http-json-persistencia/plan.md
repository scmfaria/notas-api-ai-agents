# Plan - CLI conectado ao servidor HTTP com persistência em JSON

## Decisões Técnicas

### Arquitetura em Camadas

1. **Domínio** (`src/domain/task.ts`)
   - Manter `Task` e `TaskFilter` como tipos base.
   - Sem IO direto.

2. **Dados** (`src/data/*`)
   - Mantém a abstração `ITaskStore`.
   - A API passa a usar um store baseado em arquivo JSON.
   - O CLI passa a consumir a API HTTP em vez de chamar o serviço diretamente.

3. **Serviço** (`src/service/taskService.ts`)
   - A lógica de negócio continua no serviço.
   - A diferença é que o serviço da API usa o store persistente, enquanto o CLI usa uma camada cliente HTTP.

4. **HTTP** (`src/index.ts`)
   - Manter as rotas atuais de criação, listagem, conclusão e remoção.
   - Garantir que cada operação persiste no arquivo JSON.

5. **CLI** (`src/cli.ts`)
   - Reaproveitar os comandos existentes.
   - Em vez de invocar o serviço diretamente, o CLI deve realizar chamadas HTTP para o servidor.

### Persistência da API

- A API usará um arquivo JSON em disco, em um caminho fixo do projeto.
- O arquivo será lido ao iniciar o servidor e gravado após cada operação de escrita.
- Escrita em arquivo temporário + rename para reduzir risco de corrupção.
- Estado inicial quando o arquivo não existir: lista vazia.

### Comunicação do CLI com a API

- O CLI enviará requisições HTTP para `http://localhost:3000`.
- Para cada comando, deve mapear entrada do terminal para as rotas da API:
  - create -> `POST /tasks`
  - list -> `GET /tasks?filter=...`
  - complete -> `POST /tasks/:id/complete`
  - remove -> `DELETE /tasks/:id`
- Erros vindos da API devem ser exibidos ao usuário sem quebrar a UX do CLI.

### Testes

- Cobrir a API persistindo tarefas em JSON.
- Cobrir o CLI consumindo o servidor HTTP.
- Cobrir erros de arquivo inválido e falhas de comunicação.

## Checklist de Implementação

- [ ] T1: definir o store JSON para a API
- [ ] T2: conectar o servidor HTTP ao store JSON
- [ ] T3: transformar o CLI em cliente HTTP
- [ ] T4: validar integração CLI + servidor + persistência
- [ ] T5: rodar testes e typecheck

## Dependências Entre Tarefas

```
T1 (store JSON para API)
  └─ T2 (API usa store JSON)
       └─ T3 (CLI usa servidor)
            └─ T4 (integração e testes)
                 └─ T5 (validação)
```

Ordem recomendada: **T1 → T2 → T3 → T4 → T5**

## Questões Técnicas Resolvidas

- **Persistência da API**: usar o mesmo formato do domínio e do CLI atual.
- **CLI**: usar HTTP em vez de chamar o serviço diretamente, mantendo comandos antigos.
- **Estado único**: CLI e API passam a compartilhar o mesmo backend real.
- **Robustez**: escrita atômica em JSON para reduzir risco de corrupção.
