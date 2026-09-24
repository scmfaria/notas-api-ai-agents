# Tasks - persistência de tarefas via arquivo JSON no CLI

- [x] T1 - Definir o caminho e o formato do arquivo de persistência
  - Descrição: escolher o local fixo do arquivo JSON dentro do projeto e definir a estrutura de dados esperada para armazenar as tarefas.
  - Critério de pronto: o caminho do arquivo e o schema dos dados ficam definidos e consistentes com a estrutura da tarefa atual.
  - Dependências: nenhuma.

- [x] T2 - Implementar o store persistente em arquivo JSON
  - Descrição: criar uma implementação de `ITaskStore` que leia e escreva o estado das tarefas em um arquivo JSON em disco, preservando a interface atual da camada de dados.
  - Critério de pronto: as operações de create, list, get, update e remove funcionam sobre o arquivo sem quebrar a abstração do store.
  - Dependências: T1.

- [x] T3 - Integrar o CLI para usar o store persistente
  - Descrição: ajustar o fluxo do CLI para instanciar e utilizar a implementação persistente em vez do store em memória padrão.
  - Critério de pronto: os comandos `create`, `list`, `complete` e `remove` continuam funcionando e salvando o estado entre execuções.
  - Dependências: T2.

- [x] T4 - Testar persistência, leitura e erros de arquivo
  - Descrição: cobrir cenários de criação de arquivo inexistente, leitura de dados salvos, conclusão e remoção persistentes e falha de JSON inválido.
  - Critério de pronto: os testes validam que o estado persiste corretamente entre execuções e que erros de arquivo são tratados de maneira previsível.
  - Dependências: T2, T3.

- [x] T5 - Validar com testes e typecheck
  - Descrição: rodar a suíte de testes e a checagem de tipos para garantir que a feature está estável.
  - Critério de pronto: `npm run test` e `npm run typecheck` passam com sucesso.
  - Dependências: T4.
