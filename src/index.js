import './style.css'
import { Gallery } from '../bundler/gallery.js';

const element = document.getElementById('root')
const options = {
  imgs: [                      // Массив URL изображений
            'https://avatars.mds.yandex.net/i?id=9096e7b12b6be3b02ce4a28a01823c1a_l-4373502-images-thumbs&n=13',
            'https://cs10.pikabu.ru/post_img/2019/03/30/6/og_og_1553936648256039666.jpg',
            'https://sun1-55.userapi.com/impg/hbg9drQiEH-py3XKxvhAoqghy3QDjGCgMZ6WtA/pr4NWtBnv40.jpg?size=996x562&quality=96&sign=381c33c7a6161e60e1fb00a2744858ae&c_uniq_tag=WhEa1hz9D1S6XEGL1DVI32ZtPzPTSJ6T51I9xiQ3WyY&type=album',
            'https://avatars.mds.yandex.net/i?id=93ecc39b6c34531c07eeec18e9317a9bc8215c4c-10877207-images-thumbs&n=13'
  ],
  time: 3000,                  // Интервал автопрокрутки в ms
  infinity: true,              // Бесконечная прокрутка
  dotsApply: true,             // Показывать точки-индикаторы
  buttons: true                // Показывать кнопки навигации
}

new Gallery(element, options)