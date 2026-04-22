// ═══════════════════════════════════════════════════════
// WU PLAN · Elite PWA — app.js
// ═══════════════════════════════════════════════════════

// ── i18n ───────────────────────────────────────────────
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
    loginTitle: 'Виртуальный Университет',
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
    loginTitle: 'Virtual University',
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

// ── STATE ──────────────────────────────────────────────
const state = {
  session: null,
  weekOffset: 0,
  selectedDay: null,
  classes: [],
  lang: localStorage.getItem('wu_lang') || 'pl',
  theme: localStorage.getItem('wu_theme') || 'dark',
};

function t(key) { return (translations[state.lang] || translations.pl)[key] || key; }

// ── STORAGE ────────────────────────────────────────────
const saveSession = () => localStorage.setItem('wu_session', state.session || '');
const loadSession = () => { state.session = localStorage.getItem('wu_session') || null; };

// ── DOM ────────────────────────────────────────────────
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

// ── HELPERS ────────────────────────────────────────────
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

function haptic() {
  if (navigator.vibrate) navigator.vibrate(10);
}

// ── TOAST ──────────────────────────────────────────────
let toastTimer = null;
function showToast(msg) {
  if (!els.toast) return;
  els.toast.textContent = msg;
  els.toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => els.toast.classList.remove('show'), 3000);
}

// ── SHAKE ──────────────────────────────────────────────
function shakeForm() {
  const form = els.loginScreen;
  form.classList.remove('shake');
  // Force reflow to restart animation
  void form.offsetWidth;
  form.classList.add('shake');
  form.addEventListener('animationend', () => form.classList.remove('shake'), { once: true });
}

function showScreen(name) {
  els.loginScreen.classList.toggle('hidden', name !== 'login');
  els.appScreen.classList.toggle('hidden', name !== 'app');
}

function initIcons() {
  if (window.lucide) lucide.createIcons();
}

// ── ONBOARDING ─────────────────────────────────────────
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
  for (let i = 0; i < OB_TOTAL; i++) {
    const tEl = document.getElementById('ob-title-' + i);
    const sEl = document.getElementById('ob-sub-' + i);
    if (tEl) tEl.textContent = slides[i].title;
    if (sEl) sEl.textContent = slides[i].sub;
  }
  const isLast = n === OB_TOTAL - 1;
  const btnStart = document.getElementById('ob-btn-start');
  const btnRow = document.getElementById('ob-btn-row');
  if (btnStart) { btnStart.textContent = t('obStart'); btnStart.classList.toggle('visible', isLast); }
  if (btnRow) btnRow.style.display = isLast ? 'none' : 'flex';
  const btnNext = document.getElementById('ob-btn-next');
  const btnSkip = document.getElementById('ob-btn-skip');
  if (btnNext) btnNext.textContent = t('obNext');
  if (btnSkip) btnSkip.textContent = t('obSkip');
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

// ── PERSISTENT LOGIN ───────────────────────────────────
function saveCredentials(login, pass) {
  try { localStorage.setItem('wu_creds', btoa(unescape(encodeURIComponent(JSON.stringify({ login, pass }))))); } catch (_) { }
}
function loadCredentials() {
  try { const r = localStorage.getItem('wu_creds'); return r ? JSON.parse(decodeURIComponent(escape(atob(r)))) : null; } catch (_) { return null; }
}
function clearCredentials() { localStorage.removeItem('wu_creds'); }

// ── AUTO-LOGIN ─────────────────────────────────────────
async function autoLogin(creds) {
  state.selectedDay = new Date(); state.selectedDay.setHours(0, 0, 0, 0);
  state.weekOffset = 0;
  showScreen('app'); startProgressTimer(); checkIosBanner();
  renderWeekUI();
  const cacheKey = 'wu_schedule_' + fmt(monday(0));
  const cached = localStorage.getItem(cacheKey);
  if (cached) {
    try {
      const p = JSON.parse(cached);
      state.classes = (p.data.return || []).sort((a, b) => a.start.localeCompare(b.start));
      renderDay(state.selectedDay);
      const ts = new Date(p.ts).toLocaleString(t('cacheKey'), { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
      if (els.offlineBanner && els.offlineText) { els.offlineText.textContent = t('offlineMode') + ' ' + ts; els.offlineBanner.style.display = 'flex'; initIcons(); }
    } catch (_) { renderSkeleton(); }
  } else { renderSkeleton(); }
  try {
    const data = await apiLogin(creds.login, creds.pass);
    if (data.session) { state.session = data.session; saveSession(); await backgroundRefresh(); }
    else { clearCredentials(); state.session = null; saveSession(); showToast(t('sessionExpired')); setTimeout(() => showScreen('login'), 1800); }
  } catch (_) { showToast(t('networkError')); }
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
    tab.innerHTML = '<span class="day-tab-name">' + t('dayNames')[d.getDay()] + '</span><span class="day-tab-num">' + d.getDate() + '</span>';
    tab.addEventListener('click', () => { haptic(); selectDay(d); });
    els.dayTabs.appendChild(tab);
  }
}

function bootApp() {
  const creds = loadCredentials();
  if (creds) { autoLogin(creds); }
  else if (state.session) { enterApp(); }
  else { showScreen('login'); }
}

// ── THEME ──────────────────────────────────────────────
function applyTheme(theme) {
  state.theme = theme;
  localStorage.setItem('wu_theme', theme);
  document.documentElement.setAttribute('data-theme', theme);
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.content = theme === 'light' ? '#FFFFFF' : '#000000';
  const icon = els.btnTheme.querySelector('i');
  if (icon) {
    icon.setAttribute('data-lucide', theme === 'light' ? 'moon' : 'sun');
    initIcons();
  }
}

els.btnTheme.addEventListener('click', () => {
  haptic();
  applyTheme(state.theme === 'dark' ? 'light' : 'dark');
});

// ── i18n APPLY ─────────────────────────────────────────
function applyLang(lang) {
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

// Language dropdown
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

// ── API ────────────────────────────────────────────────
async function apiLogin(login, password) {
  const r = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ login, password }),
  });
  return r.json();
}

async function apiSchedule(start, end) {
  const r = await fetch('/api/schedule', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ session: state.session, start, end }),
  });
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
  return r.json();
}

// ── iOS BANNER ─────────────────────────────────────────
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

// ── SERVICE WORKER ─────────────────────────────────────
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').catch(() => { });
}

// ── LOGIN ──────────────────────────────────────────────
els.btnLogin.addEventListener('click', async () => {
  const login = els.inpLogin.value.trim();
  const pass = els.inpPass.value;
  if (!login || !pass) {
    shakeForm();
    showToast(t('loginMissing'));
    return;
  }

  // Button loader
  els.btnLogin.disabled = true;
  els.btnLogin.innerHTML = `<span class="btn-spinner"></span>${t('loginConnecting')}`;
  els.loginError.textContent = '';

  const data = await apiLogin(login, pass).catch(() => ({ error: t('networkError') }));

  if (data.session) {
    state.session = data.session;
    saveSession();
    saveCredentials(els.inpLogin.value.trim(), els.inpPass.value);
    enterApp();
  } else {
    const msg = data.error || t('loginFail');
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

// ── APP INIT ───────────────────────────────────────────
function enterApp() {
  showScreen('app');
  state.weekOffset = 0;
  state.selectedDay = new Date();
  state.selectedDay.setHours(0, 0, 0, 0);
  renderWeek();
  checkIosBanner();
  startProgressTimer();
}

// ── SKELETON ───────────────────────────────────────────
function renderSkeleton() {
  let html = '';
  for (let i = 0; i < 4; i++) {
    html += `<div class="skeleton-card animate-in" style="animation-delay:${i * 0.05}s">
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
    </div>`;
  }
  els.scheduleList.innerHTML = html;
}

// ── WEEK NAV ───────────────────────────────────────────
$('btn-prev').addEventListener('click', () => { haptic(); state.weekOffset--; renderWeek(); });
$('btn-next').addEventListener('click', () => { haptic(); state.weekOffset++; renderWeek(); });

async function renderWeek() {
  const mon = monday(state.weekOffset);
  const sun = addDays(mon, 6);
  const locale = state.lang === 'ru' ? 'ru' : state.lang === 'en' ? 'en' : 'pl';
  const cacheKey = `wu_schedule_${fmt(mon)}`;

  // Week label
  const opts = { day: 'numeric', month: 'short' };
  els.weekLabel.textContent = `${mon.toLocaleDateString(locale, opts)} – ${sun.toLocaleDateString(locale, opts)}`;
  els.todayIndicator.style.display = isCurrentWeek() ? 'block' : 'none';

  // Day heading
  updateDayHeading(state.selectedDay);

  // Day tabs
  els.dayTabs.innerHTML = '';
  const today = new Date(); today.setHours(0, 0, 0, 0);

  for (let i = 0; i < 6; i++) {
    const d = addDays(mon, i);
    const tab = document.createElement('button');
    tab.className = 'day-tab';
    if (isSameDay(d, today)) tab.classList.add('today');
    if (isSameDay(d, state.selectedDay)) tab.classList.add('active');
    tab.innerHTML = `<span class="day-tab-name">${t('dayNames')[d.getDay()]}</span><span class="day-tab-num">${d.getDate()}</span>`;
    tab.addEventListener('click', () => { haptic(); selectDay(d); });
    els.dayTabs.appendChild(tab);
  }

  // Skeleton loading
  renderSkeleton();

  // Hide offline banner by default
  if (els.offlineBanner) els.offlineBanner.style.display = 'none';

  // Try fetching from network
  let data = null;
  let fromCache = false;

  try {
    data = await apiSchedule(fmt(mon), fmt(sun));
    if (data && data.error_code === 0) {
      // Save to cache with timestamp
      localStorage.setItem(cacheKey, JSON.stringify({
        ts: Date.now(),
        data,
      }));
    }
  } catch (_) {
    // Network failed — try cache
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        data = parsed.data;
        fromCache = true;
        const cacheDate = new Date(parsed.ts);
        const timeStr = cacheDate.toLocaleString(t('cacheKey'), { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
        if (els.offlineBanner) {
          els.offlineText.textContent = `${t('offlineMode')} ${timeStr}`;
          els.offlineBanner.style.display = 'flex';
          initIcons();
        }
      } catch (_) { data = null; }
    }
  }

  if (!data || data.error_code !== 0) {
    if (data && data.error === 'Session expired') {
      state.session = null; saveSession(); showScreen('login'); return;
    }
    // Last-ditch cache attempt if no network error was caught but data is bad
    const cached = !fromCache && localStorage.getItem(cacheKey);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        data = parsed.data;
        fromCache = true;
        const cacheDate = new Date(parsed.ts);
        const timeStr = cacheDate.toLocaleString(t('cacheKey'), { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
        if (els.offlineBanner) {
          els.offlineText.textContent = `${t('offlineMode')} ${timeStr}`;
          els.offlineBanner.style.display = 'flex';
          initIcons();
        }
      } catch (_) { data = null; }
    }
    if (!data || data.error_code !== 0) {
      els.scheduleList.innerHTML = `<div class="empty-state">
        <div class="empty-state-icon"><i data-lucide="alert-circle" stroke-width="1"></i></div>
        <div class="empty-state-title">${t('loadError')}</div>
      </div>`;
      initIcons();
      return;
    }
  }

  state.classes = (data.return || []).sort((a, b) => a.start.localeCompare(b.start));
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

// ── RENDER DAY ─────────────────────────────────────────
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
      <a class="feedback-link" href="https://t.me/krtlnk" target="_blank" rel="noopener">
        <i data-lucide="send" stroke-width="1.2"></i>${t('feedbackText')}
      </a>
    </div>`;
    initIcons();
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

  // Feedback footer
  const fb = document.createElement('a');
  fb.className = 'feedback-link animate-in';
  fb.href = 'https://t.me/krtlnk';
  fb.target = '_blank';
  fb.rel = 'noopener';
  fb.style.animationDelay = `${classes.length * 0.04 + 0.1}s`;
  fb.innerHTML = `<i data-lucide="send" stroke-width="1.2"></i>${t('feedbackText')}`;
  els.scheduleList.appendChild(fb);

  initIcons();

  // Auto-scroll to current or nearest upcoming
  requestAnimationFrame(() => {
    if (currentCard) {
      currentCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
}

// ── PROGRESS TIMER ─────────────────────────────────────
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

// ── BOTTOM SHEET ───────────────────────────────────────
async function openDetail(cls) {
  haptic();
  els.sheetTitle.textContent = cls.title;
  els.sheetSubtitle.textContent = cls.form;

  // Skeleton in sheet
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

  initIcons();
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

// Drag-to-dismiss
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

// ── BOOT ───────────────────────────────────────────────
loadSession();
applyTheme(state.theme);
applyLang(state.lang);
initIcons();

if (!localStorage.getItem('onboarding_done')) {
  showOnboarding();
} else {
  bootApp();
}
