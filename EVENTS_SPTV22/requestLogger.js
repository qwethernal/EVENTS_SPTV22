const fs = require('fs');
const path = require('path');

// Путь к файлу лога
const logFilePath = path.join(__dirname, 'logger.csv');

// Проверка существования файла лога и добавление заголовков, если нужно
function initializeLog() {
    if (!fs.existsSync(logFilePath) || fs.statSync(logFilePath).size === 0) {
        fs.writeFileSync(logFilePath, 'Timestamp,Method,URL,StatusCode,StatusMessage\n');
    }
}

// Функция middleware для логирования запросов в CSV
const requestLogger = (req, res, next) => {
    res.on('finish', () => {
        // Форматирование данных запроса для CSV
        const logEntry = `${new Date().toISOString()},${req.method},${req.originalUrl},${res.statusCode},${res.statusMessage}\n`;

        // Запись лога в файл
        fs.appendFile(logFilePath, logEntry, (err) => {
            if (err) {
                console.error('Ошибка при записи в файл лога', err);
            }
        });
    });

    next();
};

initializeLog();

module.exports = requestLogger;
