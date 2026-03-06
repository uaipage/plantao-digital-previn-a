import React from "react";
import { PatientCase, TREATMENT_PRODUCTS } from "@/data/gameData";
import { ArrowLeft, CheckCircle2, ShoppingCart } from "lucide-react";

interface TreatmentScreenProps {
  patient: PatientCase;
  selectedProducts: string[];
  isCompleted: boolean;
  onToggleProduct: (product: string) => void;
  onConfirm: () => void;
  onBack: () => void;
}

const TreatmentScreen: React.FC<TreatmentScreenProps> = ({
  patient,
  selectedProducts,
  isCompleted,
  onToggleProduct,
  onConfirm,
  onBack,
}) => {
  const hasCorrectProducts = patient.correctTreatments.every(t =>
    selectedProducts.some(s => s.toLowerCase().includes(t.toLowerCase()) || t.toLowerCase().includes(s.toLowerCase()))
  );

  return (
    <div className="p-6 animate-fadeIn">
      <div className="hospital-header rounded-t-lg -mx-6 -mt-6 mb-6">
        <button onClick={onBack} className="hover:opacity-80">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="font-bold">Carrinho de Curativos — {patient.name}</span>
        <ShoppingCart className="w-5 h-5 ml-auto" />
      </div>

      <div className="max-w-3xl mx-auto space-y-5">
        <div className="hospital-card">
          <h3 className="font-bold text-foreground">{patient.name}, {patient.age} anos</h3>
          <p className="text-sm text-muted-foreground mt-1">{patient.lesionDescription}</p>
        </div>

        <div>
          <h4 className="font-semibold text-foreground mb-3">
            Selecione os produtos adequados para o tratamento:
          </h4>
          <div className="flex flex-wrap gap-2">
            {TREATMENT_PRODUCTS.map(product => {
              const selected = selectedProducts.includes(product);
              const isCorrectProduct = patient.correctTreatments.some(t =>
                product.toLowerCase().includes(t.toLowerCase()) || t.toLowerCase().includes(product.toLowerCase())
              );

              let chipClass = "product-chip";
              if (isCompleted) {
                if (isCorrectProduct) chipClass = "product-chip product-chip-selected";
                else if (selected) chipClass = "product-chip border-destructive/50 bg-destructive/5";
              } else if (selected) {
                chipClass = "product-chip product-chip-selected";
              }

              return (
                <button
                  key={product}
                  onClick={() => !isCompleted && onToggleProduct(product)}
                  className={chipClass}
                >
                  {product}
                </button>
              );
            })}
          </div>
        </div>

        {isCompleted && (
          <div className="hospital-card border-l-4 border-l-success">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-bold text-foreground mb-1">Tratamento Sugerido:</p>
                <p className="text-foreground">{patient.treatmentExplanation}</p>
                <p className="font-bold text-foreground mt-3 mb-1">Ação de Enfermagem:</p>
                <p className="text-foreground">{patient.nursingAction}</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-center">
          {!isCompleted ? (
            <button
              onClick={onConfirm}
              disabled={selectedProducts.length === 0}
              className={`hospital-btn-primary ${selectedProducts.length === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              Confirmar Tratamento
            </button>
          ) : (
            <button onClick={onBack} className="hospital-btn-primary">
              Voltar ao Dashboard
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TreatmentScreen;
