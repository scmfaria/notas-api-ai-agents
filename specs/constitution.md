# constitution - notas api

principais nao negociaveis que toda spec, plano, tarefa e codigo seguem
1- camadas explicitas. dependencias fluem http/cli -> service -> store. dominio nao faz io
2- validacoes na fronteira. toda entrada é validada com zod antes de virar dominio
3- erros sao de dominio. falhas previsiveis viram classes de erro, traduzidas em status/saidas na borda
4- teste é parte da tarefa. nenhuma logica nova entra sem teste. typecheck e test sempre verdes.
5- seguranca por padrao. sem segredos no repo, acoes destrutivas passam por guardrails (deny list + pre commit), nao pela confianca no modelo
6- spec antes de codigo. mudandas relevantes passam por spec -> plan -> task -> implement, com revisao humana entre as fases
7- pequeno, cada tarefa cabe em um commit

## stack obrigatoria

node 22, typescript esm strict, zod, node:test via tsx, node:http
