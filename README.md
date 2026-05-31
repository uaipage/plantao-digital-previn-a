# Plantao Digital - PREVINA

Educational web application (serious game) designed to train healthcare professionals in the prevention and management of Pressure Injuries (PI) in a hospital nursing context.

The game uses simulated clinical cases, decision-making, and immediate feedback to reinforce safe practices based on risk assessment, repositioning, moisture control, support surfaces, and dressing selection.

## Project objective

Train nursing professionals and students to:

- identify PI risk factors;
- apply preventive actions in clinical scenarios;
- classify risk using the Braden Scale;
- select appropriate products and treatment strategies;
- strengthen clinical reasoning through progressive challenges.

## How the game works

The main flow is divided into 3 phases, plus a final challenge:

1. Phase 1 - Clinical Cases
	The player analyzes patients, chooses the best intervention, and collects letters.
2. Vault
	The letters form the password PREVINA to unlock the next stage.
3. Phase 2 - Braden Scale
	The player scores each domain of the scale for each patient and validates risk.
4. Phase 3 - Treatment
	Selection of the correct products/dressings based on lesion type.
5. Final Challenge
	Consolidation of knowledge covered in previous phases.

## Target audience

- Hospital nursing teams
- Nursing students
- Continuing education programs in healthcare

## Technologies used

- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui (Radix UI)
- React Router
- TanStack Query
- Vitest + Testing Library

## Requirements

- Node.js 18+
- npm 9+

## How to run locally

```sh
# 1) Install dependencies
npm install

# 2) Run in development mode
npm run dev

# 3) Production build
npm run build

# 4) Preview the build
npm run preview
```

## Available scripts

- `npm run dev`: starts the development server
- `npm run build`: generates a production build
- `npm run build:dev`: generates a build in development mode
- `npm run preview`: serves a preview of the build
- `npm run lint`: runs ESLint
- `npm run test`: runs unit tests (Vitest)
- `npm run test:watch`: runs tests in watch mode

## Main structure

```text
src/
  components/game/      # game screens and components
  data/gameData.ts      # clinical cases, rules, and phase data
  hooks/useGameState.ts # state machine and game logic
  pages/Index.tsx       # main flow orchestration
```

## Current test status

The project includes a Vitest test setup and an example test in `src/test/example.test.ts`.

## License

Define the official project license here (e.g., MIT, institutional proprietary license, etc.).
