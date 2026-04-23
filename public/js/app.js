import { state, saveSession, saveCredentials, loadCredentials, clearCredentials } from './state.js';
import { apiLogin } from './api.js';
import { monday, fmt, computeDefaultDay, getCachedWeek } from './utils.js';
import { detectLang, applyLang, t } from './i18n.js';
import {
  els,
  initUi,
  initIcons,
  haptic,
  showToast,
  shakeForm,
  showScreen,
  renderWeek,
  renderWeekUI,
  renderDay,
  updateDayTabDots,
  startProgressTimer,
  checkIosBanner,
  backgroundRefresh,
  goToday,
  setupOnboarding,
  queueNotificationPermissionRequest,
} from './ui.js';

const APP_VERSION = 'v1.0.10';

if (state.session) {
  document.getElementById('login-screen').classList.add('hidden');
}

const versionEl = document.getElementById('app-version');
if (versionEl) versionEl.textContent = APP_VERSION;

function applyTheme(theme) {
  state.theme = theme;
  localStorage.setItem('wu_theme', theme);
  document.documentElement.setAttribute('data-theme', theme);

  const metaTheme = document.querySelector('meta[name="theme-color"]');
  if (metaTheme) {
    metaTheme.content = theme === 'light' ? '#FFFFFF' : '#000000';
  }

  if (els.btnTheme) {
    const icon = els.btnTheme.querySelector('i');
    if (icon) {
      icon.setAttribute('data-lucide', theme === 'light' ? 'moon' : 'sun');
      initIcons(els.btnTheme);
    }
  }
}

function enterApp() {
  showScreen('app');
  const { day, offset } = computeDefaultDay();
  state.weekOffset = offset;
  state.selectedDay = day;
  renderWeek();
  checkIosBanner();
  startProgressTimer();
  queueNotificationPermissionRequest(3000);
}

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
      const ts = new Date(cached.ts).toLocaleString(t('cacheKey'), {
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });

      if (els.offlineBanner) {
        els.offlineText.textContent = t('offlineMode') + ' ' + ts;
        els.offlineBanner.style.display = 'flex';
        initIcons(els.offlineBanner);
      }
    }
    return;
  }

  const data = await apiLogin(creds.login, creds.pass).catch(() => null);
  if (data?.session) {
    state.session = data.session;
    saveSession();
    enterApp();
    return;
  }

  clearCredentials();
  state.session = null;
  saveSession();
  showScreen('login');
}

function bootApp() {
  const creds = loadCredentials();
  if (creds && creds.login && creds.pass) {
    autoLogin(creds);
  } else {
    clearCredentials();
    state.session = null;
    saveSession();
    showScreen('login');
  }
}

function bindGlobalListeners() {
  if (els.btnLogin) {
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
  }

  if (els.inpPass) {
    els.inpPass.addEventListener('keydown', e => {
      if (e.key === 'Enter' && els.btnLogin) els.btnLogin.click();
    });
  }

  if (els.btnLogout) {
    els.btnLogout.addEventListener('click', () => {
      haptic();
      state.session = null;
      clearCredentials();
      localStorage.removeItem('wu_session');
      showScreen('login');
    });
  }

  if (els.btnTheme) {
    els.btnTheme.addEventListener('click', () => {
      haptic();
      applyTheme(state.theme === 'dark' ? 'light' : 'dark');
    });
  }

  if (els.btnLang) {
    els.btnLang.addEventListener('click', e => {
      e.stopPropagation();
      haptic();
      els.langDropdown.classList.toggle('open');
    });
  }

  document.querySelectorAll('.lang-option').forEach(btn => {
    btn.addEventListener('click', () => {
      haptic();
      applyLang(btn.dataset.lang);
      els.langDropdown.classList.remove('open');
      if (state.session) renderWeek();
    });
  });

  document.addEventListener('click', () => {
    if (els.langDropdown) els.langDropdown.classList.remove('open');
  });

  if (els.btnPrev) {
    els.btnPrev.addEventListener('click', () => {
      haptic();
      state.weekOffset--;
      renderWeek();
    });
  }

  if (els.btnNext) {
    els.btnNext.addEventListener('click', () => {
      haptic();
      state.weekOffset++;
      renderWeek();
    });
  }

  if (els.btnToday) {
    els.btnToday.addEventListener('click', goToday);
  }

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && state.session) {
      backgroundRefresh();
    }
  });
}

function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) return;

  navigator.serviceWorker.register('/sw.js').then(reg => {
    reg.addEventListener('updatefound', () => {
      const next = reg.installing;
      if (!next) return;
      next.addEventListener('statechange', () => {
        if (next.state === 'activated') window.location.reload();
      });
    });
  }).catch(() => { });
}

state.lang = detectLang();
applyTheme(state.theme);
applyLang(state.lang);
initIcons();
initUi();
bindGlobalListeners();
registerServiceWorker();
setupOnboarding(bootApp);
