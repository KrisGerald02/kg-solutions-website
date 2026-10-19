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
  const mobilePanel = document.createElement('dialog');
  mobilePanel.id = 'mobile-menu';
  mobilePanel.className = 'mobile-menu';
  mobilePanel.setAttribute('aria-modal', 'true');
  mobilePanel.setAttribute('aria-label', 'Navegación / Navigation');
  const mobileLinks = document.getElementById('main-nav').innerHTML;
  mobilePanel.innerHTML = `<div class="mobile-menu-inner"><div class="mobile-menu-top"><a class="logo" href="index.html" aria-label="KG Tech — Inicio"><img src="logos/kg-tech-logo.png" alt="KG Tech" width="58" height="69"><span>KG TECH</span></a><button class="mobile-menu-close" type="button" data-es-label="Cerrar menú" aria-label="Cerrar menú">✕</button></div><p class="mobile-menu-eyebrow" data-es="EXPLORA KG TECH" data-en="EXPLORE KG TECH">EXPLORA KG TECH</p><nav aria-label="Navegación móvil">${mobileLinks}</nav><div class="mobile-menu-bottom"><p data-es="Ideas que se convierten en soluciones." data-en="Ideas that become solutions.">Ideas que se convierten en soluciones.</p><div class="social-buttons"><a class="social-button" data-social="instagram" href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"><span class="social-icon" aria-hidden="true"><svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="4" width="24" height="24" rx="7"/><circle cx="16" cy="16" r="6"/><circle cx="23" cy="9" r="1"/></svg></span>Instagram</a><a class="social-button" data-social="facebook" href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><span class="social-icon" aria-hidden="true"><svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M19 29V17h5l1-5h-6V9c0-2 1-3 3-3h3V2h-4c-5 0-7 3-7 7v3h-4v5h4v12"/></svg></span>Facebook</a></div></div></div>`;
  document.body.append(mobilePanel);
  mobilePanel.querySelectorAll('nav li').forEach((item, index) => item.style.setProperty('--entry-delay', `${90 + index * 45}ms`));
  applyLanguage(lang);
  toggle.addEventListener('click', () => applyLanguage(lang === 'es' ? 'en' : 'es'));
  const menu = document.querySelector('.menu-toggle');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const launcher = document.querySelector('.site-launcher');
  if (launcher) {
    const dismissLauncher = () => launcher.remove();
    if (reducedMotion.matches) dismissLauncher();
    else {
      launcher.addEventListener('animationend', event => {
        if (event.target === launcher && event.animationName === 'launcher-dismiss') dismissLauncher();
      });
      setTimeout(dismissLauncher, 1600);
    }
  }
  const ticker = document.querySelector('.services-ticker');
  if (ticker) {
    const pauseButton = ticker.querySelector('.ticker-toggle');
    function updateTickerButton() {
      const paused = ticker.classList.contains('is-paused');
      pauseButton.setAttribute('aria-pressed', String(paused));
      pauseButton.setAttribute('aria-label', lang === 'es' ? (paused ? 'Reanudar carrusel' : 'Pausar carrusel') : (paused ? 'Resume carousel' : 'Pause carousel'));
      pauseButton.textContent = paused ? '▶' : 'Ⅱ';
    }
    pauseButton.addEventListener('click', () => { ticker.classList.toggle('is-paused'); updateTickerButton(); });
    window.addEventListener('kg-language-change', updateTickerButton);
    updateTickerButton();
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(entries => {
        ticker.classList.toggle('is-offscreen', !entries[0].isIntersecting);
      }).observe(ticker);
    }
  }
  const mobileViewport = window.matchMedia('(max-width: 1000px)');
  menu.setAttribute('aria-controls', mobilePanel.id);
  let closeTimer;
  let scrollPosition = 0;
  function finishClose() {
    clearTimeout(closeTimer);
    mobilePanel.close();
    mobilePanel.classList.remove('is-visible', 'is-closing');
    document.body.classList.remove('mobile-menu-open');
    document.body.style.removeProperty('top');
    window.scrollTo({top:scrollPosition, behavior:'instant'});
    menu.setAttribute('aria-expanded', 'false');
    menu.focus({preventScroll:true});
  }
  function closeMenu() {
    if (!mobilePanel.open || mobilePanel.classList.contains('is-closing')) return;
    mobilePanel.classList.remove('is-visible');
    mobilePanel.classList.add('is-closing');
    if (reducedMotion.matches) finishClose();
    else closeTimer = setTimeout(finishClose, 230);
  }
  menu.addEventListener('click', () => {
    if (!mobileViewport.matches || mobilePanel.open) return;
    scrollPosition = window.scrollY;
    document.body.style.top = `-${scrollPosition}px`;
    document.body.classList.add('mobile-menu-open');
    mobilePanel.showModal();
    menu.setAttribute('aria-expanded', 'true');
    mobilePanel.querySelector('.mobile-menu-close').setAttribute('aria-label', lang === 'es' ? 'Cerrar menú' : 'Close menu');
    requestAnimationFrame(() => mobilePanel.classList.add('is-visible'));
    mobilePanel.querySelector('nav a').focus({preventScroll:true});
  });
  mobilePanel.querySelector('.mobile-menu-close').addEventListener('click', closeMenu);
  mobilePanel.addEventListener('cancel', event => { event.preventDefault(); closeMenu(); });
  mobilePanel.querySelectorAll('a').forEach(link => link.addEventListener('click', event => {
    if (link.target === '_blank') { closeMenu(); return; }
    event.preventDefault();
    const destination = link.href;
    mobilePanel.addEventListener('close', () => window.location.assign(destination), {once:true});
    closeMenu();
  }));
  mobileViewport.addEventListener('change', () => { if (!mobileViewport.matches && mobilePanel.open) finishClose(); });
  mobilePanel.addEventListener('keydown', event => {
    if (event.key !== 'Tab') return;
    const controls = [...mobilePanel.querySelectorAll('a[href], button')];
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });
  if (!reducedMotion.matches && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {threshold:0.08});
    document.querySelectorAll('.summary-card, .info-card, .service-row, .proj-card, .tool-group, .about-preview, .cta').forEach(element => {
      element.classList.add('scroll-reveal');
      observer.observe(element);
    });
    reducedMotion.addEventListener('change', () => {
      if (reducedMotion.matches) {
        document.querySelectorAll('.scroll-reveal').forEach(element => element.classList.add('is-revealed'));
        observer.disconnect();
      }
    });
  }
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
    const url = 'https://wa.me/50576935552?text=' + encodeURIComponent(body);
    window.open(url, '_blank', 'noopener,noreferrer');
    document.getElementById('form-status').textContent = lang === 'es'
      ? 'Tu mensaje está preparado. Confirma el envío en la aplicación que se abre.'
      : 'Your message is prepared. Confirm sending in the application that opens.';
  });
})();
