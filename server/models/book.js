const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    name: String,
    genre: String,
    authorId: String
});

//Book model collection in bookSchema
module.exports = mongoose.model('Book', bookSchema);