// const burger = document.getElementById('burger');

// burger.addEventListener('click', () => {
//     burger.classList.toggle('active');
// });

// document.getElementById('burger').addEventListener('click', function() {
//     this.classList.toggle('active');
// });

// const burgerButton = document.getElementById('burger');
// const navMenu = document.getElementById('header_nav');
// const wrapper = document.getElementById('header-wrapper');
// const navItems = document.querySelectorAll('.nav-item'); // Все пункты меню

// // 1. При клике на бургер
// burgerButton.addEventListener('click', () => {
//     burgerButton.classList.toggle('active'); // Анимация крестика
//     navMenu.classList.toggle('open');        // Открытие/закрытие меню
//     wrapper.classList.toggle('menu-active'); // Скрытие остального контента
    
//     // Управление доступностью
//     const isExpanded = burgerButton.getAttribute('aria-expanded') === 'true' || false;
//     burgerButton.setAttribute('aria-expanded', !isExpanded);
// });

// // 2. При клике на любой пункт меню
// navItems.forEach(item => {
//     item.addEventListener('click', () => {
//         burgerButton.classList.remove('active'); // Закрываем бургер (делаем полоски)
//         navMenu.classList.remove('open');        // Скрываем меню
//         wrapper.classList.remove('menu-active'); // Показываем основной контент
//         burgerButton.setAttribute('aria-expanded', 'false');
//     });
// });

document.addEventListener('DOMContentLoaded', () => {
    const burgerButton = document.getElementById('burger');
    const navMenu = document.querySelector('.header_nav');
    const headerContainer = document.querySelector('#header .container');
    const navLinks = document.querySelectorAll('.header_nav a'); // Все пункты меню

    // Функция открытия/закрытия
    function toggleMenu() {
        burgerButton.classList.toggle('active'); 
        navMenu.classList.toggle('open');        
        headerContainer.classList.toggle('menu-active');
        
        // Управление доступностью (A11y)
        const isExpanded = burgerButton.getAttribute('aria-expanded') === 'true' || false;
        burgerButton.setAttribute('aria-expanded', !isExpanded);
    }

    // 1. Обработчик клика на иконку бургера
    burgerButton.addEventListener('click', toggleMenu);

    // 2. Обработчик клика на пункты меню (для закрытия после перехода по ссылке/якорю)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Если меню открыто, закрываем его
            if (navMenu.classList.contains('open')) {
                toggleMenu(); 
            }
        });
    });
});