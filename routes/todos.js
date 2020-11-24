//  подключаем Router из библиотеки express - с помощью него можно создавать различные инструкции роутера 
// и тем самым декомпозировать логику по всему приложению
 const { Router } = require('express');
 const Todo = require('../models/Todo')
 const router = Router();

 router.get('/', async (req, res) => {
    //  получу массив todos, и подожду модель Todo,
    // у которой вызову метод find
    const todos = await Todo.find({}).lean()

    //  res.render('index') - response (ответ) рендер страницы index
    // которую мы создали в папке view
    res.render('index', {
        title: 'Todo list',
        isIndex: true,
        todos
        /* далее этот массив, как параметр передаём в нашу страницу */
    })
 });

//  isCreate: true - булева переменная, которая используется 
// как флаг для отображения в навбаре 
 router.get('/create', (req, res) => {
    res.render('create', {
        title: 'Create todo',
        isCreate: true,
    })
 });
/* первое, что нужно сделать - создать новый объект todo
     исходя из тех параметров, которые мы передаём с клиента */

     /* для этого создаю объект TODO, обращаюсь к модели 
     Todo. В конструктор я передаю поле titile, которое я получаю с 
     браузера, т.е. я обращаюсь к объекту req.body.title - 
     - данное поле соответствует названию, которое мы указывали в инпуте */

     /*для того, чтобы express мог парсить body - надо 
     дописать некоторую логику в index.js - 
     - т.е. добавить некоторый middleware */
 router.post('/create', async (req, res) => {
     
     const todo = new Todo({
         title: req.body.title
     });

    //  сохраняем модель (необходимо)
     await todo.save();

    //  можно сдлелать редирект на главную как ответ
     res.redirect('/');

 });

 router.post('/complete', async (req, res) => {
     const todo = await Todo.findById(req.body.id)

     todo.completed = !!req.body.completed
     await todo.save()

     res.redirect('/');

 })

//  обязательно нужно экспортировать роутер
 module.exports = router;