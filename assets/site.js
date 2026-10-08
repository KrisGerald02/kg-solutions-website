(() => {
  const toggle = document.getElementById('lang-toggle');
  let lang = 'es';
  try { lang = localStorage.getItem('kg-tech-language') === 'en' ? 'en' : 'es'; } catch {}
  function applyLanguage(next) {
    lang = next;
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-es][data-en]').forEach(el => {
      el.innerHTML = el.getAttribute('data-' + lang);
    });
    document.querySelectorAll('[data-es-placeholder]').forEach(el => {
      el.placeholder = el.getAttribute('data-' + lang + '-placeholder');
    });
    toggle.textContent = lang === 'es' ? 'Cambiar idioma · EN' : 'Change language · ES';
    toggle.setAttribute('aria-label', lang === 'es' ? 'Cambiar idioma a inglés' : 'Change language to Spanish');
    const menu = document.querySelector('.menu-toggle');
    menu.setAttribute('aria-label', lang === 'es' ? 'Abrir o cerrar menú' : 'Open or close menu');
    try { localStorage.setItem('kg-tech-language', lang); } catch {}
    window.dispatchEvent(new Event('kg-language-change'));
  }
  applyLanguage(lang);
  toggle.addEventListener('click', () => applyLanguage(lang === 'es' ? 'en' : 'es'));
  const menu = document.querySelector('.menu-toggle');
  const nav = document.getElementById('main-nav');
  menu.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    menu.setAttribute('aria-expanded', String(open));
    menu.textContent = open ? '✕' : '☰';
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      nav.classList.remove('is-open');
      menu.setAttribute('aria-expanded', 'false');
      menu.textContent = '☰';
      menu.focus();
    }
  });
  document.querySelectorAll('[data-social]').forEach(link => {
    const url = window.KG_SOCIAL_LINKS?.[link.dataset.social];
    if (url && /^https:\/\//.test(url)) link.href = url;
  });
  const topButton = document.getElementById('back-to-top');
  const updateTopButton = () => { topButton.hidden = window.scrollY < 350; };
  window.addEventListener('scroll', updateTopButton, {passive:true});
  updateTopButton();
  topButton.addEventListener('click', () => {
    window.scrollTo({top:0, behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
    document.querySelector('.logo').focus({preventScroll:true});
  });
  const form = document.getElementById('contact-form');
  if (!form) return;
  const select = document.getElementById('service');
  const selected = new URLSearchParams(location.search).get('servicio');
  if (['1','2','3','4','5','6','integral'].includes(selected)) select.value = selected;
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const name = form.elements.name.value.trim();
    const message = form.elements.message.value.trim();
    const service = select.value ? select.options[select.selectedIndex].textContent : (lang === 'es' ? 'Por definir' : 'To be defined');
    const body = lang === 'es'
      ? 'Hola KG Tech, quisiera consultar sobre un proyecto.\n\nNombre: ' + name + '\nServicio: ' + service + '\n\n' + message
      : 'Hello KG Tech, I would like to ask about a project.\n\nName: ' + name + '\nService: ' + service + '\n\n' + message;
    const url = 'https://wa.me/50575151790?text=' + encodeURIComponent(body);
    window.open(url, '_blank', 'noopener,noreferrer');
    document.getElementById('form-status').textContent = lang === 'es'
      ? 'Tu mensaje está preparado. Confirma el envío en la aplicación que se abre.'
      : 'Your message is prepared. Confirm sending in the application that opens.';
  });
})();
