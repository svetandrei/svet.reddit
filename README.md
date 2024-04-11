# Тестовый проект Reddit
Тестовый проект reddit разработан на основе сервиса reddit. В проекте оснащен лента постов, выпадающее меню, показ детально страницы поста с модальной окошкой



## Технологии
- HTML5
- JS
- React
- TypeScript
- Webpack

## Использование

### Требования
Для установки и запуска проекта, необходим [NodeJS](https://nodejs.org/)

Для установки зависимостей, выполните команду:
```sh
$ npm i
```


### Создание компонента react
Для создание компонента вводите команду в папке, где нужно вам создать:
```sh
npm run component nameComponent
```
## Запуск
### Создание аккаунта reddit для доступа к reddit api
Если у вас нет аккаунта, создаите аккаунт и подключение по этапно:
1. Создаите аккаунт reddit
2. Переидите по ссылке https://www.reddit.com/prefs/apps для создание app
   - Нажмите на кнопку create another app
   - Введите данные, где необходимо как на скрине ![image](https://github.com/svetandrei/svet.reddit/assets/16918767/1d24c4f0-0e86-4d5e-95bd-30d49704dc2a)
   - Копируите app код, как изображено на скрине ![image](https://github.com/svetandrei/svet.reddit/assets/16918767/26f150e4-cf23-45a9-b960-fb6e24aff0e3)
   и вставляите код в файле проекта package.json как изображено на скрине ![image](https://github.com/svetandrei/svet.reddit/assets/16918767/6c6291cc-876f-4a7f-bbca-7ad2eea51dd6)
   - Этот же скопированный app код вставляем в файл /src/shared/Header/UserBlock/UserBlock.tsx, скрин куда вставляем ![image](https://github.com/svetandrei/svet.reddit/assets/16918767/8dc21c8d-e095-4fb4-b944-f78234feb5dc)

### Запуск Development сервера
Чтобы запустить сервер для разработки, выполните команду:
```sh
npm run dev
```

### Создание билда
Чтобы выполнить production сборку, выполните команду: 
```sh
npm run build
```

