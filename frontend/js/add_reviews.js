const reviewsContainer = document.getElementById('reviews-container');
const template = document.getElementById('review-template');

// Функция создания карточки
function createReviewCard(data) {
    const clone = template.content.cloneNode(true);
    clone.querySelector('.review-text').textContent = data.text;
    clone.querySelector('.reviewer-name').textContent = data.name;
    clone.querySelector('.reviewer-location').textContent = data.location;
    return clone;
}

// 1. Загрузка существующих из БД (пример)
async function loadReviews() {
    const response = await fetch('/api/reviews'); // Ваш эндпоинт
    const reviews = await response.json();
    reviews.forEach(review => {
        reviewsContainer.appendChild(createReviewCard(review));
    });
}

// 2. Добавление нового (вызывать при успешной отправке формы)
function addNewReview(newReviewData) {
    const newCard = createReviewCard(newReviewData);
    reviewsContainer.prepend(newCard); // Добавляет в начало списка
}
