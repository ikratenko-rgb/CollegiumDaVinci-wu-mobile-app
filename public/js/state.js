export const state = {
  session: localStorage.getItem('wu_session') || null,
  weekOffset: 0,
  selectedDay: null,
  classes: [],
  lang: 'ru',
  theme: localStorage.getItem('wu_theme') ||
    (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'),
};

export const saveSession = () => localStorage.setItem('wu_session', state.session || '');

export function saveCredentials(login, pass) {
  try { localStorage.setItem('wu_creds', btoa(unescape(encodeURIComponent(JSON.stringify({ login, pass }))))); } catch (_) { }
}

export function loadCredentials() {
  try { const r = localStorage.getItem('wu_creds'); return r ? JSON.parse(decodeURIComponent(escape(atob(r)))) : null; } catch (_) { return null; }
}

export function clearCredentials() {
  localStorage.removeItem('wu_creds');
}
