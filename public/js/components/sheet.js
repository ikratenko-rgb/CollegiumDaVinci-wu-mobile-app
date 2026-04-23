import { state } from '../state.js';
import { apiDetails } from '../api.js';
import { monday, addDays, fmtTime, isSameDay } from '../utils.js';

let initIconsHandler = null;
let hapticHandler = null;
let tHandler = null;
let getFormColorHandler = null;

export function configureSheet({ initIcons, haptic, t, getFormColor }) {
  initIconsHandler = initIcons;
  hapticHandler = haptic;
  tHandler = t;
  getFormColorHandler = getFormColor;
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

export function closeSheet(els) {
  els.detailSheet.style.transform = '';
  els.detailSheet.style.transition = '';
  els.sheetBackdrop.classList.remove('open');
  els.detailSheet.classList.remove('open');
}

export async function openDetail(els, cls) {
  hapticHandler();
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
  const dayNames = tHandler('dayNamesFull');
  const monthNames = tHandler('monthNames');
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
    ${detailRow('calendar', tHandler('detailDate'), dateStr)}
    ${detailRow('clock', tHandler('detailTime'), `${timeS} – ${timeE}`)}
    ${detailRow('book-open', tHandler('detailForm'), cls.form)}
    ${detailRow('map-pin', tHandler('detailRoom'), roomName)}
    ${detailRow('user', tHandler('detailTeacher'), teacherName)}
    ${detailRow('layers', tHandler('detailModule'), cls.module)}
    ${profile ? detailRow('graduation-cap', tHandler('detailProfile'), profile) : ''}
    ${cls.hangoutLink ? detailRow('link', tHandler('detailLink'), `<a href="${cls.hangoutLink}" class="selectable">${cls.hangoutLink}</a>`) : ''}
  `;

  initIconsHandler(els.detailSheet);
}

export function openWeekSummary(els) {
  if (!state.classes.length) return;

  const mon = monday(state.weekOffset);
  const dayNames = tHandler('dayNamesFull');
  const monthNames = tHandler('monthNames');

  const html = Array.from({ length: 6 }, (_, i) => {
    const d = addDays(mon, i);
    const dayClasses = state.classes.filter(c => {
      const cd = new Date(c.start);
      cd.setHours(0, 0, 0, 0);
      return isSameDay(cd, d);
    });

    if (!dayClasses.length) return '';

    const rows = dayClasses.map(cls => `
      <div class="week-sum-row" style="border-left-color:${getFormColorHandler(cls.form)}">
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
  initIconsHandler(els.detailSheet);
}

export function setupSheetGestures(els) {
  els.sheetBackdrop.addEventListener('click', () => closeSheet(els));

  let sheetDragY = null;
  let sheetDragging = false;

  els.detailSheet.addEventListener('touchstart', e => {
    sheetDragY = e.touches[0].clientY;
    sheetDragging = false;
  }, { passive: true });

  els.detailSheet.addEventListener('touchmove', e => {
    if (sheetDragY === null) return;
    const dy = e.touches[0].clientY - sheetDragY;
    if (dy > 0 && els.detailSheet.scrollTop === 0) {
      sheetDragging = true;
      e.preventDefault();
      els.detailSheet.style.transition = 'none';
      els.detailSheet.style.transform = `translateY(${dy}px)`;
    }
  }, { passive: false });

  els.detailSheet.addEventListener('touchend', e => {
    if (sheetDragY === null) return;
    const dy = e.changedTouches[0].clientY - sheetDragY;
    els.detailSheet.style.transition = '';

    if (sheetDragging && dy > 80) {
      closeSheet(els);
    } else {
      els.detailSheet.style.transform = '';
    }

    sheetDragY = null;
    sheetDragging = false;
  });
}
