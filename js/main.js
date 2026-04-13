// ── PAGE NAVIGATION ──
const navMap = {
  home: 'nav-home',
  resume: 'nav-resume',
  portfolio: 'nav-portfolio',
  p1: 'nav-portfolio',
  p2: 'nav-portfolio',
  p3: 'nav-portfolio',
  contact: 'nav-contact'
};

function show(id) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  // Show target
  const target = document.getElementById(id);
  if (target) target.classList.add('active');
  // Update nav active state
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
  const navId = navMap[id];
  if (navId) {
    const navEl = document.getElementById(navId);
    if (navEl) navEl.classList.add('active');
  }
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── CONTACT FORM (cosmetic) ──
function handleContactSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('send-btn');
  btn.textContent = 'Message Sent ✓';
  btn.style.borderColor = '#00e5ff';
  btn.style.color = '#00e5ff';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = 'Send Message';
    btn.style.borderColor = '';
    btn.style.color = '';
    btn.disabled = false;
    document.getElementById('contact-form').reset();
  }, 3000);
}

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  // Show home by default
  show('home');

  // Animate skill bars when resume page is shown
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
