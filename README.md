# Проект: Место

Проект представляет собой одностраничный сайт.
Состоит из 4 основных блоков, включая шапку и подвал сайта. Проект предоставляет возможность пользователю обновить данные профиля и аватар, добавить на страничку или удалить свою собственную карточку, поставить или снять свой "лайк". Весь функционал проекта написан на чистом js.
[Ссылка на проект в GitHub Pages](https://milanka-m.github.io/mesto/)

-------
### Стек:
* HTML5, CSS3;
* Java Script;
* API;
* БЭМ
-------
### Системные требования:
* `Интегрированная среда разработки (IDE): VS Code, Notepad++ или др., на Ваше усмотрение`
* `Версия языка: JavaScript ES6, Node.js v6`
* `Необходимые для работы расширения: Webpack, Babel`

-------
### Используемые технологии:
* взаимодействие с веб-страницей через Document Object Model (DOM) на языке JavaScript;
* построение запросов из JavaScript к API: загрузка информации о пользователе с сервера, загрузка карточек с сервера, редактирование профиля, добавление новой карточки, удаление карточки, постановка и снятие лайка карточки;
* открытие и закрытие всплывающих диалоговых окон (попап) "Обновить аватар", "Редактировать профиль", "Новое место", "Изображение" с помощью JavaScript;
* закрытие всплывающих диалоговых окон при помощи: клика на кнопку "Закрыть попап", нажатием на Esc, кликом на оверлей - используя технологии JavaScript;
* добавление карточек на страницу через форму всплывающего диалогового окна используя технологии JavaScript;
* реализация лайка и удаления карточки с помощью JavaScript;
* валидация форм "Обновить аватар", "Редактировать профиль", "Новое место" с помощью технологий встроенной браузерной валидации и Constraint validation API;
* сборка проекта с помощью Webpack;
* выравнивание и построения сеток с помощью flex;
* абсолютное и относительное позиционирование элементов;
* разработка интерфейса для разных устройств с помощью построения медиазапросов; 
* оптимизация шрифтов под устройства с различным разрешением;
* оптимизация изображений для более быстрой загрузки сайта;
* работа с макетом в Figma
[Ссылка на макет в Figma](https://www.figma.com/file/StZjf8HnoeLdiXS7dYrLAh/JavaScript.-Sprint-4);
* cоздана Nested файловая структура по методологии БЭМ;
* псевдокласс :hover состояния ссылок при наведении указателя мыши;
* семантические элементы HTML5.

### Развертывание проекта:
* установите Node.js. [Скачайте её с официального сайта](https://nodejs.org/en/download/)
* проверьте версию NPM
   ##### npm -v 
* создайте локальную директорию для проекта
   ##### mkdir dev
* перейдите в созданную директорию
   ##### cd dev
* клонируйте репозиторий в созданную директорию
   ##### git clone https://github.com/Milanka-m/mesto.git
* откройте проект в любом редакторе кода

### Команды:
* сборка проекта
  ##### npm run build
* запуск сервера разработки
  ##### npm run dev
* отправка содержимого папки сборки на gh-pages
  ##### npm run deploy
