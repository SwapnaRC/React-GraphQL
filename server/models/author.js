const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = new Schema({
    name: String,
    age:Number
});

//Author model collection in bookSchema
module.exports = mongoose.model('Author', authorSchema);