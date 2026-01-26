// document.addEventListener('DOMContentLoaded', () => {
//     // Получаем элементы
//     const modal = document.getElementById("review-modal");
//     const openButtons = document.querySelectorAll(".add-review-btn"); // Используем класс из вашего HTML
//     const closeButton = document.querySelector(".close-button");

//     // Функция открытия модального окна
//     function openModal() {
//         modal.style.display = "flex"; 
//     }

//     // Функция закрытия модального окна
//     function closeModal() {
//         modal.style.display = "none";
//     }

//     // Обработчик для всех кнопок открытия (верхней и нижней)
//     openButtons.forEach(button => {
//         button.addEventListener('click', (e) => {
//             e.preventDefault(); // Предотвращаем прыжок к якорю #add-review
//             openModal();
//         });
//     });

//     // Обработчик для кнопки закрытия (крестик)
//     closeButton.addEventListener('click', closeModal);

//     // Обработчик закрытия при клике вне формы
//     window.addEventListener('click', (e) => {
//         if (e.target === modal) {
//             closeModal();
//         }
//     });
// });

// document.addEventListener('DOMContentLoaded', () => {
//     // Получаем элементы основных модальных окон
//     const formModal = document.getElementById("review-modal");
//     const successModal = document.getElementById("success-modal");
    
//     // Получаем кнопки
//     const openButtons = document.querySelectorAll(".add-review-btn");
//     const closeButtons = document.querySelectorAll(".close-button"); // Общий класс для всех крестиков
//     const formElement = formModal.querySelector('form');

//     // Функции открытия/закрытия
//     function openModal(modalElement) {
//         modalElement.style.display = "flex";
//     }

//     function closeModal(modalElement) {
//         modalElement.style.display = "none";
//     }

//     // Обработчик для всех кнопок открытия (показ формы)
//     openButtons.forEach(button => {
//         button.addEventListener('click', (e) => {
//             e.preventDefault();
//             openModal(formModal);
//         });
//     });

//     // Обработчик для всех кнопок закрытия (крестиков)
//     closeButtons.forEach(button => {
//         button.addEventListener('click', () => {
//             closeModal(formModal);
//             closeModal(successModal);
//         });
//     });

//     // ОБРАБОТКА ОТПРАВКИ ФОРМЫ (КЛЮЧЕВОЙ МОМЕНТ)
//     formElement.addEventListener('submit', async (e) => {
//         e.preventDefault(); // Предотвращаем стандартную перезагрузку страницы
        
//         // Здесь вы отправляете данные на сервер (fetch API)
//         // const response = await fetch('/api/submit-review', { method: 'POST', body: new FormData(formElement) });
        
//         // Предположим, что сервер ответил успешно:
        
//         closeModal(formModal); // 1. Закрываем окно с формой
//         openModal(successModal); // 2. Открываем окно подтверждения

//         // Также здесь вызовите функцию addNewReview(data) из предыдущего примера, 
//         // чтобы добавить отзыв на страницу сразу, если он не требует пре-модерации на фронте.
//     });

//     // Обработчик закрытия при клике вне формы/успешного окна
//     window.addEventListener('click', (e) => {
//         if (e.target === formModal) {
//             closeModal(formModal);
//         }
//         if (e.target === successModal) {
//             closeModal(successModal);
//         }
//     });
// });

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Получение всех необходимых элементов ---
    const formModal = document.getElementById("review-modal");
    const successModal = document.getElementById("success-modal");
    const reviewsContainer = document.getElementById('reviews-container'); // Для добавления отзыва на страницу
    const template = document.getElementById('review-template'); // Шаблон отзыва

    const openButtons = document.querySelectorAll(".add-review-btn"); // Все кнопки "Добавить свой отзыв"
    const closeButtons = document.querySelectorAll(".close-button"); // Все кнопки закрытия (крестики)
    const formElement = formModal.querySelector('form'); // Сама форма

    // --- 2. Функции управления модальными окнами и прокруткой ---

    // Функция создания карточки отзыва (из предыдущих шагов)
    function createReviewCard(data) {
        const clone = template.content.cloneNode(true);
        clone.querySelector('.review-text').textContent = data.text;
        clone.querySelector('.reviewer-name').textContent = data.name;
        clone.querySelector('.reviewer-location').textContent = data.location;
        return clone;
    }

    // Функция открытия модального окна и блокировки скролла
    function openModal(modalElement) {
        modalElement.style.display = "flex";
        document.body.classList.add('no-scroll'); // Блокируем прокрутку
    }

    // Функция закрытия модального окна и разблокировки скролла
    function closeModal(modalElement) {
        modalElement.style.display = "none";
        // Разблокируем прокрутку только если *все* модальные окна закрыты
        if (formModal.style.display === 'none' && successModal.style.display === 'none') {
             document.body.classList.remove('no-scroll');
        }
    }

    // --- 3. Обработчики событий ---

    // Обработчик для всех кнопок открытия формы
    openButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(formModal);
        });
    });

    // Обработчик для всех кнопок закрытия (крестиков)
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            closeModal(formModal);
            closeModal(successModal);
        });
    });

    // Обработчик закрытия при клике вне модалки (на оверлей)
    window.addEventListener('click', (e) => {
        if (e.target === formModal) {
            closeModal(formModal);
        }
        if (e.target === successModal) {
            closeModal(successModal);
        }
    });

    // --- 4. Обработка отправки формы ---
    formElement.addEventListener('submit', async (e) => {
        e.preventDefault(); // Останавливаем стандартную отправку и перезагрузку

        // TODO: Здесь должен быть ваш код отправки данных на сервер через fetch API
        console.log("Данные формы отправляются на сервер...");
        
        // Пример данных, которые вы получите обратно от сервера после успешной отправки:
        const mockSuccessfulResponseData = {
            text: formElement.querySelector('#review-text-input').value,
            name: formElement.querySelector('#name').value,
            location: formElement.querySelector('#company').value // Используем поле компании как локацию
        };

        // После успешного ответа от сервера:
        
        // 1. Добавляем новый отзыв на страницу сразу (если модерация не нужна до показа)
        const newReviewCard = createReviewCard(mockSuccessfulResponseData);
        reviewsContainer.prepend(newReviewCard); 

        // 2. Закрываем окно с формой
        closeModal(formModal); 
        
        // 3. Открываем окно подтверждения из макета
        openModal(successModal); 

        // Очистить форму после отправки (опционально)
        formElement.reset();
    });

    // --- 5. Загрузка существующих отзывов при загрузке страницы (опционально) ---
    // loadReviews(); // Если хотите автоматически загружать отзывы при старте
});
