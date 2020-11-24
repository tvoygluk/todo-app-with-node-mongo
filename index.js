// импортируем пакеты
const express = require('express');
// подключаем базу
const mongoose = require('mongoose');

const path = require('path');

const exphbs = require('express-handlebars');
const todoRoutes = require('./routes/todos')


// либо берём порт из переменной либо 3000
const PORT = process.env.PORT || 3000;

// объект приложения
const app = express();
// создание перменной после создания проекта - порядок важен
// метод exphbs.create позволяет настроить конфигурацию для будущего шаблонизатора
// extname: 'hbs' - замена длинного названия 'express-handlebars'на короткое
const hbs = exphbs.create({
    defaultLayout: 'main', 
    extname: 'hbs',
})

// engine - движок для рендеринга страниц
// первый параметр - название
// app.engine('hbs', hbs.engine); - регистрация движка
app.engine('hbs', hbs.engine);
// первый параметр - зарегистрированные ключи в express, которые мы можем использовать
// app.set('view engine', 'hbs'); - пишем, что по умолчанию будем использовать handlebars
app.set('view engine', 'hbs');
// app.set('views', 'views'); - регистрируем папку, где будут хранится все наши файлы
app.set('views', 'views');

// теперь можно считывать body
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')))

// app.use - используем новый middleware 
app.use(todoRoutes);

// для удобной разаработки кода
async function start() {
    try {
        // connect - для подключения к БД
        // useNewUrlParser, useFindAndModify - заданы для отсутствия ворнингов
        // первый параметр - адрес БД
        await mongoose.connect('mongodb+srv://tvoygluk:1qaz2wsx3edc@cluster0.jaxys.mongodb.net/todos', {
            useNewUrlParser: true,
            useFindAndModify: false,
        })
        // второй параметр срабатывает, если сервер уже был запущен
        // app.listen ставим ниже подключения к БД, чтобы база уже была доступна
        app.listen(PORT, () => {
            console.log('Server has been started...');
        })
    } catch (e) {
        console.log(e);
    }
}

start()