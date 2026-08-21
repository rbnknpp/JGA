import { ShareLink } from "./ShareLink";

interface Props {
  participants: string[];
  groomName: string;
  onPick: (name: string) => void;
  onEditNames: () => void;
}

export function WhoAmI({ participants, groomName, onPick, onEditNames }: Props) {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-8 p-6 text-neutral-100">
      <div className="w-full max-w-sm rounded-2xl border border-amber-800/40 bg-gradient-to-b from-amber-950/40 to-neutral-900 p-5 text-center">
        <div className="text-4xl mb-2">🥂</div>
        <h1 className="text-xl font-bold">Junggesellenabschied für {groomName}!</h1>
        <p className="mt-3 text-sm leading-relaxed text-neutral-300">
          Für heute Abend bekommt ihr nach und nach Aufgaben, die ihr gemeinsam vor
          Ablauf der Nacht schaffen müsst. Wir wünschen euch ganz viel Spaß und viel
          Erfolg dabei!
        </p>
        <p className="mt-3 text-sm font-medium text-amber-300">
          Auf {groomName} – auf einen unvergesslichen letzten Abend als Junggeselle! 🍻
        </p>
      </div>

      <ShareLink />

      <div className="text-center">
        <h2 className="text-lg font-bold">Wer bist du?</h2>
        <p className="text-neutral-400 text-sm mt-1">Nur auf diesem Handy gespeichert.</p>
      </div>
      <div className="w-full max-w-xs space-y-2">
        {participants.map((name) => (
          <button
            key={name}
            type="button"
            onClick={() => onPick(name)}
            className="w-full rounded-xl bg-neutral-800 border border-neutral-700 py-3 text-base font-medium hover:border-amber-500"
          >
            {name}
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={onEditNames}
        className="text-sm text-neutral-500 underline"
      >
        Namen stimmen nicht? Bearbeiten
      </button>
    </div>
  );
}
