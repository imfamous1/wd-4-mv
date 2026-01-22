// Структура файлов будет загружаться динамически из index.json
let fileStructure = {};

// Загрузка индекса файлов
async function loadFileIndex() {
    try {
        const response = await fetch('index.json');
        if (!response.ok) {
            throw new Error(`Ошибка загрузки индекса: ${response.status}`);
        }
        fileStructure = await response.json();
        console.log('Индекс файлов загружен:', fileStructure);
    } catch (error) {
        console.error('Ошибка при загрузке индекса файлов:', error);
        // Fallback на пустую структуру
        fileStructure = {
            tasks: [],
            lessons: [],
            exam: []
        };
    }
}

// Названия категорий
const categoryNames = {
    tasks: 'Задания',
    lessons: 'Уроки',
    exam: 'Экзамен'
};

// Элементы DOM
const categorySelection = document.getElementById('categorySelection');
const fileList = document.getElementById('fileList');
const contentViewer = document.getElementById('contentViewer');
const categoryTitle = document.getElementById('categoryTitle');
const fileItems = document.getElementById('fileItems');
const fileTitle = document.getElementById('fileTitle');
const contentBody = document.getElementById('contentBody');
const backBtn = document.getElementById('backBtn');
const backToFilesBtn = document.getElementById('backToFilesBtn');

let currentCategory = null;
let indexLoaded = false;

// Инициализация при загрузке страницы
async function init() {
    await loadFileIndex();
    indexLoaded = true;
    
    // Активируем кнопки категорий после загрузки индекса
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (!indexLoaded) {
                console.warn('Индекс еще не загружен');
                return;
            }
            const category = btn.dataset.category;
            showFileList(category);
        });
    });
}

// Переключение темы
document.addEventListener('DOMContentLoaded', () => {
    // Устанавливаем начальную тему
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Обработчик клика на тумблер
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }
});

// Запускаем инициализацию после загрузки DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Показать список файлов
function showFileList(category) {
    currentCategory = category;
    categorySelection.style.display = 'none';
    fileList.style.display = 'block';
    contentViewer.style.display = 'none';
    
    categoryTitle.textContent = categoryNames[category];
    fileItems.innerHTML = '';
    
    const files = fileStructure[category] || [];
    
    if (files.length === 0) {
        fileItems.innerHTML = '<li><p style="color: #999; padding: 20px; text-align: center;">Файлы не найдены. Запустите скрипт generate-index.js для обновления индекса.</p></li>';
        return;
    }
    
    files.forEach(file => {
        const li = document.createElement('li');
        const button = document.createElement('button');
        button.className = 'file-item-btn';
        button.textContent = file.name;
        button.addEventListener('click', () => {
            loadFile(category, file.file, file.name);
        });
        li.appendChild(button);
        fileItems.appendChild(li);
    });
    
    // Добавляем кнопку на практикум в разделе уроков
    if (category === 'lessons') {
        const li = document.createElement('li');
        const practicumDiv = document.createElement('div');
        practicumDiv.className = 'practicum-container';
        practicumDiv.style.cssText = 'padding: 20px; background: var(--glass-bg); backdrop-filter: blur(20px) saturate(180%); -webkit-backdrop-filter: blur(20px) saturate(180%); border: 0.5px solid var(--separator); border-radius: 12px; margin-top: 20px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 0 rgba(0, 0, 0, 0.02) inset;';
        
        const title = document.createElement('h3');
        title.textContent = '📚 Дополнительный теоретический материал';
        title.style.cssText = 'margin-bottom: 12px; color: var(--text-primary); font-size: 17px; font-weight: 600;';
        
        const link = document.createElement('a');
        link.href = 'Кокорин_Практикум_Web_design_Язык_JavaScript.docx';
        link.download = 'Кокорин_Практикум_Web_design_Язык_JavaScript.docx';
        link.className = 'practicum-link';
        link.style.cssText = 'display: inline-block; padding: 10px 20px; background: var(--accent); color: white; text-decoration: none; border-radius: 8px; font-size: 15px; font-weight: 400; transition: all 0.2s; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);';
        link.textContent = '📥 Скачать практикум по JavaScript';
        link.addEventListener('mouseenter', () => {
            link.style.background = 'var(--accent-hover)';
            link.style.transform = 'scale(1.02)';
        });
        link.addEventListener('mouseleave', () => {
            link.style.background = 'var(--accent)';
            link.style.transform = 'scale(1)';
        });
        
        const description = document.createElement('p');
        description.textContent = 'Практикум содержит дополнительный теоретический материал для углубленного изучения JavaScript';
        description.style.cssText = 'margin-top: 12px; color: var(--text-tertiary); font-size: 15px; font-weight: 400;';
        
        practicumDiv.appendChild(title);
        practicumDiv.appendChild(link);
        practicumDiv.appendChild(description);
        li.appendChild(practicumDiv);
        fileItems.appendChild(li);
    }
}

// Загрузить и отобразить файл
async function loadFile(category, filename, displayName) {
    try {
        const path = `${category}/${filename}`;
        const response = await fetch(path);
        
        if (!response.ok) {
            throw new Error(`Ошибка загрузки файла: ${response.status}`);
        }
        
        const markdown = await response.text();
        // Используем библиотеку marked.js для парсинга Markdown
        const html = marked.parse(markdown);
        
        fileTitle.textContent = displayName;
        contentBody.innerHTML = html;
        
        fileList.style.display = 'none';
        contentViewer.style.display = 'block';
    } catch (error) {
        console.error('Ошибка при загрузке файла:', error);
        contentBody.innerHTML = `<p class="error">Ошибка загрузки файла: ${error.message}</p>`;
    }
}

// Теперь используем библиотеку marked.js вместо самописного парсера
// Она уже подключена через CDN в index.html

// Кнопка "Назад к категориям"
backBtn.addEventListener('click', () => {
    categorySelection.style.display = 'block';
    fileList.style.display = 'none';
    contentViewer.style.display = 'none';
    currentCategory = null;
});

// Кнопка "Назад к списку"
backToFilesBtn.addEventListener('click', () => {
    if (currentCategory) {
        showFileList(currentCategory);
    }
});
