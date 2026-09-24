# Spec - CLI conectado ao servidor HTTP com persistência em JSON

## Contexto / Problema

O sistema já possui duas partes importantes: um servidor HTTP para gerenciar tarefas e um CLI para operações manuais em terminal. Porém, a CLI ainda não se conecta ao servidor HTTP de forma real, e a API também não persiste em disco. Isso gera duplicação de estado e limita a reutilização da mesma lógica entre interfaces.

A nova feature deve unificar o comportamento: o CLI deve consumir o servidor HTTP, e a API deve salvar as tarefas em um arquivo JSON para que o estado sobreviva entre execuções.

## User Stories

- Como **usuário do CLI**, quero chamar o servidor HTTP diretamente, para usar a mesma lógica de negócio da API sem duplicar regras.
- Como **usuário do servidor HTTP**, quero que as tarefas permaneçam salvas em disco, para não perder dados ao reiniciar a aplicação.
- Como **usuário do sistema**, quero que o CLI e a API compartilhem o mesmo estado, para manter consistência entre as interfaces.
- Como **desenvolvedor**, quero que o serviço de persistência fique centralizado, para evitar duplicação de código entre API e CLI.

## Requisitos Funcionais

**RF-1:** O CLI deve enviar requisições HTTP para o servidor de tarefas.

**RF-2:** O CLI deve continuar suportando os comandos de criação, listagem, conclusão e remoção.

**RF-3:** A API deve persistir tarefas em arquivo JSON em disco.

**RF-4:** As operações da API devem continuar funcionando em memória em caso de arquivo inexistente, inicializando o estado corretamente.

**RF-5:** O servidor deve carregar as tarefas a partir do arquivo JSON ao iniciar.

**RF-6:** Cada operação de escrita na API deve atualizar o arquivo persistente.

**RF-7:** O estado criado via CLI deve refletir no servidor HTTP e vice-versa.

**RF-8:** O sistema deve tratar erros de leitura/escrita do arquivo com respostas previsíveis na API e mensagens claras no CLI.

**RF-9:** O sistema deve continuar suportando filtros `all`, `open` e `done`.

**RF-10:** O arquivo da API deve manter a mesma estrutura de tarefa já usada pelo domínio: `id`, `title`, `done`, `createdAt`.

## Critérios de Aceite (EARS)

**QUANDO** o usuário executa o CLI para criar uma tarefa **O SISTEMA DEVE** enviar a requisição correta para o servidor HTTP e persistir a tarefa.

**QUANDO** o usuário executa `list all` no CLI **O SISTEMA DEVE** consultar o servidor e exibir todas as tarefas salvas em JSON.

**QUANDO** o usuário executa `list open` ou `list done` **O SISTEMA DEVE** respeitar os filtros da API.

**QUANDO** o usuário executa `complete {id}` no CLI **O SISTEMA DEVE** marcar a tarefa no servidor HTTP e persistir o novo estado.

**QUANDO** o usuário executa `remove {id}` no CLI **O SISTEMA DEVE** remover a tarefa do servidor e do arquivo JSON.

**QUANDO** o servidor HTTP é iniciado com um arquivo JSON válido **O SISTEMA DEVE** carregar as tarefas existentes sem perda de estado.

**QUANDO** o arquivo JSON da API não existe **O SISTEMA DEVE** criá-lo automaticamente com estado inicial vazio.

**QUANDO** o arquivo JSON estiver inválido **O SISTEMA DEVE** retornar erro claro e evitar gravação silenciosa.

**QUANDO** o CLI recebe uma resposta de erro do servidor **O SISTEMA DEVE** exibir a mensagem adequada para o usuário.

## Fora de Escopo

- Persistência em banco de dados externo
- Autenticação ou autorização
- Múltiplos usuários ou sessões compartilhadas
- Interface gráfica
- Sincronização em tempo real
- Armazenamento criptografado do arquivo JSON

## Questões em Aberto

- O arquivo JSON da API deve ficar em `data/tasks.json` ou em outro diretório fixo? (resposta: definir caminho estável dentro do projeto)
- O CLI deve depender do servidor HTTP estar previamente ativo? (resposta: sim, para esta fase)
- A API deve falhar completamente se o arquivo estiver corrompido, ou continuar com lista vazia? (resposta: tratar erro explicitamente e bloquear gravações)
