import React from "react";
import { PatientCase } from "@/data/gameData";
import { ArrowLeft, CheckCircle2, XCircle, RotateCcw, ArrowRight } from "lucide-react";
import LetterTracker from "./LetterTracker";
import SbarSidebar from "./SbarSidebar";

interface CaseScreenProps {
  patient: PatientCase;
  selectedOption: number | null;
  showFeedback: boolean;
  isCorrect: boolean | null;
  collectedLetters: (string | null)[];
  onSelectOption: (index: number) => void;
  onConfirm: () => void;
  onRetry: () => void;
  onBack: () => void;
}

const CaseScreen: React.FC<CaseScreenProps> = ({
  patient,
  selectedOption,
  showFeedback,
  isCorrect,
  collectedLetters,
  onSelectOption,
  onConfirm,
  onRetry,
  onBack,
}) => {
  return (
    <div className="p-4 md:p-6 animate-fadeIn">
      <SbarSidebar patient={patient} />

      <div className="hospital-header rounded-t-lg -mx-4 -mt-4 mb-5 md:-mx-6 md:-mt-6 md:mb-6">
        <button onClick={onBack} className="hover:opacity-80">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="font-bold text-sm md:text-base leading-tight">{patient.bed} — {patient.name}</span>
        <div className="ml-auto">
          <LetterTracker collectedLetters={collectedLetters} />
        </div>
      </div>

      <div className="max-w-3xl mx-auto space-y-5">
        {/* Patient ID */}
        <div className="hospital-card">
          <h3 className="font-bold text-foreground mb-1">{patient.name}, {patient.age} anos</h3>
          <p className="text-sm text-muted-foreground">{patient.diagnosis}</p>
        </div>

        <div className="hospital-card border-dashed border-primary/40 bg-primary/5">
          <p className="text-sm text-foreground">
            Clique na aba <strong>Ficha SBAR</strong> na lateral direita para abrir ou minimizar os dados do paciente a qualquer momento.
          </p>
        </div>

        {/* Scenario */}
        <div className="hospital-card border-l-4 border-l-accent">
          <h4 className="font-bold text-foreground mb-2">📋 Cenário</h4>
          <p className="text-sm text-foreground">{patient.scenario}</p>
        </div>

        {/* Enigma */}
        <div>
          <h4 className="font-bold text-foreground mb-3">🧩 {patient.enigmaTitle}</h4>
          <div className="space-y-3">
            {patient.options.map((option, i) => {
              let cardClass = "option-card";
              if (showFeedback) {
                if (isCorrect && i === patient.correctAnswer) cardClass = "option-card option-card-correct";
                else if (i === selectedOption && !isCorrect) cardClass = "option-card option-card-wrong";
              } else if (selectedOption === i) {
                cardClass = "option-card option-card-selected";
              }

              return (
                <div
                  key={i}
                  onClick={() => onSelectOption(i)}
                  className={cardClass}
                >
                  <div className="flex gap-3">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                      selectedOption === i ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}>
                      {option.label}
                    </span>
                    <p className="text-sm text-foreground">{option.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Confirm / Feedback */}
        {!showFeedback && (
          <div className="flex justify-center">
            <button
              onClick={onConfirm}
              disabled={selectedOption === null}
              className={`hospital-btn-primary ${selectedOption === null ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              Confirmar resposta
            </button>
          </div>
        )}

        {showFeedback && (
          <div className={`hospital-card border-l-4 ${isCorrect ? "border-l-success" : "border-l-destructive"}`}>
            <div className="flex items-start gap-3">
              {isCorrect ? (
                <CheckCircle2 className="w-6 h-6 text-success flex-shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-6 h-6 text-destructive flex-shrink-0 mt-0.5" />
              )}
              <div>
                <h4 className="font-bold text-foreground mb-2">
                  {isCorrect ? "✅ Resposta Correta!" : "❌ Resposta Incorreta"}
                </h4>
                <p className="text-sm text-foreground leading-relaxed">
                  {isCorrect
                    ? patient.successMessage
                    : selectedOption !== null
                    ? patient.wrongExplanations[selectedOption]
                    : ""}
                </p>
              </div>
            </div>

            <div className="flex justify-end mt-4 gap-3">
              {!isCorrect && (
                <button onClick={onRetry} className="hospital-btn-primary flex items-center gap-2">
                  <RotateCcw className="w-4 h-4" />
                  Tentar novamente
                </button>
              )}
              {isCorrect && (
                <button onClick={onBack} className="hospital-btn-primary flex items-center gap-2">
                  Voltar ao Dashboard
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CaseScreen;
