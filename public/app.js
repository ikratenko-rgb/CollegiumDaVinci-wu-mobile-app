const NOTIFY_BEFORE_MS = 15 * 60 * 1000;
let notifyTimers = [];

const _storedSession = localStorage.getItem('wu_session') || null;
const _storedLang = localStorage.getItem('wu_lang') || null;

const translations = {
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

function detectLang() {
  if (_storedLang && translations[_storedLang]) return _storedLang;
  const nav = (navigator.language || '').slice(0, 2).toLowerCase();
  return translations[nav] ? nav : 'ru';
}

const state = {
  session: _storedSession,
  weekOffset: 0,
  selectedDay: null,
  classes: [],
  lang: detectLang(),
  theme: localStorage.getItem('wu_theme') ||
    (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'),
};

function t(key) { return (translations[state.lang] || translations.pl)[key] || key; }

const saveSession = () => localStorage.setItem('wu_session', state.session || '');
const loadSession = () => { state.session = localStorage.getItem('wu_session') || null; };

const $ = id => document.getElementById(id);
const els = {
  loginScreen: $('login-screen'), appScreen: $('app-screen'),
  inpLogin: $('inp-login'), inpPass: $('inp-pass'),
  btnLogin: $('btn-login'), loginError: $('login-error'),
  weekLabel: $('week-label'), todayIndicator: $('today-indicator'),
  dayTabs: $('day-tabs'), scheduleList: $('schedule-list'),
  dayHeadingMain: $('day-heading-main'), dayHeadingSub: $('day-heading-sub'),
  sheetBackdrop: $('sheet-backdrop'), detailSheet: $('detail-sheet'),
  sheetTitle: $('sheet-title'), sheetSubtitle: $('sheet-subtitle'),
  sheetBody: $('sheet-body'), sheetHandle: $('sheet-handle'),
  iosBanner: $('ios-banner'), btnLang: $('btn-lang'),
  langDropdown: $('lang-dropdown'), btnTheme: $('btn-theme'),
  offlineBanner: $('offline-banner'), offlineText: $('offline-text'),
  toast: $('toast'),
};

function monday(offset = 0) {
  const d = new Date();
  const day = d.getDay() || 7;
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - day + 1 + offset * 7);
  return d;
}
function addDays(date, n) { const d = new Date(date); d.setDate(d.getDate() + n); return d; }
function fmt(date) { return date.toISOString().slice(0, 10); }
function fmtTime(iso) { return iso.slice(11, 16); }
function isSameDay(a, b) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
function isCurrentWeek() { return state.weekOffset === 0; }

function computeDefaultDay() {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();
  if (day === 0 || (day === 6 && hour >= 15)) return { day: monday(1), offset: 1 };
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return { day: today, offset: 0 };
}

function getCachedWeek(cacheKey) {
  try { const r = localStorage.getItem(cacheKey); return r ? JSON.parse(r) : null; } catch (_) { return null; }
}

function haptic() {
  if (navigator.vibrate) navigator.vibrate(10);
}

let toastTimer = null;
function showToast(msg) {
  if (!els.toast) return;
  els.toast.textContent = msg;
  els.toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => els.toast.classList.remove('show'), 3000);
}

function shakeForm() {
  const form = els.loginScreen;
  form.classList.remove('shake');
  void form.offsetWidth;
  form.classList.add('shake');
  form.addEventListener('animationend', () => form.classList.remove('shake'), { once: true });
}

function showScreen(name) {
  els.loginScreen.classList.toggle('hidden', name !== 'login');
  els.appScreen.classList.toggle('hidden', name !== 'app');
}

function initIcons(root = document) {
  window.lucide?.createIcons({ elements: [...root.querySelectorAll('[data-lucide]')] });
}

let obCurrent = 0;
const OB_TOTAL = 3;

function showOnboarding() {
  document.getElementById('onboarding-screen').classList.remove('hidden');
  renderObSlide(0);
}

function renderObSlide(n) {
  obCurrent = n;
  document.querySelectorAll('.ob-slide').forEach((s, i) => s.classList.toggle('active', i === n));
  document.querySelectorAll('.ob-dot').forEach((d, i) => d.classList.toggle('active', i === n));
  const slides = t('ob');
  slides.forEach((slide, i) => {
    const tEl = $('ob-title-' + i);
    const sEl = $('ob-sub-' + i);
    if (tEl) tEl.textContent = slide.title;
    if (sEl) sEl.textContent = slide.sub;
  });
  const isLast = n === OB_TOTAL - 1;
  const btnStart = $('ob-btn-start');
  const btnRow = $('ob-btn-row');
  if (btnStart) { btnStart.textContent = t('obStart'); btnStart.classList.toggle('visible', isLast); }
  if (btnRow) btnRow.style.display = isLast ? 'none' : 'flex';
  $('ob-btn-next').textContent = t('obNext');
  $('ob-btn-skip').textContent = t('obSkip');
}

function finishOnboarding() {
  localStorage.setItem('onboarding_done', '1');
  const scr = document.getElementById('onboarding-screen');
  scr.style.opacity = '0';
  setTimeout(() => { scr.classList.add('hidden'); scr.style.display = 'none'; scr.style.opacity = ''; bootApp(); }, 500);
}

document.getElementById('ob-btn-next').addEventListener('click', () => { haptic(); if (obCurrent < OB_TOTAL - 1) renderObSlide(obCurrent + 1); });
document.getElementById('ob-btn-skip').addEventListener('click', () => { haptic(); finishOnboarding(); });
document.getElementById('ob-btn-start').addEventListener('click', () => { haptic(); finishOnboarding(); });

function saveCredentials(login, pass) {
  try { localStorage.setItem('wu_creds', btoa(unescape(encodeURIComponent(JSON.stringify({ login, pass }))))); } catch (_) { }
}
function loadCredentials() {
  try { const r = localStorage.getItem('wu_creds'); return r ? JSON.parse(decodeURIComponent(escape(atob(r)))) : null; } catch (_) { return null; }
}
function clearCredentials() { localStorage.removeItem('wu_creds'); }

async function autoLogin(creds) {
  const { day, offset } = computeDefaultDay();
  const cacheKey = 'wu_schedule_' + fmt(monday(offset));
  const cached = getCachedWeek(cacheKey);

  if (cached) {
    state.selectedDay = day;
    state.weekOffset = offset;
    state.classes = (cached.data.return || []).sort((a, b) => a.start.localeCompare(b.start));
    showScreen('app');
    startProgressTimer();
    checkIosBanner();
    renderWeekUI();
    updateDayTabDots();
    renderDay(state.selectedDay);
    try {
      const data = await apiLogin(creds.login, creds.pass);
      if (data?.session) {
        state.session = data.session;
        saveSession();
        backgroundRefresh();
      }
    } catch (_) {
      const ts = new Date(cached.ts).toLocaleString(t('cacheKey'), { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
      if (els.offlineBanner) { els.offlineText.textContent = t('offlineMode') + ' ' + ts; els.offlineBanner.style.display = 'flex'; initIcons(); }
    }
    return;
  }

  try {
    const r = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ login: creds.login, password: creds.pass }),
    });
    if (r.status === 401) { clearCredentials(); state.session = null; saveSession(); showScreen('login'); return; }
    if (!r.ok) { showScreen('login'); return; }
    const data = await r.json();
    if (data?.session) {
      state.session = data.session;
      saveSession();
      state.selectedDay = day;
      state.weekOffset = offset;
      showScreen('app');
      startProgressTimer();
      checkIosBanner();
      renderWeek();
    } else {
      clearCredentials(); state.session = null; saveSession(); showScreen('login');
    }
  } catch (_) {
    showToast(t('networkError'));
    showScreen('login');
  }
}

async function backgroundRefresh() {
  const mon = monday(state.weekOffset), sun = addDays(mon, 6);
  const cacheKey = 'wu_schedule_' + fmt(mon);
  try {
    const data = await apiSchedule(fmt(mon), fmt(sun));
    if (data && data.error_code === 0) {
      localStorage.setItem(cacheKey, JSON.stringify({ ts: Date.now(), data }));
      state.classes = (data.return || []).sort((a, b) => a.start.localeCompare(b.start));
      renderDay(state.selectedDay);
      if (els.offlineBanner) els.offlineBanner.style.display = 'none';
    }
  } catch (_) { }
}

function renderWeekUI() {
  const mon = monday(state.weekOffset), sun = addDays(mon, 6);
  const locale = state.lang === 'ru' ? 'ru' : state.lang === 'en' ? 'en' : 'pl';
  els.weekLabel.textContent = mon.toLocaleDateString(locale, { day: 'numeric', month: 'short' }) + ' – ' + sun.toLocaleDateString(locale, { day: 'numeric', month: 'short' });
  els.todayIndicator.style.display = isCurrentWeek() ? 'block' : 'none';
  updateDayHeading(state.selectedDay);
  els.dayTabs.innerHTML = '';
  const today = new Date(); today.setHours(0, 0, 0, 0);
  for (let i = 0; i < 6; i++) {
    const d = addDays(mon, i);
    const tab = document.createElement('button');
    tab.className = 'day-tab';
    if (isSameDay(d, today)) tab.classList.add('today');
    if (isSameDay(d, state.selectedDay)) tab.classList.add('active');
    tab.innerHTML = `<span class="day-tab-name">${t('dayNames')[d.getDay()]}</span><span class="day-tab-num">${d.getDate()}</span><span class="day-tab-dots"></span>`;
    tab.addEventListener('click', () => { haptic(); selectDay(d); });
    els.dayTabs.appendChild(tab);
  }
}

function bootApp() {
  const creds = loadCredentials();
  els.loginScreen.classList.add('hidden');
  if (state.session && creds && creds.login && creds.pass) {
    autoLogin(creds);
  } else if (creds && creds.login && creds.pass) {
    autoLogin(creds);
  } else {
    clearCredentials();
    state.session = null;
    saveSession();
    els.loginScreen.classList.remove('hidden');
  }
}

function applyTheme(theme) {
  state.theme = theme;
  localStorage.setItem('wu_theme', theme);
  document.documentElement.setAttribute('data-theme', theme);
  document.querySelector('meta[name="theme-color"]').content = theme === 'light' ? '#FFFFFF' : '#000000';
  const icon = els.btnTheme.querySelector('i');
  icon.setAttribute('data-lucide', theme === 'light' ? 'moon' : 'sun');
  initIcons(els.btnTheme);
}

els.btnTheme.addEventListener('click', () => {
  haptic();
  applyTheme(state.theme === 'dark' ? 'light' : 'dark');
});

function applyLang(lang) {
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

els.btnLang.addEventListener('click', (e) => {
  e.stopPropagation();
  haptic();
  els.langDropdown.classList.toggle('open');
});

document.querySelectorAll('.lang-option').forEach(btn => {
  btn.addEventListener('click', () => {
    haptic();
    applyLang(btn.dataset.lang);
    els.langDropdown.classList.remove('open');
    if (state.session) renderWeek();
  });
});

document.addEventListener('click', () => els.langDropdown.classList.remove('open'));

async function apiLogin(login, password) {
  const r = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ login, password }),
  });
  if (!r.ok) throw new Error('auth_failed');
  return r.json();
}

async function apiSchedule(start, end) {
  const r = await fetch('/api/schedule', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ session: state.session, start, end }),
  });
  if (r.status === 401) return { error: 'Session expired', error_code: 401 };
  if (!r.ok) throw new Error('server_error');
  return r.json();
}

async function apiDetails(cls) {
  const r = await fetch('/api/class-details', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      session: state.session,
      room_id: cls.room,
      teacher_id: cls.teachers,
      term_id: cls.term_id,
      group_id: cls.group_id,
    }),
  });
  if (!r.ok) return null;
  return r.json();
}

function checkIosBanner() {
  const isIos = /iphone|ipad|ipod/i.test(navigator.userAgent);
  const isStandalone = window.navigator.standalone;
  const dismissed = localStorage.getItem('wu_ios_dismissed');
  if (isIos && !isStandalone && !dismissed) {
    els.iosBanner.style.display = 'flex';
  }
}
$('ios-close').addEventListener('click', () => {
  els.iosBanner.style.display = 'none';
  localStorage.setItem('wu_ios_dismissed', '1');
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(reg => {
    reg.addEventListener('updatefound', () => {
      const next = reg.installing;
      if (!next) return;
      next.addEventListener('statechange', () => {
        if (next.state === 'activated') window.location.reload();
      });
    });
  }).catch(() => {});
}

els.btnLogin.addEventListener('click', async () => {
  const login = els.inpLogin.value.trim();
  const pass = els.inpPass.value;
  if (!login || !pass) {
    shakeForm();
    showToast(t('loginMissing'));
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(login)) {
    shakeForm();
    showToast(t('emailInvalid'));
    return;
  }

  els.btnLogin.disabled = true;
  els.btnLogin.innerHTML = `<span class="btn-spinner"></span>${t('loginConnecting')}`;
  els.loginError.textContent = '';

  const data = await apiLogin(login, pass).catch(() => null);
  const loginOk = data && !data.error && typeof data.session === 'string' && data.session.length > 0;

  if (loginOk) {
    state.session = data.session;
    saveSession();
    saveCredentials(login, pass);
    enterApp();
  } else {
    const msg = (data && data.error) ? data.error : t('loginFail');
    els.loginError.textContent = msg;
    shakeForm();
    showToast(msg);
    haptic();
    els.btnLogin.disabled = false;
    els.btnLogin.textContent = t('loginBtn');
  }
});

els.inpPass.addEventListener('keydown', e => { if (e.key === 'Enter') els.btnLogin.click(); });

$('btn-logout').addEventListener('click', () => {
  haptic();
  state.session = null;
  clearCredentials();
  localStorage.removeItem('wu_session');
  showScreen('login');
});

function enterApp() {
  showScreen('app');
  const { day, offset } = computeDefaultDay();
  state.weekOffset = offset;
  state.selectedDay = day;
  renderWeek();
  checkIosBanner();
  startProgressTimer();
  setTimeout(requestNotifyPermission, 3000);
}

function renderSkeleton() {
  els.scheduleList.innerHTML = Array.from({ length: 4 }, (_, i) => `
    <div class="skeleton-card animate-in" style="animation-delay:${i * 0.05}s">
      <div class="skeleton-time">
        <div class="skeleton-bone skeleton-time-1"></div>
        <div class="skeleton-bone skeleton-time-2"></div>
      </div>
      <div class="skeleton-content">
        <div class="skeleton-bone skeleton-title"></div>
        <div class="skeleton-meta-row">
          <div class="skeleton-bone skeleton-meta-1"></div>
          <div class="skeleton-bone skeleton-meta-2"></div>
        </div>
      </div>
    </div>`).join('');
}

$('btn-prev').addEventListener('click', () => { haptic(); state.weekOffset--; renderWeek(); });
$('btn-next').addEventListener('click', () => { haptic(); state.weekOffset++; renderWeek(); });

function goToday() {
  haptic();
  const { day, offset } = computeDefaultDay();
  if (state.weekOffset === offset && state.selectedDay && isSameDay(state.selectedDay, day)) return;
  state.weekOffset = offset;
  state.selectedDay = day;
  renderWeek();
}

$('btn-today') && $('btn-today').addEventListener('click', goToday);

async function renderWeek() {
  const mon = monday(state.weekOffset);
  const sun = addDays(mon, 6);
  const locale = state.lang === 'ru' ? 'ru' : state.lang === 'en' ? 'en' : 'pl';
  const cacheKey = `wu_schedule_${fmt(mon)}`;

  const opts = { day: 'numeric', month: 'short' };
  els.weekLabel.textContent = `${mon.toLocaleDateString(locale, opts)} – ${sun.toLocaleDateString(locale, opts)}`;
  els.todayIndicator.style.display = isCurrentWeek() ? 'block' : 'none';
  updateDayHeading(state.selectedDay);

  els.dayTabs.innerHTML = '';
  const today = new Date(); today.setHours(0, 0, 0, 0);

  for (let i = 0; i < 6; i++) {
    const d = addDays(mon, i);
    const tab = document.createElement('button');
    tab.className = 'day-tab';
    if (isSameDay(d, today)) tab.classList.add('today');
    if (isSameDay(d, state.selectedDay)) tab.classList.add('active');
    tab.innerHTML = `<span class="day-tab-name">${t('dayNames')[d.getDay()]}</span><span class="day-tab-num">${d.getDate()}</span><span class="day-tab-dots"></span>`;
    tab.addEventListener('click', () => { haptic(); selectDay(d); });
    els.dayTabs.appendChild(tab);
  }

  renderSkeleton();
  if (els.offlineBanner) els.offlineBanner.style.display = 'none';

  let data = null;
  let fromCache = false;

  try {
    data = await apiSchedule(fmt(mon), fmt(sun));
    if (data && data.error_code === 0) {
      localStorage.setItem(cacheKey, JSON.stringify({ ts: Date.now(), data }));
    }
  } catch (_) {
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        data = parsed.data;
        fromCache = true;
        const timeStr = new Date(parsed.ts).toLocaleString(t('cacheKey'), { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
        if (els.offlineBanner) {
          els.offlineText.textContent = `${t('offlineMode')} ${timeStr}`;
          els.offlineBanner.style.display = 'flex';
          initIcons(els.offlineBanner);
        }
      } catch (_) { data = null; }
    }
  }

  if (!data || (data.error_code !== undefined && data.error_code !== 0)) {
    if (data?.error_code === 401 || data?.error === 'Session expired') {
      state.session = null; saveSession(); showScreen('login'); return;
    }
    const cached = getCachedWeek(cacheKey);
    if (cached) {
      data = cached.data;
      const timeStr = new Date(cached.ts).toLocaleString(t('cacheKey'), { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
      els.offlineText.textContent = `${t('offlineMode')} ${timeStr}`;
      els.offlineBanner.style.display = 'flex';
      initIcons(els.offlineBanner);
    }
    if (!data || (data.error_code !== undefined && data.error_code !== 0)) {
      els.scheduleList.innerHTML = `<div class="empty-state">
        <div class="empty-state-icon"><i data-lucide="alert-circle" stroke-width="1"></i></div>
        <div class="empty-state-title">${t('loadError')}</div>
      </div>`;
      initIcons(els.scheduleList);
      return;
    }
  }

  state.classes = (data.return || []).sort((a, b) => a.start.localeCompare(b.start));
  updateDayTabDots();
  renderDay(state.selectedDay);
}

function updateDayHeading(date) {
  const dayNames = t('dayNamesFull');
  const monthNames = t('monthNames');
  els.dayHeadingMain.textContent = `${dayNames[date.getDay()]}, ${date.getDate()}`;
  els.dayHeadingSub.textContent = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
}

function selectDay(d) {
  haptic();
  state.selectedDay = d;
  updateDayHeading(d);
  els.dayTabs.querySelectorAll('.day-tab').forEach((tab, i) => {
    const mon = monday(state.weekOffset);
    tab.classList.toggle('active', isSameDay(addDays(mon, i), d));
  });
  renderDay(d);
}

const FORM_COLORS = {
  laborat: '#0A84FF',
  lektorat: '#30D158',
  wykład: '#BF5AF2',
  wyklad: '#BF5AF2',
  ćwiczenia: '#FF9F0A',
  cwiczenia: '#FF9F0A',
  seminarium: '#FF6B35',
  projekt: '#FF6B35',
};

function renderDay(date) {
  const classes = state.classes.filter(c => {
    const d = new Date(c.start); d.setHours(0, 0, 0, 0);
    return isSameDay(d, date);
  });

  if (classes.length === 0) {
    els.scheduleList.innerHTML = `<div class="empty-state animate-in">
      <div class="empty-state-icon"><i data-lucide="coffee" stroke-width="1"></i></div>
      <div class="empty-state-title">${t('emptyTitle')}</div>
      <div class="empty-state-subtitle">${t('emptySubtitle')}</div>

    </div>`;
    initIcons(els.scheduleList);
    return;
  }

  const now = new Date();
  els.scheduleList.innerHTML = '';

  let currentCard = null;

  classes.forEach((cls, idx) => {
    const startTime = new Date(cls.start);
    const endTime = new Date(cls.end);
    const isPast = now > endTime && isSameDay(now, date);
    const isCurrent = now >= startTime && now <= endTime && isSameDay(now, date);

    const card = document.createElement('div');
    card.className = 'class-card animate-in';
    card.style.animationDelay = `${idx * 0.04}s`;

    if (isPast) card.classList.add('past');
    if (isCurrent) card.classList.add('current');

    const timeS = fmtTime(cls.start);
    const timeE = fmtTime(cls.end);

    let progressHtml = '';
    if (isCurrent) {
      const elapsed = now - startTime;
      const total = endTime - startTime;
      const pct = Math.min(100, Math.max(0, (elapsed / total) * 100));
      progressHtml = `<div class="progress-bar" data-start="${cls.start}" data-end="${cls.end}" style="width:${pct.toFixed(1)}%"></div>`;
    }

    const color = getFormColor(cls.form);
    card.style.setProperty('--form-color', color);
    card.innerHTML = `
      <div class="time-col">
        <span class="time-start">${timeS}</span>
        <span class="time-end">${timeE}</span>
      </div>
      <div class="class-content">
        <div class="class-title">${cls.title}</div>
        <div class="class-meta">
          <span class="meta-item">${cls.form}</span>
          <span class="meta-dot"></span>
          <span class="meta-item"><i data-lucide="map-pin" stroke-width="1.2"></i>${cls.room}</span>
        </div>
      </div>
      <div class="card-chevron"><i data-lucide="chevron-right" stroke-width="1.2"></i></div>
      ${progressHtml}`;

    card.addEventListener('click', () => { haptic(); openDetail(cls); });
    els.scheduleList.appendChild(card);

    if (isCurrent) currentCard = card;
  });



  initIcons(els.scheduleList);

  const isToday = isSameDay(date, new Date());
  if (isToday) scheduleClassNotifications(classes);

  requestAnimationFrame(() => {
    if (currentCard) currentCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
}

let progressInterval = null;

function startProgressTimer() {
  if (progressInterval) clearInterval(progressInterval);
  progressInterval = setInterval(updateProgress, 30000);
}

function updateProgress() {
  const bars = document.querySelectorAll('.progress-bar');
  const now = new Date();
  bars.forEach(bar => {
    const start = new Date(bar.dataset.start);
    const end = new Date(bar.dataset.end);
    const elapsed = now - start;
    const total = end - start;
    const pct = Math.min(100, Math.max(0, (elapsed / total) * 100));
    bar.style.width = `${pct.toFixed(1)}%`;
    if (pct >= 100) {
      renderDay(state.selectedDay);
    }
  });
}

async function openDetail(cls) {
  haptic();
  els.sheetTitle.textContent = cls.title;
  els.sheetSubtitle.textContent = cls.form;

  els.sheetBody.innerHTML = `<div class="sheet-skeleton">
    ${[1, 2, 3, 4].map(() => `<div class="detail-row">
      <div class="detail-icon"><div class="skeleton-bone" style="width:18px;height:18px;border-radius:4px"></div></div>
      <div class="detail-info">
        <div class="skeleton-bone" style="width:60px;height:10px;margin-bottom:6px"></div>
        <div class="skeleton-bone" style="width:140px;height:14px"></div>
      </div>
    </div>`).join('')}
  </div>`;

  els.sheetBackdrop.classList.add('open');
  els.detailSheet.classList.add('open');

  const data = await apiDetails(cls).catch(() => null);
  const d = data?.return;

  const timeS = fmtTime(cls.start);
  const timeE = fmtTime(cls.end);
  const dayDate = new Date(cls.start);

  const dayNames = t('dayNamesFull');
  const monthNames = t('monthNames');
  const dateStr = `${dayNames[dayDate.getDay()]}, ${dayDate.getDate()} ${monthNames[dayDate.getMonth()]}`;

  const teacherName = d?.teacher?.length
    ? `${d.teacher[0].first_name} ${d.teacher[0].last_name}`.trim()
    : `ID ${cls.teachers}`;

  const roomName = d?.room
    ? `${d.room.nazwaSali} (${d.room.nazwaBudynku})`
    : cls.room;

  const profile = d?.profile
    ? `${d.profile.kierunek}, sem. ${d.profile.semestr}`
    : '';

  els.sheetBody.innerHTML = `
    ${detailRow('calendar', t('detailDate'), dateStr)}
    ${detailRow('clock', t('detailTime'), `${timeS} – ${timeE}`)}
    ${detailRow('book-open', t('detailForm'), cls.form)}
    ${detailRow('map-pin', t('detailRoom'), roomName)}
    ${detailRow('user', t('detailTeacher'), teacherName)}
    ${detailRow('layers', t('detailModule'), cls.module)}
    ${profile ? detailRow('graduation-cap', t('detailProfile'), profile) : ''}
    ${cls.hangoutLink ? detailRow('link', t('detailLink'), `<a href="${cls.hangoutLink}" class="selectable">${cls.hangoutLink}</a>`) : ''}
  `;

  initIcons(els.detailSheet);
}

function detailRow(icon, label, value) {
  return `<div class="detail-row">
    <div class="detail-icon"><i data-lucide="${icon}" stroke-width="1.2"></i></div>
    <div class="detail-info">
      <div class="detail-label">${label}</div>
      <div class="detail-value selectable">${value}</div>
    </div>
  </div>`;
}

function closeSheet() {
  els.sheetBackdrop.classList.remove('open');
  els.detailSheet.classList.remove('open');
}

els.sheetBackdrop.addEventListener('click', closeSheet);

let sheetDragY = null;
els.sheetHandle.addEventListener('touchstart', e => {
  sheetDragY = e.touches[0].clientY;
  els.detailSheet.style.transition = 'none';
}, { passive: true });

document.addEventListener('touchmove', e => {
  if (sheetDragY === null) return;
  const dy = e.touches[0].clientY - sheetDragY;
  if (dy > 0) {
    els.detailSheet.style.transform = `translateY(${dy}px)`;
  }
}, { passive: true });

document.addEventListener('touchend', () => {
  if (sheetDragY === null) return;
  els.detailSheet.style.transition = '';
  const current = parseFloat(els.detailSheet.style.transform.replace(/[^\d.-]/g, '')) || 0;
  if (current > 100) {
    closeSheet();
  } else {
    els.detailSheet.style.transform = '';
    els.detailSheet.classList.add('open');
  }
  sheetDragY = null;
});

applyTheme(state.theme);
applyLang(state.lang);
initIcons();

if (!localStorage.getItem('onboarding_done')) {
  showOnboarding();
} else {
  bootApp();
}

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible' && state.session) {
    backgroundRefresh();
  }
});

function requestNotifyPermission() {
  if (!('Notification' in window) || Notification.permission !== 'default') return;
  Notification.requestPermission();
}

function scheduleClassNotifications(classes) {
  notifyTimers.forEach(clearTimeout);
  notifyTimers = [];
  if (!('Notification' in window) || Notification.permission !== 'granted') return;
  const now = Date.now();
  classes.forEach(cls => {
    const notifyAt = new Date(cls.start).getTime() - NOTIFY_BEFORE_MS;
    if (notifyAt <= now) return;
    notifyTimers.push(setTimeout(() => {
      new Notification('WU Plan', { body: `${cls.title} • ${cls.room}`, icon: '/icon-192.png' });
    }, notifyAt - now));
  });
}

function getFormColor(form) {
  if (!form) return '#6B7280';
  const f = form.toLowerCase();
  const match = Object.entries(FORM_COLORS).find(([k]) => f.includes(k));
  return match ? match[1] : '#6B7280';
}

function updateDayTabDots() {
  const mon = monday(state.weekOffset);
  els.dayTabs.querySelectorAll('.day-tab').forEach((tab, i) => {
    const d = addDays(mon, i);
    const dayClasses = state.classes.filter(c => {
      const cd = new Date(c.start); cd.setHours(0, 0, 0, 0);
      return isSameDay(cd, d);
    });
    const dotsEl = tab.querySelector('.day-tab-dots');
    if (!dotsEl) return;
    const shown = dayClasses.slice(0, 3);
    dotsEl.innerHTML = shown.map(c =>
      `<span class="load-dot" style="background:${getFormColor(c.form)}"></span>`
    ).join('');
  });
}

function openWeekSummary() {
  if (!state.classes.length) return;
  const mon = monday(state.weekOffset);
  const dayNames = t('dayNamesFull');
  const monthNames = t('monthNames');
  const html = Array.from({ length: 6 }, (_, i) => {
    const d = addDays(mon, i);
    const dayClasses = state.classes.filter(c => {
      const cd = new Date(c.start); cd.setHours(0, 0, 0, 0);
      return isSameDay(cd, d);
    });
    if (!dayClasses.length) return '';
    const rows = dayClasses.map(cls => `
      <div class="week-sum-row" style="border-left-color:${getFormColor(cls.form)}">
        <span class="week-sum-time">${fmtTime(cls.start)}</span>
        <span class="week-sum-body">
          <span class="week-sum-title">${cls.title}</span>
          <span class="week-sum-form">${cls.form || ''}</span>
        </span>
      </div>`).join('');
    return `<div class="week-sum-day">
      <div class="week-sum-header">${dayNames[d.getDay()]}, ${d.getDate()} ${monthNames[d.getMonth()]}</div>
      ${rows}
    </div>`;
  }).join('');
  els.sheetTitle.textContent = els.weekLabel.textContent;
  els.sheetSubtitle.textContent = '';
  els.sheetBody.innerHTML = html;
  els.sheetBackdrop.classList.add('open');
  els.detailSheet.classList.add('open');
  initIcons(els.detailSheet);
}

els.weekLabel.style.cursor = 'pointer';
els.weekLabel.addEventListener('click', () => { haptic(); openWeekSummary(); });

const pullIndicator = document.createElement('div');
pullIndicator.className = 'pull-indicator';
pullIndicator.innerHTML = '<span class="btn-spinner"></span>';
els.scheduleList.parentElement.insertBefore(pullIndicator, els.scheduleList);

let touch = {};

els.scheduleList.addEventListener('touchstart', e => {
  touch.x = e.touches[0].clientX;
  touch.y = e.touches[0].clientY;
  if (els.scheduleList.scrollTop === 0) {
    touch.pullY = e.touches[0].clientY;
    touch.pulling = true;
  }
}, { passive: true });

els.scheduleList.addEventListener('touchmove', e => {
  if (!touch.pulling) return;
  if (e.touches[0].clientY - touch.pullY > 20) pullIndicator.classList.add('visible');
}, { passive: true });

els.scheduleList.addEventListener('touchend', e => {
  pullIndicator.classList.remove('visible');
  if (touch.pulling) {
    const dy = e.changedTouches[0].clientY - touch.pullY;
    touch.pulling = false;
    if (dy > 70) { haptic(); renderWeek(); }
  }

  const dx = e.changedTouches[0].clientX - touch.x;
  const dy = e.changedTouches[0].clientY - touch.y;
  if (Math.abs(dx) < 50 || Math.abs(dy) > Math.abs(dx)) return;
  const mon = monday(state.weekOffset);
  const tabs = [...els.dayTabs.querySelectorAll('.day-tab')];
  const cur = tabs.findIndex((_, i) => isSameDay(addDays(mon, i), state.selectedDay));
  const next = dx < 0 ? cur + 1 : cur - 1;
  if (next < 0 || next >= 6) return;
  haptic();
  selectDay(addDays(mon, next));
}, { passive: true });