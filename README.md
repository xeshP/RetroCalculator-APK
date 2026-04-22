# Retro-80 Calculator

Ein Android-Calculator im 80er-Retro-Look (Capacitor + React + Vite).

## So kommst du zur APK auf deinem Pixel 9

### 1. GitHub-Repo erstellen

1. Gehe auf https://github.com/new
2. Repo-Name: `retro-calculator` (oder wie du willst), **Public** oder **Private** egal
3. Klick auf *Create repository*

### 2. Diese Dateien hochladen

**Variante A — über die Web-UI (ohne Git lokal):**
- Auf deinem neuen Repo → *Add file* → *Upload files*
- Zip entpacken und **alle Dateien inkl. `.github`-Ordner** reinziehen
- Commit-Message eingeben → *Commit changes*

**Variante B — mit Git (falls du Git kennst):**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/DEIN-USER/retro-calculator.git
git push -u origin main
```

### 3. Warten (3–5 Minuten)

- Im Repo auf den Tab **Actions** klicken
- Du siehst einen Workflow **"Build Android APK"** laufen
- Wenn er grün ist (✅), draufklicken

### 4. APK herunterladen

- Ganz unten unter **Artifacts** → `retro-80-calculator-apk` anklicken
- Eine ZIP wird heruntergeladen → entpacken → fertig: `retro-80-calculator.apk`

### 5. Aufs Pixel 9 übertragen und installieren

1. APK per USB-Kabel, Google Drive, E-Mail oder Messenger aufs Pixel bekommen
2. Auf dem Pixel: *Einstellungen* → *Apps* → *Spezieller App-Zugriff* → *Unbekannte Apps installieren*
3. Deinen Browser / Dateimanager erlauben, APKs zu installieren
4. APK-Datei antippen → *Installieren*
5. Android warnt bei unsignierten Apps — *Trotzdem installieren*

Fertig. Die App erscheint als "Retro-80" im App-Drawer.

---

## Lokal entwickeln (optional)

```bash
npm install
npm run dev
```

Öffnet Vite auf http://localhost:5173 — Änderungen am Code siehst du sofort.

## Tech-Stack

- **React 18** — UI
- **Vite** — Build-Tool
- **Tailwind CSS** — Styling
- **Capacitor** — Web → native Android
- **GitHub Actions** — CI/CD, baut die APK

## Was fehlt noch für den Play Store?

Diese APK ist **Debug-signiert** — super für persönliche Installation, aber nicht für den Play Store. Für Release brauchst du:
- Eigenen Signing-Key (Keystore)
- Release-Build (`assembleRelease`)
- Google-Play-Developer-Account (einmalig $25)
- App-Icons, Screenshots, Store-Listing
