import React, { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { PatientCase } from "@/data/gameData";

interface SbarSidebarProps {
  patient: PatientCase;
}

const SbarSidebar: React.FC<SbarSidebarProps> = ({ patient }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Abrir ficha SBAR"
        className={`fixed right-0 top-1/2 z-40 -translate-y-1/2 rounded-l-xl bg-primary px-3 py-4 text-primary-foreground shadow-lg transition-transform duration-300 ${
          isOpen ? "translate-x-full" : "translate-x-0"
        }`}
      >
        <div className="flex items-center gap-2 [writing-mode:vertical-rl] rotate-180 text-xs font-bold uppercase tracking-wide">
          <ChevronLeft className="h-4 w-4" />
          Ficha SBAR
        </div>
      </button>

      <aside
        className={`fixed right-0 top-0 z-50 h-full w-[92vw] max-w-md border-l border-border bg-card shadow-2xl transition-all duration-300 ${
          isOpen
            ? "translate-x-0 opacity-100 pointer-events-auto"
            : "translate-x-[calc(100%+1rem)] opacity-0 pointer-events-none"
        }`}
        aria-hidden={!isOpen}
      >
        <div className="flex h-full flex-col">
          <div className="hospital-header rounded-none">
            <div>
              <p className="text-xs uppercase tracking-wide text-primary-foreground/80">Leito</p>
              <h3 className="font-bold">{patient.bed}</h3>
              <p className="text-sm text-primary-foreground/90">{patient.name}, {patient.age} anos</p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Minimizar ficha SBAR"
              className="ml-auto rounded-md p-2 transition-colors hover:bg-primary-foreground/10"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            <div className="hospital-card">
              <h4 className="mb-2 text-xs font-bold uppercase tracking-wide text-primary">S - Situacao</h4>
              <p className="text-sm text-foreground">{patient.sbar.situation}</p>
            </div>
            <div className="hospital-card">
              <h4 className="mb-2 text-xs font-bold uppercase tracking-wide text-primary">B - Background</h4>
              <p className="text-sm text-foreground">{patient.sbar.background}</p>
            </div>
            <div className="hospital-card">
              <h4 className="mb-2 text-xs font-bold uppercase tracking-wide text-primary">A - Avaliacao</h4>
              <p className="text-sm text-foreground">{patient.sbar.assessment}</p>
            </div>
            <div className="hospital-card">
              <h4 className="mb-2 text-xs font-bold uppercase tracking-wide text-primary">R - Recomendacao</h4>
              <p className="text-sm text-foreground">{patient.sbar.recommendation}</p>
            </div>
          </div>

          <div className="border-t border-border p-3">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-full rounded-lg border border-border px-3 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
            >
              <span className="inline-flex items-center gap-2">
                <ChevronRight className="h-4 w-4" />
                Minimizar
              </span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default SbarSidebar;