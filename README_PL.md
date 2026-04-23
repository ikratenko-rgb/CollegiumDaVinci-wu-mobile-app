# WU Plan — rozkład bez bólu

Oficjalna strona wu.cdv.pl działa jakby pisali ją w 2008 roku. Muleje, nie jest dostosowana do telefonu i w ogóle — nie PWA. Dlatego napisałem swoje.

To aplikacja webowa dla studentów Collegium Da Vinci (Wirtualna Uczelnia). Działa jak natywna apka na iPhonie i Androidzie, cachuje się offline, ma przyzwoity UI.

---

## Co umie

- Logowanie przez Twoje istniejące credentials WU
- Plan zajęć na tydzień do przodu i do tyłu
- Karty zajęć z detalami: prowadzący, sala, link do zajęć online
- Tryb offline — dane brane z cache, widać kiedy były pobrane
- Autologowanie przy ponownym otwarciu
- Onboarding przy pierwszym uruchomieniu
- Dark mode (OLED black), Light mode, trzy języki: PL / RU / EN
- Instalacja na ekranie głównym — działa jak aplikacja

---

## Prywatność

Serwer to czysty proxy. Przyjmuje login i hasło, przesyła żądanie do wu.cdv.pl, zwraca token sesji. I tyle.

- **Hasła nigdzie nie są logowane** — ani do plików, ani do konsoli, ani do bazy danych
- **Na serwerze nic nie jest przechowywane** — żadnej bazy, żadnych sesji, żadnego stanu
- **Credentials są tylko u Ciebie** — w `localStorage` Twojego urządzenia w base64
- **Cache planu** — też tylko w `localStorage`, nie opuszcza urządzenia
- Chcesz sprawdzić — kody źródłowe są otwarte, patrz `server.js`

---

## Uruchomienie lokalnie

```bash
git clone https://github.com/ikratenko-rgb/CollegiumDaVinci-wu-mobile-app.git
cd CollegiumDaVinci-wu-mobile-app
npm install
npm start
```

Otwórz `http://localhost:3000`. Do testowania na telefonie w tej samej sieci — znajdź swoje lokalne IP i otwórz `http://192.168.x.x:3000`.

---

## Stack

- **Frontend**: Native JavaScript (ES6+), Zero-Dependency Architecture
- **Backend**: Node.js + Express (proxy do wu.cdv.pl)
- **PWA**: Service Worker, Web App Manifest, localStorage cache

---

## Jak kontrybuować

Znalazłeś błąd albo chcesz dodać feature — zapraszam.

```bash
git fork
git checkout -b fix/moj-fix
# rób co trzeba
git commit -m "fix: opis co naprawiłem"
git push origin fix/moj-fix
# otwórz PR
```

Pisz do mnie na Telegram jeśli coś się posypało lub masz pomysły: [@krtlnk](https://t.me/krtlnk)

---

*Zrobione przez studenta dla studentów. Bez korpo vibes, dobra apka.*
