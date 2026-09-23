---
mode: agent
description: gera o plano tecnico (decisoes, arquitetura, checklist) de uma feature
---

gere o plan.md da feature indicada ( o texto apos o comando e o numero ou caminho)

- leia spec.md da feature em specs/<NNN>-<slug>/spec.md
- leia specs/constitution.md e respeite principios
- crie specs/<NNN>-<slug>/plan.md contendo:
  1. decisoes tecnicas (stack, arquitetura, validacao, erros, persistencia)
  2. checklist de implementacao (tasks de T1 a Tn)
  3. dependencias entre tarefas (grafico ou lista)
  4. questoes tecnicas resolvidas

- o plan nao implementa, apenas decide

exemplo:
- `/planejar 001` lê specs/001-gerenciamento-tarefas/spec.md e cria specs/001-gerenciamento-tarefas/plan.md
