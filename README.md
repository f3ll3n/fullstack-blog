# Blog App
### Технологии:
- ## Frontend 
    - React
    - Redux/toolkit
    - Axios
    - TailwindCSS
- ## Backend
    - Node.js (Express.js)
    - Mongoose (Для работы с MondoDB)
    - JWT, bcryptjs
    

- Как запустить приложение?
    1. Необходимо перейти на сайт [MongoDB](https://www.mongodb.com/), зарегистрироваться, создать свой кластер и базу данных.
    2. Склонировать проект командой 
     - ### `git clone https://github.com/f3ll3n/fullstack-blog.git`
    3. Открыть проект в любой среде для разработки
    4. Скачать Node modules для директорий client и server, для этого нужно:
         В терминале из корневой папки перейти в папку client с помощью команды 
        - ### `cd client`
         И ввести команду 
        - ### `npm i`
        Тоже самое нужно проделать и для папки server
    5. Для того чтобы подключится к MongoDB в корневой папке /server необходимо создать файл .env, там нужно указать данные:
    -```PORT=YOUR_PORT
     DB_USER=YOUR_USER
     DB_PASSWORD=YOUR_DB_PASSWORD
     DB_NAME=YOUR_DB_NAME
     JWT_SECRET=YOUR_SECRET_KEY```
    6. Запустить приложение /server и /client можно с помощью команд:
         ## Клиент
        - ### `npm run start`
         ## Сервер
        - ### `npm run dev`
