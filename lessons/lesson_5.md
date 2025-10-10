# Модули
Есть проблема: весь код пишется в одном файле, с ростом проекта:
– становится невозможно найти нужную функцию;
– переменные конфликтуют друг с другом;
– сложно понимать, какие части кода связаны между собой;
– сложнее работать в команде

Решением являются модули: - обычный js файл, который может экспортировать какие-то переменные, функции, классы или импортировать их из других модулей. 

utils.js:
export function sum_of_numbers(number1, number2) {
    return number1 + number2;
}

main.js:
import { sum_of_numbers } from './modules/utils.js';
console.log(sum_of_numbers(123, 32131));

index.html:
<script type="module" src="js/modules/utils.js"></script>
<script type="module" src="js/main.js"></script>