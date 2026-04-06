import React, { useMemo } from "react";
import { PatientCase, BRADEN_CATEGORIES, getBradenRisk } from "@/data/gameData";
import { ArrowLeft, CheckCircle2, XCircle, RotateCcw } from "lucide-react";

interface BradenScreenProps {
  patient: PatientCase;
  inputs: Record<string, number>;
  isCompleted: boolean;
  showFeedback: boolean;
  isCorrect: boolean;
  onSetInput: (category: string, score: number) => void;
  onConfirm: () => void;
  onRetry: () => void;
  onBack: () => void;
}

const BradenScreen: React.FC<BradenScreenProps> = ({
  patient,
  inputs,
  isCompleted,
  showFeedback,
  isCorrect,
  onSetInput,
  onConfirm,
  onRetry,
  onBack,
}) => {
  const total = useMemo(() => {
    return BRADEN_CATEGORIES.reduce((sum, cat) => sum + (inputs[cat.key] || 0), 0);
  }, [inputs]);

  const allFilled = BRADEN_CATEGORIES.every(cat => inputs[cat.key] > 0);
  const isAllCorrect = useMemo(() => {
    return BRADEN_CATEGORIES.every(cat => inputs[cat.key] === patient.braden[cat.key]);
  }, [inputs, patient]);

  return (
    <div className="p-6 animate-fadeIn">
      <div className="hospital-header rounded-t-lg -mx-6 -mt-6 mb-6">
        <button onClick={onBack} className="hover:opacity-80">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="font-bold">Escala de Braden — {patient.name}</span>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        <div className="hospital-card">
          <h3 className="font-bold text-foreground">{patient.name}, {patient.age} anos</h3>
          <p className="text-sm text-muted-foreground">{patient.diagnosis}</p>
        </div>

        {/* SBAR */}
        <div className="grid grid-cols-2 gap-3">
          <div className="hospital-card">
            <h4 className="text-xs font-bold text-primary uppercase tracking-wide mb-2">S — Situação</h4>
            <p className="text-sm text-foreground">{patient.sbar.situation}</p>
          </div>
          <div className="hospital-card">
            <h4 className="text-xs font-bold text-primary uppercase tracking-wide mb-2">B — Background</h4>
            <p className="text-sm text-foreground">{patient.sbar.background}</p>
          </div>
          <div className="hospital-card">
            <h4 className="text-xs font-bold text-primary uppercase tracking-wide mb-2">A — Avaliação</h4>
            <p className="text-sm text-foreground">{patient.sbar.assessment}</p>
          </div>
          <div className="hospital-card">
            <h4 className="text-xs font-bold text-primary uppercase tracking-wide mb-2">R — Recomendação</h4>
            <p className="text-sm text-foreground">{patient.sbar.recommendation}</p>
          </div>
        </div>

        {/* Braden categories */}
        <div className="space-y-3">
          {BRADEN_CATEGORIES.map(cat => (
            <div key={cat.key} className="hospital-card">
              <h4 className="font-semibold text-foreground text-sm mb-2">{cat.name}</h4>
              <div className="flex flex-wrap gap-2">
                {cat.levels.map(level => {
                  const selected = inputs[cat.key] === level.score;
                  const isCorrectAnswer = level.score === patient.braden[cat.key];
                  const showCorrect = showFeedback && selected && isCorrectAnswer;
                  const showWrong = showFeedback && selected && !isCorrectAnswer;

                  return (
                    <button
                      key={level.score}
                      onClick={() => !showFeedback && onSetInput(cat.key, level.score)}
                      className={`text-left p-2 rounded-lg border text-xs transition-colors flex-1 min-w-[120px] ${
                        showCorrect ? "border-success bg-success/10" :
                        showWrong ? "border-destructive bg-destructive/10" :
                        selected ? "border-primary bg-primary/10" :
                        "border-border hover:border-primary/40"
                      }`}
                    >
                      <div className="font-semibold">{level.score} — {level.label}</div>
                      <div className="text-muted-foreground mt-0.5">{level.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="hospital-card flex items-center justify-between">
          <div>
            <span className="font-bold text-foreground">Total: </span>
            <span className="text-2xl font-mono font-bold text-primary">{total || "—"}</span>
            {total > 0 && (
              <span className="ml-3 text-sm font-medium text-muted-foreground">
                ({getBradenRisk(total)})
              </span>
            )}
          </div>
          {isCompleted && (
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-success" />
              <span className="text-success font-semibold text-sm">Correto!</span>
            </div>
          )}
          {showFeedback && !isCorrect && (
            <div className="flex items-center gap-2">
              <XCircle className="w-5 h-5 text-accent" />
              <span className="text-foreground text-sm">
                Resposta correta: {patient.braden.total} ({patient.braden.risk})
              </span>
            </div>
          )}
        </div>

        {!showFeedback && (
          <div className="flex justify-center">
            <button
              onClick={onConfirm}
              disabled={!allFilled}
              className={`hospital-btn-primary ${!allFilled ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              Confirmar Avaliação
            </button>
          </div>
        )}

        {showFeedback && !isCorrect && (
          <div className="space-y-3">
            <div className="hospital-card border-l-4 border-l-destructive">
              <div className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-bold text-foreground mb-1">Avaliação Incorreta</p>
                  <p className="text-foreground">Alguns valores da Escala de Braden estão incorretos. Revise as categorias marcadas em vermelho e tente novamente.</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <button onClick={onRetry} className="hospital-btn-primary flex items-center gap-2">
                <RotateCcw className="w-4 h-4" />
                Tentar novamente
              </button>
            </div>
          </div>
        )}

        {isCompleted && (
          <div className="flex justify-center">
            <button onClick={onBack} className="hospital-btn-primary">
              Voltar ao Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BradenScreen;
