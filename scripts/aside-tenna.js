const boxes = document.querySelectorAll('.box')

boxes.forEach(box => {
    box.addEventListener('click', () => {  
        if (box.dataset.clicked) return;

        box.dataset.clicked = 'true';

        new Audio('assets/audio/sfx/explosion.mp3').play();
        box.src = 'assets/images/explosion.gif?rand=' + Date.now();

        setTimeout(() => {
            box.style.display = 'none'
        }, 1800)


        
        setTimeout(() => {
            const aside = box.parentElement.querySelector('aside');
            box.remove()
            if (aside) {
                const originalText = aside.textContent.trim();
                aside.textContent = "";
                aside.dataset.text = originalText;

                aside.classList.toggle('reveal');
                
                setTimeout(() => {
                    var boingSounds = ['assets/audio/sfx/boing1.mp3',
                    'assets/audio/sfx/boing2.mp3',
                    'assets/audio/sfx/boing3.mp3',
                    'assets/audio/sfx/boing4.mp3',
                    'assets/audio/sfx/boing5.mp3',
                    'assets/audio/sfx/boing6.mp3',
                    'assets/audio/sfx/boing7.mp3',
                    'assets/audio/sfx/boing8.mp3',
                    'assets/audio/sfx/boing9.mp3',
                    'assets/audio/sfx/boing10.mp3',
                    ];

                    const randomBoing = boingSounds[Math.floor(Math.random() * boingSounds.length)];

                    var boingAudio = new Audio(randomBoing);
                    boingAudio.play();

                    boingAudio.addEventListener('loadedmetadata', () => {
                        const duration = boingAudio.duration * 1000;
                        aside.style.setProperty('--duration', `${duration}ms`);
                    });

                    boingAudio.addEventListener('ended', () => {
                        setTimeout(() => {
                            talk(aside);
                        }, 10);
                    });
                }, 900)
            }
        }, 3000)
    });
});

function talk(aside) {
    const originalText = aside.dataset.text || "";
    aside.textContent = "";

    let index = 0;
    let lastAudio = null;
    let isFinished = false;

    const interval = setInterval(() => {
        if (index < originalText.length) {
            const char = originalText[index];
            aside.textContent += char;

            if (/[a-zA-Z0-9]/.test(char)) {
                if (!lastAudio || lastAudio.currentTime > 0.04 || lastAudio.ended) {
                    const voice = new Audio(`assets/audio/sfx/tenna_voice_${Math.floor(Math.random() * 10 + 1)}.wav`);
                    voice.volume = 0.5;
                    voice.play().catch(() => {});
                    lastAudio = voice;
                }
            }

            index++;
        } else {
            clearInterval(interval);
            isFinished = true;
        }
    }, 35);

    if (lastAudio) {
        lastAudio.addEventListener('ended', () => {
            if (isFinished) lastAudio = null;
        });
    }
}
