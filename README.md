# Plantao Digital - PREVINA

Aplicacao web educacional (serious game) voltada para treinamento em prevencao e manejo de Lesao por Pressao (LPP) no contexto da enfermagem hospitalar.

O jogo utiliza casos clinicos simulados, tomada de decisao e feedback imediato para reforcar condutas seguras com base em avaliacao de risco, reposicionamento, controle de umidade, superficie de suporte e escolha de coberturas.

## Objetivo do projeto

Capacitar profissionais e estudantes de enfermagem para:

- identificar fatores de risco para LPP;
- aplicar condutas preventivas em cenarios clinicos;
- classificar risco com a Escala de Braden;
- selecionar produtos e estrategias adequadas de tratamento;
- consolidar o raciocinio clinico por meio de desafios progressivos.

## Como o jogo funciona

O fluxo principal e dividido em 3 fases, com desafio final:

1. Fase 1 - Casos Clinicos
	O jogador analisa pacientes, escolhe a melhor conduta e coleta letras.
2. Cofre
	As letras formam a senha PREVINA para liberar a proxima etapa.
3. Fase 2 - Escala de Braden
	O jogador pontua os dominios da escala para cada paciente e valida o risco.
4. Fase 3 - Tratamento
	Selecao de produtos/curativos corretos conforme o tipo de lesao.
5. Desafio Final
	Consolidacao dos conhecimentos trabalhados nas fases anteriores.

## Publico-alvo

- Equipes de enfermagem hospitalar
- Estudantes de enfermagem
- Programas de educacao permanente em saude

## Tecnologias utilizadas

- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui (Radix UI)
- React Router
- TanStack Query
- Vitest + Testing Library

## Requisitos

- Node.js 18+
- npm 9+

## Como executar localmente

```sh
# 1) Instalar dependencias
npm install

# 2) Rodar em desenvolvimento
npm run dev

# 3) Build de producao
npm run build

# 4) Preview da build
npm run preview
```

## Scripts disponiveis

- `npm run dev`: inicia o servidor de desenvolvimento
- `npm run build`: gera build de producao
- `npm run build:dev`: gera build em modo development
- `npm run preview`: sobe preview da build
- `npm run lint`: executa lint com ESLint
- `npm run test`: executa testes unitarios (Vitest)
- `npm run test:watch`: executa testes em modo watch

## Estrutura principal

```text
src/
  components/game/     # telas e componentes do jogo
  data/gameData.ts     # casos clinicos, regras e dados das fases
  hooks/useGameState.ts# maquina de estado e logica do jogo
  pages/Index.tsx      # orquestracao do fluxo principal
```

## Estado atual de testes

O projeto possui base de testes com Vitest configurada e um teste de exemplo em `src/test/example.test.ts`.

## Licenca

Defina aqui a licenca oficial do projeto (ex.: MIT, proprietaria institucional, etc.).
