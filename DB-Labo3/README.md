# DB-Labo3: Client-Server Movie Database System

Клієнт-серверна веб-система з використанням WebSockets, Redis для Rate Limiting та Neo4j як основної бази даних.

## Архітектура

- **Server**: Express.js + WebSocket сервер з обробкою запитів
- **Redis**: Rate Limiting з "ковзним вікном" (sliding window)  
- **Neo4j**: База даних для зберігання інформації про фільми
- **Client**: Веб-інтерфейс з HTML/CSS/JavaScript

## Швидкий старт

### 1. Встановлення залежностей
```bash
cd server
npm install
```

### 2. Запуск баз даних
- **Redis**: `redis-server` (порт 6379)
- **Neo4j**: запустіть Neo4j Desktop або Community (порт 7687, пароль: `password`)

### 3. Ініціалізація даних
```bash
npm run setup
```

### 4. Запуск сервера
```bash
npm start
```

### 5. Відкриття веб-додатку
**http://localhost:3000**

## Функціональність

### ✅ Rate Limiting (Redis)
- **Ліміт**: 10 запитів на хвилину на клієнта
- **Ідентифікація**: за IP-адресою клієнта
- **Алгоритм**: "ковзне вікно" з використанням Redis ZSET
- **Поведінка**: при перевищенні → "Too Many Requests"

### ✅ База даних фільмів (Neo4j)
- **15 попередньо завантажених фільмів**
- **Пошук за назвою** (case-insensitive)
- **Cypher запити** для отримання даних
- **Поля**: title, released, tagline

### ✅ Веб-інтерфейс
- **WebSocket з'єднання** для реального часу
- **REST API** як альтернатива
- **Health Check** для перевірки статусу баз даних
- **Тестування Rate Limiting** (15 запитів підряд)

## API

### WebSocket
```javascript
// Підключення
ws://localhost:3000

// Запит фільмів
{"action": "getMovies", "query": "Matrix"}

// Відповідь
{"success": true, "data": [...], "count": 3}
```

### REST API
```bash
# Всі фільми
GET /api/movies

# Пошук
GET /api/movies?q=Matrix

# Статус системи
GET /api/health
```

## Тестування

### Rate Limiting
1. Відкрийте веб-додаток
2. Натисніть "Connect"
3. Натисніть "Test Rate Limit"
4. Спостерігайте за повідомленням після 10-го запиту

### Бази даних
1. Натисніть "Check Health"
2. Повинно показати: ✅ Redis: connected, Neo4j: connected

## Структура проекту

```
DB-Labo3/
├── server/
│   ├── server.js          # Основний сервер
│   ├── setup.js           # Ініціалізація БД
│   └── package.json       # Залежності
├── client/
│   ├── index.html         # Веб-інтерфейс
│   ├── app.js            # JavaScript клієнт
│   └── package.json
├── docker-compose.yml     # Docker (опціонально)
├── install-guide.md       # Детальна інструкція
└── README.md
```

## Відповідність технічному завданню

✅ **Серверний застосунок** - Express.js + WebSocket на порту 3000  
✅ **Новий потік для кожного клієнта** - WebSocket connection handling  
✅ **Rate Limiting з Redis** - ковзне вікно, 10 запитів/хвилину  
✅ **Ідентифікація клієнта** - за IP-адресою  
✅ **Neo4j база даних** - зберігання та запити фільмів  
✅ **Клієнтський застосунок** - веб-інтерфейс з запитами до сервера  

Система повністю реалізує всі вимоги лабораторної роботи з сучасним веб-інтерфейсом!