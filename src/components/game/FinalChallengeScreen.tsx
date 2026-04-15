import React, { useState, useCallback, useMemo } from "react";
import { Lock, Unlock, ArrowLeft, GripVertical, Trophy, Package } from "lucide-react";

import imgAGE from "@/assets/tratamentos/AGE.png";
import imgAlginatoDeCálcio from "@/assets/tratamentos/Alginato_de_calcio.png";
import imgColagenase from "@/assets/tratamentos/Colagenase.png";
import imgFilmeTransparente from "@/assets/tratamentos/Curativo_transparente.png";
import imgHidrocoloide from "@/assets/tratamentos/Hidrocoloide.png";
import imgHidrofibra from "@/assets/tratamentos/Hidrofibra.png";
import imgHidrogel from "@/assets/tratamentos/Hidrogel.png";
import imgOxidoDeZinco from "@/assets/tratamentos/oxido_de_zinco.png";
import imgPapaina from "@/assets/tratamentos/Papaina.png";
import imgPHMB from "@/assets/tratamentos/PHMB.png";
import imgSoroFisiologico from "@/assets/tratamentos/Soro_fisiologico.png";
import imgSulfadiazinaDePrata from "@/assets/tratamentos/Sulfadiazina_de_prata.png";

const TRATE_DATA = [
  {
    letter: "T",
    label: "Terapia adequada",
    description: "Indicação correta do curativo",
  },
  {
    letter: "R",
    label: "Regeneração/reparação",
    description: "Avaliar o status e estágio da LPP",
  },
  {
    letter: "A",
    label: "Antecipar possíveis complicações",
    description: "Atentar-se a sinais de infecção e maceração",
  },
  {
    letter: "T",
    label: "Tratamento holístico",
    description: "Condição de saúde do indivíduo",
  },
  {
    letter: "E",
    label: "Evolução/história da lesão",
    description: "Avaliar melhora, piora ou manutenção / Quadro agudo ou crônico",
  },
];

const VAULT_PRODUCTS = [
  { name: "AGE", img: imgAGE },
  { name: "Alginato de Cálcio", img: imgAlginatoDeCálcio },
  { name: "Colagenase", img: imgColagenase },
  { name: "Filme Transparente", img: imgFilmeTransparente },
  { name: "Hidrocolóide", img: imgHidrocoloide },
  { name: "Hidrofibra", img: imgHidrofibra },
  { name: "Hidrogel", img: imgHidrogel },
  { name: "Óxido de Zinco", img: imgOxidoDeZinco },
  { name: "Papaína 10%", img: imgPapaina },
  { name: "PHMB", img: imgPHMB },
  { name: "Soro Fisiológico", img: imgSoroFisiologico },
  { name: "Sulfadiazina de Prata", img: imgSulfadiazinaDePrata },
];

// The correct code is the sequence 1-2-3-4-5 (each description matches its row)
const CORRECT_CODE = "12345";

interface FinalChallengeScreenProps {
  onBack: () => void;
  onComplete: () => void;
}

const FinalChallengeScreen: React.FC<FinalChallengeScreenProps> = ({
  onBack,
  onComplete,
}) => {
  // Shuffled order of description indices
  const initialOrder = useMemo(() => {
    const indices = [0, 1, 2, 3, 4];
    // Fisher-Yates shuffle
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    return indices;
  }, []);

  const [descriptionOrder, setDescriptionOrder] = useState<number[]>(initialOrder);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [vaultCode, setVaultCode] = useState("");
  const [vaultOpen, setVaultOpen] = useState(false);
  const [showWrongCode, setShowWrongCode] = useState(false);
  const [matchedRows, setMatchedRows] = useState<boolean[]>([false, false, false, false, false]);

  // Check which rows are correctly matched
  const checkMatches = useCallback((order: number[]) => {
    const matches = order.map((descIdx, rowIdx) => descIdx === rowIdx);
    setMatchedRows(matches);
    return matches;
  }, []);

  // Drag handlers
  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDrop = (targetIndex: number) => {
    if (draggedIndex === null || draggedIndex === targetIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    const newOrder = [...descriptionOrder];
    const temp = newOrder[draggedIndex];
    newOrder[draggedIndex] = newOrder[targetIndex];
    newOrder[targetIndex] = temp;

    setDescriptionOrder(newOrder);
    checkMatches(newOrder);
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  // Touch drag support (mobile)
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [touchDragIdx, setTouchDragIdx] = useState<number | null>(null);

  const handleTouchStart = (index: number, e: React.TouchEvent) => {
    setTouchStartY(e.touches[0].clientY);
    setTouchDragIdx(index);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchDragIdx === null || touchStartY === null) return;

    const endY = e.changedTouches[0].clientY;
    const diff = endY - touchStartY;
    const threshold = 40;

    if (Math.abs(diff) > threshold) {
      const direction = diff > 0 ? 1 : -1;
      const targetIdx = touchDragIdx + direction;

      if (targetIdx >= 0 && targetIdx < descriptionOrder.length) {
        const newOrder = [...descriptionOrder];
        const temp = newOrder[touchDragIdx];
        newOrder[touchDragIdx] = newOrder[targetIdx];
        newOrder[targetIdx] = temp;

        setDescriptionOrder(newOrder);
        checkMatches(newOrder);
      }
    }

    setTouchStartY(null);
    setTouchDragIdx(null);
  };

  // Each correct match reveals a digit. The code is: for each row that is correct, the digit is (row+1).
  const codeDigits = matchedRows.map((matched, i) => (matched ? String(i + 1) : "?"));
  const allMatched = matchedRows.every(Boolean);

  const handleCheckCode = () => {
    if (vaultCode === CORRECT_CODE) {
      setVaultOpen(true);
      setShowWrongCode(false);
    } else {
      setShowWrongCode(true);
    }
  };

  return (
    <div className="p-6 animate-fadeIn">
      <div className="hospital-header rounded-t-lg -mx-6 -mt-6 mb-6">
        <button onClick={onBack} className="hover:opacity-80">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="font-bold">Desafio Final — Mnemônico TRATE</span>
        <Trophy className="w-5 h-5 ml-auto" />
      </div>

      <div className="max-w-3xl mx-auto space-y-6">
        {!vaultOpen && (
          <>
            <div className="hospital-card text-sm text-foreground">
              <p>
                Ao escolher o tratamento adequado para cada lesão você pensou no cuidado do paciente
                em diversas etapas, desde a identificação à classificação do risco.
              </p>
              <p className="mt-2">
                Pensando nisso, utiliza-se o mnemônico <strong className="text-primary">"TRATE"</strong> para
                ter essa avaliação completa do paciente.
              </p>
              <p className="mt-2 font-semibold">
                Para escapar deste último desafio, relacione a descrição à sua letra correspondente.
              </p>
            </div>

            {/* Matching table */}
            <div className="space-y-2">
              {TRATE_DATA.map((item, rowIdx) => {
                const descIdx = descriptionOrder[rowIdx];
                const desc = TRATE_DATA[descIdx];
                const isMatched = matchedRows[rowIdx];
                const isDragOver = dragOverIndex === rowIdx;
                const isDragging = draggedIndex === rowIdx;

                return (
                  <div
                    key={rowIdx}
                    className={`flex gap-3 items-stretch transition-all duration-200 ${
                      isDragging ? "opacity-40" : ""
                    }`}
                  >
                    {/* Fixed left side */}
                    <div
                      className={`flex items-center gap-3 rounded-lg border-2 px-4 py-3 min-w-[220px] transition-colors ${
                        isMatched
                          ? "border-success bg-success/10"
                          : "border-border bg-card"
                      }`}
                    >
                      <span
                        className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0 ${
                          isMatched
                            ? "bg-success text-white"
                            : "bg-primary/15 text-primary"
                        }`}
                      >
                        {item.letter}
                      </span>
                      <span className="text-sm font-medium text-foreground">
                        {item.label}
                      </span>
                    </div>

                    {/* Arrow */}
                    <div className="flex items-center text-muted-foreground">
                      <span className="text-lg">→</span>
                    </div>

                    {/* Draggable right side */}
                    <div
                      draggable
                      onDragStart={() => handleDragStart(rowIdx)}
                      onDragOver={(e) => handleDragOver(e, rowIdx)}
                      onDrop={() => handleDrop(rowIdx)}
                      onDragEnd={handleDragEnd}
                      onTouchStart={(e) => handleTouchStart(rowIdx, e)}
                      onTouchEnd={handleTouchEnd}
                      className={`flex-1 flex items-center gap-2 rounded-lg border-2 px-4 py-3 cursor-grab active:cursor-grabbing transition-all ${
                        isMatched
                          ? "border-success bg-success/10"
                          : isDragOver
                          ? "border-primary bg-primary/10 scale-[1.02]"
                          : "border-border bg-card hover:border-primary/40"
                      }`}
                    >
                      <GripVertical className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      <span className="text-sm text-foreground">{desc.description}</span>
                      {isMatched && (
                        <span className="ml-auto text-success font-bold text-lg">
                          {rowIdx + 1}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Code display */}
            <div className="flex items-center justify-center gap-3">
              <span className="text-sm font-medium text-muted-foreground">Código:</span>
              <div className="flex gap-1">
                {codeDigits.map((digit, i) => (
                  <span
                    key={i}
                    className={`w-10 h-12 rounded-lg border-2 flex items-center justify-center font-mono text-xl font-bold transition-all ${
                      digit !== "?"
                        ? "border-success bg-success/15 text-success"
                        : "border-border bg-card text-muted-foreground/40"
                    }`}
                  >
                    {digit}
                  </span>
                ))}
              </div>
            </div>

            {/* Vault / Safe */}
            <div className="hospital-card text-center space-y-4">
              <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto border-2 border-primary/30">
                <Lock className="w-10 h-10 text-primary" />
              </div>
              <p className="text-sm font-medium text-foreground">
                Digite o código para abrir o cofre:
              </p>
              <div className="flex justify-center">
                <input
                  type="text"
                  value={vaultCode}
                  onChange={(e) => {
                    setVaultCode(e.target.value.replace(/\D/g, "").slice(0, 5));
                    setShowWrongCode(false);
                  }}
                  maxLength={5}
                  className="w-48 text-center text-2xl font-mono tracking-[0.5em] p-3 rounded-lg border-2 border-border bg-card text-foreground focus:border-primary focus:outline-none"
                  placeholder="_ _ _ _ _"
                />
              </div>
              {showWrongCode && (
                <p className="text-destructive text-sm">
                  Código incorreto. Associe corretamente as descrições às letras!
                </p>
              )}
              <button
                onClick={handleCheckCode}
                disabled={vaultCode.length < 5}
                className={`hospital-btn-accent ${
                  vaultCode.length < 5 ? "opacity-50 cursor-not-allowed" : "animate-pulse-glow"
                }`}
              >
                Abrir Cofre
              </button>
            </div>
          </>
        )}

        {/* Vault opened - show products */}
        {vaultOpen && (
          <div className="space-y-6 animate-fadeIn">
            <div className="text-center">
              <div className="w-20 h-20 rounded-2xl bg-success/15 flex items-center justify-center mx-auto border-2 border-success/30 mb-4 vault-open-animation">
                <Unlock className="w-10 h-10 text-success" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">
                Cofre Aberto!
              </h2>
              <p className="text-muted-foreground mt-2">
                Parabéns! Você completou o desafio final. Aqui estão os produtos
                de tratamento que você aprendeu a utilizar:
              </p>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
              {VAULT_PRODUCTS.map((product) => (
                <div
                  key={product.name}
                  className="hospital-card flex flex-col items-center gap-2 p-3 vault-product-reveal"
                >
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-16 h-16 object-contain rounded"
                  />
                  <span className="text-xs text-center font-medium text-foreground leading-tight">
                    {product.name}
                  </span>
                </div>
              ))}
            </div>

            {/* TRATE summary */}
            <div className="hospital-card">
              <h3 className="font-bold text-primary mb-3">Mnemônico TRATE:</h3>
              <div className="space-y-2 text-sm">
                {TRATE_DATA.map((item, i) => (
                  <div key={i} className="flex gap-2">
                    <span className="font-bold text-primary">{item.letter}:</span>
                    <span className="text-foreground">
                      {item.label} — {item.description}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center">
              <button onClick={onComplete} className="hospital-btn-primary flex items-center gap-2">
                <Package className="w-5 h-5" />
                Finalizar Treinamento
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FinalChallengeScreen;
