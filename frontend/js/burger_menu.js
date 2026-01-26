// document.addEventListener('DOMContentLoaded', () => {
//     const burgerButton = document.getElementById('burger');
//     const navMenu = document.querySelector('.header_nav');
//     const headerContainer = document.querySelector('#header .container');
//     const navLinks = document.querySelectorAll('.header_nav a');
//     const hideSection = document.querySelectorAll('.hide-section');
//     const body = document.body;
//     const footer = document.getElementById('.footer');

//     // Функция открытия/закрытия
//     function toggleMenu() {
//         hideSection.forEach(section => {
//         section.classList.toggle('close');
//     });
//         body.classList.toggle('no-scroll');
//         burgerButton.classList.toggle('active'); 
//         navMenu.classList.toggle('open');        
//         headerContainer.classList.toggle('menu-active');
//         footer.classList.add('close');
        
//         // Управление доступностью (A11y)
//         const isExpanded = burgerButton.getAttribute('aria-expanded') === 'true' || false;
//         burgerButton.setAttribute('aria-expanded', !isExpanded);
//     }

//     // 1. Обработчик клика на иконку бургера
//     burgerButton.addEventListener('click', toggleMenu);

//     // 2. Обработчик клика на пункты меню (для закрытия после перехода по ссылке/якорю)
//     navLinks.forEach(link => {
//         link.addEventListener('click', () => {
//             // Если меню открыто, закрываем его
//             if (navMenu.classList.contains('open')) {
//                 toggleMenu(); 
//             }
//         });
//     });
// });

document.addEventListener('DOMContentLoaded', () => {
    const burgerButton = document.getElementById('burger');
    const navMenu = document.querySelector('.header_nav');
    const navBurgerTelSocial = document.querySelector('.nav_burger_tel_social');
    const navLinks = document.querySelectorAll('.header_nav a');
    const headerTel = document.querySelector('.header-tel');
    const headerSocial = document.querySelector('.header-social');
    const hideSection = document.querySelectorAll('.hide-section');
    const body = document.body;
    const footer = document.getElementById('footer');
    
    // Функция открытия/закрытия
    function toggleMenu() {
        hideSection.forEach(section => {
            section.classList.toggle('close');
        });
        body.classList.toggle('no-scroll');
        burgerButton.classList.toggle('active'); 
        navMenu.classList.toggle('open');
        navBurgerTelSocial.classList.toggle('open');
        headerTel.classList.toggle('open');       
        headerSocial.classList.toggle('open');
        
        // Используем toggle() для футера
        footer.classList.toggle('close'); 
        
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
            if (navBurgerTelSocial.classList.contains('open')) {
                toggleMenu(); 
            }
        });
    });
});
