import { useRef, useState } from "react";
import type { TaskDef } from "../tasks";
import { CATEGORY_META } from "../tasks";
import type { Progress } from "../types";

interface Props {
  task: TaskDef;
  groomName: string;
  progress?: Progress;
  me: string;
  onSubmit: (photoFile: File | null, note: string) => Promise<void>;
  onApprove: () => Promise<void>;
  onReject: () => Promise<void>;
}

export function TaskCard({ task, groomName, progress, me, onSubmit, onApprove, onReject }: Props) {
  const [note, setNote] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const meta = CATEGORY_META[task.category];
  const description = task.description.replace(/\{groom\}/g, groomName);

  const status = progress?.status;

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null;
    setFile(f);
    if (f) setPreview(URL.createObjectURL(f));
  }

  async function handleSubmit() {
    setBusy(true);
    try {
      await onSubmit(file, note);
      setFile(null);
      setNote("");
      setPreview(null);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="w-full max-w-md rounded-2xl bg-neutral-900 border border-neutral-700 overflow-hidden">
      <div className={`${meta.color} px-4 py-2 flex items-center gap-2 text-white text-sm font-semibold`}>
        <span>{meta.emoji}</span>
        <span>{meta.label}</span>
      </div>
      <div className="p-5">
        <h2 className="text-xl font-bold mb-2 text-neutral-100">{task.title}</h2>
        <p className="text-neutral-300 text-sm leading-relaxed mb-4">{description}</p>

        {(!status || status === "rejected") && (
          <div className="space-y-3">
            {status === "rejected" && (
              <p className="text-rose-400 text-xs font-medium">
                Wurde abgelehnt – nochmal probieren!
              </p>
            )}
            {task.requiresPhoto && (
              <div>
                {preview ? (
                  <img src={preview} alt="Vorschau" className="w-full rounded-xl mb-2 max-h-64 object-cover" />
                ) : null}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleFile}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full rounded-lg border border-dashed border-neutral-600 py-3 text-sm text-neutral-300"
                >
                  {file ? "📷 Anderes Foto wählen" : "📷 Foto aufnehmen / auswählen"}
                </button>
              </div>
            )}
            {!task.requiresPhoto && (
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Kurze Notiz (optional)..."
                className="w-full rounded-lg bg-neutral-800 border border-neutral-700 px-3 py-2 text-sm text-neutral-200 outline-none focus:border-amber-500"
                rows={2}
              />
            )}
            <button
              type="button"
              disabled={busy || (task.requiresPhoto && !file)}
              onClick={handleSubmit}
              className="w-full rounded-lg bg-amber-500 py-2.5 text-sm font-semibold text-neutral-900 disabled:opacity-40"
            >
              {busy ? "Wird hochgeladen..." : "Erledigt – zur Freigabe einreichen"}
            </button>
          </div>
        )}

        {status === "pending" && progress?.submittedBy === me && (
          <div className="rounded-lg bg-neutral-800 p-3 text-sm text-neutral-300">
            {progress.photoUrl && (
              <img src={progress.photoUrl} alt="" className="w-full rounded-lg mb-2 max-h-64 object-cover" />
            )}
            ⏳ Warte auf Freigabe von einem Kumpel...
          </div>
        )}

        {status === "pending" && progress?.submittedBy !== me && (
          <div className="space-y-3">
            <p className="text-xs text-neutral-400">
              Eingereicht von <span className="text-neutral-200 font-medium">{progress?.submittedBy}</span>
            </p>
            {progress?.photoUrl && (
              <img src={progress.photoUrl} alt="" className="w-full rounded-lg max-h-64 object-cover" />
            )}
            {progress?.note && <p className="text-sm text-neutral-300 italic">„{progress.note}“</p>}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onReject}
                className="flex-1 rounded-lg border border-neutral-700 py-2.5 text-sm font-semibold text-neutral-300"
              >
                ❌ Nochmal
              </button>
              <button
                type="button"
                onClick={onApprove}
                className="flex-1 rounded-lg bg-emerald-500 py-2.5 text-sm font-semibold text-neutral-900"
              >
                ✅ Passt!
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
