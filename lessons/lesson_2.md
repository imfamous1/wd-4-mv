# Функции 
1. Функции с параметрами по умолчанию
function greet(name="Гость", age=18) {
    return `Привет ${name}! Тебе ${age} лет.`;
} 

console.log(greet());
console.log(greet("Евгений"));

2. Работа с аргументами (...args) - современный подход
function sum_of_numbers(...numbers) {
    let total = 0;
    console.log("Аргументы: ", numbers);

    for (const num of numbers) {
        total += num;
    }

    return total;
}

console.log(sum_of_numbers(12, 321, 312, 42));

3. Возвращение значений return 
function isEven(number) {
    return number % 2 === 0;
}

console.log(isEven(4));
console.log(isEven(3));

return - осуществляет выход из функции
может возвращать разные типы данных

4. Стрелочные функции (лямбда - выражения)
// Без аргументов
const sayHello = () => "Hello world!";
console.log(sayHello());

// Если один аргумент - скобки можно опустить
const double = x => x * 2;
console.log(double(10));

// Несколько аргументов
const add = (a, b) => a + b;
console.log(add(4,2));

// Многострочная функция 
const calculate = (a, b) => {
    const sum = a + b;
    const product = a * b;
    return {sum, product};
};

console.log(calculate(5, 10));

