const projects = JSON.parse(document.querySelector('#project-data').textContent);
// English is the primary language; only an explicit choice selects Mongolian.
let lang = 'en';
try { lang = localStorage.getItem('portfolio-language-v2') === 'mn' ? 'mn' : 'en'; } catch {}
let activeCase = null;
const caseDialog = document.querySelector('#case-dialog');
const briefDialog = document.querySelector('#brief-dialog');
const translations = {
  en: {goal:'The business need',solution:'What I built',features:'Implemented features',role:'DESIGN / DEVELOPMENT',visit:'Visit website ↗',login:'View login page ↗',source:'Source on GitHub ↗',download:'Your project brief is ready. Nothing was sent.',email:'An email draft was requested in your email app. Please review and send it yourself.',options:['Business website','Web app / AI tool','Digital presence','Improve an existing site']},
  mn: {goal:'Бизнесийн хэрэгцээ',solution:'Бүтээсэн шийдэл',features:'Хэрэгжүүлсэн боломж',role:'ДИЗАЙН / ХӨГЖҮҮЛЭЛТ',visit:'Сайт үзэх ↗',login:'Нэвтрэх хуудас үзэх ↗',source:'GitHub эх код ↗',download:'Хүсэлтийн файл бэлэн. Мэдээлэл илгээгээгүй.',email:'Имэйл апп дээр draft нээх хүсэлт өглөө. Өөрөө хянаад илгээнэ үү.',options:['Бизнесийн сайт','Вэб апп / AI систем','Дижитал танилцуулга','Одоо байгаа сайт сайжруулах']}
};
function renderCase() {
  if (!activeCase) return;
  const p = projects.find(p => p.id === activeCase);
  const t = translations[lang];
  document.querySelector('#case-title').textContent = lang === 'en' ? p.name : p.mnName;
  const content = document.querySelector('#case-content');
  content.replaceChildren();
  function add(tag, value, cls) {
    const el = document.createElement(tag);
    el.textContent = value;
    if (cls) el.className = cls;
    content.append(el);
    return el;
  }
  add('div',t.role,'case-role');
  add('span',lang === 'en' ? p.status : p.mnStatus,'case-status');
  add('h3',t.goal);
  add('p',lang === 'en' ? p.problem : p.mnProblem);
  add('h3',t.solution);
  add('p',lang === 'en' ? p.solution : p.mnSolution);
  add('h3',t.features);
  const ul = add('ul','');
  (lang === 'en' ? p.features : p.mnFeatures).forEach(value => {
    const li = document.createElement('li');li.textContent = value;ul.append(li);
  });
  add('p',lang === 'en' ? p.note : p.mnNote,'case-note');
  const live = document.querySelector('#case-link');
  live.hidden = !p.url;
  if(p.url) live.href = p.url;
  live.textContent = p.id === 'ledger' ? t.login : t.visit;
  const repo = document.querySelector('#case-repo');
  repo.hidden = !p.repo;
  if(p.repo) repo.href = p.repo;
  repo.textContent = t.source;
}
function setLanguage() {
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-en][data-mn]').forEach(el => el.innerHTML = el.dataset[lang]);
  const button = document.querySelector('#language');
  button.textContent = lang === 'en' ? 'MN' : 'EN';
  button.setAttribute('aria-label',lang === 'en' ? 'Монгол хэлээр харах' : 'Switch to English');
  const select = document.querySelector('[name="service"]');
  [...select.options].forEach((option,index) => option.textContent = translations[lang].options[index]);
  document.querySelector('#brief-status').textContent = '';
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
function closeMenu() { nav.classList.remove('open');menu.setAttribute('aria-expanded','false'); }
menu.addEventListener('click',() => menu.setAttribute('aria-expanded',String(nav.classList.toggle('open'))));
nav.querySelectorAll('a').forEach(a => a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e => { if(e.key === 'Escape') closeMenu(); });
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click',() => {
  document.querySelectorAll('[data-filter]').forEach(b => b.setAttribute('aria-pressed',String(b === button)));
  document.querySelectorAll('.project').forEach(p => p.hidden = button.dataset.filter !== 'all' && p.dataset.category !== button.dataset.filter);
}));
document.querySelectorAll('[data-case]').forEach(button => button.addEventListener('click',() => {
  activeCase = button.dataset.case;renderCase();caseDialog.showModal();
}));
function openBrief(service) {
  if(service) document.querySelector('[name="service"]').value = service;
  document.querySelector('#brief-status').textContent = '';
  briefDialog.showModal();
}
document.querySelector('#brief-open').addEventListener('click',() => openBrief());
document.querySelectorAll('[data-service]').forEach(b => b.addEventListener('click',() => openBrief(b.dataset.service)));
document.querySelectorAll('dialog').forEach(dialog => {
  dialog.querySelector('.dialog-close').addEventListener('click',() => dialog.close());
  dialog.addEventListener('click',e => {
    if(e.target === dialog) {
      const r = dialog.getBoundingClientRect();
      if(e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close();
    }
  });
});
const briefForm = document.querySelector('#brief-form');
function makeBrief() {
  const values = new FormData(briefForm);
  const service = briefForm.querySelector('select').selectedOptions[0].textContent;
  return `PROJECT INQUIRY / TOGOSMAA BAATAR\n\nName / Business: ${values.get('name')}\nEmail: ${values.get('email')}\nService: ${service}\n\nProject idea:\n${values.get('message')}\n`;
}
briefForm.addEventListener('submit',e => {
  e.preventDefault();
  const href = 'mailto:togosmaabaatar@gmail.com?subject=' + encodeURIComponent('New project inquiry') + '&body=' + encodeURIComponent(makeBrief());
  const link = document.createElement('a');link.href = href;link.click();
  document.querySelector('#brief-status').textContent = translations[lang].email;
});
document.querySelector('#brief-download').addEventListener('click',() => {
  if(!briefForm.reportValidity()) return;
  const url = URL.createObjectURL(new Blob([makeBrief()+'\nPrepared locally. This brief has not been sent.\n'],{type:'text/plain;charset=utf-8'}));
  const link = document.createElement('a');link.href = url;link.download = 'togosmaa-project-brief.txt';link.click();
  setTimeout(() => URL.revokeObjectURL(url),1500);
  document.querySelector('#brief-status').textContent = translations[lang].download;
});
