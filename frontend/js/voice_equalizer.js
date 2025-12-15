document.addEventListener('DOMContentLoaded', () => {

    const item = document.querySelector('.service-item');
    const playPauseBtn = item.querySelector('.play-pause-btn');
    const iconPlay = item.querySelector('.icon-play');
    const iconPause = item.querySelector('.icon-pause');
    const eqContainer = item.querySelector('.eq-container');
    
    let isPlaying = false;
    const totalBars = 20;
    let intervalId;

    // --- 1. Генерация баров эквалайзера ---
    function generateBars() {
        for (let i = 0; i < totalBars; i++) {
            const bar = document.createElement('div');
            bar.classList.add('eq-bar');
            eqContainer.appendChild(bar);
        }
    }

    // --- 2. Анимация высоты баров (имитация звука) ---
    function animateBars() {
        const bars = eqContainer.querySelectorAll('.eq-bar');
        const containerHeight = eqContainer.clientHeight; // Высота родительского контейнера (10px)

        bars.forEach((bar) => {
            // Генерируем случайную высоту от 10% до 100% высоты контейнера
            const randomHeight = Math.random() * (containerHeight * 0.9) + (containerHeight * 0.1);
            bar.style.height = `${randomHeight}px`;
        });
    }

    // --- 3. Переключение состояния Play/Pause ---
    function togglePlayPause() {
        isPlaying = !isPlaying;

        if (isPlaying) {
            iconPlay.classList.add('is-hidden');
            iconPause.classList.remove('is-hidden');
            // Начинаем анимацию эквалайзера
            intervalId = setInterval(animateBars, 100); // Обновляем каждые 100мс
        } else {
            iconPlay.classList.remove('is-hidden');
            iconPause.classList.add('is-hidden');
            // Останавливаем анимацию
            clearInterval(intervalId);
            // Сбрасываем высоту баров до минимума при остановке
            const bars = eqContainer.querySelectorAll('.eq-bar');
            bars.forEach(bar => bar.style.height = '1px'); 
        }
    }

    // --- 4. Привязка событий и инициализация ---
    playPauseBtn.addEventListener('click', togglePlayPause);
    generateBars();
    // Устанавливаем начальную минимальную высоту
    const initialBars = eqContainer.querySelectorAll('.eq-bar');
    initialBars.forEach(bar => bar.style.height = '1px'); 

});
