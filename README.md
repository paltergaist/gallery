# Gallery

Простая и легкая галерея изображений с автопрокруткой.

## Использование

### Как модуль ES6:
```js
import { Gallery } from './gallery.js';

const element = document.getElementById('root')
const options = {
  imgs: [
    // Массив URL изображений
  ],
  time: 3000,                  // Интервал автопрокрутки в ms
  infinity: true,              // Бесконечная прокрутка
  dotsApply: true,             // Показывать точки-индикаторы
  buttons: true                // Показывать кнопки навигации
}

new Gallery(element, options)
```

### Как готовые файлы:

В папке `bundlers/` находятся готовые файлы для использования:

- **gallery.js** - Обычная версия JavaScript
- **gallery.min.js** - Минифицированная версия JavaScript  
- **gallery.css** - Обычная версия CSS
- **gallery.min.css** - Минифицированная версия CSS

```html
<!-- Для разработки -->
<link rel="stylesheet" href="bundlers/gallery.css">
<script src="bundlers/gallery.js"></script>

<!-- Для продакшена -->
<link rel="stylesheet" href="bundlers/gallery.min.css">
<script src="bundlers/gallery.min.js"></script>
```

## Сборка

```bash
# Сборка основного приложения
npm run dist

# Сборка файлов галереи для использования
npm run bundler

# Запуск сервера для показа демо
npm run start
```