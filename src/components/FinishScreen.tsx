interface Props {
  groomName: string;
  crewNames: string[];
}

export function FinishScreen({ groomName, crewNames }: Props) {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-6 p-6 text-center text-neutral-100">
      <div className="text-6xl">🎉</div>
      <div>
        <h1 className="text-2xl font-bold">Geschafft!</h1>
        <p className="mt-2 text-neutral-400 max-w-xs mx-auto">
          Alle Aufgaben erledigt. {groomName} hat's überlebt – Zeit für den letzten Absacker.
          Prost! 🍻
        </p>
      </div>

      <div className="w-full max-w-sm rounded-2xl border border-rose-800/50 bg-gradient-to-b from-rose-950/60 to-neutral-900 p-5 text-left">
        <p className="text-sm leading-relaxed text-neutral-200">
          Lieber {groomName},
          <br />
          <br />
          heute Abend haben wir zusammen Erinnerungen fürs Leben gesammelt – zwischen Bier,
          Blödsinn und jeder Menge Lachen. Du warst der Beste, den man sich für diesen Abend
          wünschen konnte.
          <br />
          <br />
          Wir sind stolz auf dich und können es kaum erwarten, dich bald am Altar zu sehen.
          Alles Liebe und viel Glück für eure gemeinsame Zukunft – ihr seid ein großartiges Team! 💍
        </p>
        <p className="mt-4 text-sm font-medium text-rose-300">
          {crewNames.length > 0 ? `Deine Jungs: ${crewNames.join(", ")} ❤️` : "Deine Jungs ❤️"}
        </p>
      </div>
    </div>
  );
}
