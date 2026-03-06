import React from "react";
import { PREVINA_ORDER } from "@/data/gameData";

interface LetterTrackerProps {
  collectedLetters: (string | null)[];
}

const LetterTracker: React.FC<LetterTrackerProps> = ({ collectedLetters }) => {
  return (
    <div className="flex items-center gap-1">
      <span className="text-xs font-medium text-muted-foreground mr-2">Pistas:</span>
      {PREVINA_ORDER.map((letter, i) => (
        <div
          key={i}
          className={`letter-slot text-sm w-8 h-9 ${
            collectedLetters[i] ? "letter-slot-filled" : "letter-slot-empty"
          }`}
        >
          {collectedLetters[i] || "_"}
        </div>
      ))}
    </div>
  );
};

export default LetterTracker;
