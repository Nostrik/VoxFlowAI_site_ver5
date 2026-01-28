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
