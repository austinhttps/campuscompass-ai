// CampusCompass AI • Institutional Showcase Interaction Script

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initTimer();
  initVideoChapters();
  initRubricDrawer();
  initModals();
  initDemoExtractor();
  initDemoCalendar();
  initDemoChat();
  initMobileNav();
});

/* -------------------------------------------------------------
 * Mobile Navigation Drawer Toggle
 * ------------------------------------------------------------- */
function initMobileNav() {
  const toggle = document.getElementById('mobile-toggle');
  const menu = document.getElementById('mobile-menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    menu.classList.toggle('open');
  });

  const mobileLinks = document.querySelectorAll('.mobile-link');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
    });
  });
}

/* -------------------------------------------------------------
 * Theme Management (Light / Dark)
 * ------------------------------------------------------------- */
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  // Default to light theme for authentic academic paper readability, or remember preference
  const savedTheme = localStorage.getItem('cc_theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('cc_theme', next);
      updateThemeIcon(next);
    });
  }
}

function updateThemeIcon(theme) {
  const icon = document.getElementById('theme-icon');
  if (!icon) return;
  if (theme === 'dark') {
    icon.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
  } else {
    icon.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
  }
}

/* -------------------------------------------------------------
 * 15-Minute Judge Presentation Timer
 * ------------------------------------------------------------- */
let timerInterval = null;
let timerSeconds = 15 * 60; // 15:00
let isTimerRunning = false;

function initTimer() {
  const display = document.getElementById('timer-display');
  const toggleBtn = document.getElementById('timer-toggle');
  const resetBtn = document.getElementById('timer-reset');

  if (!display || !toggleBtn || !resetBtn) return;

  function renderTimer() {
    const mins = Math.floor(timerSeconds / 60);
    const secs = timerSeconds % 60;
    display.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  toggleBtn.addEventListener('click', () => {
    if (isTimerRunning) {
      clearInterval(timerInterval);
      isTimerRunning = false;
      toggleBtn.innerHTML = '▶';
    } else {
      isTimerRunning = true;
      toggleBtn.innerHTML = '❚❚';
      timerInterval = setInterval(() => {
        if (timerSeconds > 0) {
          timerSeconds--;
          renderTimer();
        } else {
          clearInterval(timerInterval);
          isTimerRunning = false;
          toggleBtn.innerHTML = '▶';
          display.textContent = '00:00 (Time)';
        }
      }, 1000);
    }
  });

  resetBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    isTimerRunning = false;
    toggleBtn.innerHTML = '▶';
    timerSeconds = 15 * 60;
    renderTimer();
  });

  renderTimer();
}

/* -------------------------------------------------------------
 * Video Player Chapters & Timestamps
 * ------------------------------------------------------------- */
function initVideoChapters() {
  const video = document.getElementById('pitch-video');
  const trackItems = document.querySelectorAll('.track-item');

  if (!video || !trackItems.length) return;

  trackItems.forEach(item => {
    item.addEventListener('click', () => {
      const timeSec = parseFloat(item.getAttribute('data-time') || '0');
      video.currentTime = timeSec;
      video.play();
      trackItems.forEach(ci => ci.classList.remove('active'));
      item.classList.add('active');
    });
  });

  video.addEventListener('timeupdate', () => {
    const current = video.currentTime;
    trackItems.forEach(item => {
      const timeSec = parseFloat(item.getAttribute('data-time') || '0');
      const nextTime = parseFloat(item.getAttribute('data-next') || '9999');
      if (current >= timeSec && current < nextTime) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  });
}

/* -------------------------------------------------------------
 * Evaluation Rubric Drawer
 * ------------------------------------------------------------- */
function initRubricDrawer() {
  const openBtns = document.querySelectorAll('.open-rubric-btn');
  const drawer = document.getElementById('rubric-drawer');
  const overlay = document.getElementById('rubric-overlay');
  const closeBtn = document.getElementById('close-rubric-btn');

  function openDrawer() {
    drawer.classList.add('open');
    overlay.classList.add('open');
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    overlay.classList.remove('open');
  }

  openBtns.forEach(btn => btn.addEventListener('click', openDrawer));
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (overlay) overlay.addEventListener('click', closeDrawer);

  const jumpLinks = document.querySelectorAll('.rubric-jump');
  jumpLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });
}

/* -------------------------------------------------------------
 * PDF Exhibition Poster Modal
 * ------------------------------------------------------------- */
function initModals() {
  const modal = document.getElementById('pdf-modal');
  const modalIframe = document.getElementById('modal-iframe');
  const closeBtn = document.getElementById('modal-close-btn');
  const viewPosterBtns = document.querySelectorAll('.view-poster-btn');

  function openModal(url) {
    modalIframe.src = url;
    modal.classList.add('open');
  }

  function closeModal() {
    modal.classList.remove('open');
    modalIframe.src = '';
  }

  viewPosterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal('Public/CampusCompass-AI-Poster-36x24.pdf');
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }
}

/* -------------------------------------------------------------
 * Sandbox Tab Navigation
 * ------------------------------------------------------------- */
window.switchDemoTab = function(tabId) {
  document.querySelectorAll('.sandbox-tab').forEach(btn => {
    btn.classList.remove('active');
  });
  document.querySelectorAll('.sandbox-pane').forEach(panel => {
    panel.classList.remove('active');
  });

  const activeBtn = document.querySelector(`[data-tab="${tabId}"]`);
  const activePanel = document.getElementById(tabId);
  if (activeBtn) activeBtn.classList.add('active');
  if (activePanel) activePanel.classList.add('active');
};

/* -------------------------------------------------------------
 * Demo 1: Extractor Verification
 * ------------------------------------------------------------- */
function initDemoExtractor() {
  const confirmButtons = document.querySelectorAll('.btn-confirm-date');
  const verifiedCountEl = document.getElementById('verified-count');
  let count = 0;

  confirmButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.extracted-row');
      if (card.classList.contains('confirmed')) {
        card.classList.remove('confirmed');
        btn.textContent = 'Verify Date';
        btn.classList.remove('btn-primary');
        btn.classList.add('btn-secondary');
        count = Math.max(0, count - 1);
      } else {
        card.classList.add('confirmed');
        btn.textContent = '✓ Verified';
        btn.classList.remove('btn-secondary');
        btn.classList.add('btn-primary');
        count++;
      }
      if (verifiedCountEl) verifiedCountEl.textContent = count;
    });
  });
}

/* -------------------------------------------------------------
 * Demo 2: Schedule Adaptation Simulation
 * ------------------------------------------------------------- */
function initDemoCalendar() {
  const triggerBtn = document.getElementById('btn-simulate-shift');
  const statusEl = document.getElementById('sim-status-text');
  const conflictBlock = document.getElementById('conflict-block');
  const tuesdayShift = document.getElementById('tuesday-shift');
  const movedStudyBlock = document.getElementById('moved-study-block');

  let state = 0; // 0 = baseline, 1 = conflict detected, 2 = resolved

  if (!triggerBtn) return;

  triggerBtn.addEventListener('click', () => {
    if (state === 0) {
      tuesdayShift.style.display = 'block';
      conflictBlock.classList.remove('study');
      conflictBlock.classList.add('conflict');
      conflictBlock.innerHTML = `<strong>Collision:</strong> Quiz prep overlaps new shift (5–9 PM)`;
      statusEl.innerHTML = `<span style="color:var(--accent-crimson); font-weight:600;">Shift collision detected on Tuesday.</span> Quiz preparation block requires re-allocation.`;
      triggerBtn.textContent = 'Auto-Reallocate Study Block';
      triggerBtn.classList.remove('btn-secondary');
      triggerBtn.classList.add('btn-primary');
      state = 1;
    } else if (state === 1) {
      conflictBlock.style.display = 'none';
      if (movedStudyBlock) {
        movedStudyBlock.style.display = 'block';
      }
      statusEl.innerHTML = `<span style="color:var(--accent-green); font-weight:600;">Collision Resolved:</span> 90m Quiz prep moved to Thursday 7:00 PM buffer ahead of deadline.`;
      triggerBtn.textContent = '↺ Reset Simulation';
      triggerBtn.classList.remove('btn-primary');
      triggerBtn.classList.add('btn-secondary');
      state = 2;
    } else {
      tuesdayShift.style.display = 'none';
      conflictBlock.style.display = 'block';
      conflictBlock.classList.remove('conflict');
      conflictBlock.classList.add('study');
      conflictBlock.innerHTML = `BIO-111 Quiz Prep (6–7:30 PM)`;
      if (movedStudyBlock) movedStudyBlock.style.display = 'none';
      statusEl.innerHTML = `Baseline: 3 study sessions successfully fitted around fixed work shifts.`;
      triggerBtn.textContent = 'Simulate Employer Shift Change (Tuesday)';
      state = 0;
    }
  });
}

/* -------------------------------------------------------------
 * Demo 3: Console Terminal Simulator
 * ------------------------------------------------------------- */
function initDemoChat() {
  const msgContainer = document.getElementById('chat-messages-container');
  const promptButtons = document.querySelectorAll('.prompt-choice');

  const responses = {
    answer: {
      student: "Can you just give me the exact answer to question 4 on the BIO-111 lab assignment?",
      coach: `<span class="console-tag">Policy In Violation • Graded Work Answer Restricted</span>
I cannot provide direct solutions to graded coursework, but we can break down the underlying concept together.<br><br>
Review your respiration rate calculation from step 2. Compare your trial data with the sample curve on lecture slide 14.<br><br>
<button class="btn btn-subtle btn-sm" onclick="alert('Routing to Wake Tech Academic Success Center - Biology Peer Tutor booking.')">
  Connect with Wake Tech Biology Tutor
</button>`
    },
    reschedule: {
      student: "Supervisor extended my shift, how do I re-plan?",
      coach: `<span class="console-tag" style="color:var(--primary);">Schedule Adaptation Active</span>
I inspected your remaining study blocks. We can partition your 2-hour English essay drafting into two 60-minute blocks: Wednesday at 7:00 PM and Saturday at 10:00 AM.<br><br>
Would you like to approve this revised schedule?`
    },
    overwhelmed: {
      student: "3 exams, 30 hours of work, feeling overwhelmed",
      coach: `<span class="console-tag" style="color:var(--accent-crimson);">Care Team Escalation Protocol</span>
Managing full-time employment alongside multiple exams is demanding. Academic support resources are available to help manage this workload.<br><br>
Would you like me to connect you with your Wake Tech Care Team success coach to discuss study extensions or tutoring?<br><br>
<button class="btn btn-subtle btn-sm" onclick="alert('Inquiry dispatched to Wake Tech Care Team Success Coach.')">
  Request Wake Tech Care Team Support
</button>`
    }
  };

  promptButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      promptButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const scenario = btn.getAttribute('data-scenario');
      const data = responses[scenario];
      if (!data || !msgContainer) return;

      msgContainer.innerHTML = `
        <div class="console-bubble user">${data.student}</div>
        <div class="console-bubble assistant">${data.coach}</div>
      `;
      msgContainer.scrollTop = msgContainer.scrollHeight;
    });
  });
}
