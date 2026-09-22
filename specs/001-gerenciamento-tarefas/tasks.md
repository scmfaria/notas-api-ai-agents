# Tasks - gerenciamento de tarefas

- [ ] T1 - Definir o modelo de tarefa e contratos de persistência
  - Descrição: modelar as tarefas com campos mínimos de identificação, título, status e data de criação; definir a interface de armazenamento em memória e as regras de estado inicial.
  - Critério de pronto: o domínio da tarefa fica explícito e a camada de dados aceita somente as operações esperadas para criar, buscar, listar, atualizar e remover.
  - Dependências: nenhuma.

- [ ] T2 - Implementar a lógica de serviço para criação e listagem
  - Descrição: criar a tarefa com título obrigatório, listar todas, abertas e concluídas, e validar cenários de título vazio ou inválido.
  - Critério de pronto: os endpoints/commands de criação e listagem chamam a service e a resposta reflete os filtros `all`, `open` e `done`.
  - Dependências: T1.

- [ ] T3 - Implementar a lógica de serviço para concluir e remover
  - Descrição: marcar uma tarefa como concluída e remover uma tarefa existente, tratando erros quando o identificador não existir.
  - Critério de pronto: as ações de conclusão e remoção ficam centralizadas no serviço e retornam o comportamento esperado para sucesso e falha.
  - Dependências: T1.

- [ ] T4 - Expor operações de tarefas via HTTP
  - Descrição: implementar as rotas HTTP para criar tarefa, listar por filtro, concluir e remover pelo identificador, com validação de entrada e códigos de resposta adequados.
  - Critério de pronto: a API atende ao contrato de entrada/saída definido na feature e trata erros previsíveis com status correto.
  - Dependências: T2, T3.

- [ ] T5 - Expor operações de tarefas via CLI
  - Descrição: criar comandos no terminal para criar tarefa, listar por filtro, concluir e remover, usando a mesma camada de serviço da API.
  - Critério de pronto: os comandos aceitam os argumentos esperados e exibem o resultado em formato legível para operação manual.
  - Dependências: T2, T3.

- [ ] T6 - Validar comportamento com testes e verificação de tipos
  - Descrição: cobrir os fluxos principais com testes de unidade/integrados e validar que `npm run test` e `npm run typecheck` passam sem regressões.
  - Critério de pronto: todas as tarefas de criação, listagem, conclusão e remoção ficam cobertas, e a suíte passa com sucesso.
  - Dependências: T2, T3, T4, T5.
