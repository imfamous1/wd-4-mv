# Функции в JavaScript

Функции — это блоки кода, которые можно вызывать многократно. Они помогают организовать код, избежать дублирования и сделать программу более читаемой.

## Функции с параметрами по умолчанию

Параметры по умолчанию позволяют задать значения, которые будут использоваться, если аргумент не передан.

### Пример:

```javascript
function greet(name = "Гость", age = 18) {
    return `Привет ${name}! Тебе ${age} лет.`;
}

console.log(greet());                    // "Привет Гость! Тебе 18 лет."
console.log(greet("Евгений"));           // "Привет Евгений! Тебе 18 лет."
console.log(greet("Евгений", 25));       // "Привет Евгений! Тебе 25 лет."
```

## Работа с аргументами: rest-параметры

Rest-параметры (`...args`) позволяют функции принимать произвольное количество аргументов.

### Пример:

```javascript
function sumOfNumbers(...numbers) {
    let total = 0;
    console.log("Аргументы: ", numbers);

    for (const num of numbers) {
        total += num;
    }

    return total;
}

console.log(sumOfNumbers(12, 321, 312, 42)); // 687
console.log(sumOfNumbers(1, 2, 3));          // 6
```

**Примечание**: В современном JavaScript рекомендуется использовать `camelCase` для имен функций (`sumOfNumbers` вместо `sum_of_numbers`).

## Возвращение значений: return

Оператор `return` осуществляет выход из функции и может возвращать значение любого типа данных.

### Пример:

```javascript
function isEven(number) {
    return number % 2 === 0;
}

console.log(isEven(4)); // true
console.log(isEven(3)); // false

// Функция может возвращать разные типы данных
function getUserData(id) {
    if (id < 0) {
        return null; // возвращает null
    }
    return { id, name: "Иван" }; // возвращает объект
}
```

**Важно**: После выполнения `return` код функции прекращает выполнение.

## Стрелочные функции (Arrow Functions)

Стрелочные функции — современный синтаксис для создания функций. Они более лаконичны и имеют особенности в работе с `this`.

### Без аргументов:

```javascript
const sayHello = () => "Hello world!";
console.log(sayHello()); // "Hello world!"
```

### Один аргумент (скобки можно опустить):

```javascript
const double = x => x * 2;
console.log(double(10)); // 20
```

### Несколько аргументов:

```javascript
const add = (a, b) => a + b;
console.log(add(4, 2)); // 6
```

### Многострочная функция:

```javascript
const calculate = (a, b) => {
    const sum = a + b;
    const product = a * b;
    return { sum, product };
};

console.log(calculate(5, 10)); 
// { sum: 15, product: 50 }
```

### Сравнение с обычными функциями:

```javascript
// Обычная функция
function multiply(a, b) {
    return a * b;
}

// Стрелочная функция (эквивалент)
const multiply = (a, b) => a * b;
```

## Функциональные выражения vs Декларации

### Function Declaration (поднимается вверх):

```javascript
// Можно вызвать до объявления
console.log(greet("Иван")); // Работает!

function greet(name) {
    return `Привет, ${name}!`;
}
```

### Function Expression (не поднимается):

```javascript
// Нельзя вызвать до объявления
// console.log(greet("Иван")); // Ошибка!

const greet = function(name) {
    return `Привет, ${name}!`;
};
```

## Лучшие практики

1. **Используйте понятные имена**: `calculateTotal` вместо `calc`
2. **Одна функция — одна задача**: функция должна делать что-то одно
3. **Избегайте слишком длинных функций**: если функция больше 20-30 строк, подумайте о разбиении
4. **Используйте стрелочные функции** для коротких операций и колбэков
5. **Документируйте сложные функции** комментариями
