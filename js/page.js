(() => {
  const translations = {
      ru: {
        navAbout: 'О студии', navProjects: 'Проекты', navDevlogs: 'Заметки', navContact: 'Контакты',
        quote: 'Я просто делаю игры',
        heroPerson: 'Павел Удовкин · Solo Developer',
        solveCube: 'Собрать кубик',
        aboutTitle: 'О студии', aboutLead: '<span class="about-brand">SUPER CUBE</span> — маленькая студия из одного человека, где идеи превращаются в небольшие игры',
        aboutCopy: 'Без большой команды и лишнего шума. Я проектирую, программирую, собираю и выпускаю свои игры сам — от первой механики до последнего пикселя',
        factStudio: 'Студия', factFounder: 'Создатель', factFormat: 'Формат', factFormatValue: 'Solo game development',

        projectsTitle: 'Проекты',
        projectCurrent: 'Signal Blast: Alien Shooter', projectCurrentText: 'Небольшой проект за 2 дня на Ludum Dare 59. Примите сигнал от инопланетян и покиньте планету', projectStatus: 'джем<br>20 Апреля 2026', playButton: 'Играть',
        projectExperiments: 'Bomberman', projectExperimentsText: 'Классический Бомбермен с двумя апгрейдами. Поддерживает мультиплеер до 4 игроков в локальной сети. Проект реализован на Python с использованием библиотек Arcade и ZMQ', projectStatus2: 'релиз<br>21 Мая 2025',
        projectThird: 'Solve the cube', projectThirdText: 'Интерактивное веб-руководство по сборке кубика Рубика. Освоите технику решения головоломки шаг за шагом с помощью простых интерактивных анимаций прямо в браузере на любом устройстве', projectStatus3: 'концепт',

        moreProjects: 'Показать больше', moreProjectsHide: 'Скрыть',

        devlogsTitle: 'Заметки', readNote: 'Читать', notesUnderDevelopment: 'В разработке',
        devlogOneTitle: 'Этот раздел в разработке', devlogOneText: 'Этот раздел будет содержать статьи, посты, записи. Также будет отдельная страница с девлогом',
        devlogTwoTitle: 'Почему маленькие игры сложнее больших', devlogTwoText: 'О том, как одна механика превращается в десятки решений — и почему я всё равно люблю этот формат',
        devlogThreeTitle: 'Ночной бар как игровая система', devlogThreeText: 'Как персонажи, случайные события и пространство складываются в одну живую сцену для Midnight Shift',
        contactTitle: 'Контакты', footerOne: 'Один человек', footerTwo: 'Маленькие игры', footerThree: 'Большие идеи'
      },
      en: {
        navAbout: 'About', navProjects: 'Projects', navDevlogs: 'Devlogs', navContact: 'Contact',
        quote: 'I just make games',
        heroPerson: 'Pavel Udovkin · Solo Developer',
        solveCube: 'Solve cube',
        aboutTitle: 'About', aboutLead: '<span class="about-brand">SUPER CUBE</span> is a one-person studio where ideas turn into small games',
        aboutCopy: 'No big team and no unnecessary noise. I design, code, build and ship my games myself — from the first mechanic to the final pixel',
        factStudio: 'Studio', factFounder: 'Founder', factFormat: 'Format', factFormatValue: 'Solo game development',

        projectsTitle: 'Projects',
        projectCurrent: 'Signal Blast: Alien Shooter', projectCurrentText: 'A short project completed in 2 days for Ludum Dare 59. Collect the signal from the aliens and leave the planet', projectStatus: 'jam<br>April 20, 2026', playButton: 'Play',
        projectExperiments: 'Bomberman', projectExperimentsText: 'Classic Bomberman with two upgrades. Supports multiplayer for up to 4 players on a local network. The project is implemented in Python using the Arcade and ZMQ libraries', projectStatus2: 'release<br>May 21, 2025',
        projectThird: 'Solve the cube', projectThirdText: 'An interactive web tutorial on solving the Rubik\’s Cube. Master the technique of solving the puzzle step by step with simple interactive animations right in the browser on any device', projectStatus3: 'concept',

        moreProjects: 'View more', moreProjectsHide: 'Hide latest projects',

        devlogsTitle: 'Devlogs', readNote: 'Read', notesUnderDevelopment: 'In development',
        devlogOneTitle: 'This section is under development', devlogOneText: 'This section will contain articles, posts, and entries. There will also be a separate page with a devlog',
        devlogTwoTitle: 'Why small games can be harder than big ones', devlogTwoText: 'How one mechanic turns into dozens of decisions — and why I still love the format',
        devlogThreeTitle: 'A night bar as a game system', devlogThreeText: 'How characters, random events and space become one living scene in Midnight Shift',
        contactTitle: 'Contact', footerOne: 'One person', footerTwo: 'Small games', footerThree: 'Big ideas'
      }
    }

  const errorTranslations = {
      ru: {
        navAbout: 'О студии',
        navProjects: 'Проекты',
        navDevlogs: 'Заметки',
        navContact: 'Контакты',
        errorKicker: 'Ошибка 404',
        errorTitle: 'Страница не найдена',
        errorText: 'Похоже, этот адрес потерялся где-то между пикселями',
        backHome: 'На главную',
        errorNote: 'SUPER CUBE · 404',
        footerOne: 'Один человек',
        footerTwo: 'Маленькие игры',
        footerThree: 'Большие идеи'
      },
      en: {
        navAbout: 'About',
        navProjects: 'Projects',
        navDevlogs: 'Devlogs',
        navContact: 'Contact',
        errorKicker: 'Error 404',
        errorTitle: 'Page not found',
        errorText: 'Looks like this address got lost somewhere between the pixels',
        backHome: 'Back home',
        errorNote: 'SUPER CUBE · 404',
        footerOne: 'One person',
        footerTwo: 'Small games',
        footerThree: 'Big ideas'
      }
    }
  translations.ru = { ...translations.ru, ...errorTranslations.ru };
  translations.en = { ...translations.en, ...errorTranslations.en };
  window.SUPER_CUBE_TRANSLATIONS = translations;

  const projectsToggle = document.getElementById('projectsToggle');
  if (projectsToggle) {
    let projectsExpanded = false;
    projectsToggle.addEventListener('click', (event) => {
      event.preventDefault();
      projectsExpanded = !projectsExpanded;
      document.querySelectorAll('.project.is-hidden').forEach((project) => {
        project.classList.toggle('is-expanded', projectsExpanded);
      });
      const lang = localStorage.getItem('supercube-lang') || 'ru';
      const dictionary = window.SUPER_CUBE_TRANSLATIONS[lang];
      projectsToggle.textContent = dictionary[projectsExpanded ? 'moreProjectsHide' : 'moreProjects'];
    });
  }

  const lang = localStorage.getItem('supercube-lang') || 'ru';
  if (window.SUPER_CUBE_SET_LANGUAGE) window.SUPER_CUBE_SET_LANGUAGE(lang);
})();
