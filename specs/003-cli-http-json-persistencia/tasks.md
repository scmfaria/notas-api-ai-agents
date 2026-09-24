# Tasks - CLI conectado ao servidor HTTP com persistência em JSON

- [x] T1 - Definir o store JSON da API
  - Descrição: criar a estratégia de persistência em disco para a API, preservando a estrutura de `Task` e o contrato de `ITaskStore`.
  - Critério de pronto: o caminho do arquivo e a operação de leitura/escrita ficam definidos e consistentes com a estrutura atual da aplicação.
  - Dependências: nenhuma.

- [x] T2 - Integrar a API ao store JSON
  - Descrição: ajustar a camada de dados da API para ler e gravar tarefas em arquivo JSON ao iniciar, criar, atualizar e remover.
  - Critério de pronto: as rotas HTTP continuam funcionando com persistência real entre execuções.
  - Dependências: T1.

- [x] T3 - Transformar o CLI em cliente HTTP
  - Descrição: trocar chamadas diretas ao serviço pela comunicação com o servidor HTTP, mantendo os mesmos comandos do CLI.
  - Critério de pronto: `create`, `list`, `complete` e `remove` usam as rotas HTTP do servidor.
  - Dependências: T2.

- [x] T4 - Testar integração CLI + servidor + JSON
  - Descrição: cobrir a comunicação entre CLI e API, a persistência do arquivo JSON e os cenários de erro de leitura/gravação.
  - Critério de pronto: os testes validam o fluxo end-to-end do sistema de tarefas usando HTTP e arquivo persistente.
  - Dependências: T2, T3.

- [x] T5 - Validar com testes e typecheck
  - Descrição: rodar a suíte completa e a verificação de tipos para confirmar a estabilização da feature.
  - Critério de pronto: `npm run test` e `npm run typecheck` passam com sucesso.
  - Dependências: T4.
