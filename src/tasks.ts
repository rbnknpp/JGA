export type TaskCategory = "foto" | "bar" | "sozial" | "braeutigam";

export interface TaskDef {
  id: string;
  order: number;
  category: TaskCategory;
  title: string;
  description: string;
  requiresPhoto: boolean;
}

export const CATEGORY_META: Record<
  TaskCategory,
  { label: string; emoji: string; color: string }
> = {
  foto: { label: "Foto-Challenge", emoji: "📸", color: "bg-sky-500" },
  bar: { label: "Bar-Aufgabe", emoji: "🍻", color: "bg-amber-500" },
  sozial: { label: "Sozial-Dare", emoji: "🗣️", color: "bg-violet-500" },
  braeutigam: { label: "Bräutigam-Spezial", emoji: "🤵", color: "bg-rose-500" },
};

// {groom} wird zur Laufzeit durch den hinterlegten Namen des Bräutigams ersetzt.
export const TASKS: TaskDef[] = [
  {
    id: "t01",
    order: 1,
    category: "foto",
    title: "Auftakt an der Raststätte",
    description:
      "An der Raststätte auf dem Weg nach Düsseldorf trinkt jeder von euch ein Bier – aber jeder eine andere Sorte. Foto von allen vieren mit ihren unterschiedlichen Bieren.",
    requiresPhoto: true,
  },
  {
    id: "t02",
    order: 2,
    category: "braeutigam",
    title: "Die erste Rede",
    description:
      "{groom} hält vor mindestens 3 fremden Personen einen kurzen, überzeugenden Toast auf die Braut. Video oder Foto mit den Fremden im Bild.",
    requiresPhoto: true,
  },
  {
    id: "t03",
    order: 3,
    category: "sozial",
    title: "Schwiegersohn des Jahres",
    description:
      "Sprecht eine Gruppe Fremder an und lasst sie abstimmen, wer von euch vieren der beste Schwiegersohn wäre. Beweisfoto mit der Gruppe.",
    requiresPhoto: true,
  },
  {
    id: "t04",
    order: 4,
    category: "foto",
    title: "Längste Theke der Welt",
    description:
      "Foto in der Altstadt mit einem Getränk in jeder Hand – die Düsseldorfer Altstadt nennt sich schließlich \"längste Theke der Welt\".",
    requiresPhoto: true,
  },
  {
    id: "t05",
    order: 5,
    category: "bar",
    title: "Killepitsch-Verkostung",
    description:
      "Bestellt einen Killepitsch (den Düsseldorfer Kräuterlikör). {groom} bekommt die Augen verbunden und muss erraten, was er trinkt.",
    requiresPhoto: true,
  },
  {
    id: "t06",
    order: 6,
    category: "foto",
    title: "Radschläger",
    description:
      "Der Radschläger ist das Wahrzeichen von Düsseldorf. Einer von euch schlägt öffentlich ein Rad – Foto oder Video vom Sprung.",
    requiresPhoto: true,
  },
  {
    id: "t07",
    order: 7,
    category: "foto",
    title: "Biertisch-Beweis",
    description:
      "Gruppenfoto von allen vieren mit mindestens 8 Bier gut sichtbar auf dem Tisch. Alle müssen lachen, keine Ausreden.",
    requiresPhoto: true,
  },
  {
    id: "t08",
    order: 8,
    category: "foto",
    title: "Am Rheinturm",
    description:
      "Gruppenfoto vor dem Rheinturm – alle vier springen gleichzeitig in die Luft. Wiederholen, bis das Timing sitzt.",
    requiresPhoto: true,
  },
  {
    id: "t09",
    order: 9,
    category: "bar",
    title: "Die Todsünde",
    description:
      "Fragt in einer waschechten Düsseldorfer Kneipe ganz unschuldig nach einem \"Kölsch\". Foto von der Reaktion hinter der Theke.",
    requiresPhoto: true,
  },
  {
    id: "t10",
    order: 10,
    category: "foto",
    title: "Altbier-Pyramide",
    description:
      "Baut aus euren leeren Altbier-Gläsern einen möglichst hohen Turm oder eine Pyramide auf dem Tisch. Foto vom Bauwerk, bevor es umkippt.",
    requiresPhoto: true,
  },
  {
    id: "t11",
    order: 11,
    category: "sozial",
    title: "Bierdeckel-Autogramm",
    description:
      "Lasst euch von einer fremden Person auf einem Bierdeckel einen Ehe-Spruch oder Glückwunsch für {groom} aufschreiben und unterschreiben. Foto vom beschriebenen Bierdeckel zusammen mit der Person.",
    requiresPhoto: true,
  },
  {
    id: "t12",
    order: 12,
    category: "braeutigam",
    title: "Der Gentleman",
    description:
      "{groom} muss 15 Minuten lang jede Person, die ihn anspricht, formell siezen und mit \"mein Herr\" bzw. \"meine Dame\" ansprechen. Die anderen drei bezeugen und bestätigen danach.",
    requiresPhoto: false,
  },
  {
    id: "t13",
    order: 13,
    category: "foto",
    title: "Kö-Models",
    description:
      "Foto auf der Königsallee vor einem möglichst teuren Schaufenster – alle vier posieren wie Models für die Auslage.",
    requiresPhoto: true,
  },
  {
    id: "t14",
    order: 14,
    category: "bar",
    title: "Freundlich erschnorrt",
    description:
      "Ergattert an einer Bar einen kostenlosen Shot – charmant erbetteln, nicht klauen. Beweisfoto mit Shot und neuem Bar-Freund.",
    requiresPhoto: true,
  },
  {
    id: "t15",
    order: 15,
    category: "sozial",
    title: "Wer errät die Braut",
    description:
      "Lasst eine fremde Person raten, wer von euch vieren bald heiratet – ohne Hinweise zu geben. Foto mit der ratenden Person und ihrer Antwort (z.B. auf Zettel geschrieben).",
    requiresPhoto: true,
  },
  {
    id: "t16",
    order: 16,
    category: "foto",
    title: "Das große Finale",
    description:
      "Letztes Gruppenfoto der Nacht – mit allen Erinnerungsstücken, Zetteln oder Souvenirs, die ihr heute Abend gesammelt habt.",
    requiresPhoto: true,
  },
];
