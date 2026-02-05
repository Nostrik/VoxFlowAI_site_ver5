document.addEventListener('DOMContentLoaded', () => {

    let activePlayer = null;

    document.querySelectorAll('.service-item').forEach(item => {
        initPlayer(item);
    });

    function initPlayer(item) {
        const playPauseBtn = item.querySelector('.play-pause-btn');
        const iconPlay = item.querySelector('.icon-play');
        const iconPause = item.querySelector('.icon-pause');
        const eqContainer = item.querySelector('.eq-container');
        const currentTimeEl = item.querySelector('.current-time');

        const audioSrc = item.dataset.audio;
        if (!audioSrc) return;

        const audio = new Audio(audioSrc);
        const totalBars = 15;
        let intervalId = null;

        function formatTime(seconds) {
            const min = Math.floor(seconds / 60);
            const sec = Math.floor(seconds % 60);
            return `${min}:${sec.toString().padStart(2, '0')}`;
        }

        function generateBars() {
            for (let i = 0; i < totalBars; i++) {
                const bar = document.createElement('div');
                bar.classList.add('eq-bar');
                bar.style.height = '6px';
                eqContainer.appendChild(bar);
            }
        }

        function animateBars() {
            eqContainer.querySelectorAll('.eq-bar').forEach((bar, index) => {
                const base = Math.abs(Math.sin(Date.now() / 300 + index));
                bar.style.height = `${6 + base * 10}px`;
            });
        }

        function resetBars() {
            eqContainer.querySelectorAll('.eq-bar')
                .forEach(bar => bar.style.height = '6px');
        }

        function stopPlayer() {
            audio.pause();
            audio.currentTime = 0;
            clearInterval(intervalId);
            resetBars();

            iconPlay.classList.remove('is-hidden');
            iconPause.classList.add('is-hidden');

            currentTimeEl.textContent = '0:00';
        }

        playPauseBtn.addEventListener('click', () => {

            // ⛔ останавливаем предыдущий плеер
            if (activePlayer && activePlayer !== stopPlayer) {
                activePlayer();
            }

            if (audio.paused) {
                audio.play();
                activePlayer = stopPlayer;

                iconPlay.classList.add('is-hidden');
                iconPause.classList.remove('is-hidden');

                intervalId = setInterval(animateBars, 100);
            } else {
                stopPlayer();
                activePlayer = null;
            }
        });

        audio.addEventListener('timeupdate', () => {
            currentTimeEl.textContent = formatTime(audio.currentTime);
        });

        audio.addEventListener('ended', () => {
            stopPlayer();
            activePlayer = null;
        });

        generateBars();
    }
});
