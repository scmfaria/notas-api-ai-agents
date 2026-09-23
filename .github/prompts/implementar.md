---
mode: agent
description: implementa as tarefas pendentes uma a uma, com testes
---

implemente as tarefas de specs/<NNN>-<slug>/tasks.md da feature indicada (texto apos o comando)

uma tarefa por vez:
1. escolha a proxima -[] cujas dependencias ja estao prontas
2. implemente seguindo o plan.md, as instructions e a constitution
3. escreva/atualize testes e rode `npm run test` e `npm run typecheck`
4. so marque [x] quando estiver verde
5. pare ao concluir uma fatia coesa e peca revisao
nunca desative testes/tipos para passar. se a spec estiver errada, pare e revise

exemplo:
- `/implementar 001` implementa tasks de specs/001-gerenciamento-tarefas/tasks.md uma a uma
