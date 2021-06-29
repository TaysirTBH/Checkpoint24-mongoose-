const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personSchema = new Schema({
    name: {
        type : String,
        required: true
    },
    age: Number,
    email:  { 
        type: String,
        required: true,
        match: /.+\@.+\..+/,
        unique: true
      },
    favoriteFood: [String]
});
const person = mongoose.model('person',personSchema);
module.exports = person;