// ── STATE ──────────────────────────────────────────────
const state = {
  session: null,
  weekOffset: 0,      // 0 = current week
  selectedDay: null,  // Date object
  classes: [],        // raw from API for current week
};

// ── STORAGE ────────────────────────────────────────────
const save = () => localStorage.setItem('wu_session', state.session || '');
const load = () => { state.session = localStorage.getItem('wu_session') || null; };

// ── DOM REFS ───────────────────────────────────────────
const $ = id => document.getElementById(id);
const loginScreen  = $('login-screen');
const appScreen    = $('app-screen');
const inpLogin     = $('inp-login');
const inpPass      = $('inp-pass');
const btnLogin     = $('btn-login');
const loginError   = $('login-error');
const weekLabel    = $('week-label');
const todayDot     = $('today-dot');
const dayTabsEl    = $('day-tabs');
const scheduleList = $('schedule-list');
const sheetBackdrop = $('sheet-backdrop');
const detailSheet  = $('detail-sheet');
const sheetTitle   = $('sheet-title');
const sheetBody    = $('sheet-body');
const iosBanner    = $('ios-banner');

// ── HELPERS ────────────────────────────────────────────
const DAY_NAMES = ['Niedz', 'Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob'];
const DAY_NAMES_FULL = ['Niedziela','Poniedziałek','Wtorek','Środa','Czwartek','Piątek','Sobota'];

function monday(offset = 0) {
  const d = new Date();
  const day = d.getDay() || 7;
  d.setHours(0,0,0,0);
  d.setDate(d.getDate() - day + 1 + offset * 7);
  return d;
}

function addDays(date, n) {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}

function fmt(date) {
  return date.toISOString().slice(0, 10);
}

function fmtTime(iso) {
  return iso.slice(11, 16);
}

function isSameDay(a, b) {
  return a.getFullYear() === b.getFullYear() &&
         a.getMonth() === b.getMonth() &&
         a.getDate() === b.getDate();
}

function isCurrentWeek() {
  return state.weekOffset === 0;
}

function showScreen(name) {
  loginScreen.classList.toggle('hidden', name !== 'login');
  appScreen.classList.toggle('hidden', name !== 'app');
}

// ── iOS PWA BANNER ─────────────────────────────────────
function checkIosBanner() {
  const isIos = /iphone|ipad|ipod/i.test(navigator.userAgent);
  const isStandalone = window.navigator.standalone;
  const dismissed = localStorage.getItem('wu_ios_dismissed');
  if (isIos && !isStandalone && !dismissed) {
    iosBanner.style.display = 'flex';
  }
}
$('ios-close').addEventListener('click', () => {
  iosBanner.style.display = 'none';
  localStorage.setItem('wu_ios_dismissed', '1');
});

// ── SERVICE WORKER ─────────────────────────────────────
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').catch(() => {});
}

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

// ── LOGIN FLOW ─────────────────────────────────────────
btnLogin.addEventListener('click', async () => {
  const login = inpLogin.value.trim();
  const pass  = inpPass.value;
  if (!login || !pass) { loginError.textContent = 'Wprowadź login i hasło'; return; }

  btnLogin.disabled = true;
  btnLogin.textContent = 'Łączenie...';
  loginError.textContent = '';

  const data = await apiLogin(login, pass).catch(() => ({ error: 'Błąd sieci' }));

  if (data.session) {
    state.session = data.session;
    save();
    enterApp();
  } else {
    loginError.textContent = data.error || 'Nieprawidłowy login lub hasło';
    btnLogin.disabled = false;
    btnLogin.textContent = 'Zaloguj się';
  }
});

inpPass.addEventListener('keydown', e => { if (e.key === 'Enter') btnLogin.click(); });

$('btn-logout').addEventListener('click', () => {
  state.session = null;
  localStorage.removeItem('wu_session');
  showScreen('login');
});

// ── APP INIT ───────────────────────────────────────────
function enterApp() {
  showScreen('app');
  state.weekOffset = 0;
  state.selectedDay = new Date();
  state.selectedDay.setHours(0,0,0,0);
  renderWeek();
  checkIosBanner();
}

// ── WEEK NAVIGATION ────────────────────────────────────
$('btn-prev').addEventListener('click', () => { state.weekOffset--; renderWeek(); });
$('btn-next').addEventListener('click', () => { state.weekOffset++; renderWeek(); });

async function renderWeek() {
  const mon = monday(state.weekOffset);
  const sun = addDays(mon, 6);

  // week label
  const opts = { day: 'numeric', month: 'short' };
  weekLabel.textContent = `${mon.toLocaleDateString('pl', opts)} – ${sun.toLocaleDateString('pl', opts)}`;
  todayDot.style.display = isCurrentWeek() ? 'block' : 'none';

  // render day tabs (Mon–Fri)
  dayTabsEl.innerHTML = '';
  const today = new Date(); today.setHours(0,0,0,0);

  for (let i = 0; i < 5; i++) {
    const d = addDays(mon, i);
    const tab = document.createElement('div');
    tab.className = 'day-tab';
    if (isSameDay(d, today)) tab.classList.add('today');
    if (isSameDay(d, state.selectedDay)) tab.classList.add('active');
    tab.innerHTML = `<div class="day-name">${DAY_NAMES[d.getDay()]}</div><div class="day-num">${d.getDate()}</div>`;
    tab.addEventListener('click', () => selectDay(d));
    dayTabsEl.appendChild(tab);
  }

  // fetch schedule
  scheduleList.innerHTML = '<div class="empty-day"><div class="spinner" style="margin:0 auto"></div></div>';

  const data = await apiSchedule(fmt(mon), fmt(sun)).catch(() => null);

  if (!data || data.error_code !== 0) {
    if (data && data.error === 'Session expired') {
      state.session = null; save(); showScreen('login'); return;
    }
    scheduleList.innerHTML = '<div class="empty-day">Błąd ładowania planu</div>';
    return;
  }

  state.classes = (data.return || []).sort((a, b) => a.start.localeCompare(b.start));
  renderDay(state.selectedDay);
}

function selectDay(d) {
  state.selectedDay = d;
  // update active tab
  dayTabsEl.querySelectorAll('.day-tab').forEach((tab, i) => {
    const mon = monday(state.weekOffset);
    tab.classList.toggle('active', isSameDay(addDays(mon, i), d));
  });
  renderDay(d);
}

function renderDay(date) {
  const classes = state.classes.filter(c => {
    const d = new Date(c.start); d.setHours(0,0,0,0);
    return isSameDay(d, date);
  });

  if (classes.length === 0) {
    scheduleList.innerHTML = `<div class="empty-day"><div class="icon">📭</div>Brak zajęć</div>`;
    return;
  }

  scheduleList.innerHTML = '';
  classes.forEach(cls => {
    const card = document.createElement('div');
    card.className = 'class-card';
    card.style.setProperty('--cls-color', cls.backgroundColor || '#7c6aff');
    card.style.cssText += `border-left-color: ${cls.backgroundColor}; border-left-width: 3px;`;

    const timeStart = fmtTime(cls.start);
    const timeEnd   = fmtTime(cls.end);

    card.innerHTML = `
      <div class="time-col">
        <div class="time-start">${timeStart}</div>
        <div class="time-end">${timeEnd}</div>
      </div>
      <div class="vline"></div>
      <div class="class-body">
        <div class="class-title">${cls.title}</div>
        <div class="class-pills">
          <span class="pill form">${cls.form}</span>
          <span class="pill">sala ${cls.room}</span>
        </div>
      </div>`;

    card.addEventListener('click', () => openDetail(cls));
    scheduleList.appendChild(card);
  });
}

// ── DETAIL SHEET ───────────────────────────────────────
async function openDetail(cls) {
  sheetTitle.textContent = cls.title;
  sheetBody.innerHTML = '<div style="text-align:center;padding:20px"><div class="spinner" style="margin:0 auto"></div></div>';
  sheetBackdrop.classList.add('open');
  detailSheet.classList.add('open');

  const data = await apiDetails(cls).catch(() => null);
  const d = data?.return;

  const timeStart = fmtTime(cls.start);
  const timeEnd   = fmtTime(cls.end);
  const dayDate   = new Date(cls.start);

  const teacherName = d?.teacher?.length
    ? `${d.teacher[0].first_name} ${d.teacher[0].last_name}`.trim()
    : `ID ${cls.teachers}`;

  const roomName = d?.room
    ? `${d.room.nazwaSali} (${d.room.nazwaBudynku})`
    : `Sala ${cls.room}`;

  const profile = d?.profile
    ? `${d.profile.kierunek}, sem. ${d.profile.semestr}`
    : '';

  sheetBody.innerHTML = `
    ${row('📅', 'Data', `${DAY_NAMES_FULL[dayDate.getDay()]}, ${dayDate.getDate()} ${dayDate.toLocaleDateString('pl',{month:'long'})}`)}
    ${row('🕐', 'Godziny', `${timeStart} – ${timeEnd}`)}
    ${row('📖', 'Forma', cls.form)}
    ${row('📍', 'Sala', roomName)}
    ${row('👤', 'Prowadzący', teacherName)}
    ${row('🎓', 'Moduł', cls.module)}
    ${profile ? row('🏫', 'Kierunek', profile) : ''}
    ${cls.hangoutLink ? row('🔗', 'Link online', `<a href="${cls.hangoutLink}" style="color:var(--accent2)">${cls.hangoutLink}</a>`) : ''}
  `;
}

function row(icon, label, value) {
  return `<div class="detail-row">
    <div class="detail-icon">${icon}</div>
    <div><div class="detail-label">${label}</div><div class="detail-value">${value}</div></div>
  </div>`;
}

function closeSheet() {
  sheetBackdrop.classList.remove('open');
  detailSheet.classList.remove('open');
}

sheetBackdrop.addEventListener('click', closeSheet);

// ── BOOT ───────────────────────────────────────────────
load();
if (state.session) {
  enterApp();
} else {
  showScreen('login');
}
