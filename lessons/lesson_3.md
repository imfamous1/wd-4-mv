# Взаимодействие с DOM-элементами (Document Object Model)
1. document.getElementById() - находит элемент по его ID 
2. document.querySelector('css_selector') - находит первый элемент, соответствующий css - селектору

# Изменение текста
1. textContent - получает или задает чисто текстовой содержимое элемента
2. innerHTML - получает или задает HTML содержимое элемента и позволяет вставлять новые теги.

# Изменение атрибутов
1. element.setAttribute(name, value) - устанавливает новый атрибут
2. element.setAttribute(name) - читает значение атрибута
3. Прямое обращение к свойствам (удобнее) img.src 

# Управление css-свойствами
1. Лучше всего добавлять классы (element.classList.add(class_name))
2. Удалять классы element.classList.remove(class_name)
3. Добавляет класс, если его нет, и удаляет - element.classList.toggle(class_name)
4. Прямое изменение стилей - позволяет менять конкретные css-свойства

# Создание и удаление элементов
1. document.createElement(tagName) - создает новый пустой элемент
2. добавление на страницу в конец родителя - parentElement.appendChild(newElement) 
3. вставить новый элемент перед указанным parentElement.insertBefore(newElement, referenceElement) 
4. element.remove() - удаляет элемент из DOM

# Обработка событий
1. element.addEventListener('событие', 'функция обработчик')
– click - клик мышью
– mouseover / mouseout - наведение курсора на элемент и уход с него
- keydown / keyup - нажатие и отпускание клавиш
– submit - отправка формы
– DOMContentLoaded - событие на document, которое означает, что DOM полностью загружен и готов к работе

