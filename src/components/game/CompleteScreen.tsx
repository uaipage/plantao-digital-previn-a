import React from "react";
import { Award, Heart } from "lucide-react";

const CompleteScreen: React.FC = () => {
  return (
    <div className="p-8 animate-fadeIn text-center">
      <div className="hospital-header rounded-t-lg -mx-8 -mt-8 mb-8">
        <Award className="w-5 h-5" />
        <span className="font-bold">Missão Cumprida</span>
      </div>

      <div className="max-w-lg mx-auto space-y-6">
        <div className="w-20 h-20 rounded-full bg-success/15 flex items-center justify-center mx-auto">
          <Heart className="w-10 h-10 text-success" />
        </div>

        <h2 className="text-2xl font-bold text-foreground">
          Plantão Finalizado com Excelência!
        </h2>

        <p className="text-foreground">
          Você completou todas as fases do treinamento. Avaliou riscos, classificou pacientes 
          pela Escala de Braden e prescreveu tratamentos adequados para Lesões por Pressão.
        </p>

        <div className="hospital-card text-left">
          <h3 className="font-bold text-primary mb-3">O que você aprendeu:</h3>
          <ul className="space-y-2 text-sm text-foreground">
            <li>✅ Identificar fatores de risco para LPP</li>
            <li>✅ Aplicar a metodologia SBAR na avaliação clínica</li>
            <li>✅ Utilizar a Escala de Braden para classificação de risco</li>
            <li>✅ Selecionar produtos adequados para tratamento de feridas</li>
            <li>✅ Implementar ações de prevenção baseadas no acrônimo PREVINA</li>
          </ul>
        </div>

        <p className="text-muted-foreground text-sm italic">
          "A prevenção é sempre o melhor tratamento."
        </p>
      </div>
    </div>
  );
};

export default CompleteScreen;
