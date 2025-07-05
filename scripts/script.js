const guanabara = document.querySelector('.guanabara');

const panel = document.querySelector('.masked-panel');
const panelUpper = document.getElementById('upper-left')
const panelBottom = document.getElementById('bottom-right')

const base = document.querySelector('.base')
const cracked = document.querySelector('.cracked-panel');
const shards = [];

const introMus = new Audio ('audio/mus/intro.ogg');

const shatterSound = new Audio('audio/sfx/shatter.ogg');
const scatterSound = new Audio('audio/sfx/scatter.ogg');

const totalShards = 195;

guanabara.addEventListener('click', () => {
    introMus.play();
    guanabara.classList.toggle('active');

    setTimeout(() => {
        panel.style.transition = 'opacity 3.5s ease';
        panel.style.opacity = '1';
        panel.style.animation = 'scroll 9s ease-out forwards';

        panelUpper.style.animation = 'upper-left 9s ease-in-out';
        panelUpper.style.opacity = '0.2';

        panelBottom.style.animation = 'bottom-right 9s ease-in-out';
        panelBottom.style.opacity = '0.2';

        crack();
    }, 7500);

    for (let i = 1; i <= totalShards; i++) {
                const img = document.createElement('img');
                img.src = `images/shards/shard${String(i).padStart(3, '0')}.webp`;
                img.classList.add('shard');
                shards.push(img);
    }

});


function crack() {
    if (panel.style.opacity === '1') {
        setTimeout(() => {
            shatterSound.play()
            base.style.opacity = '0';
            panel.style.transition = 'none';

            panelBottom.style.opacity = '0';
            panelUpper.style.opacity = '0'
            panel.style.opacity = '0';
            cracked.style.opacity = '1';

            setTimeout(() => {
                explodeShards();
                spawnStars();
            }, 1000);
        }, 9000);
        
    }
}

function preloadShards() {
    for (let i = 1; i <= 195; i++) {
    const img = new Image();
    img.src = `images/shards/shard${String(i).padStart(3, '0')}.webp`;

    }
}
preloadShards();

function explodeShards() {
    const gravity = 0.075;
    const minSpeed = 1;
    const maxSpeed = 2;

    cracked.style.backgroundImage = 'none';
    scatterSound.play()

    shards.forEach((shard, i) => {
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
            const isOnScreen = (
                rect.bottom >= 0 &&
                rect.right >= 0 &&
                rect.top <= window.innerHeight &&
                rect.left <= window.innerWidth
            );

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
    const totalStars = 10;
    const frameSize = 10;
    const totalFrames = 4;

    for (let i = 0; i < totalStars; i++) {
        const x = Math.random() * guanabara.clientWidth * 0.985;
        const y = Math.random() * guanabara.clientHeight * 0.8;

        // Estrela animada
        const star = document.createElement('img');
        star.src = 'images/thingamabob/sparkle/sparkle.gif';
        star.classList.add('star');
        guanabara.appendChild(star);

        star.style.left = `${x}px`;
        star.style.top = `${y}px`;

        // Cria trilha
        const trail = document.createElement('div');
        trail.classList.add('star-trail');

        // Escolhe frame aleatório da trilha
        const randomFrame = Math.floor(Math.random() * totalFrames);
        trail.style.backgroundPosition = `-${randomFrame * frameSize}px 0`;

        trail.style.left = `${x + 5}px`;  // offset pra posicionar perto da estrela
        trail.style.top = `${y + 5}px`;

        guanabara.appendChild(trail);

        // Anima opacidade da trilha
        trail.style.opacity = '1';

        setTimeout(() => {
            trail.style.opacity = '0';
        }, 300);

        setTimeout(() => {
            trail.remove();
        }, 1200);

        let currentY = y;

        function animate() {
            currentY += 2;
            star.style.top = `${currentY}px`;
            trail.style.top = `${currentY + 5}px`; // trilha segue a estrela
            if (currentY < window.innerHeight + 50) {
                requestAnimationFrame(animate);
            } else {
                star.remove();
                trail.remove();
            }
        }

        requestAnimationFrame(animate);
    }
}



