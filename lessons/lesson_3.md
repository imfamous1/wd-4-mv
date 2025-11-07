# Взаимодействие с DOM-элементами

DOM (Document Object Model) — это представление HTML-документа в виде дерева объектов, с которым JavaScript может взаимодействовать.

## Поиск элементов в DOM

### Основные методы:

1. **`document.getElementById(id)`** — находит элемент по его ID

```javascript
const header = document.getElementById('header');
```

2. **`document.querySelector(cssSelector)`** — находит первый элемент, соответствующий CSS-селектору

```javascript
const button = document.querySelector('.btn-primary');
const firstParagraph = document.querySelector('p');
```

3. **`document.querySelectorAll(cssSelector)`** — находит все элементы, соответствующие селектору

```javascript
const allButtons = document.querySelectorAll('.btn');
// Возвращает NodeList (похож на массив)
```

### Другие полезные методы:

```javascript
// Поиск по классу
document.getElementsByClassName('item');

// Поиск по тегу
document.getElementsByTagName('div');

// Поиск внутри элемента
const container = document.querySelector('.container');
const child = container.querySelector('.child');
```

## Изменение текста

### textContent vs innerHTML:

1. **`textContent`** — получает или задает чисто текстовое содержимое элемента (без HTML-тегов)

```javascript
const element = document.querySelector('.text');
element.textContent = "Новый текст";
console.log(element.textContent); // "Новый текст"
```

2. **`innerHTML`** — получает или задает HTML-содержимое элемента и позволяет вставлять новые теги

```javascript
const element = document.querySelector('.content');
element.innerHTML = "<strong>Жирный текст</strong>";
```

**Важно**: Используйте `textContent` для безопасности (защита от XSS-атак), если не нужно вставлять HTML.

## Изменение атрибутов

### Методы работы с атрибутами:

1. **`element.setAttribute(name, value)`** — устанавливает новый атрибут

```javascript
const img = document.querySelector('img');
img.setAttribute('src', 'new-image.jpg');
img.setAttribute('alt', 'Описание изображения');
```

2. **`element.getAttribute(name)`** — читает значение атрибута

```javascript
const src = img.getAttribute('src');
console.log(src); // "new-image.jpg"
```

3. **Прямое обращение к свойствам** (удобнее и быстрее)

```javascript
img.src = 'new-image.jpg';
img.alt = 'Описание';
img.className = 'image-class';
img.id = 'my-image';
```

## Управление CSS-свойствами

### Работа с классами (рекомендуемый подход):

1. **`element.classList.add(className)`** — добавляет класс

```javascript
const button = document.querySelector('.btn');
button.classList.add('active');
```

2. **`element.classList.remove(className)`** — удаляет класс

```javascript
button.classList.remove('disabled');
```

3. **`element.classList.toggle(className)`** — добавляет класс, если его нет, и удаляет, если есть

```javascript
button.classList.toggle('active');
```

4. **`element.classList.contains(className)`** — проверяет наличие класса

```javascript
if (button.classList.contains('active')) {
    console.log('Кнопка активна');
}
```

### Прямое изменение стилей:

Позволяет менять конкретные CSS-свойства напрямую:

```javascript
const element = document.querySelector('.box');
element.style.color = 'red';
element.style.backgroundColor = 'blue';
element.style.fontSize = '20px';
element.style.display = 'none';
```

**Примечание**: CSS-свойства в camelCase (`backgroundColor` вместо `background-color`).

## Создание и удаление элементов

### Создание элементов:

1. **`document.createElement(tagName)`** — создает новый пустой элемент

```javascript
const newDiv = document.createElement('div');
newDiv.textContent = 'Новый элемент';
newDiv.className = 'new-class';
```

### Добавление элементов на страницу:

2. **`parentElement.appendChild(newElement)`** — добавляет элемент в конец родителя

```javascript
const container = document.querySelector('.container');
container.appendChild(newDiv);
```

3. **`parentElement.insertBefore(newElement, referenceElement)`** — вставляет новый элемент перед указанным

```javascript
const firstChild = container.firstElementChild;
container.insertBefore(newDiv, firstChild);
```

4. **`parentElement.insertAdjacentHTML(position, html)`** — вставляет HTML в указанную позицию

```javascript
container.insertAdjacentHTML('beforeend', '<p>Новый параграф</p>');
// Позиции: 'beforebegin', 'afterbegin', 'beforeend', 'afterend'
```

### Удаление элементов:

5. **`element.remove()`** — удаляет элемент из DOM

```javascript
const element = document.querySelector('.to-remove');
element.remove();
```

Альтернативный способ:

```javascript
const parent = element.parentElement;
parent.removeChild(element);
```

## Обработка событий

События — это действия пользователя или браузера (клик, наведение, нажатие клавиши и т.д.).

### Основной метод:

**`element.addEventListener(event, handler)`** — добавляет обработчик события

```javascript
const button = document.querySelector('.btn');

button.addEventListener('click', function() {
    console.log('Кнопка нажата!');
});

// Или со стрелочной функцией
button.addEventListener('click', () => {
    console.log('Кнопка нажата!');
});
```

### Основные типы событий:

- **`click`** — клик мышью
- **`mouseover`** / **`mouseout`** — наведение курсора на элемент и уход с него
- **`mouseenter`** / **`mouseleave`** — аналогично, но не всплывают
- **`keydown`** / **`keyup`** — нажатие и отпускание клавиш
- **`submit`** — отправка формы
- **`input`** — изменение значения в поле ввода
- **`change`** — изменение значения (после потери фокуса)
- **`focus`** / **`blur`** — получение и потеря фокуса
- **`DOMContentLoaded`** — событие на `document`, которое означает, что DOM полностью загружен и готов к работе

### Пример обработки событий:

```javascript
// Ожидание загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    const button = document.querySelector('.btn');
    
    button.addEventListener('click', function() {
        this.classList.toggle('active');
    });
    
    // Обработка формы
    const form = document.querySelector('form');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Предотвращаем стандартную отправку
        console.log('Форма отправлена!');
    });
});
```

### Удаление обработчика:

```javascript
function handleClick() {
    console.log('Клик!');
}

button.addEventListener('click', handleClick);
// Позже можно удалить
button.removeEventListener('click', handleClick);
```

## Лучшие практики

1. **Всегда используйте `DOMContentLoaded`** для кода, который работает с DOM
2. **Предпочитайте `querySelector`** современным методам (`getElementById` и т.д.)
3. **Используйте `textContent` вместо `innerHTML`**, когда возможно
4. **Работайте с классами**, а не напрямую со стилями
5. **Удаляйте обработчики событий**, когда они больше не нужны (для предотвращения утечек памяти)
