const navMap = {
  home: 'nav-home',
  resume: 'nav-resume',
  portfolio: 'nav-portfolio',
  p1: 'nav-portfolio',
  p2: 'nav-portfolio',
  p3: 'nav-portfolio',
  p4: 'nav-portfolio',
  p5: 'nav-portfolio',
  contact: 'nav-contact'
};

function show(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById(id);
  if (target) target.classList.add('active');
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
  const navId = navMap[id];
  if (navId) {
    const navEl = document.getElementById(navId);
    if (navEl) navEl.classList.add('active');
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function handleContactSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('send-btn');
  const form = document.getElementById('contact-form');
  btn.textContent = 'Sending...';
  btn.disabled = true;

  try {
    const data = new FormData(form);
    const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      btn.textContent = 'Message Sent ✓';
      btn.style.borderColor = '#a8e063';
      btn.style.color = '#a8e063';
      form.reset();
      setTimeout(() => {
        btn.textContent = 'Send Message';
        btn.style.borderColor = '';
        btn.style.color = '';
        btn.disabled = false;
      }, 4000);
    } else {
      btn.textContent = 'Error — Try Again';
      btn.style.borderColor = '#e06363';
      btn.style.color = '#e06363';
      btn.disabled = false;
    }
  } catch {
    btn.textContent = 'Error — Try Again';
    btn.style.borderColor = '#e06363';
    btn.style.color = '#e06363';
    btn.disabled = false;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  show('home');

  const resumeObserver = new MutationObserver(() => {
    if (document.getElementById('resume').classList.contains('active')) {
      document.querySelectorAll('.skill-fill').forEach(bar => {
        const w = bar.dataset.width || bar.style.width;
        bar.style.width = '0';
        requestAnimationFrame(() => {
          setTimeout(() => { bar.style.width = w; }, 100);
        });
      });
    }
  });
  const resumePage = document.getElementById('resume');
  if (resumePage) {
    resumeObserver.observe(resumePage, { attributes: true, attributeFilter: ['class'] });
  }
});