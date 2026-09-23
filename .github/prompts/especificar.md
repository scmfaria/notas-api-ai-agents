---
mode: agent
description: cria a especificacao (o que e por why) de uma feature, sem codigo
---

escreva uma especificacao para a feature a seguir:

regras:
- leia specs/constitution.md e respeite todos os principios.
- nao escreva codigo nem decisoes de implementacao
- crie specs/<NNN>-<slug>/spec.md com:
  1. contexto/problema
  2. user stories (com <papel>, quero <objetivo>, para <beneficio>)
  3. requisitos funcionais numerados (RF-1...)
  4. criterios de aceite em ears (quando <evento> o sistema deve <resposta>)
  5. fora de escopo
  6. questoes em aberto

- se algo estiver ambiguo, pergunte antes de finalizar

exemplo:
- `/especificar 001 gerenciamento de tarefas` cria `specs/001-gerenciamento-tarefas/spec.md`
