import React from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, XCircle, HelpCircle } from "lucide-react";
import { PHASE2_WORD_ANSWER } from "@/data/gameData";

interface Phase2WordScreenProps {
  wordInput: string;
  wordChecked: boolean;
  wordCorrect: boolean;
  onInputChange: (val: string) => void;
  onCheck: () => void;
  onBack: () => void;
  onContinue: () => void;
}

const Phase2WordScreen: React.FC<Phase2WordScreenProps> = ({
  wordInput,
  wordChecked,
  wordCorrect,
  onInputChange,
  onCheck,
  onBack,
  onContinue,
}) => {
  return (
    <div className="p-8 animate-fadeIn">
      <div className="hospital-header rounded-t-lg -mx-8 -mt-8 mb-8">
        <button onClick={onBack} className="hover:opacity-80">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="font-bold">Pré-Fase 2 — Avaliação do Risco</span>
      </div>

      <div className="max-w-lg mx-auto text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
          <HelpCircle className="w-10 h-10 text-primary" />
        </div>

        <div>
          <h2 className="text-xl font-bold text-foreground mb-3">
            Hora de finalizar a classificação de risco para Lesão por Pressão
          </h2>
          <p className="text-muted-foreground text-sm">
            Você já identificou os principais riscos durante a visita. Agora precisa transformar as
            informações clínicas em uma classificação objetiva de risco.
          </p>
          <p className="text-muted-foreground text-sm mt-2">
            Este é o último passo antes de iniciar a Fase 2.
          </p>
        </div>

        <div className="hospital-card text-left text-sm text-foreground italic">
          "Qual escala devemos utilizar para classificar o risco de desenvolvimento de Lesão por Pressão?"
          <p className="text-right mt-1 not-italic text-xs text-muted-foreground">— Supervisora de Enfermagem</p>
        </div>

        <div>
          <label className="text-sm font-medium text-foreground block mb-2">
            Complete a palavra: <span className="font-mono">ESCALA DE ______</span>
          </label>
          <input
            type="text"
            value={wordInput}
            onChange={(e) => onInputChange(e.target.value)}
            maxLength={PHASE2_WORD_ANSWER.length}
            className={`w-64 text-center text-2xl font-mono tracking-[0.3em] p-3 rounded-lg border-2 bg-card text-foreground focus:outline-none ${
              wordChecked && wordCorrect ? "border-success" :
              wordChecked && !wordCorrect ? "border-destructive" :
              "border-border focus:border-primary"
            }`}
            placeholder="______"
          />
        </div>

        {wordChecked && wordCorrect && (
          <div className="flex items-center justify-center gap-2 text-success font-semibold">
            <CheckCircle2 className="w-5 h-5" />
            Correto! Escala de Braden.
          </div>
        )}
        {wordChecked && !wordCorrect && (
          <div className="flex items-center justify-center gap-2 text-destructive font-semibold text-sm">
            <XCircle className="w-5 h-5" />
            Ainda não é essa. Tente novamente.
          </div>
        )}

        {!(wordChecked && wordCorrect) ? (
          <button
            onClick={onCheck}
            disabled={wordInput.length === 0}
            className={`hospital-btn-accent ${wordInput.length === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            Digite a resposta para continuar
          </button>
        ) : (
          <button onClick={onContinue} className="hospital-btn-primary flex items-center gap-2 mx-auto">
            Iniciar Fase 2
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Phase2WordScreen;
