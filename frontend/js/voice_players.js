document.addEventListener('DOMContentLoaded', (event) => {

    const scrollAmount = 220;
    const tolerance = 1;

    /**
     * Инициализирует независимое управление прокруткой, стрелками и точками для одного списка.
     * 
     * @param {HTMLElement} list - Элемент списка прокрутки (например, с ID 'scrollable-list' или 'scrollable-list2').
     * @param {HTMLElement} leftArrow - Элемент левой стрелки (например, с ID 'arrow-left' или 'arrow-left2').
     * @param {HTMLElement} rightArrow - Элемент правой стрелки (например, с ID 'arrow-right' или 'arrow-right2').
     * @param {NodeList} serviceItems - Все элементы внутри списка (например, с классом '.service-item' или '.service-item2').
     * @param {NodeList} navDots - Все навигационные точки для списка (элементы с классом '.dot').
     */
    function initializeScrollHandler(list, leftArrow, rightArrow, serviceItems, navDots) {
        
        // --- 1. Логика прокрутки стрелками и скрытия стрелок (Локальная для этого списка) ---
        if (list && leftArrow && rightArrow) {
            leftArrow.addEventListener('click', () => {
                list.scrollLeft -= scrollAmount;
            });

            rightArrow.addEventListener('click', () => {
                list.scrollLeft += scrollAmount;
            });

            // Функция для проверки позиции и скрытия стрелок (использует класс 'is-hidden' в CSS)
            const checkScrollPosition = () => {
                // Проверяем начало прокрутки 
                if (list.scrollLeft <= tolerance) {
                    leftArrow.classList.add('is-hidden');
                } else {
                    leftArrow.classList.remove('is-hidden');
                }

                // Проверяем конец прокрутки с допуском
                const maxScrollLeft = list.scrollWidth - list.clientWidth;
                if (Math.round(list.scrollLeft) >= maxScrollLeft - tolerance) {
                    rightArrow.classList.add('is-hidden');
                } else {
                    rightArrow.classList.remove('is-hidden');
                }
            };

            // Привязываем проверку к событию прокрутки и вызываем сразу при загрузке
            list.addEventListener('scroll', checkScrollPosition);
            checkScrollPosition();
        }

        // --- 2. Логика Intersection Observer для активных точек (Локальная для этого списка) ---
        if (navDots.length > 0 && serviceItems.length > 0) {
            // Вспомогательная функция для обновления класса active у точек
            const updateActiveDot = (index) => {
                navDots.forEach(dot => dot.classList.remove('active'));
                // Находим нужную точку среди точек текущего списка
                const activeDot = Array.from(navDots).find(dot => dot.getAttribute('data-index') === String(index));
                if (activeDot) {
                    activeDot.classList.add('active');
                }
            };

            const observerOptions = {
                root: list, // Наблюдаем относительно нашего списка
                rootMargin: '0px',
                threshold: 0.4 
            };

            const observer = new IntersectionObserver((entries) => {
                const intersectingIndices = [];
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        intersectingIndices.push(entry.target.getAttribute('data-index'));
                    }
                });

                if (intersectingIndices.length > 0) {
                    const firstVisibleIndex = Math.min(...intersectingIndices.map(Number));
                    updateActiveDot(firstVisibleIndex);
                }
            }, observerOptions);

            serviceItems.forEach(item => {
                observer.observe(item);
            });
        }
    }

    // =========================================================
    // ИНИЦИАЛИЗАЦИЯ: Находим элементы и запускаем функцию для каждого списка
    // =========================================================

    // --- Первый список ---
    const list1 = document.getElementById('scrollable-list');
    const leftArrow1 = document.getElementById('arrow-left');
    const rightArrow1 = document.getElementById('arrow-right');
    const serviceItems1 = document.querySelectorAll('.service-item');
    // Селектор для точек первого списка (убедитесь, что он находит ваши точки)
    const navDots1 = document.querySelectorAll('.nav-dots .dot'); 

    // Запускаем функцию для первого списка
    initializeScrollHandler(list1, leftArrow1, rightArrow1, serviceItems1, navDots1);


    // --- Второй список (чат-боты) ---
    const list2 = document.getElementById('scrollable-list2');
    const leftArrow2 = document.getElementById('arrow-left2');
    const rightArrow2 = document.getElementById('arrow-right2');
    const serviceItems2 = document.querySelectorAll('.service-item2');
    // Селектор для точек второго списка (адаптируйте под вашу HTML структуру)
    const navDots2 = document.querySelectorAll('#scrollable-list2 + .navigation-controls .dot'); 

    // Запускаем функцию для второго списка
    initializeScrollHandler(list2, leftArrow2, rightArrow2, serviceItems2, navDots2);
});
