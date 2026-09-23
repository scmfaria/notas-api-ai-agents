---
mode: agent
description: quebra o plano em tarefas pequenas, ordenadas e testaveis
---

gere o tasks.md da feature indicada ( o texto apos o comando e o numero ou caminho)

- leia spec.md e plan.md da feature em specs/<NNN>-<slug>/
- lista numerada em cada tarefa com formato:
  - [ ] T<n> - titulo breve
    - Descrição: ...
    - Critério de pronto: ...
    - Dependências: ...

- cada tarefa é pequena o suficiente para um unico commit
- tem criterio claro de pronto
- declara dependencia quando houver
- comeca com -[] para marcar o progresso
- ordene por dependencia (T1, T2 que depende T1, etc)
- nao implemente nada

exemplo:
- `/tarefas 001` lê specs/001-gerenciamento-tarefas/spec.md e plan.md, cria specs/001-gerenciamento-tarefas/tasks.md
