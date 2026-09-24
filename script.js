// Typing effect
const words = ['website hiện đại ✦', 'web app React ⚛', 'landing page đẹp ✧', 'trải nghiệm mượt mà 🚀'];
const el = document.getElementById('typing');
let wi = 0, ci = 0, del = false;
(function type() {
  const w = words[wi];
  el.textContent = w.slice(0, ci);
  if (!del) { ci++; if (ci > w.length) { del = true; return setTimeout(type, 1600); } }
  else { ci--; if (ci === 0) { del = false; wi = (wi + 1) % words.length; } }
  setTimeout(type, del ? 40 : 80);
})();

// Scroll reveal
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) {
    e.target.classList.add('visible');
    e.target.querySelectorAll('.bar i').forEach(b => b.style.width = b.style.getPropertyValue('--w'));
    if (e.target.classList.contains('skill')) {
      const bar = e.target.querySelector('.bar i');
      if (bar) bar.style.width = bar.style.getPropertyValue('--w');
    }
  }
}), { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(n => io.observe(n));

// Counter
const cio = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  const n = e.target, t = +n.dataset.target;
  let c = 0; const step = Math.max(1, Math.round(t / 40));
  const timer = setInterval(() => { c += step; if (c >= t) { c = t; clearInterval(timer); } n.textContent = c; }, 50);
  cio.unobserve(n);
}), { threshold: 0.6 });
document.querySelectorAll('.counter').forEach(n => cio.observe(n));

// Navbar active link on scroll
const sections = document.querySelectorAll('section[id]');
const navA = document.querySelectorAll('.nav-links a:not(.btn-hire)');
window.addEventListener('scroll', () => {
  const y = scrollY + 120;
  let cur = 'home';
  sections.forEach(s => { if (y >= s.offsetTop) cur = s.id; });
  navA.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + cur));
  document.getElementById('navbar').style.boxShadow = scrollY > 10 ? '0 8px 30px rgba(0,0,0,.25)' : 'none';
}, { passive: true });

// Mobile menu
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
menuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  menuBtn.innerHTML = navLinks.classList.contains('open') ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
});
navLinks.addEventListener('click', e => {
  if (e.target.tagName === 'A') { navLinks.classList.remove('open'); menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>'; }
});

// Dark / light toggle
const themeBtn = document.getElementById('themeBtn');
const saved = localStorage.getItem('ta-theme');
if (saved) document.documentElement.dataset.theme = saved;
function syncIcon() {
  themeBtn.innerHTML = document.documentElement.dataset.theme === 'light'
    ? '<i class="fa-solid fa-moon"></i>' : '<i class="fa-solid fa-sun"></i>';
}
syncIcon();
themeBtn.addEventListener('click', () => {
  const next = document.documentElement.dataset.theme === 'light' ? '' : 'light';
  if (next) document.documentElement.dataset.theme = next;
  else document.documentElement.removeAttribute('data-theme');
  localStorage.setItem('ta-theme', next);
  syncIcon();
});

// Project filter
document.querySelectorAll('.filter').forEach(btn => btn.addEventListener('click', () => {
  document.querySelectorAll('.filter').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const f = btn.dataset.filter;
  document.querySelectorAll('.project').forEach(p => {
    p.classList.toggle('hide', f !== 'all' && !p.dataset.cat.includes(f));
  });
}));

// Contact form demo
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const msg = document.getElementById('formMsg');
  msg.textContent = 'Cảm ơn bạn! Tin nhắn đã được gửi, tôi sẽ phản hồi sớm nhất. ✓';
  e.target.reset();
  setTimeout(() => msg.textContent = '', 5000);
});
