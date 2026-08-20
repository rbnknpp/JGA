interface Props {
  total: number;
  currentIndex: number;
}

export function ProgressDots({ total, currentIndex }: Props) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between text-xs text-neutral-400 mb-1.5">
        <span>
          Aufgabe {Math.min(currentIndex + 1, total)} / {total}
        </span>
        <span>{Math.round((currentIndex / total) * 100)}%</span>
      </div>
      <div className="h-2 w-full rounded-full bg-neutral-800 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-amber-400 to-rose-500 transition-all duration-500"
          style={{ width: `${(currentIndex / total) * 100}%` }}
        />
      </div>
    </div>
  );
}
