# JSON, API и асинхронность в JavaScript

## JSON (JavaScript Object Notation)

JSON — это формат обмена данными, основанный на синтаксисе JavaScript. В JavaScript объекты представляются с помощью коллекций пар ключ-значение.

### Основные методы работы с JSON:

#### `JSON.stringify()` — преобразование объекта в JSON-строку

```javascript
const user = {
    name: "Иван",
    age: 25,
    city: "Москва"
};

const jsonString = JSON.stringify(user);
console.log(jsonString); 
// '{"name":"Иван","age":25,"city":"Москва"}'
```

#### `JSON.parse()` — преобразование JSON-строки в объект

```javascript
const jsonString = '{"name":"Иван","age":25,"city":"Москва"}';
const user = JSON.parse(jsonString);
console.log(user.name); // "Иван"
console.log(user.age);  // 25
```

### Примеры использования:

```javascript
// Сохранение в localStorage
const data = { theme: "dark", language: "ru" };
localStorage.setItem('settings', JSON.stringify(data));

// Чтение из localStorage
const savedData = JSON.parse(localStorage.getItem('settings'));
console.log(savedData.theme); // "dark"
```

## API (Application Programming Interface)

API — это набор правил, протоколов и инструментов, позволяющих различным приложениям взаимодействовать друг с другом.

### Типы API:

- **REST API** — самый популярный тип, использует HTTP-методы (GET, POST, PUT, DELETE)
- **GraphQL** — позволяет запрашивать только нужные данные
- **SOAP** — старый протокол, использует XML
- **WebSocket** — для двусторонней связи в реальном времени

### REST API примеры:

```javascript
// GET запрос
fetch('https://api.example.com/users')
    .then(response => response.json())
    .then(data => console.log(data));

// POST запрос
fetch('https://api.example.com/users', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: 'Иван', email: 'ivan@example.com' })
})
    .then(response => response.json())
    .then(data => console.log(data));
```

## Асинхронность

Асинхронность позволяет выполнять долгие операции (запросы к серверу или чтение файлов) без блокировки основного потока выполнения.

### Аналогия: заказ пиццы

Мы не ждем курьера у двери, а занимаемся другими делами, пока пиццу не доставят. Когда пицца приходит, мы обрабатываем это событие.

### Как работает асинхронность в JavaScript:

#### JavaScript движок (синхронный):

- Может делать только одно дело за раз
- Быстро выполняет простые задачи
- Не умеет ждать

#### Web API (помощники) — дают асинхронность:

- **`setTimeout`** — таймер
- **`fetch`** — курьер для HTTP-запросов
- **`addEventListener`** — слушатель событий
- **`FileReader`** — читатель файлов

#### Event Loop (диспетчер):

Связывает всю работу движка и асинхронности. Управляет очередью задач и обрабатывает события.

### Работа с асинхронным кодом

#### 1. Callbacks (устаревший подход):

```javascript
setTimeout(function() {
    console.log("Выполнено через 1 секунду");
}, 1000);
```

#### 2. Promises (обещания):

```javascript
fetch('https://api.example.com/data')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Ошибка:', error));
```

#### 3. async/await (современный подход):

```javascript
async function fetchData() {
    try {
        const response = await fetch('https://api.example.com/data');
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Ошибка:', error);
    }
}
```

## Практический пример: работа с API погоды

### Устаревший способ (Promises с .then):

```javascript
const cityName = 'Moscow';
const apiKey = 'e8f525c7dcc549ab9dc1f73bc66b80fc';
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log("Температура в Москве:", data.main.temp);
        console.log("Описание:", data.weather[0].description);
    })
    .catch(error => {
        console.error('Ошибка при получении данных:', error);
    });
```

### Современный способ (async/await):

```javascript
const cityName = 'Moscow';
const apiKey = 'e8f525c7dcc549ab9dc1f73bc66b80fc';
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

async function fetchWeatherData() {
    try {
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log(`Температура в Москве: ${data.main.temp}°C`);
        console.log(`Описание: ${data.weather[0].description}`);
        console.log(`Влажность: ${data.main.humidity}%`);
        
        return data;
    } catch (error) {
        console.error('Ошибка при получении данных о погоде:', error);
        throw error;
    }
}

// Вызов функции
fetchWeatherData();
```

### Улучшенная версия с обработкой ошибок:

```javascript
async function fetchWeatherData(cityName, apiKey) {
    try {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
        
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Город не найден');
            }
            if (response.status === 401) {
                throw new Error('Неверный API ключ');
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return {
            city: data.name,
            temperature: data.main.temp,
            description: data.weather[0].description,
            humidity: data.main.humidity,
            windSpeed: data.wind.speed
        };
    } catch (error) {
        console.error('Ошибка при получении данных о погоде:', error);
        throw error;
    }
}

// Использование
const apiKey = 'e8f525c7dcc549ab9dc1f73bc66b80fc';
fetchWeatherData('Moscow', apiKey)
    .then(weather => {
        console.log(`Погода в ${weather.city}:`);
        console.log(`Температура: ${weather.temperature}°C`);
        console.log(`Описание: ${weather.description}`);
    })
    .catch(error => {
        console.error('Не удалось получить данные:', error.message);
    });
```

## Лучшие практики

1. **Всегда обрабатывайте ошибки** при работе с асинхронным кодом
2. **Используйте async/await** вместо цепочек `.then()` для лучшей читаемости
3. **Проверяйте `response.ok`** перед парсингом JSON
4. **Храните API ключи в переменных окружения**, а не в коде
5. **Используйте `try/catch`** для обработки ошибок в async функциях
6. **Валидируйте данные** перед использованием
7. **Используйте деструктуризацию** для работы с объектами ответа

### Пример с деструктуризацией:

```javascript
async function fetchWeatherData(cityName, apiKey) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`);
        
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const { main, weather, name, wind } = await response.json();
        
        return {
            city: name,
            temperature: main.temp,
            description: weather[0].description,
            humidity: main.humidity,
            windSpeed: wind.speed
        };
    } catch (error) {
        console.error('Ошибка:', error);
        throw error;
    }
}
```
