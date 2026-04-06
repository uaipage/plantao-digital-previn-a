import React from "react";
import { PatientCase, TREATMENT_PRODUCTS } from "@/data/gameData";
import { ArrowLeft, CheckCircle2, ShoppingCart } from "lucide-react";

import imgAGE from "@/assets/tratamentos/AGE.png";
import imgAlginatoDeCálcio from "@/assets/tratamentos/Alginato_de_calcio.png";
import imgCarvaoAtivado from "@/assets/tratamentos/Carvao_ativado.png";
import imgCarvaoComPrata from "@/assets/tratamentos/Carvao_com_prata.png";
import imgColagenase from "@/assets/tratamentos/Colagenase.png";
import imgFilmeTransparente from "@/assets/tratamentos/Curativo_transparente.png";
import imgHidrocoloide from "@/assets/tratamentos/Hidrocoloide.png";
import imgHidrofibra from "@/assets/tratamentos/Hidrofibra.png";
import imgHidrogel from "@/assets/tratamentos/Hidrogel.png";
import imgOxidoDeZinco from "@/assets/tratamentos/oxido_de_zinco.png";
import imgPHMB from "@/assets/tratamentos/PHMB.png";
import imgSulfadiazinaDePrata from "@/assets/tratamentos/Sulfadiazina_de_prata.png";

import imgJoaquim from "@/assets/pacientes/Joaquim.jpg";
import imgLucinda from "@/assets/pacientes/Lucinda.png";
import imgMaria from "@/assets/pacientes/Maria.png";
import imgOtavio from "@/assets/pacientes/Otávio.png";
import imgManoel from "@/assets/pacientes/Manoel.png";
import imgAntonia from "@/assets/pacientes/Antônia.png";

const PATIENT_IMAGES: Record<number, string> = {
  201: imgJoaquim,
  202: imgLucinda,
  203: imgMaria,
  204: imgOtavio,
  205: imgManoel,
  206: imgAntonia,
};

const PRODUCT_IMAGES: Record<string, string> = {
  "AGE (Ácidos Graxos Essenciais)": imgAGE,
  "Alginato de Cálcio": imgAlginatoDeCálcio,
  "Carvão Ativado": imgCarvaoAtivado,
  "Carvão Ativado com Prata": imgCarvaoComPrata,
  "Colagenase": imgColagenase,
  "Filme Transparente": imgFilmeTransparente,
  "Hidrocolóide": imgHidrocoloide,
  "Hidrocolóide Extra Fino": imgHidrocoloide,
  "Hidrofibra": imgHidrofibra,
  "Hidrogel": imgHidrogel,
  "Óxido de Zinco": imgOxidoDeZinco,
  "PHMB (Polihexanida)": imgPHMB,
  "Sulfadiazina de Prata": imgSulfadiazinaDePrata,
};

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

      <div className="max-w-5xl mx-auto space-y-5">
        <div className="hospital-card">
          <h3 className="font-bold text-lg text-foreground">{patient.name}, {patient.age} anos</h3>
          <p className="text-sm text-muted-foreground mt-2">{patient.lesionDescription}</p>
        </div>

        <div className="flex gap-5 items-start">
          <div className="flex-1">
            <h4 className="font-semibold text-foreground mb-3">
              Selecione os produtos adequados para o tratamento:
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {TREATMENT_PRODUCTS.map(product => {
              const selected = selectedProducts.includes(product);
              const isCorrectProduct = patient.correctTreatments.some(t =>
                product.toLowerCase().includes(t.toLowerCase()) || t.toLowerCase().includes(product.toLowerCase())
              );
              const image = PRODUCT_IMAGES[product];

              let chipClass = "product-chip flex flex-col items-center gap-2 p-3 h-auto";
              if (isCompleted) {
                if (isCorrectProduct) chipClass = "product-chip product-chip-selected flex flex-col items-center gap-2 p-3 h-auto";
                else if (selected) chipClass = "product-chip border-destructive/50 bg-destructive/5 flex flex-col items-center gap-2 p-3 h-auto";
              } else if (selected) {
                chipClass = "product-chip product-chip-selected flex flex-col items-center gap-2 p-3 h-auto";
              }

              return (
                <button
                  key={product}
                  onClick={() => !isCompleted && onToggleProduct(product)}
                  className={chipClass}
                >
                  {image && (
                    <img
                      src={image}
                      alt={product}
                      className="w-16 h-16 object-contain rounded"
                    />
                  )}
                  <span className="text-xs text-center leading-tight">{product}</span>
                </button>
              );
            })}
            </div>
          </div>

          {PATIENT_IMAGES[patient.id] && (
            <div className="hospital-card p-2 flex-shrink-0 self-start sticky top-4">
              <img
                src={PATIENT_IMAGES[patient.id]}
                alt={patient.name}
                className="w-72 h-72 rounded-lg object-cover"
              />
            </div>
          )}
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
