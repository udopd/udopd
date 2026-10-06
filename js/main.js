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
};

const root = document.documentElement;
const savedTheme = localStorage.getItem('supercube-theme');
const savedLang = localStorage.getItem('supercube-lang') || 'ru';
root.dataset.theme = savedTheme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

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
                if (/\s/.test(finalText[i])) {
                    scrambled += finalText[i];
                } else {
                    scrambled += i < visible ? finalText[i] : getScrambleChar(finalText[i]);
                }
            }
            el.innerHTML = `${prefix}${scrambled}`;
            if (progress < 1) requestAnimationFrame(frame);
            else el.innerHTML = finalHTML;
        }

        requestAnimationFrame(frame);
        return;
    }

    const finalText = finalHTML
        .replace(/<br\s*\/?\s*>/gi, '\n')
        .replace(/<[^>]*>/g, '');
    const startTime = performance.now();
    function frame(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const visible = Math.floor(progress * finalText.length);
        let scrambled = '';
        for (let i = 0; i < finalText.length; i += 1) {
            if (/\s/.test(finalText[i])) {
                scrambled += finalText[i];
            } else {
                scrambled += i < visible ? finalText[i] : getScrambleChar(finalText[i]);
            }
        }
        el.textContent = scrambled;
        if (progress < 1) requestAnimationFrame(frame);
        else el.innerHTML = finalHTML;
    }
    requestAnimationFrame(frame);
}

function setLanguage(lang) {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach((el) => {
        const key = el.dataset.i18n;
        if (!translations[lang][key]) return;
        if (el.classList.contains('hero-quote') || el.classList.contains('section-title')) {
            scrambleElement(el, translations[lang][key]);
        } else {
            el.innerHTML = translations[lang][key];
        }
    });
    document.querySelectorAll('#languageToggle, #mobileLanguageToggle').forEach((languageToggle) => {
        if (languageToggle && languageToggle.textContent !== lang.toUpperCase()) {
            languageToggle.textContent = lang.toUpperCase();
        }
    });
    localStorage.setItem('supercube-lang', lang);
}

function toggleTheme() {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    localStorage.setItem('supercube-theme', next);
}

const rubikStage = document.getElementById('rubikStage');
const rubikFrame = document.getElementById('rubikFrame');
const rubikColors = {
    right: '#86EFAC',
    left: '#60A5FA',
    top: '#FFFFFF',
    bottom: '#FDE047',
    front: '#FCA5A5',
    back: '#FDBA74'
};
const rubikFaces = [
    ['right', [1, 0, 0]],
    ['left', [-1, 0, 0]],
    ['top', [0, 1, 0]],
    ['bottom', [0, -1, 0]],
    ['front', [0, 0, 1]],
    ['back', [0, 0, -1]]
];
const rubikCubes = [];
let rubikUnit = 0;
let rubikCubieSize = 0;
let rubikAnimating = false;
let rubikSolving = false;
let rubikHistory = [];
let rubikLastRotation = 0;
let rubikDragging = false;
let rubikPreviousPointer = { x: 0, y: 0 };
let rubikRotation = { x: -30, y: 45 };
let rubikLastAxis = null;
let rubikLastLayer = null;
let rubikLayerAnimation = null;
let rubikAbortSolve = false;
let rubikSolveToken = 0;
let rubikAutoReversing = false;
let rubikAutoReversalToken = 0;
const rubikMaxAutoMoves = 30;
const rubikAutoReverseMin = 5;
const rubikAutoReverseMax = 20;
const rubikInterval = 1750;

function rubikVectorToFace(vector) {
    for (let i = 0; i < rubikFaces.length; i += 1) {
        const face = rubikFaces[i];
        if (face[1][0] === vector[0] && face[1][1] === vector[1] && face[1][2] === vector[2]) {
            return face[0];
        }
    }
    return null;
}

function rubikRotateVector(vector, axis, angleSign) {
    const x = vector[0];
    const y = vector[1];
    const z = vector[2];
    if (axis === 'x') {
        return angleSign > 0 ? [x, -z, y] : [x, z, -y];
    }
    if (axis === 'y') {
        return angleSign > 0 ? [z, y, -x] : [-z, y, x];
    }
    return angleSign > 0 ? [-y, x, z] : [y, -x, z];
}

function rubikRotateCoord(coord, axis, angleSign) {
    return rubikRotateVector([coord.x, coord.y, coord.z], axis, angleSign);
}

function rubikRotateVectorAngle(vector, axis, angle) {
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    const x = vector[0];
    const y = vector[1];
    const z = vector[2];
    if (axis === 'x') return [x, y * c - z * s, y * s + z * c];
    if (axis === 'y') return [x * c + z * s, y, -x * s + z * c];
    return [x * c - y * s, x * s + y * c, z];
}

function rubikAxisRotationMatrix(axis, angle) {
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    if (axis === 'x') return [1, 0, 0, 0, c, -s, 0, s, c];
    if (axis === 'y') return [c, 0, s, 0, 1, 0, -s, 0, c];
    return [c, -s, 0, s, c, 0, 0, 0, 1];
}

function rubikMatrixToQuaternion(m) {
    const trace = m[0] + m[4] + m[8];
    let x = 0;
    let y = 0;
    let z = 0;
    let w = 1;
    if (trace > 0) {
        const s = 0.5 / Math.sqrt(trace + 1);
        w = 0.25 / s;
        x = (m[7] - m[5]) * s;
        y = (m[2] - m[6]) * s;
        z = (m[3] - m[1]) * s;
    } else if (m[0] > m[4] && m[0] > m[8]) {
        const s = 2 * Math.sqrt(1 + m[0] - m[4] - m[8]);
        w = (m[7] - m[5]) / s;
        x = 0.25 * s;
        y = (m[1] + m[3]) / s;
        z = (m[2] + m[6]) / s;
    } else if (m[4] > m[8]) {
        const s = 2 * Math.sqrt(1 + m[4] - m[0] - m[8]);
        w = (m[2] - m[6]) / s;
        x = (m[1] + m[3]) / s;
        y = 0.25 * s;
        z = (m[5] + m[7]) / s;
    } else {
        const s = 2 * Math.sqrt(1 + m[8] - m[0] - m[4]);
        w = (m[3] - m[1]) / s;
        x = (m[2] + m[6]) / s;
        y = (m[5] + m[7]) / s;
        z = 0.25 * s;
    }
    return [x, y, z, w];
}

function rubikQuaternionNormalize(q) {
    const length = Math.hypot(q[0], q[1], q[2], q[3]) || 1;
    return [q[0] / length, q[1] / length, q[2] / length, q[3] / length];
}

function rubikQuaternionSlerp(a, b, t) {
    let bx = b[0];
    let by = b[1];
    let bz = b[2];
    let bw = b[3];
    let dot = a[0] * bx + a[1] * by + a[2] * bz + a[3] * bw;
    if (dot < 0) {
        dot = -dot;
        bx = -bx;
        by = -by;
        bz = -bz;
        bw = -bw;
    }
    if (dot > 0.9995) {
        return rubikQuaternionNormalize([
            a[0] + (bx - a[0]) * t,
            a[1] + (by - a[1]) * t,
            a[2] + (bz - a[2]) * t,
            a[3] + (bw - a[3]) * t
        ]);
    }
    const theta = Math.acos(Math.max(-1, Math.min(1, dot)));
    const sinTheta = Math.sin(theta);
    const wa = Math.sin((1 - t) * theta) / sinTheta;
    const wb = Math.sin(t * theta) / sinTheta;
    return [
        a[0] * wa + bx * wb,
        a[1] * wa + by * wb,
        a[2] * wa + bz * wb,
        a[3] * wa + bw * wb
    ];
}

function rubikQuaternionToMatrix(q) {
    const [x, y, z, w] = rubikQuaternionNormalize(q);
    const xx = x * x;
    const yy = y * y;
    const zz = z * z;
    const xy = x * y;
    const xz = x * z;
    const yz = y * z;
    const wx = w * x;
    const wy = w * y;
    const wz = w * z;
    return [
        1 - 2 * (yy + zz), 2 * (xy - wz), 2 * (xz + wy),
        2 * (xy + wz), 1 - 2 * (xx + zz), 2 * (yz - wx),
        2 * (xz - wy), 2 * (yz + wx), 1 - 2 * (xx + yy)
    ];
}

function rubikInterpolateOrientation(from, to, progress) {
    const qa = rubikMatrixToQuaternion(from);
    const qb = rubikMatrixToQuaternion(to);
    return rubikQuaternionToMatrix(rubikQuaternionSlerp(qa, qb, progress));
}

function rubikSnapOrientation(matrix) {
    return matrix.map((value) => {
        const snapped = Math.round(value);
        return Math.abs(value - snapped) < 0.001 ? snapped : value;
    });
}

function rubikIdentityMatrix() {
    return [1, 0, 0, 0, 1, 0, 0, 0, 1];
}

function rubikMultiplyAxisRotation(matrix, axis, angleSign) {
    let rotation;
    if (axis === 'x') {
        rotation = angleSign > 0
            ? [1, 0, 0, 0, 0, 1, 0, -1, 0]
            : [1, 0, 0, 0, 0, -1, 0, 1, 0];
    } else if (axis === 'y') {
        rotation = angleSign > 0
            ? [0, 0, 1, 0, 1, 0, -1, 0, 0]
            : [0, 0, -1, 0, 1, 0, 1, 0, 0];
    } else {
        rotation = angleSign > 0
            ? [0, 1, 0, -1, 0, 0, 0, 0, 1]
            : [0, -1, 0, 1, 0, 0, 0, 0, 1];
    }

    const next = [
        rotation[0] * matrix[0] + rotation[1] * matrix[3] + rotation[2] * matrix[6],
        rotation[0] * matrix[1] + rotation[1] * matrix[4] + rotation[2] * matrix[7],
        rotation[0] * matrix[2] + rotation[1] * matrix[5] + rotation[2] * matrix[8],
        rotation[3] * matrix[0] + rotation[4] * matrix[3] + rotation[5] * matrix[6],
        rotation[3] * matrix[1] + rotation[4] * matrix[4] + rotation[5] * matrix[7],
        rotation[3] * matrix[2] + rotation[4] * matrix[5] + rotation[5] * matrix[8],
        rotation[6] * matrix[0] + rotation[7] * matrix[3] + rotation[8] * matrix[6],
        rotation[6] * matrix[1] + rotation[7] * matrix[4] + rotation[8] * matrix[7],
        rotation[6] * matrix[2] + rotation[7] * matrix[5] + rotation[8] * matrix[8]
    ];
    matrix.splice(0, matrix.length, ...next);
}

function rubikMatrix3d(matrix) {
    return 'matrix3d(' +
        matrix[0] + ',' + matrix[3] + ',' + matrix[6] + ',0,' +
        matrix[1] + ',' + matrix[4] + ',' + matrix[7] + ',0,' +
        matrix[2] + ',' + matrix[5] + ',' + matrix[8] + ',0,0,0,0,1)';
}

function rubikApplyOrientation(cubie) {
    cubie.body.style.transform = rubikMatrix3d(cubie.orientation);
}

function rubikRenderCubie(cubie) {
    rubikFaces.forEach((face) => {
        const node = cubie.faceNodes[face[0]];
        const color = cubie.stickers[face[0]] || '#171717';
        node.style.background = color;
    });
}

function rubikApplyPosition(cubie) {
    cubie.node.style.transform =
        'translate(-50%, -50%) translate3d(' +
        (cubie.x * rubikUnit) + 'px,' +
        (-cubie.y * rubikUnit) + 'px,' +
        (cubie.z * rubikUnit) + 'px)';
}

function rubikPlaceCubie(cubie, x, y, z) {
    cubie.x = x;
    cubie.y = y;
    cubie.z = z;
    rubikApplyPosition(cubie);
}

function rubikUpdateDimensions() {
    const rect = rubikFrame.getBoundingClientRect();
    rubikUnit = rect.width / 3.18;
    rubikCubieSize = rubikUnit * 0.91;
    rubikCubes.forEach((cubie) => {
        cubie.node.style.width = rubikCubieSize + 'px';
        cubie.node.style.height = rubikCubieSize + 'px';
        cubie.node.style.setProperty('--half', (rubikCubieSize / 2) + 'px');
        rubikPlaceCubie(cubie, cubie.x, cubie.y, cubie.z);
    });
}

function rubikBuild() {
    for (let x = -1; x <= 1; x += 1) {
        for (let y = -1; y <= 1; y += 1) {
            for (let z = -1; z <= 1; z += 1) {
                if (x === 0 && y === 0 && z === 0) continue;

                const node = document.createElement('div');
                node.className = 'rubik-cubie';
                const body = document.createElement('div');
                body.className = 'rubik-body';
                node.appendChild(body);
                const faceNodes = {};
                const stickers = {};

                rubikFaces.forEach((face) => {
                    const faceNode = document.createElement('div');
                    faceNode.className = 'rubik-face ' + face[0];
                    body.appendChild(faceNode);
                    faceNodes[face[0]] = faceNode;
                    if (
                        (face[0] === 'right' && x === 1) ||
                        (face[0] === 'left' && x === -1) ||
                        (face[0] === 'top' && y === 1) ||
                        (face[0] === 'bottom' && y === -1) ||
                        (face[0] === 'front' && z === 1) ||
                        (face[0] === 'back' && z === -1)
                    ) {
                        stickers[face[0]] = rubikColors[face[0]];
                    } else {
                        stickers[face[0]] = '#171717';
                    }
                });

                const cubie = {
                    node,
                    body,
                    faceNodes,
                    stickers,
                    orientation: rubikIdentityMatrix(),
                    startX: x,
                    startY: y,
                    startZ: z,
                    startPosition: { x, y, z },
                    startPagePosition: null,
                    startOrientation: rubikIdentityMatrix(),
                    startRotation: { x: 0, y: 0, z: 0 },
                    homeX: x,
                    homeY: y,
                    homeZ: z,
                    x,
                    y,
                    z
                };
                rubikCubes.push(cubie);
                rubikStage.appendChild(node);
                rubikRenderCubie(cubie);
                rubikApplyOrientation(cubie);
                rubikApplyPosition(cubie);
            }
        }
    }
    rubikUpdateDimensions();
    rubikUpdateStageRotation();
    rubikCubes.forEach((cubie) => {
        cubie.startPosition = { x: cubie.x, y: cubie.y, z: cubie.z };
        cubie.startOrientation = cubie.orientation.slice();
        cubie.startRotation = { x: 0, y: 0, z: 0 };
        const rect = cubie.node.getBoundingClientRect();
        cubie.startPagePosition = {
            x: rect.left + window.scrollX + rect.width / 2,
            y: rect.top + window.scrollY + rect.height / 2
        };
    });
}

function rubikUpdateStageRotation() {
    rubikStage.style.transform = 'rotateX(' + rubikRotation.x + 'deg) rotateY(' + rubikRotation.y + 'deg)';
}

function rubikResetStageRotation(duration = 520) {
    const start = { x: rubikRotation.x, y: rubikRotation.y };
    let targetY = 45;
    while (targetY - start.y > 180) targetY -= 360;
    while (targetY - start.y < -180) targetY += 360;
    const startedAt = performance.now();

    return new Promise((resolve) => {
        function frame(time) {
            const progress = Math.min((time - startedAt) / duration, 1);
            const eased = rubikEaseInOutCubic(progress);
            rubikRotation.x = start.x + (-30 - start.x) * eased;
            rubikRotation.y = start.y + (targetY - start.y) * eased;
            rubikUpdateStageRotation();
            if (progress < 1) {
                requestAnimationFrame(frame);
                return;
            }
            rubikRotation = { x: -30, y: 45 };
            rubikUpdateStageRotation();
            resolve();
        }
        requestAnimationFrame(frame);
    });
}

function rubikEaseOutBack(t) {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
}

function rubikEaseInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function rubikMultiplyMatrix3(a, b) {
    return [
        a[0] * b[0] + a[1] * b[3] + a[2] * b[6],
        a[0] * b[1] + a[1] * b[4] + a[2] * b[7],
        a[0] * b[2] + a[1] * b[5] + a[2] * b[8],
        a[3] * b[0] + a[4] * b[3] + a[5] * b[6],
        a[3] * b[1] + a[4] * b[4] + a[5] * b[7],
        a[3] * b[2] + a[4] * b[5] + a[5] * b[8],
        a[6] * b[0] + a[7] * b[3] + a[8] * b[6],
        a[6] * b[1] + a[7] * b[4] + a[8] * b[7],
        a[6] * b[2] + a[7] * b[5] + a[8] * b[8]
    ];
}

function rubikFallRotationMatrix(item) {
    const rx = item.rotX * Math.PI / 180;
    const ry = item.rotY * Math.PI / 180;
    const rz = item.rotZ * Math.PI / 180;
    const cx = Math.cos(rx), sx = Math.sin(rx);
    const cy = Math.cos(ry), sy = Math.sin(ry);
    const cz = Math.cos(rz), sz = Math.sin(rz);
    const xMatrix = [1, 0, 0, 0, cx, -sx, 0, sx, cx];
    const yMatrix = [cy, 0, sy, 0, 1, 0, -sy, 0, cy];
    const zMatrix = [cz, -sz, 0, sz, cz, 0, 0, 0, 1];
    return rubikMultiplyMatrix3(rubikMultiplyMatrix3(xMatrix, yMatrix), zMatrix);
}

function rubikCollisionAxes(item) {
    const matrix = rubikMultiplyMatrix3(rubikFallRotationMatrix(item), item.cubie.orientation);
    return [
        [matrix[0], matrix[3], matrix[6]],
        [matrix[1], matrix[4], matrix[7]],
        [matrix[2], matrix[5], matrix[8]]
    ];
}

function rubikNormalizeVector(vector) {
    const length = Math.hypot(vector[0], vector[1], vector[2]);
    if (length < 0.00001) return null;
    return [vector[0] / length, vector[1] / length, vector[2] / length];
}

function rubikDot(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

function rubikCross(a, b) {
    return [
        a[1] * b[2] - a[2] * b[1],
        a[2] * b[0] - a[0] * b[2],
        a[0] * b[1] - a[1] * b[0]
    ];
}

function rubikTestOBBCollision(a, b) {
    const axesA = rubikCollisionAxes(a);
    const axesB = rubikCollisionAxes(b);
    const candidates = [...axesA, ...axesB];
    axesA.forEach((axisA) => {
        axesB.forEach((axisB) => candidates.push(rubikCross(axisA, axisB)));
    });

    const delta = [b.x - a.x, b.y - a.y, b.z - a.z];
    const halfA = a.collisionSize * 0.5;
    const halfB = b.collisionSize * 0.5;
    let minimumOverlap = Infinity;
    let minimumAxis = null;

    for (const candidate of candidates) {
        const axis = rubikNormalizeVector(candidate);
        if (!axis) continue;
        const radiusA = halfA * (
            Math.abs(rubikDot(axis, axesA[0])) +
            Math.abs(rubikDot(axis, axesA[1])) +
            Math.abs(rubikDot(axis, axesA[2]))
        );
        const radiusB = halfB * (
            Math.abs(rubikDot(axis, axesB[0])) +
            Math.abs(rubikDot(axis, axesB[1])) +
            Math.abs(rubikDot(axis, axesB[2]))
        );
        const separation = Math.abs(rubikDot(delta, axis));
        const overlap = radiusA + radiusB - separation;
        if (overlap <= 0) return null;
        if (overlap < minimumOverlap) {
            const direction = rubikDot(delta, axis) >= 0 ? 1 : -1;
            minimumOverlap = overlap;
            minimumAxis = [axis[0] * direction, axis[1] * direction, axis[2] * direction];
        }
    }
    return { overlap: minimumOverlap, normal: minimumAxis };
}

function rubikResolveOBBCollision(a, b) {
    const collision = rubikTestOBBCollision(a, b);
    if (!collision) return false;
    const [nx, ny, nz] = collision.normal;
    const aStatic = a.sleeping;
    const bStatic = b.sleeping;
    const correction = collision.overlap * 1.04;
    if (!aStatic && !bStatic) {
        a.x -= nx * correction * 0.5;
        a.y -= ny * correction * 0.5;
        a.z -= nz * correction * 0.5;
        b.x += nx * correction * 0.5;
        b.y += ny * correction * 0.5;
        b.z += nz * correction * 0.5;
    } else if (!aStatic && bStatic) {
        a.x -= nx * correction;
        a.y -= ny * correction;
        a.z -= nz * correction;
    } else if (aStatic && !bStatic) {
        b.x += nx * correction;
        b.y += ny * correction;
        b.z += nz * correction;
    }

    const relativeVelocity = (b.vx - a.vx) * nx + (b.vy - a.vy) * ny + (b.vz - a.vz) * nz;
    if (relativeVelocity < 0) {
        const restitution = ny !== 0 ? 0.08 : 0.18;
        const impulse = -(1 + restitution) * relativeVelocity * 0.5;
        if (!aStatic) {
            a.vx -= impulse * nx;
            a.vy -= impulse * ny;
            a.vz -= impulse * nz;
        }
        if (!bStatic) {
            b.vx += impulse * nx;
            b.vy += impulse * ny;
            b.vz += impulse * nz;
        }
    }

    const friction = 0.84;
    if (!aStatic) {
        if (nx !== 0) a.vx *= friction;
        if (ny !== 0) a.vy *= 0.92;
        if (nz !== 0) a.vz *= friction;
        a.angularVelocityX *= 0.97;
        a.angularVelocityY *= 0.97;
        a.angularVelocityZ *= 0.97;
        a.restTime = 0;
    }
    if (!bStatic) {
        if (nx !== 0) b.vx *= friction;
        if (ny !== 0) b.vy *= 0.92;
        if (nz !== 0) b.vz *= friction;
        b.angularVelocityX *= 0.97;
        b.angularVelocityY *= 0.97;
        b.angularVelocityZ *= 0.97;
        b.restTime = 0;
    }
    return true;
}

function rubikSeparateOBBCollision(a, b) {
    const collision = rubikTestOBBCollision(a, b);
    if (!collision) return false;
    const [nx, ny, nz] = collision.normal;
    const correction = collision.overlap * 0.56;
    a.x -= nx * correction;
    a.y -= ny * correction;
    a.z -= nz * correction;
    b.x += nx * correction;
    b.y += ny * correction;
    b.z += nz * correction;
    return true;
}

function rubikGetHomeScreenPosition(cubie) {
    const probe = document.createElement('div');
    probe.style.position = 'absolute';
    probe.style.left = '50%';
    probe.style.top = '50%';
    probe.style.width = '1px';
    probe.style.height = '1px';
    probe.style.transformStyle = 'preserve-3d';
    probe.style.transform = 'translate(-50%, -50%) translate3d(' +
        (cubie.startX * rubikUnit) + 'px,' + (-cubie.startY * rubikUnit) + 'px,' + (cubie.startZ * rubikUnit) + 'px)';
    rubikStage.appendChild(probe);
    const rect = probe.getBoundingClientRect();
    probe.remove();
    return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
}

function rubikCommitLayerAnimation(state, angleValue, roundCoordinates = true, recordHistory = state.record) {
    const positionRotation = angleValue;
    const visualRotation = state.axis === 'y' ? angleValue : -angleValue;
    const rotation = rubikAxisRotationMatrix(state.axis, visualRotation);
    state.selected.forEach((cubie) => {
        const next = rubikRotateVectorAngle([cubie.x, cubie.y, cubie.z], state.axis, positionRotation);
        rubikStage.appendChild(cubie.node);
        cubie.x = roundCoordinates ? Math.round(next[0]) : next[0];
        cubie.y = roundCoordinates ? Math.round(next[1]) : next[1];
        cubie.z = roundCoordinates ? Math.round(next[2]) : next[2];
        cubie.orientation = rubikSnapOrientation(rubikMultiplyMatrix3(rotation, cubie.orientation));
        rubikApplyOrientation(cubie);
        if (roundCoordinates) rubikApplyPosition(cubie);
    });
    state.pivot.remove();
    rubikAnimating = false;
    rubikLayerAnimation = null;
    if (recordHistory) {
        rubikHistory.push({ axis: state.axis, layer: state.layer, angle: angleValue });
    }
    if (state.resolve) state.resolve();
}

function rubikFinishLayerAnimation() {
    const state = rubikLayerAnimation;
    if (!state) return;
    cancelAnimationFrame(state.frameId);
    rubikCommitLayerAnimation(state, state.angle);
}

function rubikFreezeLayerAnimation() {
    const state = rubikLayerAnimation;
    if (!state) return;
    cancelAnimationFrame(state.frameId);
    rubikCommitLayerAnimation(state, state.currentAngle, false, false);
}

function rubikInterruptCurrentMotion() {
    rubikSolveToken += 1;
    rubikAutoReversalToken += 1;
    rubikAutoReversing = false;
    rubikAbortSolve = true;
    if (rubikLayerAnimation) rubikFinishLayerAnimation();
}

function rubikRotateLayer(axis, layer, angle, duration, easingFn, record = true, animateTitle = record) {
    return new Promise((resolve) => {
        if (rubikAnimating) {
            resolve();
            return;
        }
        rubikAnimating = true;

        const angleSign = angle > 0 ? 1 : -1;
        const pivot = document.createElement('div');
        pivot.className = 'rubik-pivot';
        rubikStage.appendChild(pivot);

        const selected = rubikCubes.filter((cubie) => cubie[axis] === layer);
        selected.forEach((cubie) => pivot.appendChild(cubie.node));

        const startTime = performance.now();
        rubikLayerAnimation = {
            pivot,
            selected,
            axis,
            layer,
            angle,
            duration,
            easingFn,
            record,
            currentAngle: 0,
            frameId: 0,
            resolve
        };
        function frame(time) {
            const progress = Math.min((time - startTime) / duration, 1);
            const eased = easingFn(progress);
            const value = angle * eased;
            rubikLayerAnimation.currentAngle = value;
            const pivotAngle = axis === 'y' ? value : -value;
            pivot.style.transform = rubikMatrix3d(rubikAxisRotationMatrix(axis, pivotAngle));

            if (progress < 1) {
                rubikLayerAnimation.frameId = requestAnimationFrame(frame);
                return;
            }
            rubikCommitLayerAnimation(rubikLayerAnimation, angle);
            resolve();
        }
        rubikLayerAnimation.frameId = requestAnimationFrame(frame);
    });
}

function rubikAutoRotate(time) {
    if (rubikSolving || rubikAnimating || rubikAutoReversing) return;
    if (time - rubikLastRotation < rubikInterval) return;

    if (rubikHistory.length >= rubikMaxAutoMoves) {
        rubikAutoReversing = true;
        const token = ++rubikAutoReversalToken;
        const reverseCount = Math.min(
            rubikHistory.length,
            rubikAutoReverseMin + Math.floor(Math.random() * (rubikAutoReverseMax - rubikAutoReverseMin + 1))
        );

        (async () => {
            for (let i = 0; i < reverseCount; i += 1) {
                if (token !== rubikAutoReversalToken || rubikSolving) break;
                const move = rubikHistory.pop();
                if (!move) break;
                await rubikRotateLayer(move.axis, move.layer, -move.angle, 300, rubikEaseOutBack, false, false);
                if (token !== rubikAutoReversalToken) break;
                if (i < reverseCount - 1) {
                    await new Promise((resolve) => setTimeout(resolve, rubikInterval));
                }
            }
            if (token === rubikAutoReversalToken) {
                rubikAutoReversing = false;
                rubikLastRotation = performance.now();
            }
        })();
        return;
    }

    rubikLastRotation = time;
    const axes = ['x', 'y', 'z'];
    let axis = axes[Math.floor(Math.random() * axes.length)];
    let layer = Math.random() > 0.5 ? 1 : -1;
    while (axis === rubikLastAxis && layer === rubikLastLayer) {
        axis = axes[Math.floor(Math.random() * axes.length)];
        layer = Math.random() > 0.5 ? 1 : -1;
    }
    rubikLastAxis = axis;
    rubikLastLayer = layer;
    const angle = (Math.PI / 2) * (Math.random() > 0.5 ? 1 : -1);
    rubikRotateLayer(axis, layer, angle, 300, rubikEaseOutBack, true);
}

rubikFrame.addEventListener('pointerdown', (event) => {
    rubikDragging = true;
    rubikPreviousPointer = { x: event.clientX, y: event.clientY };
    rubikFrame.setPointerCapture(event.pointerId);
});

rubikFrame.addEventListener('pointermove', (event) => {
    if (!rubikDragging) return;
    const dx = event.clientX - rubikPreviousPointer.x;
    const dy = event.clientY - rubikPreviousPointer.y;
    rubikRotation.y += dx * 0.45;
    rubikRotation.x -= dy * 0.45;
    rubikRotation.x = Math.max(-85, Math.min(85, rubikRotation.x));
    rubikPreviousPointer = { x: event.clientX, y: event.clientY };
    rubikUpdateStageRotation();
});

rubikFrame.addEventListener('pointerup', (event) => {
    rubikDragging = false;
    rubikFrame.releasePointerCapture(event.pointerId);
});

rubikFrame.addEventListener('pointercancel', () => {
    rubikDragging = false;
});

rubikBuild();

window.addEventListener('resize', rubikUpdateDimensions);

document.getElementById('rubikSolve').addEventListener('click', async () => {
    const token = ++rubikSolveToken;
    rubikAbortSolve = true;
    rubikDragging = false;
    const resetRotation = rubikResetStageRotation(520);

    if (rubikLayerAnimation) rubikFinishLayerAnimation();

    rubikAbortSolve = false;

    rubikSolving = true;
    while (rubikHistory.length > 0 && !rubikAbortSolve && token === rubikSolveToken) {
        const move = rubikHistory.pop();
        await rubikRotateLayer(move.axis, move.layer, -move.angle, 170, rubikEaseInOutCubic, false, false);
    }
    await resetRotation;
    if (rubikAbortSolve || token !== rubikSolveToken) return;
    rubikSolving = false;
    rubikLastRotation = performance.now();
});

document.getElementById('languageToggle').addEventListener('click', () => {
    const current = localStorage.getItem('supercube-lang') || 'ru';
    setLanguage(current === 'ru' ? 'en' : 'ru');
});
document.getElementById('themeToggle').addEventListener('click', toggleTheme);

const topbar = document.querySelector('.topbar');
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLanguageToggle = document.getElementById('mobileLanguageToggle');
const mobileThemeToggle = document.getElementById('mobileThemeToggle');

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

mobileLanguageToggle.addEventListener('click', () => {
    const current = localStorage.getItem('supercube-lang') || 'ru';
    setLanguage(current === 'ru' ? 'en' : 'ru');
    closeMobileMenu();
});

mobileThemeToggle.addEventListener('click', () => {
    toggleTheme();
    closeMobileMenu();
});

const notesPage = document.getElementById('notesPage');
const homeSections = Array.from(document.querySelectorAll('main > section:not(#notesPage)'));
const siteFooter = document.querySelector('footer');

const projectsToggle = document.getElementById('projectsToggle');
let projectsExpanded = false;
projectsToggle.addEventListener('click', (event) => {
    event.preventDefault();
    projectsExpanded = !projectsExpanded;
    document.querySelectorAll('.project.is-hidden').forEach((project) => {
        project.classList.toggle('is-expanded', projectsExpanded);
    });
    const lang = localStorage.getItem('supercube-lang') || 'ru';
    projectsToggle.textContent = translations[lang][projectsExpanded ? 'moreProjectsHide' : 'moreProjects'];
});

function rubikAnimate(time) {
    rubikAutoRotate(time);
    requestAnimationFrame(rubikAnimate);
}

requestAnimationFrame(rubikAnimate);
setLanguage(savedLang);