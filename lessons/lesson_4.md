# ООП в современном JavaScript

Объектно-ориентированное программирование (ООП) — парадигма программирования, основанная на концепции объектов.

## Эволюция подходов к программированию

### Линейный подход
Последовательное выполнение инструкций без структурирования.

### Процедурный подход
Разбиение кода на функции (процедуры). Хорошо работал для небольших скриптов (200-500 строк), но все еще представляет собой последовательный список инструкций.

### ООП подход
Был придуман для управления сложностью в больших проектах (10к+ строк кода). Вместо одного большого куска кода программа разбивается на независимые, взаимодействующие объекты.

## Основная идея ООП

Программа — это набор объектов, где каждый объект:

- **Автономен** — отвечает только за свою собственную логику и данные
- **Взаимодействует** с другими объектами через четко определенный публичный интерфейс
- **Представляет** что-либо: как реальную сущность (пользователь, товар и т.д.), так и абстрактное понятие (сервис, логгер и др.)

## Три столпа ООП

### 1. Инкапсуляция

Объединение данных (свойств) и методов, которые с этими данными работают, внутри одного объекта. Сокрытие внутренней реализации — внешний код работает с объектом только через его публичные методы.

**Пример:**

```javascript
class BankAccount {
    #balance = 0; // Приватное поле (инкапсуляция)

    deposit(amount) {
        if (amount > 0) {
            this.#balance += amount;
        }
    }

    getBalance() {
        return this.#balance; // Публичный метод для доступа
    }
}

const account = new BankAccount();
account.deposit(100);
console.log(account.getBalance()); // 100
// account.#balance - ошибка! Прямой доступ невозможен
```

### 2. Наследование

Возможность создавать новый класс (дочерний) на основе существующего (родительского). Дочерний класс наследует свойства и методы родителя и может добавлять свои или изменять унаследованные.

**Пример:**

```javascript
class Animal {
    constructor(name) {
        this.name = name;
    }

    speak() {
        console.log(`${this.name} издает звук`);
    }
}

class Dog extends Animal {
    speak() {
        console.log(`${this.name} лает: Гав-гав!`);
    }

    fetch() {
        console.log(`${this.name} принес мяч`);
    }
}

const dog = new Dog("Бобик");
dog.speak(); // "Бобик лает: Гав-гав!"
dog.fetch(); // "Бобик принес мяч"
```

### 3. Полиморфизм

Возможность объектов с одинаковым интерфейсом иметь разную реализацию. Один и тот же метод может работать по-разному в разных классах.

**Пример:**

```javascript
class Shape {
    area() {
        throw new Error("Метод должен быть переопределен");
    }
}

class Circle extends Shape {
    constructor(radius) {
        super();
        this.radius = radius;
    }

    area() {
        return Math.PI * this.radius ** 2;
    }
}

class Rectangle extends Shape {
    constructor(width, height) {
        super();
        this.width = width;
        this.height = height;
    }

    area() {
        return this.width * this.height;
    }
}

const circle = new Circle(5);
const rectangle = new Rectangle(4, 6);

console.log(circle.area());    // 78.54...
console.log(rectangle.area()); // 24
```

## Класс — чертеж для создания объектов

Класс — это шаблон (чертеж) для создания объектов. Из одного класса можно создать множество экземпляров (объектов).

### Базовый синтаксис класса:

```javascript
class User {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }

    greet() {
        return `Привет, меня зовут ${this.name}`;
    }
}

// Создание экземпляров (объектов)
const user1 = new User("Иван", "ivan@example.com");
const user2 = new User("Мария", "maria@example.com");

console.log(user1.greet()); // "Привет, меня зовут Иван"
console.log(user2.greet()); // "Привет, меня зовут Мария"
```

### Приватные поля и методы:

```javascript
class Counter {
    #count = 0; // Приватное поле

    increment() {
        this.#count++;
    }

    getCount() {
        return this.#count;
    }

    #validate(value) { // Приватный метод
        return value > 0;
    }
}

const counter = new Counter();
counter.increment();
console.log(counter.getCount()); // 1
// counter.#count - ошибка!
```

### Статические методы и свойства:

```javascript
class MathHelper {
    static PI = 3.14159;

    static add(a, b) {
        return a + b;
    }

    static multiply(a, b) {
        return a * b;
    }
}

// Вызов без создания экземпляра
console.log(MathHelper.PI);              // 3.14159
console.log(MathHelper.add(5, 3));       // 8
console.log(MathHelper.multiply(4, 2));  // 8
```

### Геттеры и сеттеры:

```javascript
class Temperature {
    constructor(celsius) {
        this._celsius = celsius;
    }

    get celsius() {
        return this._celsius;
    }

    set celsius(value) {
        if (value < -273.15) {
            throw new Error("Температура не может быть ниже абсолютного нуля");
        }
        this._celsius = value;
    }

    get fahrenheit() {
        return this._celsius * 9/5 + 32;
    }
}

const temp = new Temperature(25);
console.log(temp.celsius);    // 25
console.log(temp.fahrenheit); // 77
temp.celsius = 30;
console.log(temp.fahrenheit); // 86
```

## Преимущества ООП

1. **Модульность** — код организован в логические блоки
2. **Переиспользование** — классы можно использовать многократно
3. **Поддерживаемость** — легче находить и исправлять ошибки
4. **Масштабируемость** — легко добавлять новый функционал
5. **Абстракция** — скрытие сложности реализации

## Когда использовать ООП

ООП особенно полезно для:

- Больших проектов с множеством сущностей
- Приложений с четкой структурой данных
- Систем, где важна инкапсуляция и безопасность данных
- Проектов, где нужна возможность расширения через наследование
