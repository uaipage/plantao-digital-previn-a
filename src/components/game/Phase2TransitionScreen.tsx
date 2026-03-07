import React, { useState, useMemo } from "react";
import { Lock, Unlock, ArrowLeft, ArrowRight, Calculator } from "lucide-react";
import { patients } from "@/data/gameData";

interface Phase2TransitionScreenProps {
  phase2BradenInputs: Record<number, Record<string, number>>;
  onBack: () => void;
  onContinuePhase3: () => void;
}

const Phase2TransitionScreen: React.FC<Phase2TransitionScreenProps> = ({
  phase2BradenInputs,
  onBack,
  onContinuePhase3,
}) => {
  const [inputs, setInputs] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);

  // Expected totals from each patient's Braden score
  const expectedTotals = useMemo(() => {
    return patients.map(p => ({
      id: p.id,
      name: p.name,
      bed: p.bed,
      total: p.braden.total,
    }));
  }, []);

  const handleCheck = () => {
    setSubmitted(true);
    const allCorrect = expectedTotals.every(
      (p) => parseInt(inputs[p.id] || "0", 10) === p.total
    );
    setSuccess(allCorrect);
  };

  return (
    <div className="p-8 animate-fadeIn">
      <div className="hospital-header rounded-t-lg -mx-8 -mt-8 mb-8">
        <button onClick={onBack} className="hover:opacity-80">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="font-bold">📊 Relatório de Avaliação Braden</span>
      </div>

      <div className="max-w-lg mx-auto text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
          {success ? (
            <Unlock className="w-10 h-10 text-success" />
          ) : (
            <Calculator className="w-10 h-10 text-primary" />
          )}
        </div>

        {!success ? (
          <>
            <div>
              <h2 className="text-xl font-bold text-foreground mb-2">
                Consolidação dos Scores de Braden
              </h2>
              <p className="text-muted-foreground text-sm">
                Insira o score total de Braden que você calculou para cada paciente na Fase 2.
              </p>
            </div>

            <div className="space-y-3 text-left">
              {expectedTotals.map((p) => {
                const val = inputs[p.id] || "";
                const isWrong = submitted && parseInt(val || "0", 10) !== p.total;
                return (
                  <div key={p.id} className="hospital-card flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-mono text-muted-foreground">{p.bed}</p>
                      <p className="font-semibold text-foreground text-sm">{p.name}</p>
                    </div>
                    <input
                      type="number"
                      value={val}
                      onChange={(e) => setInputs(prev => ({ ...prev, [p.id]: e.target.value }))}
                      className={`w-20 text-center text-lg font-mono p-2 rounded-lg border-2 bg-card text-foreground focus:outline-none ${
                        isWrong ? "border-destructive" : "border-border focus:border-primary"
                      }`}
                      placeholder="?"
                      min={6}
                      max={23}
                    />
                  </div>
                );
              })}
            </div>

            {submitted && !success && (
              <p className="text-destructive text-sm">
                Alguns scores estão incorretos. Revise os valores e tente novamente.
              </p>
            )}

            <button
              onClick={handleCheck}
              className="hospital-btn-accent"
            >
              Verificar Scores
            </button>
          </>
        ) : (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">
              ✅ Scores confirmados com sucesso!
            </h2>
            <p className="text-foreground">
              Todos os scores de Braden estão corretos. Você está pronto para a fase de tratamento.
            </p>
            <button onClick={onContinuePhase3} className="hospital-btn-primary flex items-center gap-2 mx-auto">
              Continuar para Fase 3 — Tratamento
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Phase2TransitionScreen;
