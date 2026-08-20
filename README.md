# JGA Düsseldorf 🥃

Kleine Mini-Webapp für den Junggesellenabschied in Düsseldorf. Läuft im
Browser, lässt sich aber wie eine App auf den Homescreen legen ("Zum
Home-Bildschirm hinzufügen" in Safari/Chrome).

Die Crew bekommt nacheinander 16 Aufgaben (Foto-Challenges, Bar-Dares,
Sozial-Dares, Bräutigam-Spezial). Wer eine Aufgabe erledigt hat, lädt ein
Foto hoch (oder schreibt eine Notiz) und reicht es ein. Einer der anderen
drei muss die Einreichung im Browser mit "Passt!" bestätigen – erst dann
schaltet sich die nächste Aufgabe für alle vier Handys gleichzeitig frei.

## Setup

```bash
npm install
npm run dev
```

Die Firebase-Config des Projekts `junggesellenabschied-bb0f6` ist bereits in
[`src/firebase.ts`](src/firebase.ts) hinterlegt (Firebase-Web-Configs sind
öffentliche Kennungen, keine Geheimnisse – die eigentliche Absicherung
passiert über die Firestore/Storage-Regeln unten). `.env` ist nur nötig, um
stattdessen ein anderes Firebase-Projekt anzusprechen.

### Firebase-Projekt fertig einrichten

Das Projekt existiert schon, aber Firestore und Storage müssen einmalig
aktiviert werden:

1. [console.firebase.google.com](https://console.firebase.google.com/) →
   Projekt "Junggesellenabschied" öffnen
2. **Build → Firestore Database** → "Datenbank erstellen" (Testmodus)
3. **Build → Storage** → "Los geht's" (Testmodus, für die Fotos)
4. In beiden dann unter "Regeln" die untenstehenden Regeln einfügen und
   veröffentlichen

Empfohlene Firestore/Storage-Regeln für den Partyabend (offen, aber nur für
die 2 genutzten Collections/den Fotos-Ordner):

```
// Firestore rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /config/{doc} { allow read, write: if true; }
    match /progress/{doc} { allow read, write: if true; }
  }
}
```

```
// Storage rules
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /photos/{allPaths=**} { allow read, write: if true; }
  }
}
```

## Aufgaben anpassen

Alle Aufgaben stehen in [`src/tasks.ts`](src/tasks.ts) – Titel, Beschreibung,
Kategorie und ob ein Foto nötig ist. `{groom}` wird automatisch durch den
Namen des hinterlegten Bräutigams ersetzt.

## Deployment (GitHub Pages)

Der Workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)
baut die App bei jedem Push auf `main` und veröffentlicht sie auf GitHub
Pages.

1. Repo-Einstellungen → **Pages** → Source: "GitHub Actions"
2. Push auf `main` → die App landet unter
   `https://<username>.github.io/JGA/`

Danach auf dem Handy die URL öffnen und über den Browser
("Zum Home-Bildschirm hinzufügen") installieren.
