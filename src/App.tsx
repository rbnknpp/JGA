import { useMemo, useState } from "react";
import { TASKS } from "./tasks";
import { useEventConfig } from "./hooks/useEventConfig";
import { useProgress } from "./hooks/useProgress";
import { WhoAmI } from "./components/WhoAmI";
import { Setup } from "./components/Setup";
import { TaskCard } from "./components/TaskCard";
import { ProgressDots } from "./components/ProgressDots";
import { FinishScreen } from "./components/FinishScreen";

const ME_KEY = "jga_me";

function App() {
  const { config, setConfig } = useEventConfig();
  const { progress, submitTask, approveTask, rejectTask, uploadPhoto } = useProgress();
  const [me, setMe] = useState<string | null>(() => localStorage.getItem(ME_KEY));
  const [showSetup, setShowSetup] = useState(false);

  const groomName = config.participants[config.groomIndex] ?? "der Bräutigam";

  const currentIndex = useMemo(() => {
    return TASKS.findIndex((t) => progress[t.id]?.status !== "approved");
  }, [progress]);

  const allDone = currentIndex === -1;
  const currentTask = !allDone ? TASKS[currentIndex] : null;

  function pickMe(name: string) {
    localStorage.setItem(ME_KEY, name);
    setMe(name);
  }

  if (!me) {
    return (
      <>
        <WhoAmI
          participants={config.participants}
          onPick={pickMe}
          onEditNames={() => setShowSetup(true)}
        />
        {showSetup && (
          <Setup
            initial={config}
            onClose={() => setShowSetup(false)}
            onSave={(next) => {
              setConfig(next);
              setShowSetup(false);
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
          <p className="text-xs text-neutral-500">Angemeldet als {me}</p>
        </div>
        <button
          type="button"
          onClick={() => setShowSetup(true)}
          className="rounded-full border border-neutral-700 p-2 text-neutral-400"
          aria-label="Einstellungen"
        >
          ⚙️
        </button>
      </header>

      {!allDone && (
        <div className="w-full max-w-md">
          <ProgressDots total={TASKS.length} currentIndex={currentIndex} />
        </div>
      )}

      {currentTask ? (
        <TaskCard
          task={currentTask}
          groomName={groomName}
          progress={progress[currentTask.id]}
          me={me}
          onSubmit={async (file, note) => {
            const photoUrl = file ? await uploadPhoto(file) : undefined;
            await submitTask(currentTask.id, me, { photoUrl, note: note || undefined });
          }}
          onApprove={() => approveTask(currentTask.id, me)}
          onReject={() => rejectTask(currentTask.id, me)}
        />
      ) : (
        <FinishScreen groomName={groomName} />
      )}

      {showSetup && (
        <Setup
          initial={config}
          onClose={() => setShowSetup(false)}
          onSave={(next) => {
            setConfig(next);
            setShowSetup(false);
          }}
        />
      )}
    </div>
  );
}

export default App;
