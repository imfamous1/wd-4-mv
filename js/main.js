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

// Запускаем инициализацию
init();

// Функция генерации QR-кода
function generateQRCode() {
    const qrContainer = document.getElementById('qrcode');
    if (qrContainer) {
        const currentUrl = window.location.href;
        // Очищаем контейнер
        qrContainer.innerHTML = '';
        
        // Пробуем использовать библиотеку QRCode
        if (typeof QRCode !== 'undefined') {
            try {
                QRCode.toCanvas(qrContainer, currentUrl, {
                    width: 200,
                    margin: 2,
                    color: {
                        dark: '#2c3e50',
                        light: '#ffffff'
                    }
                }, function (error) {
                    if (error) {
                        console.error('Ошибка генерации QR-кода:', error);
                        // Fallback на API генерации QR-кода
                        qrContainer.innerHTML = `<img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(currentUrl)}" alt="QR Code" style="max-width: 200px; display: block; margin: 0 auto;">`;
                    }
                });
            } catch (error) {
                console.error('Ошибка при генерации QR-кода:', error);
                // Fallback на API генерации QR-кода
                qrContainer.innerHTML = `<img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(currentUrl)}" alt="QR Code" style="max-width: 200px; display: block; margin: 0 auto;">`;
            }
        } else {
            // Fallback на API генерации QR-кода, если библиотека не загрузилась
            qrContainer.innerHTML = `<img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(currentUrl)}" alt="QR Code" style="max-width: 200px; display: block; margin: 0 auto;">`;
        }
    }
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
        practicumDiv.style.cssText = 'padding: 20px; background: #e8f4f8; border-radius: 8px; border-left: 4px solid #667eea; margin-top: 20px;';
        
        const title = document.createElement('h3');
        title.textContent = '📚 Дополнительный теоретический материал';
        title.style.cssText = 'margin-bottom: 10px; color: #2c3e50; font-size: 18px;';
        
        const link = document.createElement('a');
        link.href = 'Кокорин_Практикум_Web_design_Язык_JavaScript.docx';
        link.download = 'Кокорин_Практикум_Web_design_Язык_JavaScript.docx';
        link.className = 'practicum-link';
        link.style.cssText = 'display: inline-block; padding: 12px 24px; background: #667eea; color: white; text-decoration: none; border-radius: 6px; font-weight: 600; transition: background 0.2s;';
        link.textContent = '📥 Скачать практикум по JavaScript';
        
        const description = document.createElement('p');
        description.textContent = 'Практикум содержит дополнительный теоретический материал для углубленного изучения JavaScript';
        description.style.cssText = 'margin-top: 10px; color: #666; font-size: 14px;';
        
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
        
        // Генерируем QR-код в главном меню
        generateQRCode();
        
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
    // Регенерируем QR-код при возврате в главное меню
    generateQRCode();
});

// Кнопка "Назад к списку"
backToFilesBtn.addEventListener('click', () => {
    if (currentCategory) {
        showFileList(currentCategory);
    }
});
