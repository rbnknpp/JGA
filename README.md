# JGA Düsseldorf 🥃

Kleine Mini-Webapp für den Junggesellenabschied in Düsseldorf. Läuft im
Browser, lässt sich aber wie eine App auf den Homescreen legen ("Zum
Home-Bildschirm hinzufügen" in Safari/Chrome).

Live unter: `https://rbnknpp.github.io/JGA/` (sobald GitHub Pages aktiviert
und die Firebase-Secrets hinterlegt sind, siehe unten).

Die Crew bekommt nacheinander 16 Aufgaben (Foto-Challenges, Bar-Dares,
Sozial-Dares, Bräutigam-Spezial). Wer eine Aufgabe erledigt hat, lädt ein
Foto hoch (oder schreibt eine Notiz) und reicht es ein. Einer der anderen
drei muss die Einreichung im Browser mit "Passt!" bestätigen – erst dann
schaltet sich die nächste Aufgabe für alle vier Handys gleichzeitig frei.

## Setup

```bash
npm install
cp .env.example .env
# .env mit den Firebase-Config-Werten befüllen (siehe unten)
npm run dev
```

Ohne Firebase-Config läuft die App trotzdem lokal (Fortschritt wird nur im
Browser des jeweiligen Handys gespeichert, aber nicht zwischen den Geräten
synchronisiert).

### Firebase einrichten (für Live-Sync zwischen allen Handys)

1. [firebase.google.com](https://firebase.google.com/) → neues Projekt
   (kostenloser Spark-Plan, keine Kreditkarte nötig)
2. **Build → Firestore Database** → Datenbank erstellen (Testmodus)
3. **Build → Storage** → aktivieren (Testmodus, für die Fotos)
4. Projekteinstellungen → "Meine Apps" → Web-App hinzufügen → die
   angezeigte `firebaseConfig` in `.env` übertragen

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
2. Repo-Einstellungen → **Secrets and variables → Actions** → die 6
   `VITE_FIREBASE_*`-Werte aus `.env.example` als Repository-Secrets anlegen
3. Push auf `main` → die App landet unter
   `https://<username>.github.io/JGA/`

Danach auf dem Handy die URL öffnen und über den Browser
("Zum Home-Bildschirm hinzufügen") installieren.
