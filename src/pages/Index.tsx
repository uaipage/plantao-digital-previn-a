import React from "react";
import { patients } from "@/data/gameData";
import { useGameState } from "@/hooks/useGameState";
import LaptopFrame from "@/components/game/LaptopFrame";
import IntroScreen from "@/components/game/IntroScreen";
import MessageScreen from "@/components/game/MessageScreen";
import DashboardScreen from "@/components/game/DashboardScreen";
import CaseScreen from "@/components/game/CaseScreen";
import VaultScreen from "@/components/game/VaultScreen";
import BradenScreen from "@/components/game/BradenScreen";
import TreatmentScreen from "@/components/game/TreatmentScreen";
import Phase2TransitionScreen from "@/components/game/Phase2TransitionScreen";
import CompleteScreen from "@/components/game/CompleteScreen";

const Index = () => {
  const {
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
  } = useGameState();

  const currentPatient = patients.find(p => p.id === state.currentPatientId);
  const collectedLetters = getCollectedLettersArray();

  const renderScreen = () => {
    switch (state.screen) {
      case "intro":
        return <IntroScreen onNext={() => goTo("message")} />;

      case "message":
        return <MessageScreen onNext={() => goTo("dashboard")} />;

      case "dashboard":
        return (
          <DashboardScreen
            completedPatients={state.completedPatients}
            collectedLetters={collectedLetters}
            onSelectPatient={(id) => goTo("case", id)}
            onGoToVault={() => goTo("vault")}
            onGoToPhase2Transition={() => goTo("phase2-transition")}
            phase={state.phase}
            onChangePhase={(p) => {
              setPhase(p);
              goTo("dashboard");
            }}
            phase2Completed={state.phase2Completed}
            phase3Completed={state.phase3Completed}
            onSelectPhase2Patient={(id) => goTo("phase2-patient", id)}
            onSelectPhase3Patient={(id) => goTo("phase3-patient", id)}
          />
        );

      case "case":
        if (!currentPatient) return null;
        return (
          <CaseScreen
            patient={currentPatient}
            selectedOption={state.selectedOption}
            showFeedback={state.showFeedback}
            isCorrect={state.isCorrect}
            collectedLetters={collectedLetters}
            onSelectOption={selectOption}
            onConfirm={confirmAnswer}
            onRetry={retryQuestion}
            onBack={() => goTo("dashboard")}
          />
        );

      case "vault":
        return (
          <VaultScreen
            collectedLetters={collectedLetters}
            vaultInput={state.vaultInput}
            vaultSuccess={state.vaultSuccess}
            onInputChange={setVaultInput}
            onCheck={checkVault}
            onBack={() => goTo("dashboard")}
            onContinuePhase2={() => {
              setPhase(2);
              goTo("dashboard");
            }}
          />
        );

      case "phase2-patient":
        if (!currentPatient) return null;
        return (
          <BradenScreen
            patient={currentPatient}
            inputs={state.phase2BradenInputs[currentPatient.id] || {}}
            isCompleted={state.phase2Completed.has(currentPatient.id)}
            showFeedback={state.phase2ShowFeedback[currentPatient.id] || false}
            isCorrect={state.phase2IsCorrect[currentPatient.id] || false}
            onSetInput={(cat, score) => setBradenInput(currentPatient.id, cat, score)}
            onConfirm={() => confirmBraden(currentPatient.id)}
            onRetry={() => retryBraden(currentPatient.id)}
            onBack={() => goTo("dashboard")}
          />
        );

      case "phase2-transition":
        return (
          <Phase2TransitionScreen
            phase2BradenInputs={state.phase2BradenInputs}
            onBack={() => goTo("dashboard")}
            onContinuePhase3={() => {
              setPhase(3);
              goTo("dashboard");
            }}
          />
        );

      case "phase3-patient":
        if (!currentPatient) return null;
        return (
          <TreatmentScreen
            patient={currentPatient}
            selectedProducts={state.phase3Selections[currentPatient.id] || []}
            isCompleted={state.phase3Completed.has(currentPatient.id)}
            showFeedback={state.phase3ShowFeedback[currentPatient.id] || false}
            isCorrect={state.phase3IsCorrect[currentPatient.id] || false}
            onToggleProduct={(p) => togglePhase3Product(currentPatient.id, p)}
            onConfirm={() => confirmPhase3(currentPatient.id)}
            onRetry={() => retryPhase3(currentPatient.id)}
            onBack={() => goTo("dashboard")}
          />
        );

      case "complete":
        return <CompleteScreen />;

      default:
        return <IntroScreen onNext={() => goTo("message")} />;
    }
  };

  return (
    <LaptopFrame>
      {renderScreen()}
    </LaptopFrame>
  );
};

export default Index;
