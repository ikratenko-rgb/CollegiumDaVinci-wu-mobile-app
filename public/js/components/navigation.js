import { state, saveSession } from '../state.js';
import { apiSchedule } from '../api.js';
import {
  monday,
  addDays,
  fmt,
  isSameDay,
  isCurrentWeek,
  computeDefaultDay,
  getCachedWeek
} from '../utils.js';

let lastTap = 0;
let tHandler = null;
let hapticHandler = null;
let initIconsHandler = null;
let showScreenHandler = null;
let renderDayHandler = null;
let renderSkeletonHandler = null;
let updateDayTabDotsHandler = null;
let getFormColorHandler = null;
let openWeekSummaryHandler = null;

export function configureNavigation({
  t,
  haptic,
  initIcons,
  showScreen,
  renderDay,
  renderSkeleton,
  updateDayTabDots,
  getFormColor,
  openWeekSummary,
}) {
  tHandler = t;
  hapticHandler = haptic;
  initIconsHandler = initIcons;
  showScreenHandler = showScreen;
  renderDayHandler = renderDay;
  renderSkeletonHandler = renderSkeleton;
  updateDayTabDotsHandler = updateDayTabDots;
  getFormColorHandler = getFormColor;
  openWeekSummaryHandler = openWeekSummary;
}

export function updateDayHeading(els, date) {
  const dayNames = tHandler('dayNamesFull');
  const monthNames = tHandler('monthNames');
  const isToday = isSameDay(date, new Date());
  els.dayHeadingMain.textContent = `${dayNames[date.getDay()]}, ${date.getDate()}`;
  let subText = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
  if (!isToday) {
    subText += ` <span class="return-hint">${tHandler('returnHint')}</span>`;
  }

  els.dayHeadingSub.innerHTML = subText;
}

export function setupDayHeadingActions(els) {
  els.dayHeadingMain.addEventListener('click', () => {
    const now = Date.now();
    if (now - lastTap < 300) {
      hapticHandler();
      goToday(els);
    }
    lastTap = now;
  });
}

export function selectDay(els, d) {
  hapticHandler();
  state.selectedDay = d;
  updateDayHeading(els, d);
  els.dayTabs.querySelectorAll('.day-tab').forEach((tab, i) => {
    const mon = monday(state.weekOffset);
    tab.classList.toggle('active', isSameDay(addDays(mon, i), d));
  });
  renderDayHandler(els, d);
}

export function renderWeekUI(els) {
  const mon = monday(state.weekOffset);
  const sun = addDays(mon, 6);
  const locale = state.lang === 'ru' ? 'ru' : state.lang === 'en' ? 'en' : 'pl';

  els.weekLabel.textContent = mon.toLocaleDateString(locale, { day: 'numeric', month: 'short' }) + ' – ' + sun.toLocaleDateString(locale, { day: 'numeric', month: 'short' });

  updateDayHeading(els, state.selectedDay);
  els.dayTabs.innerHTML = '';

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < 6; i++) {
    const d = addDays(mon, i);
    const tab = document.createElement('button');
    tab.className = 'day-tab';
    if (isSameDay(d, today)) tab.classList.add('today');
    if (isSameDay(d, state.selectedDay)) tab.classList.add('active');
    tab.innerHTML = `<span class="day-tab-name">${tHandler('dayNames')[d.getDay()]}</span><span class="day-tab-num">${d.getDate()}</span><span class="day-tab-dots"></span>`;
    tab.addEventListener('click', () => {
      hapticHandler();
      selectDay(els, d);
    });
    els.dayTabs.appendChild(tab);
  }
}

export function updateDayTabDots(els) {
  const mon = monday(state.weekOffset);
  els.dayTabs.querySelectorAll('.day-tab').forEach((tab, i) => {
    const d = addDays(mon, i);
    const dayClasses = state.classes.filter(c => {
      const cd = new Date(c.start);
      cd.setHours(0, 0, 0, 0);
      return isSameDay(cd, d);
    });

    const dotsEl = tab.querySelector('.day-tab-dots');
    if (!dotsEl) return;

    const n = dayClasses.length;
    if (n === 0) {
      dotsEl.innerHTML = '';
      return;
    }

    const uniqueColors = [...new Set(dayClasses.map(c => getFormColorHandler(c.form)))];
    let dots;

    if (uniqueColors.length >= 2) {
      const a = uniqueColors[0];
      const b = uniqueColors[1];
      dots = n <= 2 ? [a, b] : [a, a, b, b];
    } else {
      dots = Array(Math.min(n, 4)).fill(uniqueColors[0]);
    }

    dotsEl.innerHTML = dots.map(color => `<span class="load-dot" style="background:${color}"></span>`).join('');
  });
}

export async function renderWeek(els) {
  const mon = monday(state.weekOffset);
  const sun = addDays(mon, 6);
  const cacheKey = `wu_schedule_${fmt(mon)}`;

  renderWeekUI(els);
  renderSkeletonHandler(els);
  if (els.offlineBanner) els.offlineBanner.style.display = 'none';

  let data = null;

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
        const timeStr = new Date(parsed.ts).toLocaleString(tHandler('cacheKey'), {
          day: '2-digit',
          month: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        });

        if (els.offlineBanner) {
          els.offlineText.textContent = `${tHandler('offlineMode')} ${timeStr}`;
          els.offlineBanner.style.display = 'flex';
          initIconsHandler(els.offlineBanner);
        }
      } catch (_) {
        data = null;
      }
    }
  }

  if (!data || (data.error_code !== undefined && data.error_code !== 0)) {
    if (data?.error_code === 401 || data?.error === 'Session expired') {
      state.session = null;
      saveSession();
      showScreenHandler('login');
      return;
    }

    const cached = getCachedWeek(cacheKey);
    if (cached) {
      data = cached.data;
      const timeStr = new Date(cached.ts).toLocaleString(tHandler('cacheKey'), {
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });
      els.offlineText.textContent = `${tHandler('offlineMode')} ${timeStr}`;
      els.offlineBanner.style.display = 'flex';
      initIconsHandler(els.offlineBanner);
    }

    if (!data || (data.error_code !== undefined && data.error_code !== 0)) {
      els.scheduleList.innerHTML = `<div class="empty-state">
        <div class="empty-state-icon"><i data-lucide="alert-circle" stroke-width="1"></i></div>
        <div class="empty-state-title">${tHandler('loadError')}</div>
      </div>`;
      initIconsHandler(els.scheduleList);
      return;
    }
  }

  state.classes = (data.return || []).sort((a, b) => a.start.localeCompare(b.start));
  updateDayTabDotsHandler(els);
  renderDayHandler(els, state.selectedDay);
}

export function goToday(els) {
  hapticHandler();
  const { day, offset } = computeDefaultDay();
  if (state.weekOffset === offset && state.selectedDay && isSameDay(state.selectedDay, day)) return;
  state.weekOffset = offset;
  state.selectedDay = day;
  renderWeek(els);
}

export function setupWeekAndListSwipes(els) {
  let weekNavTouchX = null;
  const weekNavEl = document.querySelector('.week-nav');

  if (weekNavEl) {
    weekNavEl.addEventListener('touchstart', e => {
      weekNavTouchX = e.touches[0].clientX;
    }, { passive: true });

    weekNavEl.addEventListener('touchend', e => {
      if (weekNavTouchX === null) return;
      const dx = e.changedTouches[0].clientX - weekNavTouchX;
      weekNavTouchX = null;
      if (Math.abs(dx) < 50) return;

      hapticHandler();
      if (dx < 0) {
        state.weekOffset++;
      } else {
        state.weekOffset--;
      }
      renderWeek(els);
    }, { passive: true });
  }

  const pullIndicator = document.createElement('div');
  pullIndicator.className = 'pull-indicator';
  pullIndicator.innerHTML = '<span class="btn-spinner"></span>';
  els.scheduleList.parentElement.insertBefore(pullIndicator, els.scheduleList);

  const touch = {};

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
      const dyPull = e.changedTouches[0].clientY - touch.pullY;
      touch.pulling = false;
      if (dyPull > 70) {
        hapticHandler();
        renderWeek(els);
      }
    }

    const dx = e.changedTouches[0].clientX - touch.x;
    const dy = e.changedTouches[0].clientY - touch.y;
    if (Math.abs(dx) < 50 || Math.abs(dy) > Math.abs(dx)) return;

    const mon = monday(state.weekOffset);
    const tabs = [...els.dayTabs.querySelectorAll('.day-tab')];
    const cur = tabs.findIndex((_, i) => isSameDay(addDays(mon, i), state.selectedDay));
    const next = dx < 0 ? cur + 1 : cur - 1;

    if (next < 0 || next >= 6) return;
    hapticHandler();
    selectDay(els, addDays(mon, next));
  }, { passive: true });
}

export function setupWeekSummaryTrigger(els) {
  els.weekLabel.style.cursor = 'pointer';
  els.weekLabel.addEventListener('click', () => {
    hapticHandler();
    openWeekSummaryHandler(els);
  });
}
