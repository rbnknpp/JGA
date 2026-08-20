import { useState } from "react";
import type { EventConfig } from "../types";

interface Props {
  initial: EventConfig;
  onSave: (config: EventConfig) => void;
  onClose?: () => void;
}

export function Setup({ initial, onSave, onClose }: Props) {
  const [names, setNames] = useState<string[]>(initial.participants);
  const [groomIndex, setGroomIndex] = useState(initial.groomIndex);

  const canSave = names.every((n) => n.trim().length > 0);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-sm rounded-2xl bg-neutral-900 border border-neutral-700 p-5 text-neutral-100">
        <h2 className="text-lg font-bold mb-1">Crew einrichten</h2>
        <p className="text-sm text-neutral-400 mb-4">
          Tragt eure Namen ein und markiert, wer der Bräutigam ist.
        </p>
        <div className="space-y-3">
          {names.map((name, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                value={name}
                onChange={(e) => {
                  const next = [...names];
                  next[i] = e.target.value;
                  setNames(next);
                }}
                placeholder={`Name ${i + 1}`}
                className="flex-1 rounded-lg bg-neutral-800 border border-neutral-700 px-3 py-2 text-sm outline-none focus:border-amber-500"
              />
              <button
                type="button"
                onClick={() => setGroomIndex(i)}
                className={`shrink-0 rounded-lg px-3 py-2 text-sm border transition ${
                  groomIndex === i
                    ? "bg-rose-500 border-rose-400 text-white"
                    : "bg-neutral-800 border-neutral-700 text-neutral-400"
                }`}
              >
                🤵
              </button>
            </div>
          ))}
        </div>
        <div className="mt-5 flex gap-2">
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-neutral-700 py-2 text-sm text-neutral-300"
            >
              Abbrechen
            </button>
          )}
          <button
            type="button"
            disabled={!canSave}
            onClick={() => onSave({ participants: names, groomIndex })}
            className="flex-1 rounded-lg bg-amber-500 py-2 text-sm font-semibold text-neutral-900 disabled:opacity-40"
          >
            Speichern
          </button>
        </div>
      </div>
    </div>
  );
}
