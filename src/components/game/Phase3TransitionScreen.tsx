import React from "react";
import { ArrowLeft, ArrowRight, ShoppingCart } from "lucide-react";

interface Phase3TransitionScreenProps {
  onBack: () => void;
  onContinue: () => void;
}

const Phase3TransitionScreen: React.FC<Phase3TransitionScreenProps> = ({
  onBack,
  onContinue,
}) => {
  return (
    <div className="p-8 animate-fadeIn">
      <div className="hospital-header rounded-t-lg -mx-8 -mt-8 mb-8">
        <button onClick={onBack} className="hover:opacity-80">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="font-bold">Fase 3: Prescrição e Tratamento</span>
      </div>

      <div className="max-w-lg mx-auto text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
          <ShoppingCart className="w-10 h-10 text-primary" />
        </div>

        <h2 className="text-2xl font-bold text-foreground">
          Prescrição e Tratamento
        </h2>

        <div className="hospital-card text-left space-y-4 text-sm text-foreground leading-relaxed">
          <p>
            Ótimo, agora que você classificou os pacientes de acordo com os riscos, está preparado para auxiliar no manejo e tratamento dessas feridas.
          </p>
          <p>
            Você terá os produtos disponíveis e deverá indicá-los para o paciente correto.
          </p>
          <p className="font-semibold text-primary">
            Atenção: Os medicamentos podem ser usados em mais de um paciente e cada paciente pode necessitar de mais de um tratamento.
          </p>
          <p>
            Estoque abastecido! O carrinho de curativos está pronto. Analise o leito, observe o tecido e escolha a "arma" certa para combater a evolução da lesão. Boa sorte, enfermeiro(a)!
          </p>
        </div>

        <button
          onClick={onContinue}
          className="hospital-btn-primary flex items-center gap-2 mx-auto text-lg px-8 py-3"
        >
          Vamos lá?
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Phase3TransitionScreen;
