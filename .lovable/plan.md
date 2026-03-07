

## Plano de Correções

### 1. Não mostrar resposta correta quando errar (CaseScreen.tsx)

**Problema:** Na linha 81, quando `showFeedback` é true, a alternativa correta recebe a classe `option-card-correct` mesmo quando o usuário errou.

**Solução:** Só aplicar `option-card-correct` quando `isCorrect` for true. Quando errar, apenas destacar a alternativa errada em vermelho.

**Arquivo:** `src/components/game/CaseScreen.tsx`, linhas 80-82
- Mudar a lógica para: se errou, só mostrar a seleção errada (vermelho), sem revelar a correta.

### 2. Embaralhar as letras no Cofre (VaultScreen.tsx + LetterTracker)

**Problema:** O `LetterTracker` no cofre mostra as letras na ordem correta (P-R-E-V-I-N-A), entregando a resposta.

**Solução:** Na tela do cofre, exibir as letras coletadas em ordem embaralhada (aleatória) ao invés de na ordem correta. Criar uma versão embaralhada do array `collectedLetters` para passar ao `LetterTracker` ou mostrar um componente alternativo que exiba as letras fora de ordem.

**Arquivo:** `src/components/game/VaultScreen.tsx`
- Embaralhar as letras coletadas antes de exibi-las no cofre, mostrando-as como "letras disponíveis" sem indicar a posição correta.

### 3. Tela de transição Fase 2 → Fase 3 com campo de código (DashboardScreen.tsx)

**Problema:** Ao completar todos os pacientes da Fase 2, não há uma tela intermediária (como o cofre da Fase 1) para o usuário inserir um código antes de avançar para a Fase 3.

**Solução:** Adicionar uma tela intermediária (ou seção no dashboard) quando `allPhase2Done && phase === 2`, similar ao botão do cofre na Fase 1. Criar um componente `Phase2VaultScreen` onde o usuário deve inserir os scores de Braden obtidos (ou um código derivado deles) para desbloquear a Fase 3.

**Arquivos:**
- `src/components/game/DashboardScreen.tsx` — Adicionar botão "Avançar para Fase 3" quando phase 2 completar (similar ao botão do cofre)
- Criar novo componente `src/components/game/Phase2TransitionScreen.tsx` com campo para inserir os números/códigos obtidos na Fase 2
- `src/pages/Index.tsx` — Adicionar novo case para a tela de transição
- `src/hooks/useGameState.ts` — Adicionar screen type e estado para a transição

