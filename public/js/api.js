import { state } from './state.js';

export async function apiLogin(login, password) {
  const r = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ login, password }),
  });
  if (!r.ok) throw new Error('auth_failed');
  return r.json();
}

export async function apiSchedule(start, end) {
  const r = await fetch('/api/schedule', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ session: state.session, start, end }),
  });
  if (r.status === 401) return { error: 'Session expired', error_code: 401 };
  if (!r.ok) throw new Error('server_error');
  return r.json();
}

export async function apiDetails(cls) {
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
