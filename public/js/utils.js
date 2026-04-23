export function monday(offset = 0) {
  const d = new Date();
  const day = d.getDay() || 7;
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - day + 1 + offset * 7);
  return d;
}

export function addDays(date, n) {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}

export function fmt(date) {
  return date.toISOString().slice(0, 10);
}

export function fmtTime(iso) {
  return iso.slice(11, 16);
}

export function isSameDay(a, b) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

export function isCurrentWeek(weekOffset) {
  return weekOffset === 0;
}

export function computeDefaultDay() {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();
  if (day === 0 || (day === 6 && hour >= 15)) return { day: monday(1), offset: 1 };
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return { day: today, offset: 0 };
}

export function getCachedWeek(cacheKey) {
  try {
    const r = localStorage.getItem(cacheKey);
    return r ? JSON.parse(r) : null;
  } catch (_) {
    return null;
  }
}
