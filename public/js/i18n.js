import { state } from './state.js';

export const translations = {
  pl: {
    loginTitle: 'Wirtualna Uczelnia',
    loginSubtitle: 'Zaloguj się aby zobaczyć plan zajęć',
    loginLabel: 'Login (e-mail)',
    passLabel: 'Hasło',
    loginBtn: 'Zaloguj się',
    loginConnecting: 'Łączenie…',
    loginMissing: 'Wprowadź login i hasło',
    loginFail: 'Nieprawidłowy login lub hasło',
    networkError: 'Błąd sieci',
    loadError: 'Błąd ładowania planu',
    headerSchedule: 'Plan zajęć',
    emptyTitle: 'Wolne!',
    emptySubtitle: 'Na dziś to wszystko.',
    detailDate: 'Data',
    detailTime: 'Godziny',
    detailForm: 'Forma',
    detailRoom: 'Sala',
    detailTeacher: 'Prowadzący',
    detailModule: 'Moduł',
    detailProfile: 'Kierunek',
    detailLink: 'Link online',
    iosBanner: 'Dodaj do ekranu głównego: <strong>Udostępnij → Ekran główny</strong>',
    offlineMode: 'Tryb offline · dane z',
    cacheKey: 'pl-PL',
    sessionExpired: 'Sesja wygasła. Zaloguj się ponownie.',
    emailInvalid: 'Nieprawidłowy format email',
    feedbackText: 'Znalazłeś błąd? Napisz do mnie',
    btnToday: 'Dzisiaj',
    returnHint: '• 2-tap na dzisiaj',
    obSkip: 'Pomiń', obNext: 'Dalej', obStart: 'Zaczynamy!',
    ob: [
      { title: 'Twój plan.', sub: 'Zawsze pod ręką, bez opóźnień i lagów.' },
      { title: 'Instalacja w dwa kliknięcia.', sub: 'Naciśnij "Udostępnij" w Safari i dodaj do ekranu głównego.' },
      { title: 'Na ekran główny.', sub: 'Korzystaj jak z natywnej aplikacji na swoim iPhonie.' },
    ],
    dayNames: ['Niedz', 'Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob'],
    dayNamesFull: ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'],
    monthNames: ['stycznia', 'lutego', 'marca', 'kwietnia', 'maja', 'czerwca', 'lipca', 'sierpnia', 'września', 'października', 'listopada', 'grudnia'],
  },
  ru: {
    loginTitle: 'Wirtualna Uczelnia',
    loginSubtitle: 'Войдите чтобы увидеть расписание',
    loginLabel: 'Логин (e-mail)',
    passLabel: 'Пароль',
    loginBtn: 'Войти',
    loginConnecting: 'Подключение…',
    loginMissing: 'Введите логин и пароль',
    loginFail: 'Неверный логин или пароль',
    networkError: 'Ошибка сети',
    loadError: 'Ошибка загрузки расписания',
    headerSchedule: 'Расписание',
    emptyTitle: 'Свобода!',
    emptySubtitle: 'На сегодня всё.',
    detailDate: 'Дата',
    detailTime: 'Время',
    detailForm: 'Форма',
    detailRoom: 'Аудитория',
    detailTeacher: 'Преподаватель',
    detailModule: 'Модуль',
    detailProfile: 'Направление',
    detailLink: 'Ссылка',
    iosBanner: 'Добавьте на главный экран: <strong>Поделиться → На экран «Домой»</strong>',
    offlineMode: 'Офлайн · данные от',
    cacheKey: 'ru-RU',
    sessionExpired: 'Сессия истекла. Войдите снова.',
    emailInvalid: 'Некорректный email',
    feedbackText: 'Нашел баг? Напиши мне',
    btnToday: 'Сегодня',
    returnHint: '• 2-tap перейти на сегодня',
    obSkip: 'Пропустить', obNext: 'Далее', obStart: 'Начнём!',
    ob: [
      { title: 'Твоё расписание.', sub: 'Всегда под рукой, без лагов и пауз.' },
      { title: 'Установка в два клика.', sub: 'Нажми «Поделиться» в Safari и добавь на главный экран.' },
      { title: 'Пользуйся как приложением.', sub: 'Выбери «На экран Домой» и запускай как нативное.' },
    ],
    dayNames: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    dayNamesFull: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
    monthNames: ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'],
  },
  en: {
    loginTitle: 'Wirtualna Uczelnia',
    loginSubtitle: 'Log in to view your schedule',
    loginLabel: 'Login (e-mail)',
    passLabel: 'Password',
    loginBtn: 'Log In',
    loginConnecting: 'Connecting…',
    loginMissing: 'Enter login and password',
    loginFail: 'Invalid login or password',
    networkError: 'Network error',
    loadError: 'Failed to load schedule',
    headerSchedule: 'Schedule',
    emptyTitle: 'All clear!',
    emptySubtitle: 'Nothing scheduled today.',
    detailDate: 'Date',
    detailTime: 'Time',
    detailForm: 'Type',
    detailRoom: 'Room',
    detailTeacher: 'Teacher',
    detailModule: 'Module',
    detailProfile: 'Program',
    detailLink: 'Online link',
    iosBanner: 'Add to Home Screen: <strong>Share → Add to Home Screen</strong>',
    offlineMode: 'Offline · data from',
    cacheKey: 'en-US',
    sessionExpired: 'Session expired. Please log in again.',
    emailInvalid: 'Invalid email format',
    feedbackText: 'Found a bug? Let me know',
    btnToday: 'Today',
    returnHint: '• 2-tap for today',
    obSkip: 'Skip', obNext: 'Next', obStart: "Let's go!",
    ob: [
      { title: 'Your schedule.', sub: 'Always at hand, fast and smooth.' },
      { title: 'Install in two taps.', sub: 'Tap "Share" in Safari and add to your home screen.' },
      { title: 'Use it like an app.', sub: 'Choose "Add to Home Screen" and launch it like native.' },
    ],
    dayNames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    dayNamesFull: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  }
};

export function detectLang() {
  const savedLang = localStorage.getItem('wu_lang');
  if (savedLang && translations[savedLang]) return savedLang;
  const nav = (navigator.language || '').slice(0, 2).toLowerCase();
  return translations[nav] ? nav : 'ru';
}

export function t(key) {
  return (translations[state.lang] || translations.pl)[key] || key;
}

export function applyLang(lang) {
  if (!translations[lang]) return;
  state.lang = lang;
  localStorage.setItem('wu_lang', lang);
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    el.innerHTML = t(el.dataset.i18nHtml);
  });
  document.querySelectorAll('.lang-option').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
}
