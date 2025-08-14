import { body } from './global.js';
import { guanabara } from './guanabara.js';

import { startAnimation } from './guanabara.js';

let clicked = false;

guanabara.addEventListener('click', () => {
    if (clicked) return;
    clicked = true;

    const introMus = new Audio('assets/audio/mus/intro.ogg');
    introMus.play();

    guanabara.style.cursor = 'wait';
    body.style.cursor = 'wait';

    const apple = document.querySelector('.apple');
    setTimeout(() => {
        apple.style.opacity = '1';
    }, 2000);

    setTimeout(() => {
        startAnimation();
    }, 7700);
});