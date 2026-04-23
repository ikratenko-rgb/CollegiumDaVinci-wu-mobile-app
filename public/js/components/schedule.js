import { state } from '../state.js';
import { fmtTime, isSameDay } from '../utils.js';

const NOTIFY_BEFORE_MS = 15 * 60 * 1000;
let notifyTimers = [];
let progressInterval = null;
let openDetailHandler = null;
let hapticHandler = null;
let initIconsHandler = null;
let tHandler = null;

export function configureSchedule({ openDetail, haptic, initIcons, t }) {
  openDetailHandler = openDetail;
  hapticHandler = haptic;
  initIconsHandler = initIcons;
  tHandler = t;
}

export function getFormColor(form) {
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

  if (!form) return '#6B7280';
  const f = form.toLowerCase();
  const match = Object.entries(FORM_COLORS).find(([k]) => f.includes(k));
  return match ? match[1] : '#6B7280';
}

export function renderSkeleton(els) {
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

export function renderDay(els, date) {
  const classes = state.classes.filter(c => {
    const d = new Date(c.start);
    d.setHours(0, 0, 0, 0);
    return isSameDay(d, date);
  });

  if (classes.length === 0) {
    els.scheduleList.innerHTML = `<div class="empty-state animate-in">
      <div class="empty-state-icon"><i data-lucide="coffee" stroke-width="1"></i></div>
      <div class="empty-state-title">${tHandler('emptyTitle')}</div>
      <div class="empty-state-subtitle">${tHandler('emptySubtitle')}</div>
    </div>`;
    initIconsHandler(els.scheduleList);
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
          <span class="meta-item"><i data-lucide="users" stroke-width="1.2"></i>${cls.room}</span>
        </div>
      </div>
      <div class="card-chevron"><i data-lucide="chevron-right" stroke-width="1.2"></i></div>
      ${progressHtml}`;

    card.addEventListener('click', () => {
      hapticHandler();
      if (openDetailHandler) openDetailHandler(cls);
    });

    els.scheduleList.appendChild(card);

    if (isCurrent) currentCard = card;
  });

  initIconsHandler(els.scheduleList);

  const isToday = isSameDay(date, new Date());
  if (isToday) scheduleClassNotifications(classes);

  requestAnimationFrame(() => {
    if (currentCard) currentCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
}

export function updateProgress(els) {
  const bars = document.querySelectorAll('.progress-bar');
  const now = new Date();

  bars.forEach(bar => {
    const start = new Date(bar.dataset.start);
    const end = new Date(bar.dataset.end);
    const elapsed = now - start;
    const total = end - start;
    const pct = Math.min(100, Math.max(0, (elapsed / total) * 100));
    bar.style.width = `${pct.toFixed(1)}%`;
    if (pct >= 100) renderDay(els, state.selectedDay);
  });
}

export function startProgressTimer(els) {
  if (progressInterval) clearInterval(progressInterval);
  progressInterval = setInterval(() => updateProgress(els), 30000);
}
