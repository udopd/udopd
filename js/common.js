(() => {
  const root = document.documentElement;
  const savedTheme = localStorage.getItem('supercube-theme');
  const savedLang = localStorage.getItem('supercube-lang') || 'ru';

  root.dataset.theme = savedTheme ||
    (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  const scrambleUpper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';
  const scrambleLower = 'abcdefghijklmnopqrstuvwxyzабвгдеёжзийклмнопрстуфхцчшщъыьэюя';

  function getScrambleChar(target) {
    if (/[A-ZА-ЯЁ]/.test(target)) {
      return scrambleUpper[Math.floor(Math.random() * scrambleUpper.length)];
    }
    if (/[a-zа-яё]/.test(target)) {
      return scrambleLower[Math.floor(Math.random() * scrambleLower.length)];
    }
    return target;
  }

  function scrambleElement(el, finalHTML, duration = 520) {
    if (!finalHTML || finalHTML === el.innerHTML) return;

    if (el.dataset.i18n === 'aboutLead') {
      const match = finalHTML.match(/^(<span class="about-brand">[\s\S]*?<\/span>)([\s\S]*)$/);
      const prefix = match ? match[1] : '';
      const finalText = match ? match[2] : finalHTML;
      const startTime = performance.now();

      function frame(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const visible = Math.floor(progress * finalText.length);
        let scrambled = '';
        for (let i = 0; i < finalText.length; i += 1) {
          if (/\s/.test(finalText[i])) scrambled += finalText[i];
          else scrambled += i < visible ? finalText[i] : getScrambleChar(finalText[i]);
        }
        el.innerHTML = `${prefix}${scrambled}`;
        if (progress < 1) requestAnimationFrame(frame);
        else el.innerHTML = finalHTML;
      }

      requestAnimationFrame(frame);
      return;
    }

    const finalText = finalHTML.replace(/<br\s*\/?\s*>/gi, '\n').replace(/<[^>]*>/g, '');
    const startTime = performance.now();
    function frame(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const visible = Math.floor(progress * finalText.length);
      let scrambled = '';
      for (let i = 0; i < finalText.length; i += 1) {
        if (/\s/.test(finalText[i])) scrambled += finalText[i];
        else scrambled += i < visible ? finalText[i] : getScrambleChar(finalText[i]);
      }
      el.textContent = scrambled;
      if (progress < 1) requestAnimationFrame(frame);
      else el.innerHTML = finalHTML;
    }
    requestAnimationFrame(frame);
  }

  function setLanguage(lang) {
    const translations = window.SUPER_CUBE_TRANSLATIONS || {};
    if (!translations[lang]) return;

    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.dataset.i18n;
      if (!translations[lang][key]) return;
      const shouldScramble = el.classList.contains('language-scramble') ||
        el.classList.contains('hero-quote') ||
        el.classList.contains('section-title') ||
        el.classList.contains('error-title');
      if (shouldScramble) scrambleElement(el, translations[lang][key]);
      else el.innerHTML = translations[lang][key];
    });

    document.querySelectorAll('#languageToggle, #mobileLanguageToggle').forEach((toggle) => {
      toggle.textContent = lang.toUpperCase();
    });

    localStorage.setItem('supercube-lang', lang);
  }

  function toggleLanguage() {
    const current = localStorage.getItem('supercube-lang') || 'ru';
    setLanguage(current === 'ru' ? 'en' : 'ru');
  }

  function toggleTheme() {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    localStorage.setItem('supercube-theme', next);
  }

  const topbar = document.querySelector('.topbar');
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  if (topbar && menuToggle && mobileMenu) {
    function closeMobileMenu() {
      topbar.classList.remove('is-menu-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }

    menuToggle.addEventListener('click', () => {
      const open = !topbar.classList.contains('is-menu-open');
      topbar.classList.toggle('is-menu-open', open);
      menuToggle.setAttribute('aria-expanded', String(open));
    });

    mobileMenu.querySelectorAll('.mobile-menu-link').forEach((link) => {
      link.addEventListener('click', closeMobileMenu);
    });

    const mobileLanguageToggle = document.getElementById('mobileLanguageToggle');
    const mobileThemeToggle = document.getElementById('mobileThemeToggle');
    if (mobileLanguageToggle) mobileLanguageToggle.addEventListener('click', () => {
      toggleLanguage();
      closeMobileMenu();
    });
    if (mobileThemeToggle) mobileThemeToggle.addEventListener('click', () => {
      toggleTheme();
      closeMobileMenu();
    });

    window.SUPER_CUBE_CLOSE_MOBILE_MENU = closeMobileMenu;
  }

  const languageToggle = document.getElementById('languageToggle');
  if (languageToggle) languageToggle.addEventListener('click', toggleLanguage);
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) themeToggle.addEventListener('click', toggleTheme);

  window.addEventListener('storage', (event) => {
    if (event.key === 'supercube-lang' && event.newValue && event.newValue !== document.documentElement.lang) {
      setLanguage(event.newValue);
    }
    if (event.key === 'supercube-theme' && event.newValue && event.newValue !== root.dataset.theme) {
      root.dataset.theme = event.newValue;
    }
  });

  window.SUPER_CUBE_SET_LANGUAGE = setLanguage;
  window.SUPER_CUBE_TOGGLE_LANGUAGE = toggleLanguage;
  window.SUPER_CUBE_TOGGLE_THEME = toggleTheme;
  window.SUPER_CUBE_SAVED_LANG = savedLang;
})();
