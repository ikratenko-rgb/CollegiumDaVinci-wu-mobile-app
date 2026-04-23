let obCurrent = 0;
const OB_TOTAL = 3;
let onboardingBound = false;

function renderObSlide(t, n) {
  obCurrent = n;
  document.querySelectorAll('.ob-slide').forEach((s, i) => s.classList.toggle('active', i === n));
  document.querySelectorAll('.ob-dot').forEach((d, i) => d.classList.toggle('active', i === n));

  const slides = t('ob');
  slides.forEach((slide, i) => {
    const tEl = document.getElementById('ob-title-' + i);
    const sEl = document.getElementById('ob-sub-' + i);
    if (tEl) tEl.textContent = slide.title;
    if (sEl) sEl.textContent = slide.sub;
  });

  const isLast = n === OB_TOTAL - 1;
  const btnStart = document.getElementById('ob-btn-start');
  const btnRow = document.getElementById('ob-btn-row');
  if (btnStart) {
    btnStart.textContent = t('obStart');
    btnStart.classList.toggle('visible', isLast);
  }
  if (btnRow) btnRow.style.display = isLast ? 'none' : 'flex';

  const btnNext = document.getElementById('ob-btn-next');
  const btnSkip = document.getElementById('ob-btn-skip');
  if (btnNext) btnNext.textContent = t('obNext');
  if (btnSkip) btnSkip.textContent = t('obSkip');
}

function showOnboarding(t) {
  const onboarding = document.getElementById('onboarding-screen');
  if (onboarding) onboarding.classList.remove('hidden');
  renderObSlide(t, 0);
}

function finishOnboarding(onFinished) {
  localStorage.setItem('onboarding_done', '1');
  const scr = document.getElementById('onboarding-screen');
  if (!scr) {
    onFinished();
    return;
  }

  scr.style.opacity = '0';
  setTimeout(() => {
    scr.classList.add('hidden');
    scr.style.display = 'none';
    scr.style.opacity = '';
    onFinished();
  }, 500);
}

export function setupOnboarding({ t, haptic, onFinished }) {
  if (!onboardingBound) {
    onboardingBound = true;

    const btnNext = document.getElementById('ob-btn-next');
    const btnSkip = document.getElementById('ob-btn-skip');
    const btnStart = document.getElementById('ob-btn-start');

    if (btnNext) {
      btnNext.addEventListener('click', () => {
        haptic();
        if (obCurrent < OB_TOTAL - 1) renderObSlide(t, obCurrent + 1);
      });
    }

    if (btnSkip) {
      btnSkip.addEventListener('click', () => {
        haptic();
        finishOnboarding(onFinished);
      });
    }

    if (btnStart) {
      btnStart.addEventListener('click', () => {
        haptic();
        finishOnboarding(onFinished);
      });
    }
  }

  if (!localStorage.getItem('onboarding_done')) {
    showOnboarding(t);
  } else {
    onFinished();
  }
}
