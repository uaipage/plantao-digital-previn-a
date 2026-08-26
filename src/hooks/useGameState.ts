import { useState, useCallback } from "react";
import { patients, PREVINA_ORDER, PHASE2_WORD_ANSWER } from "@/data/gameData";

export type GameScreen =
  | "intro"
  | "message"
  | "dashboard"
  | "case"
  | "vault"
  | "phase2"
  | "phase2-word"
  | "phase2-patient"
  | "phase2-transition"
  | "phase3"
  | "phase3-transition"
  | "phase3-patient"
  | "final-challenge"
  | "complete";

export interface GameState {
  screen: GameScreen;
  currentPatientId: number | null;
  completedPatients: Set<number>;
  collectedLetters: Map<number, string[]>; // patientId -> letters
  selectedOption: number | null;
  showFeedback: boolean;
  isCorrect: boolean | null;
  phase: 1 | 2 | 3;
  phase2Completed: Set<number>;
  phase3Completed: Set<number>;
  vaultInput: string;
  vaultSuccess: boolean;
  phase2BradenInputs: Record<number, Record<string, number>>;
  phase3Selections: Record<number, string[]>;
  phase2ShowFeedback: Record<number, boolean>;
  phase2IsCorrect: Record<number, boolean>;
  phase3ShowFeedback: Record<number, boolean>;
  phase3IsCorrect: Record<number, boolean>;
  // Categories/products already answered correctly, preserved across retries ("fica verde")
  phase2LockedFields: Record<number, Set<string>>;
  phase3LockedProducts: Record<number, Set<string>>;
  // Fase 2 intro: "Complete a palavra"
  phase2WordInput: string;
  phase2WordChecked: boolean;
  phase2WordCorrect: boolean;
}

export function useGameState() {
  const [state, setState] = useState<GameState>({
    screen: "intro",
    currentPatientId: null,
    completedPatients: new Set(),
    collectedLetters: new Map(),
    selectedOption: null,
    showFeedback: false,
    isCorrect: null,
    phase: 1,
    phase2Completed: new Set(),
    phase3Completed: new Set(),
    vaultInput: "",
    vaultSuccess: false,
    phase2BradenInputs: {},
    phase3Selections: {},
    phase2ShowFeedback: {},
    phase2IsCorrect: {},
    phase3ShowFeedback: {},
    phase3IsCorrect: {},
    phase2LockedFields: {},
    phase3LockedProducts: {},
    phase2WordInput: "",
    phase2WordChecked: false,
    phase2WordCorrect: false,
  });

  const goTo = useCallback((screen: GameScreen, patientId?: number) => {
    setState(prev => ({
      ...prev,
      screen,
      currentPatientId: patientId ?? prev.currentPatientId,
      selectedOption: null,
      showFeedback: false,
      isCorrect: null,
    }));
  }, []);

  const selectOption = useCallback((index: number) => {
    setState(prev => prev.showFeedback ? prev : { ...prev, selectedOption: index });
  }, []);

  const confirmAnswer = useCallback(() => {
    setState(prev => {
      if (prev.selectedOption === null || !prev.currentPatientId) return prev;
      const patient = patients.find(p => p.id === prev.currentPatientId);
      if (!patient) return prev;
      const correct = prev.selectedOption === patient.correctAnswer;
      const newLetters = new Map(prev.collectedLetters);
      const newCompleted = new Set(prev.completedPatients);

      if (correct) {
        // Determine which letters this patient gives
        const lettersForPatient = getLettersForPatient(patient.id);
        newLetters.set(patient.id, lettersForPatient);
        newCompleted.add(patient.id);
      }

      return {
        ...prev,
        showFeedback: true,
        isCorrect: correct,
        collectedLetters: newLetters,
        completedPatients: newCompleted,
      };
    });
  }, []);

  const retryQuestion = useCallback(() => {
    setState(prev => ({
      ...prev,
      selectedOption: null,
      showFeedback: false,
      isCorrect: null,
    }));
  }, []);

  const getCollectedLettersArray = useCallback((): (string | null)[] => {
    // PREVINA = 7 letters
    const result: (string | null)[] = Array(7).fill(null);
    state.collectedLetters.forEach((letters, patientId) => {
      const positions = getPositionsForPatient(patientId);
      positions.forEach((pos, i) => {
        if (i < letters.length) {
          result[pos] = letters[i];
        }
      });
    });
    return result;
  }, [state.collectedLetters]);

  const setVaultInput = useCallback((val: string) => {
    setState(prev => ({ ...prev, vaultInput: val.toUpperCase() }));
  }, []);

  const checkVault = useCallback(() => {
    setState(prev => ({
      ...prev,
      vaultSuccess: prev.vaultInput === "PREVINA",
    }));
  }, []);

  const setBradenInput = useCallback((patientId: number, category: string, score: number) => {
    setState(prev => {
      const locked = prev.phase2LockedFields[patientId];
      if (locked && locked.has(category)) return prev; // já acertou essa categoria, não permite alterar
      return {
        ...prev,
        phase2BradenInputs: {
          ...prev.phase2BradenInputs,
          [patientId]: {
            ...(prev.phase2BradenInputs[patientId] || {}),
            [category]: score,
          },
        },
      };
    });
  }, []);

  const BRADEN_KEYS = ["sensoryPerception", "moisture", "activity", "mobility", "nutrition", "frictionShear"] as const;

  const confirmBraden = useCallback((patientId: number) => {
    setState(prev => {
      const patient = patients.find(p => p.id === patientId);
      if (!patient) return prev;
      const inputs = prev.phase2BradenInputs[patientId] || {};
      const isCorrect = BRADEN_KEYS.every(key => inputs[key] === patient.braden[key as keyof typeof patient.braden]);

      const newCompleted = new Set(prev.phase2Completed);
      if (isCorrect) {
        newCompleted.add(patientId);
      }

      // Mantém como "acertada" (verde) qualquer categoria já respondida corretamente,
      // mesmo que o restante da avaliação esteja errado.
      const newLocked = new Set(prev.phase2LockedFields[patientId] || []);
      BRADEN_KEYS.forEach(key => {
        if (inputs[key] === patient.braden[key as keyof typeof patient.braden]) newLocked.add(key);
      });

      return {
        ...prev,
        phase2Completed: newCompleted,
        phase2ShowFeedback: { ...prev.phase2ShowFeedback, [patientId]: true },
        phase2IsCorrect: { ...prev.phase2IsCorrect, [patientId]: isCorrect },
        phase2LockedFields: { ...prev.phase2LockedFields, [patientId]: newLocked },
      };
    });
  }, []);

  const retryBraden = useCallback((patientId: number) => {
    setState(prev => {
      const locked = prev.phase2LockedFields[patientId] || new Set<string>();
      const currentInputs = prev.phase2BradenInputs[patientId] || {};
      const preserved: Record<string, number> = {};
      locked.forEach(key => {
        if (currentInputs[key] !== undefined) preserved[key] = currentInputs[key];
      });
      return {
        ...prev,
        phase2BradenInputs: { ...prev.phase2BradenInputs, [patientId]: preserved },
        phase2ShowFeedback: { ...prev.phase2ShowFeedback, [patientId]: false },
        phase2IsCorrect: { ...prev.phase2IsCorrect, [patientId]: false },
      };
    });
  }, []);

  const togglePhase3Product = useCallback((patientId: number, product: string) => {
    setState(prev => {
      if (prev.phase3Completed.has(patientId)) return prev;
      const locked = prev.phase3LockedProducts[patientId];
      if (locked && locked.has(product)) return prev; // produto já confirmado como correto, mantém selecionado
      const current = prev.phase3Selections[patientId] || [];
      const newSelections = current.includes(product)
        ? current.filter(p => p !== product)
        : [...current, product];
      return {
        ...prev,
        phase3Selections: {
          ...prev.phase3Selections,
          [patientId]: newSelections,
        },
        phase3ShowFeedback: { ...prev.phase3ShowFeedback, [patientId]: false },
        phase3IsCorrect: { ...prev.phase3IsCorrect, [patientId]: false },
      };
    });
  }, []);

  const confirmPhase3 = useCallback((patientId: number) => {
    setState(prev => {
      const patient = patients.find(p => p.id === patientId);
      if (!patient) return prev;
      const selected = prev.phase3Selections[patientId] || [];
      const correctSet = new Set(patient.correctTreatments);
      const selectedSet = new Set(selected);
      const isCorrect =
        selectedSet.size === correctSet.size &&
        [...correctSet].every(t => selectedSet.has(t));

      const newCompleted = new Set(prev.phase3Completed);
      if (isCorrect) {
        newCompleted.add(patientId);
      }

      // Produtos selecionados corretamente ficam travados (verdes) e não somem em uma nova tentativa.
      const newLocked = new Set(prev.phase3LockedProducts[patientId] || []);
      selected.forEach(p => {
        if (correctSet.has(p)) newLocked.add(p);
      });

      return {
        ...prev,
        phase3Completed: newCompleted,
        phase3ShowFeedback: { ...prev.phase3ShowFeedback, [patientId]: true },
        phase3IsCorrect: { ...prev.phase3IsCorrect, [patientId]: isCorrect },
        phase3LockedProducts: { ...prev.phase3LockedProducts, [patientId]: newLocked },
      };
    });
  }, []);

  const retryPhase3 = useCallback((patientId: number) => {
    setState(prev => {
      const locked = prev.phase3LockedProducts[patientId] || new Set<string>();
      return {
        ...prev,
        phase3Selections: { ...prev.phase3Selections, [patientId]: [...locked] },
        phase3ShowFeedback: { ...prev.phase3ShowFeedback, [patientId]: false },
        phase3IsCorrect: { ...prev.phase3IsCorrect, [patientId]: false },
      };
    });
  }, []);

  const setPhase = useCallback((phase: 1 | 2 | 3) => {
    setState(prev => ({ ...prev, phase }));
  }, []);

  // --- Fase 2 intro: "Complete a palavra" ---
  const setPhase2WordInput = useCallback((val: string) => {
    setState(prev => ({ ...prev, phase2WordInput: val.toUpperCase(), phase2WordChecked: false }));
  }, []);

  const checkPhase2Word = useCallback(() => {
    setState(prev => {
      const correct = prev.phase2WordInput.trim().toUpperCase() === PHASE2_WORD_ANSWER;
      return { ...prev, phase2WordChecked: true, phase2WordCorrect: correct };
    });
  }, []);

  return {
    state,
    goTo,
    selectOption,
    confirmAnswer,
    retryQuestion,
    getCollectedLettersArray,
    setVaultInput,
    checkVault,
    setBradenInput,
    confirmBraden,
    retryBraden,
    togglePhase3Product,
    confirmPhase3,
    retryPhase3,
    setPhase,
    setPhase2WordInput,
    checkPhase2Word,
  };
}

function getLettersForPatient(patientId: number): string[] {
  switch (patientId) {
    case 201: return ["P", "E"];
    case 202: return ["A", "N"]; // gives A(pos6) and N(pos5)
    case 204: return ["I"];
    case 205: return ["V"];
    case 206: return ["R"];
    default: return [];
  }
}

function getPositionsForPatient(patientId: number): number[] {
  // PREVINA positions: P=0, R=1, E=2, V=3, I=4, N=5, A=6
  switch (patientId) {
    case 201: return [0, 2]; // P, E
    case 202: return [6, 5]; // A, N
    case 204: return [4];    // I
    case 205: return [3];    // V
    case 206: return [1];    // R
    default: return [];
  }
}
