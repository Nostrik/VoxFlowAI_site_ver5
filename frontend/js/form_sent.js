//document.addEventListener('DOMContentLoaded', () => {
//    // Находим все формы и элементы модалки
//    const contactForms = document.querySelectorAll('.contact_form');
//    const successModal = document.getElementById('success-form');
//    const closeBtn = document.getElementById('success-close-btn');
//
//    contactForms.forEach(form => {
//        form.addEventListener('submit', async function(e) {
//            e.preventDefault();
//
//            // Собираем данные
//            const formData = new FormData(this);
//            const data = Object.fromEntries(formData.entries());
//
//            try {
//                // Пытаемся отправить данные на сервер
//                // const response = await fetch('https://your-api-endpoint.com', {
//                //     method: 'POST',
//                //     headers: { 'Content-Type': 'application/json' },
//                //     body: JSON.stringify(data)
//                // });
//
//                if (response.ok) {
//                    console.log('Данные успешно доставлены на сервер');
//                }
//            } catch (error) {
//                // Если сервера нет, просто пишем в консоль и идем дальше к показу модалки
//                console.error('Ошибка сети или сервер не найден:', error);
//            } finally {
//                // ЭТОТ БЛОК ВЫПОЛНИТСЯ ВСЕГДА:
//
//                // 1. Показываем модалку
//                successModal.classList.add('is-active');
//
//                // 2. Очищаем все поля (теперь они точно исчезнут)
//                this.reset();
//
//                // 3. Закрываем через 1 секунду
//                setTimeout(() => {
//                    successModal.classList.remove('is-active');
//                }, 2000); // время зависания модального окна
//            }
//        });
//    });
//
//    // Обработка закрытия модалки вручную
//    if (closeBtn) {
//        closeBtn.addEventListener('click', () => {
//            successModal.classList.remove('is-active');
//        });
//    }
//
//    window.addEventListener('click', (e) => {
//        if (e.target === successModal) {
//            successModal.classList.remove('is-active');
//        }
//    });
//});

//document.addEventListener('DOMContentLoaded', () => {
//    const contactForms = document.querySelectorAll('.contact_form');
//    const successModal = document.getElementById('success-form');
//    const closeBtn = document.getElementById('success-close-btn');
//
//    contactForms.forEach(form => {
//        form.addEventListener('submit', async function(e) {
//            e.preventDefault();
//
//            const formData = new FormData(this);
//            const data = Object.fromEntries(formData.entries());
//
//            try {
//                // 1. Отправляем именно на /api/leads/
//                const response = await fetch('/api/leads', {
//                    method: 'POST',
//                    headers: { 'Content-Type': 'application/json' },
//                    body: JSON.stringify(data)
//                });
//
//                if (response.ok) {
//                    // 2. Показываем успех ТОЛЬКО если сервер ответил 200-299
//                    showSuccess();
//                    this.reset();
//                } else {
//                    // Сервер ответил ошибкой (например, 422 или 500)
//                    const errorData = await response.json();
//                    alert(`Ошибка: ${errorData.detail || 'Не удалось отправить форму'}`);
//                }
//            } catch (error) {
//                console.error('Ошибка сети:', error);
//                alert('Проблема с соединением. Попробуйте позже.');
//            }
//        });
//    });
//
//    // Вынес логику показа в отдельную функцию
//    function showSuccess() {
//        successModal.classList.add('is-active');
//        setTimeout(() => {
//            successModal.classList.remove('is-active');
//        }, 2000);
//    }
//
//    // Закрытие вручную
//    [closeBtn, window].forEach(el => {
//        const eventTarget = el === window ? window : closeBtn;
//        eventTarget.addEventListener('click', (e) => {
//            if (el === window && e.target !== successModal) return;
//            successModal.classList.remove('is-active');
//        });
//    });
//});

document.addEventListener('DOMContentLoaded', () => {
    const contactForms = document.querySelectorAll('.contact_form');
    const successModal = document.getElementById('success-form');
    const closeBtn = document.getElementById('success-close-btn');

    contactForms.forEach(form => {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();

            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());

            try {
                // 1. Отправляем именно на /api/leads/
                const response = await fetch('/api/leads/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    // 2. Показываем успех ТОЛЬКО если сервер ответил 200-299
                    showSuccess();
                    this.reset();
                } else {
                    // Сервер ответил ошибкой (например, 404, 422 или 500)
                    console.error('Сервер ответил с ошибкой:', response.status);
                    const errorText = await response.text(); // Читаем ответ как текст
                    console.error('Тело ответа:', errorText);

                    try {
                        // Попробуем распарсить текст как JSON, если он есть
                        const errorData = JSON.parse(errorText);
                        alert(`Ошибка: ${errorData.detail || 'Не удалось отправить форму'}`);
                    } catch (e) {
                        // Если парсинг JSON не удался (например, это был HTML 404), покажем общий алерт
                        alert('Произошла ошибка на сервере. Попробуйте позже.');
                    }
                }
            } catch (error) {
                console.error('Ошибка сети:', error);
                alert('Проблема с соединением. Попробуйте позже.');
            }
        });
    });

    // Вынес логику показа в отдельную функцию
    function showSuccess() {
        successModal.classList.add('is-active');
        setTimeout(() => {
            successModal.classList.remove('is-active');
        }, 2000);
    }

    // Закрытие вручную
    [closeBtn, window].forEach(el => {
        const eventTarget = el === window ? window : closeBtn;
        eventTarget.addEventListener('click', (e) => {
            if (el === window && e.target !== successModal) return;
            successModal.classList.remove('is-active');
        });
    });
});
