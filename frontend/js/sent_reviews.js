//document.addEventListener('DOMContentLoaded', () => {
//    // --- 1. Получение всех необходимых элементов ---
//    const formModal = document.getElementById("review-modal");
//    const successModal = document.getElementById("success-modal");
//    const reviewsContainer = document.getElementById('reviews-container'); // Для добавления отзыва на страницу
//    const template = document.getElementById('review-template'); // Шаблон отзыва
//
//    const openButtons = document.querySelectorAll(".add-review-btn"); // Все кнопки "Добавить свой отзыв"
//    const closeButtons = document.querySelectorAll(".close-button"); // Все кнопки закрытия (крестики)
//    const formElement = formModal.querySelector('form'); // Сама форма
//
//    // --- 2. Функции управления модальными окнами и прокруткой ---
//
//    // Функция создания карточки отзыва (из предыдущих шагов)
//    function createReviewCard(data) {
//        const clone = template.content.cloneNode(true);
//        clone.querySelector('.review-text').textContent = data.text;
//        clone.querySelector('.reviewer-name').textContent = data.name;
//        clone.querySelector('.reviewer-location').textContent = data.location;
//        return clone;
//    }
//
//    // Функция открытия модального окна и блокировки скролла
//    function openModal(modalElement) {
//        modalElement.style.display = "flex";
//        document.body.classList.add('no-scroll'); // Блокируем прокрутку
//    }
//
//    // Функция закрытия модального окна и разблокировки скролла
//    function closeModal(modalElement) {
//        modalElement.style.display = "none";
//        // Разблокируем прокрутку только если *все* модальные окна закрыты
//        if (formModal.style.display === 'none' && successModal.style.display === 'none') {
//             document.body.classList.remove('no-scroll');
//        }
//    }
//
//    // --- 3. Обработчики событий ---
//
//    // Обработчик для всех кнопок открытия формы
//    openButtons.forEach(button => {
//        button.addEventListener('click', (e) => {
//            e.preventDefault();
//            openModal(formModal);
//        });
//    });
//
//    // Обработчик для всех кнопок закрытия (крестиков)
//    closeButtons.forEach(button => {
//        button.addEventListener('click', () => {
//            closeModal(formModal);
//            closeModal(successModal);
//        });
//    });
//
//    // Обработчик закрытия при клике вне модалки (на оверлей)
//    window.addEventListener('click', (e) => {
//        if (e.target === formModal) {
//            closeModal(formModal);
//        }
//        if (e.target === successModal) {
//            closeModal(successModal);
//        }
//    });
//
//    // --- 4. Обработка отправки формы ---
//    formElement.addEventListener('submit', async (e) => {
//        e.preventDefault(); // Останавливаем стандартную отправку и перезагрузку
//
//        // TODO: Здесь должен быть ваш код отправки данных на сервер через fetch API
//        console.log("Данные формы отправляются на сервер...");
//
//        // Пример данных, которые вы получите обратно от сервера после успешной отправки:
//        const mockSuccessfulResponseData = {
//            text: formElement.querySelector('#review-text-input').value,
//            name: formElement.querySelector('#name').value,
//            location: formElement.querySelector('#company').value // Используем поле компании как локацию
//        };
//
//        // После успешного ответа от сервера:
//
//        // 1. Добавляем новый отзыв на страницу сразу (если модерация не нужна до показа)
//        const newReviewCard = createReviewCard(mockSuccessfulResponseData);
//        reviewsContainer.prepend(newReviewCard);
//
//        // 2. Закрываем окно с формой
//        closeModal(formModal);
//
//        // 3. Открываем окно подтверждения из макета
//        openModal(successModal);
//
//        // Очистить форму после отправки (опционально)
//        formElement.reset();
//    });
//
//    // --- 5. Загрузка существующих отзывов при загрузке страницы (опционально) ---
//    // loadReviews(); // Если хотите автоматически загружать отзывы при старте
//});

//document.addEventListener('DOMContentLoaded', () => {
//    // --- 1. Получение всех необходимых элементов ---
//    const formModal = document.getElementById("review-modal");
//    const successModal = document.getElementById("success-modal");
//    const reviewsContainer = document.getElementById('reviews-container'); // (больше не используется, но можно оставить)
//    const template = document.getElementById('review-template'); // (не используется для публикации)
//
//    const openButtons = document.querySelectorAll(".add-review-btn");
//    const closeButtons = document.querySelectorAll(".close-button");
//    const formElement = formModal.querySelector('form');
//
//    // --- 2. Функции управления модальными окнами и прокруткой ---
//
//    function openModal(modalElement) {
//        modalElement.style.display = "flex";
//        document.body.classList.add('no-scroll');
//    }
//
//    function closeModal(modalElement) {
//        modalElement.style.display = "none";
//        if (formModal.style.display === 'none' && successModal.style.display === 'none') {
//            document.body.classList.remove('no-scroll');
//        }
//    }
//
//    // --- 3. Обработчики событий ---
//
//    // Открытие формы
//    openButtons.forEach(button => {
//        button.addEventListener('click', (e) => {
//            e.preventDefault();
//            openModal(formModal);
//        });
//    });
//
//    // Закрытие по крестику
//    closeButtons.forEach(button => {
//        button.addEventListener('click', () => {
//            closeModal(formModal);
//            closeModal(successModal);
//        });
//    });
//
//    // Закрытие по клику на оверлей
//    window.addEventListener('click', (e) => {
//        if (e.target === formModal) {
//            closeModal(formModal);
//        }
//        if (e.target === successModal) {
//            closeModal(successModal);
//        }
//    });
//
//    // --- 4. Отправка формы ---
//    formElement.addEventListener('submit', async (e) => {
//        e.preventDefault();
//
//        const payload = {
//            review_text: formElement.querySelector('#review-text-input').value,
//            name: formElement.querySelector('#name').value,
//            location: formElement.querySelector('#company').value
//        };
//
//           try {
//    const response = await fetch('/api/reviews/', {
//        method: 'POST',
//        headers: {
//            'Content-Type': 'application/json'
//        },
//        body: JSON.stringify(payload)
//    });
//
//    const responseText = await response.text();
//
////    if (!response.ok) {
////        console.error('Статус:', response.status);
////        console.error('Ответ сервера:', responseText);
////        throw new Error('Ошибка при отправке отзыва');
////    }
////
////    console.log('Ответ сервера:', responseText);
//
//    closeModal(formModal);
//    openModal(successModal);
//    formElement.reset();
//
//} catch (error) {
//    console.error('Fetch error:', error);
//    alert('Не удалось отправить отзыв. Проверь консоль.');
//}
//    });
//});

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Элементы ---
    const formModal = document.getElementById('review-modal');
    const successModal = document.getElementById('success-modal');
    const reviewsContainer = document.getElementById('reviews-container');
    const template = document.getElementById('review-template');

    const openButtons = document.querySelectorAll('.add-review-btn');
    const closeButtons = document.querySelectorAll('.close-button');
    const formElement = formModal.querySelector('form');

    // --- 2. Модалки и скролл ---
    function openModal(modalElement) {
        modalElement.style.display = 'flex';
        document.body.classList.add('no-scroll');
    }

    function closeModal(modalElement) {
        modalElement.style.display = 'none';
        if (
            formModal.style.display === 'none' &&
            successModal.style.display === 'none'
        ) {
            document.body.classList.remove('no-scroll');
        }
    }

    // --- 3. Карточка отзыва ---
    function createReviewCard(data) {
        const clone = template.content.cloneNode(true);

        clone.querySelector('.review-text').textContent = data.review_text;
        clone.querySelector('.reviewer-name').textContent = data.name;
        clone.querySelector('.reviewer-location').textContent = data.location;

        return clone;
    }

    // --- 4. Загрузка опубликованных отзывов ---
    async function loadPublishedReviews() {
        try {
            const response = await fetch('/api/reviews/published');

            if (!response.ok) {
                throw new Error('Ошибка загрузки отзывов');
            }

            const reviews = await response.json();

            reviewsContainer.innerHTML = '';

            reviews.forEach(review => {
                const card = createReviewCard(review);
                reviewsContainer.appendChild(card);
            });

        } catch (error) {
            console.error('Ошибка загрузки отзывов:', error);
        }
    }

    // --- 5. Обработчики ---

    // Открытие формы
    openButtons.forEach(button => {
        button.addEventListener('click', e => {
            e.preventDefault();
            openModal(formModal);
        });
    });

    // Закрытие по крестику
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            closeModal(formModal);
            closeModal(successModal);
        });
    });

    // Закрытие по клику на оверлей
    window.addEventListener('click', e => {
        if (e.target === formModal) closeModal(formModal);
        if (e.target === successModal) closeModal(successModal);
    });

    // --- 6. Отправка формы ---
    formElement.addEventListener('submit', async e => {
        e.preventDefault();

        const payload = {
            review_text: formElement.querySelector('#review-text-input').value,
            name: formElement.querySelector('#name').value,
            company: formElement.querySelector('#company').value,
            phone: formElement.querySelector('#phone').value,
            location: formElement.querySelector('#company').value
        };

        try {
            const response = await fetch('/api/reviews/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error(errorText);
                throw new Error('Ошибка при отправке отзыва');
            }

            closeModal(formModal);
            openModal(successModal);
            formElement.reset();

        } catch (error) {
            console.error('Fetch error:', error);
            alert('Не удалось отправить отзыв. Попробуйте позже.');
        }
    });

    // --- 7. Старт ---
    loadPublishedReviews();
});
