const { Schema, model } = require('mongoose');

// переменная - инстанс класса Schema
// в Schema будет описана конфигурация будущей модели
const schema = new Schema({
    /* required: true - если мы не передаём title, то данная модель не может быть создана */
    title: {
        type: String,
        required: true
    }, 
    /* если мы создали какую-нибудь тудушку, то по-умолчанию она ещё не завершена */
    /* поле id сдесь указывать не нужно - оно передаётся по-умолчанию */
    completed: {
        type: Boolean,
        default: false
    }
})

// первый параметр - модель, второй - схема, по которой необходимо сформировать данную модель
module.exports = model('Todo', schema)