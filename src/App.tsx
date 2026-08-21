import { useMemo, useState } from "react";
import { TASKS } from "./tasks";
import { useEventConfig } from "./hooks/useEventConfig";
import { useProgress } from "./hooks/useProgress";
import { WhoAmI } from "./components/WhoAmI";
import { Setup } from "./components/Setup";
import { TaskCard } from "./components/TaskCard";
import { ProgressDots } from "./components/ProgressDots";
import { FinishScreen } from "./components/FinishScreen";
import { Gallery } from "./components/Gallery";

const ME_KEY = "jga_me";

function App() {
  const { config, setConfig } = useEventConfig();
  const { progress, submitTask, approveTask, rejectTask, uploadPhoto } = useProgress();
  const [me, setMe] = useState<string | null>(() => localStorage.getItem(ME_KEY));
  const [showSetup, setShowSetup] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function withErrorHandling(action: () => Promise<void>) {
    try {
      setError(null);
      await action();
    } catch (err) {
      setError(
        err instanceof Error
          ? `Speichern fehlgeschlagen: ${err.message}`
          : "Speichern fehlgeschlagen. Bitte nochmal versuchen.",
      );
    }
  }

  const groomName = config.participants[config.groomIndex] ?? "der Bräutigam";
  const crewNames = config.participants.filter((_, i) => i !== config.groomIndex);

  const currentIndex = useMemo(() => {
    return TASKS.findIndex((t) => progress[t.id]?.status !== "approved");
  }, [progress]);

  const allDone = currentIndex === -1;
  const currentTask = !allDone ? TASKS[currentIndex] : null;
  const hasPhotos = TASKS.some(
    (t) => progress[t.id]?.status === "approved" && progress[t.id]?.photoUrl,
  );

  function pickMe(name: string) {
    localStorage.setItem(ME_KEY, name);
    setMe(name);
  }

  function switchMe() {
    localStorage.removeItem(ME_KEY);
    setMe(null);
  }

  if (!me) {
    return (
      <>
        <WhoAmI
          participants={config.participants}
          onPick={pickMe}
          onEditNames={() => setShowSetup(true)}
        />
        {error && <ErrorBanner message={error} onDismiss={() => setError(null)} />}
        {showSetup && (
          <Setup
            initial={config}
            onClose={() => setShowSetup(false)}
            onSave={(next) => {
              withErrorHandling(async () => {
                await setConfig(next);
                setShowSetup(false);
              });
            }}
          />
        )}
      </>
    );
  }

  return (
    <div className="min-h-dvh flex flex-col items-center px-4 py-6 gap-5">
      <header className="w-full max-w-md flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-neutral-100">🥃 JGA Düsseldorf</h1>
          <p className="text-xs text-neutral-500">
            Angemeldet als {me} ·{" "}
            <button type="button" onClick={switchMe} className="underline">
              wechseln
            </button>
          </p>
        </div>
        <div className="flex items-center gap-2">
          {hasPhotos && (
            <button
              type="button"
              onClick={() => setShowGallery(true)}
              className="rounded-full border border-neutral-700 p-2 text-neutral-400"
              aria-label="Galerie"
            >
              📸
            </button>
          )}
          <button
            type="button"
            onClick={() => setShowSetup(true)}
            className="rounded-full border border-neutral-700 p-2 text-neutral-400"
            aria-label="Einstellungen"
          >
            ⚙️
          </button>
        </div>
      </header>

      {!allDone && (
        <div className="w-full max-w-md">
          <ProgressDots total={TASKS.length} currentIndex={currentIndex} />
        </div>
      )}

      {error && <ErrorBanner message={error} onDismiss={() => setError(null)} />}

      {currentTask ? (
        <TaskCard
          task={currentTask}
          groomName={groomName}
          progress={progress[currentTask.id]}
          me={me}
          onSubmit={(file, note) =>
            withErrorHandling(async () => {
              const photoUrl = file ? await uploadPhoto(file) : undefined;
              await submitTask(currentTask.id, me, { photoUrl, note: note || undefined });
            })
          }
          onApprove={() => withErrorHandling(() => approveTask(currentTask.id, me))}
          onReject={() => withErrorHandling(() => rejectTask(currentTask.id, me))}
        />
      ) : (
        <FinishScreen groomName={groomName} crewNames={crewNames} />
      )}

      {showSetup && (
        <Setup
          initial={config}
          onClose={() => setShowSetup(false)}
          onSave={(next) => {
            withErrorHandling(async () => {
              await setConfig(next);
              setShowSetup(false);
            });
          }}
        />
      )}

      {showGallery && <Gallery progress={progress} onClose={() => setShowGallery(false)} />}
    </div>
  );
}

function ErrorBanner({ message, onDismiss }: { message: string; onDismiss: () => void }) {
  return (
    <div className="w-full max-w-md rounded-lg bg-rose-950 border border-rose-800 px-4 py-3 text-sm text-rose-200 flex items-start gap-3">
      <span className="flex-1">⚠️ {message}</span>
      <button type="button" onClick={onDismiss} className="text-rose-400 shrink-0">
        ✕
      </button>
    </div>
  );
}

export default App;
