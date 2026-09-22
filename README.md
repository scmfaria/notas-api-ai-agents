# Notas API

Uma API para gerenciar notas, desenvolvida com Node.js, TypeScript e TypeScript modules (ESM).

## 📋 Sobre o Projeto

A **Notas API** é um projeto de aprendizado focado em criar uma aplicação Node.js moderna com:
- TypeScript para type safety
- ESM (ES Modules) para sintaxe moderna
- Validação de dados com Zod
- CLI para interação com a aplicação
- Scripts de desenvolvimento e testes

## 🚀 Pré-requisitos

- Node.js (v18+)
- npm (v9+)

## 📦 Instalação

1. Clone o repositório:
```bash
git clone <seu-repositorio>
cd notas-api
```

2. Instale as dependências:
```bash
npm install
```

## 🛠️ Scripts Disponíveis

- **`npm run dev`** - Inicia a aplicação em modo desenvolvimento
  ```bash
  npm run dev
  ```

- **`npm run cli`** - Executa a interface de linha de comando
  ```bash
  npm run cli
  ```

- **`npm run test`** - Executa os testes da aplicação
  ```bash
  npm run test
  ```

- **`npm run typecheck`** - Verifica tipos TypeScript sem compilar
  ```bash
  npm run typecheck
  ```

## 📁 Estrutura do Projeto

```
notas-api/
├── src/                    # Código-fonte em TypeScript
│   ├── index.ts           # Ponto de entrada principal
│   └── cli.ts             # Interface de linha de comando
├── dist/                  # Output compilado (gerado)
├── package.json           # Dependências e scripts
├── tsconfig.json          # Configuração TypeScript
├── .gitignore             # Arquivo de exclusão Git
└── README.md              # Este arquivo
```

## 🔧 Configuração

### TypeScript
O projeto está configurado com:
- **Target**: ES2022
- **Module**: NodeNext (ESM)
- **Strict Mode**: Ativado
- **Output**: `dist/`
- **Source**: `src/`

### Dependências

**Produção:**
- `zod` - Validação e parsing de esquemas TypeScript-first

**Desenvolvimento:**
- `typescript` - Compilador TypeScript
- `tsx` - Executor TypeScript direto
- `@types/node` - Tipos para Node.js

## 🎯 Como Começar

1. Crie seus arquivos TypeScript em `src/`
2. Execute o typecheck para validar:
   ```bash
   npm run typecheck
   ```
3. Inicie o desenvolvimento:
   ```bash
   npm run dev
   ```

## 📝 Notas

- O projeto usa **ESM** (ES Modules), não CommonJS
- Todo código deve ser validado com `npm run typecheck` antes de enviar
- Arquivos de teste devem seguir o padrão `*.test.ts`

## 📄 Licença

MIT
