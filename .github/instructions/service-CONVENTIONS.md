Regras de Service

- Funções puras onde possível (sem efeitos colaterais).
- Nunca importar de `src/http` (services não dependem de transporte).
- Services só dependem de `src/domain` e `src/data` (interfaces).
- Evitar IO direto: leitura/gravação via abstrações em `src/data`.
- Escrever testes unitários para lógica de negócio.
- Tipos e validação: usar tipos do `src/domain`; validação de entrada na borda.
- Erros de domínio: classes no domínio, traduzidas na borda (HTTP/CLI).
- Mantenha funções pequenas e composáveis; preferir composição sobre efeitos.
