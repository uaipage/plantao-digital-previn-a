import React from "react";
import { Stethoscope, ArrowRight } from "lucide-react";

interface IntroScreenProps {
  onNext: () => void;
}

const IntroScreen: React.FC<IntroScreenProps> = ({ onNext }) => {
  return (
    <div className="p-8 animate-fadeIn">
      <div className="hospital-header rounded-t-lg -mx-8 -mt-8 mb-8">
        <Stethoscope className="w-6 h-6" />
        <span className="font-bold text-lg">Sistema de Enfermagem — Clínica Médica</span>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Passagem de Plantão
          </h1>
          <p className="text-muted-foreground">Unidade de Clínica Médica</p>
        </div>

        <div className="hospital-card">
          <p className="text-foreground leading-relaxed text-base">
            É o seu primeiro dia no novo emprego, e a empolgação não poderia ser maior. Você chega ao hospital animado para começar essa nova etapa mas, assim que atravessa a porta da enfermaria da Unidade de Clínica Médica, percebe que o plantão já começou um pouco diferente...
          </p>
          <p className="text-foreground leading-relaxed text-base mt-4">
            A enfermeira responsável pelo turno anterior está à sua espera, apressada e já com a bolsa nas mãos. Ela explica que precisa sair mais cedo para uma consulta médica e, antes de ir, mostra um laptop aberto e avisa:
          </p>
          <p className="text-foreground leading-relaxed text-base mt-4 italic">
            — Deixei toda a passagem de plantão registrada aqui. Preciso ir agora, mas, se tiver alguma dúvida, pode me ligar.
          </p>
          <p className="text-foreground leading-relaxed text-base mt-4">
            E, antes que você consiga perguntar qualquer coisa, ela se despede e vai embora.
          </p>
          <p className="text-foreground leading-relaxed text-base mt-4 font-semibold text-primary">
            Agora, o plantão está em suas mãos!!!
          </p>
        </div>

        <div className="flex justify-center pt-4">
          <button onClick={onNext} className="hospital-btn-primary flex items-center gap-2 text-lg">
            Acessar mensagem
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default IntroScreen;
