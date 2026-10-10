const projects = JSON.parse(document.querySelector('#project-data').textContent);
let lang = 'en';
try { lang = localStorage.getItem('portfolio-language-v2') === 'mn' ? 'mn' : 'en'; } catch {}
let activeCase = null;
const caseDialog = document.querySelector('#case-dialog');
const photoDialog = document.querySelector('#photo-dialog');
function renderCase() {
  if (!activeCase) return;
  const p = projects.find(p => p.id === activeCase);
  const english = lang === 'en';
  document.querySelector('#case-title').textContent = english ? p.name : p.mnName;
  const content = document.querySelector('#case-content');
  content.replaceChildren();
  function add(tag, value, cls) {
    const el = document.createElement(tag);el.textContent = value;
    if (cls) el.className = cls;
    content.append(el);return el;
  }
  add('span',english ? p.status : p.mnStatus,'case-status');
  add('p',english ? p.description : p.mnDescription);
  const ul = add('ul','');
  (english ? p.features : p.mnFeatures).forEach(value => {
    const li = document.createElement('li');li.textContent = value;ul.append(li);
  });
  add('p',english ? p.note : p.mnNote,'case-note');
  const live = document.querySelector('#case-link');
  live.hidden = !p.url;
  if (p.url) live.href = p.url;
  live.textContent = english ? (p.id === 'ledger' ? 'View login page ↗' : 'Visit website ↗') : 'Сайт үзэх ↗';
  const repo = document.querySelector('#case-repo');
  repo.hidden = !p.repo;
  if (p.repo) repo.href = p.repo;
}
function setLanguage() {
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-en][data-mn]').forEach(el => el.innerHTML = el.dataset[lang]);
  const button = document.querySelector('#language');
  button.textContent = lang === 'en' ? 'MN' : 'EN';
  button.setAttribute('aria-label',lang === 'en' ? 'Монгол хэлээр харах' : 'Switch to English');
  renderCase();
}
setLanguage();
document.querySelector('#language').addEventListener('click',() => {
  lang = lang === 'en' ? 'mn' : 'en';
  try { localStorage.setItem('portfolio-language-v2',lang); } catch {}
  setLanguage();
});
const menu = document.querySelector('#menu');
const nav = document.querySelector('#nav');
function closeMenu() {nav.classList.remove('open');menu.setAttribute('aria-expanded','false');}
menu.addEventListener('click',() => menu.setAttribute('aria-expanded',String(nav.classList.toggle('open'))));
nav.querySelectorAll('a').forEach(a => a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e => {if(e.key === 'Escape') closeMenu();});
document.querySelectorAll('[data-case]').forEach(button => button.addEventListener('click',() => {
  activeCase = button.dataset.case;renderCase();caseDialog.showModal();
}));
document.querySelectorAll('[data-photo]').forEach(button => button.addEventListener('click',() => {
  const image = document.querySelector('#full-photo');
  image.src = button.dataset.photo;
  image.alt = button.querySelector('img').alt;
  document.querySelector('#photo-caption').textContent = button.closest('figure').querySelector('figcaption').textContent;
  photoDialog.showModal();
}));
document.querySelectorAll('dialog').forEach(dialog => {
  dialog.querySelector('.dialog-close').addEventListener('click',() => dialog.close());
  dialog.addEventListener('click',e => {
    if(e.target === dialog) {
      const r = dialog.getBoundingClientRect();
      if(e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close();
    }
  });
});
