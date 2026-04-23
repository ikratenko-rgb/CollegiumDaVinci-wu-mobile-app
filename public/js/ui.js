import { state } from './state.js';
import { apiSchedule } from './api.js';
import { monday, addDays, fmt } from './utils.js';
import { t } from './i18n.js';
import { setupOnboarding as setupOnboardingComponent } from './components/onboarding.js';
import {
  configureSheet,
  openDetail as openDetailComponent,
  openWeekSummary as openWeekSummaryComponent,
  setupSheetGestures,
} from './components/sheet.js';
import {
  configureSchedule,
  getFormColor,
  renderSkeleton,
  renderDay as renderDayComponent,
  updateProgress,
  startProgressTimer as startProgressTimerComponent,
} from './components/schedule.js';
import {
  configureNavigation,
  renderWeek as renderWeekComponent,
  renderWeekUI as renderWeekUIComponent,
  updateDayTabDots as updateDayTabDotsComponent,
  goToday as goTodayComponent,
  setupWeekAndListSwipes,
  setupWeekSummaryTrigger,
} from './components/navigation.js';

const $ = id => document.getElementById(id);

export const els = {
  loginScreen: $('login-screen'),
  appScreen: $('app-screen'),
  inpLogin: $('inp-login'),
  inpPass: $('inp-pass'),
  btnLogin: $('btn-login'),
  loginError: $('login-error'),
  weekLabel: $('week-label'),
  todayIndicator: $('today-indicator'),
  btnPrev: $('btn-prev'),
  btnNext: $('btn-next'),
  btnToday: $('btn-today'),
  btnLogout: $('btn-logout'),
  dayTabs: $('day-tabs'),
  scheduleList: $('schedule-list'),
  dayHeadingMain: $('day-heading-main'),
  dayHeadingSub: $('day-heading-sub'),
  sheetBackdrop: $('sheet-backdrop'),
  detailSheet: $('detail-sheet'),
  sheetTitle: $('sheet-title'),
  sheetSubtitle: $('sheet-subtitle'),
  sheetBody: $('sheet-body'),
  iosBanner: $('ios-banner'),
  iosClose: $('ios-close'),
  btnLang: $('btn-lang'),
  langDropdown: $('lang-dropdown'),
  btnTheme: $('btn-theme'),
  offlineBanner: $('offline-banner'),
  offlineText: $('offline-text'),
  toast: $('toast'),
};

let toastTimer = null;
let uiInitialized = false;

export function haptic() {
  if (navigator.vibrate) navigator.vibrate(10);
}

export function initIcons(root = document) {
  window.lucide?.createIcons({ elements: [...root.querySelectorAll('[data-lucide]')] });
}

export function showToast(msg) {
  if (!els.toast) return;
  els.toast.textContent = msg;
  els.toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => els.toast.classList.remove('show'), 3000);
}

export function shakeForm() {
  const form = els.loginScreen;
  if (!form) return;
  form.classList.remove('shake');
  void form.offsetWidth;
  form.classList.add('shake');
  form.addEventListener('animationend', () => form.classList.remove('shake'), { once: true });
}

export function showScreen(name) {
  els.loginScreen.classList.toggle('hidden', name !== 'login');
  els.appScreen.classList.toggle('hidden', name !== 'app');
}

export async function openDetail(cls) {
  return openDetailComponent(els, cls);
}

export function renderDay(date) {
  return renderDayComponent(els, date);
}

export function renderWeekUI() {
  return renderWeekUIComponent(els);
}

export function updateDayTabDots() {
  return updateDayTabDotsComponent(els);
}

export async function renderWeek() {
  return renderWeekComponent(els);
}

export function updateProgressUi() {
  return updateProgress(els);
}

export function startProgressTimer() {
  return startProgressTimerComponent(els);
}

export function goToday() {
  return goTodayComponent(els);
}

export async function backgroundRefresh() {
  const mon = monday(state.weekOffset);
  const sun = addDays(mon, 6);
  const cacheKey = 'wu_schedule_' + fmt(mon);

  try {
    const data = await apiSchedule(fmt(mon), fmt(sun));
    if (data && data.error_code === 0) {
      localStorage.setItem(cacheKey, JSON.stringify({ ts: Date.now(), data }));
      state.classes = (data.return || []).sort((a, b) => a.start.localeCompare(b.start));
      renderDayComponent(els, state.selectedDay);
      if (els.offlineBanner) els.offlineBanner.style.display = 'none';
    }
  } catch (_) {
  }
}

function requestNotifyPermission() {
  if (!('Notification' in window) || Notification.permission !== 'default') return;
  Notification.requestPermission();
}

export function queueNotificationPermissionRequest(delayMs = 3000) {
  setTimeout(requestNotifyPermission, delayMs);
}

export function checkIosBanner() {
  const isIos = /iphone|ipad|ipod/i.test(navigator.userAgent);
  const isStandalone = window.navigator.standalone;
  const dismissed = localStorage.getItem('wu_ios_dismissed');
  if (isIos && !isStandalone && !dismissed) {
    els.iosBanner.style.display = 'flex';
  }
}

export function setupOnboarding(onFinished) {
  return setupOnboardingComponent({ t, haptic, onFinished });
}

export function initUi() {
  if (uiInitialized) return;
  uiInitialized = true;

  configureSheet({
    initIcons,
    haptic,
    t,
    getFormColor,
  });

  configureSchedule({
    openDetail: cls => openDetailComponent(els, cls),
    haptic,
    initIcons,
    t,
  });

  configureNavigation({
    t,
    haptic,
    initIcons,
    showScreen,
    renderDay: (componentEls, date) => renderDayComponent(componentEls, date),
    renderSkeleton: componentEls => renderSkeleton(componentEls),
    updateDayTabDots: componentEls => updateDayTabDotsComponent(componentEls),
    getFormColor,
    openWeekSummary: componentEls => openWeekSummaryComponent(componentEls),
  });

  if (els.iosClose) {
    els.iosClose.addEventListener('click', () => {
      els.iosBanner.style.display = 'none';
      localStorage.setItem('wu_ios_dismissed', '1');
    });
  }

  setupSheetGestures(els);
  setupWeekAndListSwipes(els);
  setupWeekSummaryTrigger(els);
}
