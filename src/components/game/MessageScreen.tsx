import React from "react";
import { AlertTriangle, Shield, ArrowRight } from "lucide-react";

interface MessageScreenProps {
  onNext: () => void;
}

const MessageScreen: React.FC<MessageScreenProps> = ({ onNext }) => {
  return (
    <div className="p-8 animate-fadeIn">
      <div className="hospital-header rounded-t-lg -mx-8 -mt-8 mb-8">
        <AlertTriangle className="w-6 h-6" />
        <span className="font-bold">Alerta do Sistema</span>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        <div className="hospital-card border-l-4 border-l-accent">
          <div className="flex items-start gap-3">
            <Shield className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-bold text-foreground mb-4">
                Bem-vindo ao Plantão
              </h2>
              <p className="text-foreground leading-relaxed mb-4">
                Você é o enfermeiro responsável por 5 pacientes de média complexidade.
              </p>
              <p className="text-foreground leading-relaxed mb-4">
                Ao analisar as informações deixadas na passagem de plantão, seu alerta é imediato: há pacientes em risco de desenvolver ou agravar lesões por pressão (LPP). É preciso agir antes que o plantão termine.
              </p>
              <p className="text-foreground leading-relaxed font-semibold">
                Sua missão é identificar os riscos, encontrar as pistas e tomar as decisões necessárias para proteger seus pacientes.
              </p>
              <p className="text-foreground leading-relaxed font-semibold">
                Cada decisão correta libera uma letra da senha final. Ao reunir todas as letras, você descobrirá o mnemônico que encerra o desafio.
              </p>
            </div>
          </div>
        </div>

        <div className="hospital-card bg-muted/50">
          <p className="text-muted-foreground text-sm italic">
            Após ler os prontuários você opta por realizar a visita de enfermagem…
          </p>
        </div>

        <div className="flex justify-center pt-4">
          <button onClick={onNext} className="hospital-btn-primary flex items-center gap-2 text-lg">
            Iniciar visita de enfermagem
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageScreen;
