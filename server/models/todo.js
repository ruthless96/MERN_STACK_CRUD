const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const connection = mongoose.createConnection("mongodb://localhost:27017/self")
const moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");

const data_format = moment().format('YYYY.MM.DD. HH:mm:ss')

autoIncrement.initialize(connection);

const TodoSchema = mongoose.Schema({
    BoardNo: {
        type: Number,
        default: 0,
    },
    BoardTitle: {
        type: String,
        default: '',
    },
    BoardContent: {
        type: String,
        default: '',
    },
    UserName: {
        type: String,
        default: '',
    },
    Regdate: {
        type: String,
        default: data_format
    }
})

console.log(data_format, ' data_format')

TodoSchema.plugin(autoIncrement.plugin, {
    model: 'NO',
    field: 'BoardNo',
    startAt: 0,
    increment: 1
})

const no = connection.model('Todo', TodoSchema);
module.exports = mongoose.model('Todo', TodoSchema);