# WU Plan — schedule without the pain

The official wu.cdv.pl website feels like it was built in 2008. Slow, not mobile-friendly, and definitely not a PWA. So I built my own.

This is a web app for Collegium Da Vinci students (Wirtualna Uczelnia). Works like a native app on iPhone and Android, caches offline, and actually looks decent.

---

## What it does

- Login with your existing WU credentials
- Weekly schedule, navigate forward and back
- Class cards with details: teacher, room, online class link
- Offline mode — loads from cache, shows when data was last fetched
- Auto-login on reopen
- Onboarding on first launch
- Dark mode (OLED black), Light mode, three languages: PL / RU / EN
- Install to home screen — runs like a real app

---

## Privacy

The server is a pure proxy. It takes your login and password, forwards the request to wu.cdv.pl, and returns the session token. That's it.

- **Passwords are never logged** — not to files, not to console, not to any database
- **Nothing is stored on the server** — no database, no sessions, no state
- **Credentials stay on your device** — stored in `localStorage` as base64
- **Schedule cache** — also only in `localStorage`, never leaves your device
- Want to verify? Source is open, check `server.js`

---

## Run locally

```bash
git clone https://github.com/ikratenko-rgb/CollegiumDaVinci-wu-mobile-app.git
cd CollegiumDaVinci-wu-mobile-app
npm install
npm start
```

Open `http://localhost:3000`. To test on your phone on the same network — find your local IP and open `http://192.168.x.x:3000`.

---

## Stack

- **Frontend**: Native JavaScript (ES6+), Zero-Dependency Architecture
- **Backend**: Node.js + Express (proxy to wu.cdv.pl)
- **PWA**: Service Worker, Web App Manifest, localStorage cache

---

## Contributing

Found a bug or want to add something — welcome.

```bash
git fork
git checkout -b fix/my-fix
# do your thing
git commit -m "fix: description of what you fixed"
git push origin fix/my-fix
# open a PR
```

Hit me up on Telegram if something broke or you have ideas: [@krtlnk](https://t.me/krtlnk)

---

*Built by a student for students. No corporate, just a decent app.*
