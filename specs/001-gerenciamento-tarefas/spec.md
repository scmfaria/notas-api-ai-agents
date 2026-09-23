# Spec - gerenciamento de tarefas

## Contexto / Problema

Atualmente a API não oferece funcionalidades de gerenciamento de tarefas. Usuários precisam de um sistema simples para criar, listar, marcar como concluído e remover tarefas, com suporte tanto via HTTP (API) quanto via CLI (terminal).

O sistema deve oferecer uma forma intuitiva e previsível de organizar tarefas por status (abertas, concluídas, todas).

## User Stories

- Como **usuário da API**, quero criar uma tarefa com um título, para manter registro de algo que preciso fazer.
- Como **usuário da API**, quero listar minhas tarefas filtradas por status (todas, abertas, concluídas), para organizar meu trabalho.
- Como **usuário da API**, quero marcar uma tarefa como concluída, para registrar que a completei.
- Como **usuário da API**, quero remover uma tarefa, para limpar tarefas obsoletas ou duplicadas.
- Como **usuário do CLI**, quero executar os mesmos comandos de criação, listagem, conclusão e remoção no terminal, para automatizar workflows.

## Requisitos Funcionais

**RF-1:** O sistema deve permitir criar uma tarefa com um título obrigatório (não-vazio).

**RF-2:** Cada tarefa deve ter um identificador único (UUID), um título, um status (aberto/concluído) e uma data/hora de criação.

**RF-3:** O sistema deve permitir listar tarefas com filtros: `all` (todas), `open` (abertas), `done` (concluídas).

**RF-4:** O sistema deve permitir marcar uma tarefa existente como concluída.

**RF-5:** O sistema deve permitir remover uma tarefa existente.

**RF-6:** O sistema deve retornar erro previsível (404) quando uma tarefa não for encontrada.

**RF-7:** O sistema deve validar a entrada (ex.: título vazio) e retornar erro (400) na criação.

**RF-8:** As operações acima devem estar disponíveis via HTTP (rotas REST).

**RF-9:** As operações acima devem estar disponíveis via CLI (comandos de terminal).

**RF-10:** A persistência é em memória durante a sessão (sem banco de dados externo nesta fase).

## Critérios de Aceite (EARS)

**QUANDO** um usuário faz POST `/tasks` com `{"title": "Fazer algo"}` **O SISTEMA DEVE** retornar 201 com a tarefa criada (id, title, done: false, createdAt).

**QUANDO** um usuário faz GET `/tasks` **O SISTEMA DEVE** retornar 200 com todas as tarefas em ordem de criação.

**QUANDO** um usuário faz GET `/tasks?filter=open` **O SISTEMA DEVE** retornar 200 com apenas tarefas com done=false.

**QUANDO** um usuário faz GET `/tasks?filter=done` **O SISTEMA DEVE** retornar 200 com apenas tarefas com done=true.

**QUANDO** um usuário faz POST `/tasks/{id}/complete` com um id válido **O SISTEMA DEVE** retornar 200 com a tarefa marcada como done=true.

**QUANDO** um usuário faz DELETE `/tasks/{id}` com um id válido **O SISTEMA DEVE** retornar 204 (sem conteúdo).

**QUANDO** um usuário tenta criar uma tarefa com title vazio ou não fornecido **O SISTEMA DEVE** retornar 400 com erro de validação.

**QUANDO** um usuário tenta acessar/completar/remover um id inexistente **O SISTEMA DEVE** retornar 404 not_found.

**QUANDO** um usuário executa `cli.ts create "Título da tarefa"` **O SISTEMA DEVE** exibir a tarefa criada em JSON.

**QUANDO** um usuário executa `cli.ts list open` **O SISTEMA DEVE** exibir as tarefas abertas em JSON.

**QUANDO** um usuário executa `cli.ts complete {id}` **O SISTEMA DEVE** marcar a tarefa como concluída e exibir o resultado.

**QUANDO** um usuário executa `cli.ts remove {id}` **O SISTEMA DEVE** remover a tarefa e exibir "ok".

## Fora de Escopo

- Persistência em banco de dados (arquivo, DB remoto, etc.)
- Autenticação e autorização
- Compartilhamento de tarefas entre usuários
- Prazos, prioridades, categorias ou tags
- Interface gráfica (web ou desktop)
- Sincronização em tempo real

## Questões em Aberto

- Deve haver limite de tarefas simultâneas em memória? (resposta: não definido; usar padrão razoável)
- A data de criação deve ser em UTC ou local? (resposta: usar ISO 8601 UTC)
- Ao remover uma tarefa, deve haver confirmação ou recuperação? (resposta: não; remoção imediata e permanente)
