interface Props {
  groomName: string;
}

export function FinishScreen({ groomName }: Props) {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4 p-6 text-center text-neutral-100">
      <div className="text-6xl">🎉</div>
      <h1 className="text-2xl font-bold">Geschafft!</h1>
      <p className="text-neutral-400 max-w-xs">
        Alle Aufgaben erledigt. {groomName} hat's überlebt – Zeit für den letzten Absacker. Prost! 🍻
      </p>
    </div>
  );
}
