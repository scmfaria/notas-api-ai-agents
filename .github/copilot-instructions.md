# Copilot Instructions

## Stack
- Node.js 22 LTS
- TypeScript ESM, strict mode
- Zod apenas na borda de entrada/saída (HTTP/CLI)

## Comandos
- dev: `tsx src/index.ts` (API em localhost:3000)
- cli: `tsx src/cli.ts`
- test: `node --loader=tsx --test src/**/*.test.ts`
- typecheck: `tsc --noEmit`

## Estrutura
- `src/domain` (tipos + zod, sem IO)
- `src/data` (persistência em memória atrás de interface)
- `src/service` (regras)
- `src/http`
- `src/cli.ts`
- `specs/` (spec-driven)

## Convenções
- camadas não pulam: `http/cli -> service -> store`
- entrada externa validada com zod
- erros de domínio são classes traduzidas na borda
- lógica nova nasce com testes
- `typecheck` e `test` sempre verdes
- nunca commitar secrets nem ler `.env`

## Fluxo de trabalho
- `/especificar -> planejar -> tarefas -> implementar -> revisão humana entre as fases`
- artefatos em `specs/`
