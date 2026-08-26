import React, { useMemo } from "react";
import { Lock, Unlock, ArrowLeft, PartyPopper } from "lucide-react";

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
  // Scramble collected letters so they don't reveal the answer
  const scrambledLetters = useMemo(() => {
    const filled = collectedLetters.filter((l): l is string => l !== null);
    // Fisher-Yates shuffle
    const shuffled = [...filled];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, [collectedLetters]);

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
                Você concluiu sua primeira visita aos pacientes e reuniu todas as pistas. Agora, é hora de transformar sua avaliação em cuidado. A supervisora de enfermagem se aproxima e pergunta:
              </p>
              <p className="text-foreground font-semibold italic mb-6">
                "Enfermeiro(a), você identificou os riscos e as necessidades dos seus pacientes. Qual estratégia guiará suas ações para prevenir lesões por pressão ao longo deste plantão?"
              </p>
              <p className="text-foreground mb-4">
                Organize as letras que você conquistou e descubra o acrônimo que reúne as principais medidas para prevenção de LPP. Cada letra representa um cuidado que você identificou durante a visita. Coloque-as na ordem correta para revelar a estratégia que deverá ser implementada durante o plantão.
              </p>
              <p className="text-muted-foreground text-sm font-semibold">
                Organize as pistas. O plantão está só começando.
              </p>
            </div>

            <div className="mb-4">
              <p className="text-xs font-medium text-muted-foreground mb-2">Letras coletadas (embaralhadas):</p>
              <div className="flex items-center justify-center gap-2">
                {scrambledLetters.map((letter, i) => (
                  <div
                    key={i}
                    className="letter-slot text-sm w-8 h-9 letter-slot-filled"
                  >
                    {letter}
                  </div>
                ))}
              </div>
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
              Parabéns!! Processo de enfermagem em andamento!!!
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
              Continuar para Fase 2
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VaultScreen;
