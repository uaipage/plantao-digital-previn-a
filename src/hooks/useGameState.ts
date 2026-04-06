import { useState, useCallback } from "react";
import { patients, PREVINA_ORDER } from "@/data/gameData";

export type GameScreen =
  | "intro"
  | "message"
  | "dashboard"
  | "case"
  | "vault"
  | "phase2"
  | "phase2-patient"
  | "phase2-transition"
  | "phase3"
  | "phase3-patient"
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
    setState(prev => ({
      ...prev,
      phase2BradenInputs: {
        ...prev.phase2BradenInputs,
        [patientId]: {
          ...(prev.phase2BradenInputs[patientId] || {}),
          [category]: score,
        },
      },
    }));
  }, []);

  const confirmBraden = useCallback((patientId: number) => {
    setState(prev => {
      const patient = patients.find(p => p.id === patientId);
      if (!patient) return prev;
      const inputs = prev.phase2BradenInputs[patientId] || {};
      const isCorrect = ["sensoryPerception", "moisture", "activity", "mobility", "nutrition", "frictionShear"]
        .every(key => inputs[key] === patient.braden[key as keyof typeof patient.braden]);

      const newCompleted = new Set(prev.phase2Completed);
      if (isCorrect) {
        newCompleted.add(patientId);
      }
      return {
        ...prev,
        phase2Completed: newCompleted,
        phase2ShowFeedback: { ...prev.phase2ShowFeedback, [patientId]: true },
        phase2IsCorrect: { ...prev.phase2IsCorrect, [patientId]: isCorrect },
      };
    });
  }, []);

  const retryBraden = useCallback((patientId: number) => {
    setState(prev => ({
      ...prev,
      phase2BradenInputs: { ...prev.phase2BradenInputs, [patientId]: {} },
      phase2ShowFeedback: { ...prev.phase2ShowFeedback, [patientId]: false },
      phase2IsCorrect: { ...prev.phase2IsCorrect, [patientId]: false },
    }));
  }, []);

  const togglePhase3Product = useCallback((patientId: number, product: string) => {
    setState(prev => {
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
      };
    });
  }, []);

  const confirmPhase3 = useCallback((patientId: number) => {
    setState(prev => {
      const patient = patients.find(p => p.id === patientId);
      if (!patient) return prev;
      const selected = prev.phase3Selections[patientId] || [];
      const hasAllCorrect = patient.correctTreatments.every(t =>
        selected.some(s => s.toLowerCase().includes(t.toLowerCase()) || t.toLowerCase().includes(s.toLowerCase()))
      );
      const hasNoExtra = selected.every(s =>
        patient.correctTreatments.some(t => s.toLowerCase().includes(t.toLowerCase()) || t.toLowerCase().includes(s.toLowerCase()))
      );
      const isCorrect = hasAllCorrect && hasNoExtra;

      const newCompleted = new Set(prev.phase3Completed);
      if (isCorrect) {
        newCompleted.add(patientId);
      }
      return {
        ...prev,
        phase3Completed: newCompleted,
        phase3ShowFeedback: { ...prev.phase3ShowFeedback, [patientId]: true },
        phase3IsCorrect: { ...prev.phase3IsCorrect, [patientId]: isCorrect },
      };
    });
  }, []);

  const retryPhase3 = useCallback((patientId: number) => {
    setState(prev => ({
      ...prev,
      phase3Selections: { ...prev.phase3Selections, [patientId]: [] },
      phase3ShowFeedback: { ...prev.phase3ShowFeedback, [patientId]: false },
      phase3IsCorrect: { ...prev.phase3IsCorrect, [patientId]: false },
    }));
  }, []);

  const setPhase = useCallback((phase: 1 | 2 | 3) => {
    setState(prev => ({ ...prev, phase }));
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
  };
}

function getLettersForPatient(patientId: number): string[] {
  switch (patientId) {
    case 201: return ["P"];
    case 202: return ["R", "A"]; // gives R(pos1) and A(pos6)
    case 203: return ["E"];
    case 204: return ["I"];
    case 205: return ["V"];
    case 206: return ["N"];
    default: return [];
  }
}

function getPositionsForPatient(patientId: number): number[] {
  // PREVINA positions: P=0, R=1, E=2, V=3, I=4, N=5, A=6
  switch (patientId) {
    case 201: return [0];    // P
    case 202: return [1, 6]; // R, A
    case 203: return [2];    // E
    case 204: return [4];    // I
    case 205: return [3];    // V
    case 206: return [5];    // N
    default: return [];
  }
}
