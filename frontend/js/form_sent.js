document.addEventListener('DOMContentLoaded', () => {
    const contactForms = document.querySelectorAll('.contact_form');
    const successModal = document.getElementById('success-form');
    const closeBtn = document.getElementById('success-close-btn');

    contactForms.forEach(form => {
        // Убрали async, чтобы не ждать выполнения запроса
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());

            // --- ШАГ 1: Мгновенная реакция интерфейса ---
            showSuccess();
            this.reset();

            // --- ШАГ 2: Фоновая отправка данных ---
            fetch('/api/leads/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (!response.ok) {
                    console.error('Сервер ответил с ошибкой:', response.status);
                }
            })
            .catch(error => {
                console.error('Сетевая ошибка при фоновой отправке:', error);
            });
        });
    });

    function showSuccess() {
        successModal.classList.add('is-active');
        setTimeout(() => {
            successModal.classList.remove('is-active');
        }, 2000);
    }

    [closeBtn, window].forEach(el => {
        const eventTarget = el === window ? window : closeBtn;
        eventTarget.addEventListener('click', (e) => {
            if (el === window && e.target !== successModal) return;
            successModal.classList.remove('is-active');
        });
    });
});
