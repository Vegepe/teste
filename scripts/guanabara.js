import { body } from './global.js';

const totalShards = 195;
const totalStars = 20;
const gravity = 0.075;
const minSpeed = 1;
const maxSpeed = 2;

export const guanabara = document.querySelector('.guanabara');

export const base = document.querySelector('.base');

const panel = document.querySelector('.masked-panel');
const panelUpper = document.getElementById('upper-left');
const panelBottom = document.getElementById('bottom-right');
const cracked = document.querySelector('.cracked-panel');

const shatterSound = new Audio('assets/audio/sfx/shatter.ogg');
const scatterSound = new Audio('assets/audio/sfx/scatter.ogg');

const shards = [];

function preloadShards() {
    for (let i = 1; i <= 195; i++) {
        const img = new Image();
        img.src = `assets/images/thingamabob/shards/shard${String(i).padStart(3, '0')}.webp`;
    }
}
preloadShards();

export function startAnimation() {
    panel.style.transition = 'opacity 3.5s ease';
    panel.style.opacity = '1';
    panel.style.animation = 'scroll 9s ease-out forwards';

    panelUpper.style.animation = 'upper-left 9s ease-in-out';
    panelUpper.style.opacity = '0.2';

    panelBottom.style.animation = 'bottom-right 9s ease-in-out';
    panelBottom.style.opacity = '0.2';

    setTimeout(() => {
        crack();
    }, 1100);

    for (let i = 1; i <= totalShards; i++) {
    const img = document.createElement('img');
    img.src = `assets/images/thingamabob/shards/shard${String(i).padStart(3, '0')}.webp`;
    img.classList.add('shard');
    shards.push(img);
}
}

function crack() {
    if (panel.style.opacity === '1') {
        setTimeout(() => {
            shatterSound.play();

            base.style.opacity = '0';

            panel.style.transition = 'none';
            panelBottom.style.opacity = '0';
            panelUpper.style.opacity = '0';
            panel.style.opacity = '0';
            cracked.style.opacity = '1';

            setTimeout(() => {
                explodeShards();
                spawnStars();
            }, 500);
        }, 9000);
    }
}

function explodeShards() {
    cracked.style.backgroundImage = 'none';
    scatterSound.play();

    shards.forEach((shard) => {
        cracked.appendChild(shard);
        shard.style.opacity = '1';

        let x = 0;
        let y = 0;

        const angle = Math.random() * Math.PI * 2;
        const speed = minSpeed + Math.random() * (maxSpeed - minSpeed);

        const vx = Math.cos(angle) * speed;
        let vy = Math.sin(angle) * speed;

        function animate() {
            x += vx;
            vy += gravity;
            y += vy;

            shard.style.transform = `translate(${x}px, ${y}px)`;

            const rect = shard.getBoundingClientRect();
            const isOnScreen =
                rect.bottom >= 0 &&
                rect.right >= 0 &&
                rect.top <= window.innerHeight &&
                rect.left <= window.innerWidth;

            if (isOnScreen) {
                requestAnimationFrame(animate);
            } else {
                shard.remove();
            }
        }

        requestAnimationFrame(animate);
    });
}

function spawnStars() {
    body.style.cursor = '';
    guanabara.style.cursor = 'default';

    for (let i = 0; i < totalStars; i++) {
        const startX = Math.random() * guanabara.clientWidth * 0.985;
        const startY = Math.random() * guanabara.clientHeight * 0.8;

        const star = document.createElement('img');
        star.src = 'assets/images/thingamabob/sparkle/sparkle.gif';
        star.classList.add('star');
        guanabara.appendChild(star);
        star.style.left = `${startX}px`;
        star.style.top = `${startY}px`;

        let currentY = startY;

        function createTrail() {
            const trail = document.createElement('div');
            trail.classList.add('star-trail');

            const offsetX = (Math.random() - 0.5) * 8;
            const offsetY = 3 + Math.random() * 4;

            const frameSize = 7;
            const totalFrames = 4;
            const randomFrame = Math.floor(Math.random() * totalFrames);
            trail.style.backgroundPosition = `-${randomFrame * frameSize}px 0`;

            trail.style.left = `${parseFloat(star.style.left) + offsetX}px`;
            trail.style.top = `${currentY + offsetY}px`;
            trail.style.opacity = '1';

            guanabara.appendChild(trail);

            setTimeout(() => {
                trail.style.opacity = '0';
                setTimeout(() => {
                    trail.remove();
                }, 2000);
            }, 50);
        }

        const trailInterval = setInterval(() => {
            createTrail();
        }, 500);

        function animate() {
            currentY += 2.9;
            star.style.top = `${currentY}px`;

            const isOnScreen =
                currentY < window.innerHeight + 100;

            if (isOnScreen) {
                requestAnimationFrame(animate);
            } else {
                star.remove();
                clearInterval(trailInterval);
            }
        }

        requestAnimationFrame(animate);
    }
}
