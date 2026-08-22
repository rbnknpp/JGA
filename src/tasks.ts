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
    category: "bar",
    title: "Kiosk-Runde",
    description:
      "Sucht euch einen x-beliebigen Kiosk in Düsseldorf. Jeder von euch kauft sich dort ein Bier, und ihr trinkt es gemeinsam direkt davor. Gruppenfoto mit allen vieren und dem Kiosk-Schild gut sichtbar im Hintergrund.",
    requiresPhoto: true,
  },
  {
    id: "t03",
    order: 3,
    category: "sozial",
    title: "Julians Fremden-Duell",
    description:
      "Julian sucht sich eine fremde Person und fordert sie zu einer Runde Schnick-Schnack-Schnuck heraus – Best of 3. Egal wer gewinnt, danach ein Foto mit dem Gegner.",
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
    category: "sozial",
    title: "Elias' Armdrück-Duell",
    description:
      "Elias fordert eine fremde Person zu einer Runde Armdrücken heraus. Der Sieger bekommt Szenenapplaus von der Truppe. Beweisfoto mit dem Gegner, egal wie's ausgeht.",
    requiresPhoto: true,
  },
  {
    id: "t08",
    order: 8,
    category: "foto",
    title: "Fremden-Mega-Gruppenfoto",
    description:
      "Ladet 3-4 völlig fremde Leute ein, spontan mit euch ein großes Gruppenfoto mitten in der Stadt zu machen.",
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
    category: "bar",
    title: "Kellner-Roulette",
    description:
      "Jeder von euch bestellt an der Theke einen Shot – aber der Kellner oder die Kellnerin entscheidet, welchen ihr bekommt. Danach ein Foto: im besten Fall zusammen mit dem Kellner bzw. der Kellnerin und den Shots, sonst ein Selfie mit den Shots.",
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
    category: "braeutigam",
    title: "Toms Ehe-Pitch",
    description:
      "{groom} hat 60 Sekunden, um einer fremden Person zu erklären, warum er der perfekte Ehemann wird – ohne ein einziges \"äh\" oder \"ähm\". Verhaspelt er sich, geht's von vorne los. Video oder Foto mit der reagierenden Person.",
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
    title: "Robins Komplimente-Battle",
    description:
      "Robin macht einer fremden Person das kreativste Kompliment des Abends – \"schön\" oder \"hübsch\" sind verboten. Die Person bewertet mit Daumen hoch oder runter. Beweisfoto mit Kompliment-Empfänger und Daumen-Geste.",
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
