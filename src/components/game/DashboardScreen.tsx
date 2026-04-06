import React from "react";
import { patients } from "@/data/gameData";
import { User, CheckCircle2, Lock, ArrowRight, Stethoscope } from "lucide-react";
import LetterTracker from "./LetterTracker";

interface DashboardScreenProps {
  completedPatients: Set<number>;
  collectedLetters: (string | null)[];
  onSelectPatient: (id: number) => void;
  onGoToVault: () => void;
  onGoToPhase2Transition: () => void;
  phase: 1 | 2 | 3;
  onChangePhase: (phase: 1 | 2 | 3) => void;
  phase2Completed: Set<number>;
  phase3Completed: Set<number>;
  onSelectPhase2Patient: (id: number) => void;
  onSelectPhase3Patient: (id: number) => void;
}

const DashboardScreen: React.FC<DashboardScreenProps> = ({
  completedPatients,
  collectedLetters,
  onSelectPatient,
  onGoToVault,
  onGoToPhase2Transition,
  phase,
  onChangePhase,
  phase2Completed,
  phase3Completed,
  onSelectPhase2Patient,
  onSelectPhase3Patient,
}) => {
  const allPhase1Done = completedPatients.size === 6;
  const allPhase2Done = phase2Completed.size === 6;
  const completedCount = phase === 1 ? completedPatients.size
    : phase === 2 ? phase2Completed.size
    : phase3Completed.size;

  return (
    <div className="p-6 animate-fadeIn">
      <div className="hospital-header rounded-t-lg -mx-6 -mt-6 mb-6">
        <Stethoscope className="w-5 h-5" />
        <span className="font-bold">Prontuários dos Pacientes</span>
        <div className="ml-auto">
          <LetterTracker collectedLetters={collectedLetters} />
        </div>
      </div>

      {/* Phase tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => onChangePhase(1)}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
            phase === 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          Fase 1 — Casos Clínicos
        </button>
        <button
          onClick={() => allPhase1Done ? onChangePhase(2) : undefined}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
            phase === 2 ? "bg-primary text-primary-foreground" :
            allPhase1Done ? "bg-muted text-muted-foreground hover:bg-muted/80" :
            "bg-muted/50 text-muted-foreground/40 cursor-not-allowed"
          }`}
        >
          Fase 2 — Escala de Braden {!allPhase1Done && <Lock className="inline w-3 h-3 ml-1" />}
        </button>
        <button
          onClick={() => allPhase2Done ? onChangePhase(3) : undefined}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
            phase === 3 ? "bg-primary text-primary-foreground" :
            allPhase2Done ? "bg-muted text-muted-foreground hover:bg-muted/80" :
            "bg-muted/50 text-muted-foreground/40 cursor-not-allowed"
          }`}
        >
          Fase 3 — Tratamento {!allPhase2Done && <Lock className="inline w-3 h-3 ml-1" />}
        </button>
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-muted-foreground mb-1">
          <span>Pacientes avaliados</span>
          <span>{completedCount} / 6</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${(completedCount / 6) * 100}%` }} />
        </div>
      </div>

      {/* Phase 2 instruction */}
      {phase === 2 && (
        <div className="mb-6 p-4 rounded-lg bg-accent/50 border border-accent text-sm text-foreground">
          📋 Neste nível você irá calcular a escala de risco de Braden para cada paciente, mas fique atento aos números, eles serão utilizados ao final do nível.
        </div>
      )}

      {/* Patient cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {patients.map(patient => {
          const isCompleted = phase === 1 ? completedPatients.has(patient.id)
            : phase === 2 ? phase2Completed.has(patient.id)
            : phase3Completed.has(patient.id);

          return (
            <div
              key={patient.id}
              onClick={() => {
                if (phase === 1 && !completedPatients.has(patient.id)) onSelectPatient(patient.id);
                if (phase === 2 && !phase2Completed.has(patient.id)) onSelectPhase2Patient(patient.id);
                if (phase === 3 && !phase3Completed.has(patient.id)) onSelectPhase3Patient(patient.id);
              }}
              className={`patient-card ${isCompleted ? "opacity-70 border-success/30" : ""}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isCompleted ? "bg-success/15" : "bg-primary/10"
                  }`}>
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-success" />
                    ) : (
                      <User className="w-5 h-5 text-primary" />
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-mono text-muted-foreground">{patient.bed}</p>
                    <p className="font-semibold text-foreground">{patient.name}</p>
                    <p className="text-xs text-muted-foreground">{patient.age} anos</p>
                  </div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-3 line-clamp-2">{patient.diagnosis}</p>
            </div>
          );
        })}
      </div>

      {/* Vault button (Phase 1) */}
      {allPhase1Done && phase === 1 && (
        <div className="flex justify-center mt-8">
          <button
            onClick={onGoToVault}
            className="hospital-btn-accent flex items-center gap-2 animate-pulse-glow"
          >
            🔐 Abrir o Cofre
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Phase 2 transition button */}
      {allPhase2Done && phase === 2 && (
        <div className="flex justify-center mt-8">
          <button
            onClick={onGoToPhase2Transition}
            className="hospital-btn-accent flex items-center gap-2 animate-pulse-glow"
          >
            📊 Consolidar Scores de Braden
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default DashboardScreen;
