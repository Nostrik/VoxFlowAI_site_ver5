#FROM python:3.11-slim
#
#WORKDIR /app
#
#COPY pyproject.toml poetry.lock ./
#
#RUN pip install poetry && poetry install --no-root
#
#COPY . .
#
#EXPOSE 8000
#
#CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
# Используем легковесный базовый образ Python
FROM python:3.11-slim

# Настройки Poetry
ENV POETRY_VERSION=1.7.1 \
    POETRY_HOME="/opt/poetry" \
    POETRY_VIRTUALENVS_CREATE=false \
    PATH="/opt/poetry/bin:$PATH"

# Устанавливаем curl и зависимости для сборки (если пригодятся)
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

# Устанавливаем Poetry одним слоем
RUN curl -sSL https://install.python-poetry.org | python3 -

WORKDIR /app

# Сначала только файлы зависимостей (для кэширования слоев)
COPY pyproject.toml poetry.lock ./

# Устанавливаем пакеты прямо в систему
RUN poetry install --no-interaction --no-ansi --no-root

# Копируем остальной код
COPY . .

# Проверяем, что uvicorn доступен, и запускаем
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]


