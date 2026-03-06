import React from "react";
import { Lock, Unlock, ArrowLeft, PartyPopper } from "lucide-react";
import LetterTracker from "./LetterTracker";

interface VaultScreenProps {
  collectedLetters: (string | null)[];
  vaultInput: string;
  vaultSuccess: boolean;
  onInputChange: (val: string) => void;
  onCheck: () => void;
  onBack: () => void;
  onContinuePhase2: () => void;
}

const VaultScreen: React.FC<VaultScreenProps> = ({
  collectedLetters,
  vaultInput,
  vaultSuccess,
  onInputChange,
  onCheck,
  onBack,
  onContinuePhase2,
}) => {
  return (
    <div className="p-8 animate-fadeIn">
      <div className="hospital-header rounded-t-lg -mx-8 -mt-8 mb-8">
        <button onClick={onBack} className="hover:opacity-80">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="font-bold">🔐 Cofre Digital</span>
      </div>

      <div className="max-w-lg mx-auto text-center space-y-8">
        <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
          {vaultSuccess ? (
            <Unlock className="w-12 h-12 text-success" />
          ) : (
            <Lock className="w-12 h-12 text-primary" />
          )}
        </div>

        {!vaultSuccess ? (
          <>
            <div>
              <p className="text-foreground mb-4">
                Você reuniu todas as pistas. A supervisora de enfermagem pergunta:
              </p>
              <p className="text-foreground font-semibold italic mb-6">
                "Enfermeiro(a), qual foi a sua estratégia para proteger esses pacientes contra lesões hoje?"
              </p>
              <p className="text-muted-foreground text-sm">
                Dica: A ordem das letras segue a lógica de prevenção completa (O acrônimo ensinado).
              </p>
            </div>

            <div className="mb-4">
              <LetterTracker collectedLetters={collectedLetters} />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground block mb-2">
                Digite a senha:
              </label>
              <input
                type="text"
                value={vaultInput}
                onChange={(e) => onInputChange(e.target.value)}
                maxLength={7}
                className="w-64 text-center text-2xl font-mono tracking-[0.5em] p-3 rounded-lg border-2 border-border bg-card text-foreground focus:border-primary focus:outline-none"
                placeholder="_ _ _ _ _ _ _"
              />
            </div>

            <button
              onClick={onCheck}
              disabled={vaultInput.length < 7}
              className={`hospital-btn-accent ${vaultInput.length < 7 ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              Enviar Relatório
            </button>

            {vaultInput.length >= 7 && vaultInput !== "PREVINA" && (
              <p className="text-destructive text-sm">Senha incorreta. Tente novamente!</p>
            )}
          </>
        ) : (
          <div className="space-y-6">
            <PartyPopper className="w-16 h-16 text-accent mx-auto" />
            <h2 className="text-2xl font-bold text-foreground">
              🎉 Parabéns! Plantão concluído com sucesso!
            </h2>
            <p className="text-foreground">
              Você demonstrou conhecimento na prevenção de Lesões por Pressão. 
              A palavra <strong className="text-primary">PREVINA</strong> representa 
              as ações essenciais para proteger os pacientes.
            </p>
            <div className="hospital-card text-left space-y-1">
              <p className="text-sm"><strong>P</strong> — Posicionamento de dispositivos</p>
              <p className="text-sm"><strong>R</strong> — Reposicionamento</p>
              <p className="text-sm"><strong>E</strong> — Evitar a umidade</p>
              <p className="text-sm"><strong>V</strong> — Verificar superfície de suporte</p>
              <p className="text-sm"><strong>I</strong> — Inspeção da pele</p>
              <p className="text-sm"><strong>N</strong> — Nutrição</p>
              <p className="text-sm"><strong>A</strong> — Avaliação de risco</p>
            </div>
            <button onClick={onContinuePhase2} className="hospital-btn-primary">
              Continuar para Fase 2 — Escala de Braden
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VaultScreen;
