import { useState } from "react";
import { TASKS } from "../tasks";
import type { ProgressMap } from "../types";

interface Props {
  progress: ProgressMap;
  onClose: () => void;
}

export function Gallery({ progress, onClose }: Props) {
  const [openTaskId, setOpenTaskId] = useState<string | null>(null);

  const photos = TASKS.filter(
    (t) => progress[t.id]?.status === "approved" && progress[t.id]?.photoUrl,
  );

  const openPhoto = openTaskId ? progress[openTaskId]?.photoUrl : null;
  const openTitle = openTaskId ? TASKS.find((t) => t.id === openTaskId)?.title : null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 p-4">
      <div className="mx-auto max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-neutral-100">📸 Galerie</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-neutral-700 p-2 text-neutral-400"
            aria-label="Schließen"
          >
            ✕
          </button>
        </div>

        {photos.length === 0 ? (
          <p className="text-sm text-neutral-400">
            Noch keine freigegebenen Fotos – die tauchen hier auf, sobald Aufgaben abgehakt sind.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            {photos.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setOpenTaskId(t.id)}
                className="aspect-square overflow-hidden rounded-lg border border-neutral-700"
              >
                <img
                  src={progress[t.id].photoUrl}
                  alt={t.title}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {openPhoto && (
        <div
          className="fixed inset-0 z-[60] flex flex-col items-center justify-center gap-4 bg-black/95 p-4"
          onClick={() => setOpenTaskId(null)}
        >
          <p className="text-sm font-medium text-neutral-200">{openTitle}</p>
          <img
            src={openPhoto}
            alt={openTitle ?? ""}
            className="max-h-[65vh] max-w-full rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <a
            href={openPhoto}
            download={`jga-${openTaskId}.jpg`}
            onClick={(e) => e.stopPropagation()}
            className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-neutral-900"
          >
            ⬇️ Herunterladen
          </a>
          <p className="max-w-xs text-center text-xs text-neutral-500">
            Auf dem iPhone: Bild gedrückt halten → "Zu Fotos hinzufügen", falls der Button
            oben nichts tut.
          </p>
        </div>
      )}
    </div>
  );
}
