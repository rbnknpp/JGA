interface Props {
  participants: string[];
  onPick: (name: string) => void;
  onEditNames: () => void;
}

export function WhoAmI({ participants, onPick, onEditNames }: Props) {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-6 p-6 text-neutral-100">
      <div className="text-center">
        <div className="text-4xl mb-2">🥂</div>
        <h1 className="text-2xl font-bold">Wer bist du?</h1>
        <p className="text-neutral-400 text-sm mt-1">
          Nur auf diesem Handy gespeichert.
        </p>
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
