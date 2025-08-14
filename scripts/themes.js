import { body } from './global.js';
import { section } from './global.js';
import { header } from './global.js';
import { base } from './guanabara.js';

const hat = document.getElementById('hat');
var active = true;

var reallyplayer = $(this).closest('.really-player');

const holiday = document.getElementById('holiday');

holiday.addEventListener('click', () => {
    if (holiday.dataset.clicked) return;
    holiday.dataset.clicked = true;

    const xmas = new Image();
    xmas.src = 'assets/images/xmas.png';
    xmas.classList.add('xmas');

    const balls = new Image();
    balls.src = 'assets/images/friend-ball.webp'
    balls.classList.add('xmas');
    balls.id = 'friend-ball';

    header.appendChild(xmas);
    header.appendChild(balls);
    

    const song = document.getElementById('song');
    const player = song.closest('audio');

    section.forEach(section => {
        section.style.backgroundColor = '#EFBCE7';
        section.style.color = 'black';
        section.appendChild(xmas.cloneNode(true));

    });

    header.style.backgroundColor = '#EFBCE7';
    header.style.color = 'black';

    base.style.color = 'black';

    body.style.background = 'url(../assets/images/bg-tree.png)'

    player.pause();

    song.src = 'assets/audio/mus/jinglebells.mp3';

    player.load();
    player.play().catch(e => console.warn("Falha ao tocar a música:", e));

    player.closest('.really-player').classList.add('playing');

    balls.addEventListener ('click', () => {
        if (balls.dataset.clicked)
            return;

        balls.style.animation = 'none';

            hat.style.display = 'block'
            hat.style.animation = 'fall 4s ease-in'

            header.style.backgroundColor = 'black';
            header.style.color = 'white';

            base.style.color = 'white';

            body.style.background = 'url(../assets/images/snake.jpg)'

            section.forEach(section => {
                section.style.backgroundColor = 'black';
                section.style.color = 'white';
            });

            player.pause();

            song.src = 'assets/audio/mus/friendinsideme.mp3';

            player.load();
            player.play().catch(e => console.warn("Falha ao tocar a música:", e));

            player.closest('.really-player').classList.add('playing');

        balls.dataset.clicked = true;
        
    })

});