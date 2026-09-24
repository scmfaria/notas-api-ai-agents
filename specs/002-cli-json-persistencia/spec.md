# Spec - persistência de tarefas via arquivo JSON no CLI

## Contexto / Problema

A API de tarefas já oferece criação, listagem, conclusão e remoção de tarefas, porém a persistência atual é somente em memória. Isso significa que, ao encerrar a execução do CLI, os dados desaparecem e não sobrevivem entre sessões.

Para melhorar a usabilidade do ambiente de linha de comando, o sistema deve persistir as tarefas em um arquivo JSON local, de forma simples e previsível, mantendo o estado entre execuções do CLI.

## User Stories

- Como **usuário do CLI**, quero que minhas tarefas sejam salvas em arquivo, para que continuem disponíveis entre diferentes execuções do terminal.
- Como **usuário do CLI**, quero criar, listar, concluir e remover tarefas sem perder dados ao fechar o programa, para manter minha lista consistente.
- Como **usuário do sistema**, quero que a aplicação leia automaticamente o estado atual do arquivo ao iniciar, para não perder informações existentes.
- Como **usuário do sistema**, quero que o arquivo de persistência tenha um formato simples e legível, para facilitar manutenção e inspeção.

## Requisitos Funcionais

**RF-1:** O CLI deve persistir as tarefas em um arquivo JSON em disco.

**RF-2:** O arquivo de persistência deve ser lido ao iniciar a aplicação para carregar o estado atual das tarefas.

**RF-3:** Cada operação de criação, conclusão e remoção deve salvar o estado atualizado no arquivo JSON.

**RF-4:** O sistema deve manter as tarefas entre sessões de CLI, mesmo quando a execução do processo termina.

**RF-5:** O arquivo deve armazenar a estrutura mínima de cada tarefa: id, title, done e createdAt.

**RF-6:** O sistema deve criar o arquivo de persistência automaticamente quando ele ainda não existir.

**RF-7:** O sistema deve tratar falhas de leitura/escrita de forma previsível, sem corromper o estado das tarefas.

**RF-8:** O CLI deve continuar funcionando com os mesmos comandos de criação, listagem, conclusão e remoção, com o comportamento equivalente ao atual.

**RF-9:** As tarefas devem continuar sendo listadas por filtro `all`, `open` e `done` após a persistência.

**RF-10:** O arquivo de persistência deve estar localizado em um caminho estável e acessível dentro do projeto, sem exigir configuração de ambiente.

## Critérios de Aceite (EARS)

**QUANDO** o usuário executa `cli create "Tarefa X"` pela primeira vez **O SISTEMA DEVE** criar o arquivo de persistência e salvar a tarefa.

**QUANDO** o usuário fecha a execução do CLI e abre outra sessão **O SISTEMA DEVE** carregar as tarefas previamente salvas do arquivo JSON.

**QUANDO** o usuário executa `cli list all` **O SISTEMA DEVE** retornar todas as tarefas presentes no arquivo persistido.

**QUANDO** o usuário executa `cli list open` **O SISTEMA DEVE** retornar apenas tarefas com `done = false`.

**QUANDO** o usuário executa `cli list done` **O SISTEMA DEVE** retornar apenas tarefas com `done = true`.

**QUANDO** o usuário executa `cli complete {id}` **O SISTEMA DEVE** atualizar a tarefa no arquivo e persistir o novo estado.

**QUANDO** o usuário executa `cli remove {id}` **O SISTEMA DEVE** remover a tarefa do arquivo e salvar a nova lista.

**QUANDO** o arquivo de persistência não existe **O SISTEMA DEVE** criar um arquivo vazio ou inicializar a estrutura antes da primeira operação.

**QUANDO** o arquivo de persistência existe e contém dados válidos **O SISTEMA DEVE** ler e usar esse estado ao iniciar o CLI.

**QUANDO** o arquivo de persistência está corrompido ou em formato inválido **O SISTEMA DEVE** informar erro de leitura e não perder o restante do sistema de forma silenciosa.

## Fora de Escopo

- Persistência em banco de dados externo
- Sincronização entre múltiplos clientes ou máquinas
- Autenticação e autorização
- Interface gráfica
- Persistência de histórico de comandos
- Criptografia do arquivo JSON

## Questões em Aberto

- O arquivo de persistência deve ficar em `./data/tasks.json` ou em um diretório oculto como `.tasks/tasks.json`? (resposta: definir caminho fixo dentro do projeto)
- O comportamento deve ser idempotente em caso de arquivo parcialmente escrito? (resposta: definir escrita atômica em arquivo temporário seguido de renomeação)
- O sistema deve registrar logs de erro em arquivo também? (resposta: fora de escopo para esta feature)
