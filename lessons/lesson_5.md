# Модули в JavaScript

Модули — это способ организации кода, который позволяет разделять программу на отдельные файлы с четко определенными интерфейсами.

## Проблема без модулей

Когда весь код пишется в одном файле, с ростом проекта возникают проблемы:

- Становится невозможно найти нужную функцию
- Переменные конфликтуют друг с другом (глобальное пространство имен)
- Сложно понимать, какие части кода связаны между собой
- Сложнее работать в команде (конфликты при слиянии кода)
- Нет возможности переиспользовать код в других проектах

## Решение: ES6 Модули

Модуль — это обычный JavaScript файл, который может:

- **Экспортировать** переменные, функции, классы для использования в других модулях
- **Импортировать** переменные, функции, классы из других модулей

## Синтаксис модулей

### Экспорт (export)

#### Именованный экспорт:

```javascript
// utils.js
export function sumOfNumbers(number1, number2) {
    return number1 + number2;
}

export function multiply(a, b) {
    return a * b;
}

export const PI = 3.14159;
```

#### Экспорт по умолчанию:

```javascript
// calculator.js
export default class Calculator {
    add(a, b) {
        return a + b;
    }
    
    subtract(a, b) {
        return a - b;
    }
}
```

#### Групповой экспорт:

```javascript
// utils.js
function sumOfNumbers(number1, number2) {
    return number1 + number2;
}

function multiply(a, b) {
    return a * b;
}

const PI = 3.14159;

// Экспорт всех функций в конце файла
export { sumOfNumbers, multiply, PI };
```

### Импорт (import)

#### Именованный импорт:

```javascript
// main.js
import { sumOfNumbers, multiply } from './modules/utils.js';

console.log(sumOfNumbers(123, 32131)); // 32254
console.log(multiply(5, 4));           // 20
```

#### Импорт с переименованием:

```javascript
import { sumOfNumbers as sum, multiply as mult } from './modules/utils.js';

console.log(sum(10, 20)); // 30
```

#### Импорт всего модуля:

```javascript
import * as utils from './modules/utils.js';

console.log(utils.sumOfNumbers(5, 3)); // 8
console.log(utils.PI);                  // 3.14159
```

#### Импорт по умолчанию:

```javascript
// main.js
import Calculator from './modules/calculator.js';

const calc = new Calculator();
console.log(calc.add(5, 3)); // 8
```

#### Комбинированный импорт:

```javascript
import Calculator, { sumOfNumbers, PI } from './modules/index.js';
```

## Подключение модулей в HTML

Для использования ES6 модулей в браузере необходимо указать `type="module"` в теге `<script>`:

```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Модули</title>
</head>
<body>
    <!-- HTML контент -->
    
    <!-- Подключение модулей -->
    <script type="module" src="js/main.js"></script>
</body>
</html>
```

**Важно**: 
- Модули выполняются в строгом режиме (`'use strict'`)
- Модули имеют свою область видимости (не загрязняют глобальное пространство)
- Модули загружаются один раз, даже если импортированы в нескольких местах

## Пример структуры проекта

```
project/
├── index.html
└── js/
    ├── main.js
    └── modules/
        ├── utils.js
        ├── calculator.js
        └── api.js
```

### utils.js:

```javascript
export function sumOfNumbers(number1, number2) {
    return number1 + number2;
}

export function formatCurrency(amount) {
    return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB'
    }).format(amount);
}
```

### calculator.js:

```javascript
import { sumOfNumbers } from './utils.js';

export default class Calculator {
    add(a, b) {
        return sumOfNumbers(a, b);
    }
    
    multiply(a, b) {
        return a * b;
    }
}
```

### main.js:

```javascript
import Calculator from './modules/calculator.js';
import { formatCurrency } from './modules/utils.js';

const calc = new Calculator();
const result = calc.add(123, 32131);
console.log(formatCurrency(result)); // "32 254,00 ₽"
```

## Преимущества модулей

1. **Изоляция кода** — каждая часть кода в своем модуле
2. **Переиспользование** — модули можно использовать в разных проектах
3. **Организация** — четкая структура проекта
4. **Тестируемость** — легко тестировать отдельные модули
5. **Производительность** — браузер может кэшировать модули
6. **Дерево зависимостей** — явные зависимости между модулями

## Лучшие практики

1. **Один модуль — одна ответственность** — модуль должен решать одну задачу
2. **Используйте именованный экспорт** для утилит и функций
3. **Используйте экспорт по умолчанию** для классов и основных сущностей
4. **Группируйте связанные модули** в папки
5. **Создавайте index.js** для удобного импорта из папки:

```javascript
// modules/index.js
export { sumOfNumbers, multiply } from './utils.js';
export { default as Calculator } from './calculator.js';

// Теперь можно импортировать так:
import { sumOfNumbers, Calculator } from './modules/index.js';
```

6. **Используйте абсолютные пути** для избежания проблем с относительными путями (в больших проектах)
