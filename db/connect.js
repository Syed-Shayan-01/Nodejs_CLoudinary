const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://"":""@cluster0.olutjd9.mongodb.net/Authentication?retryWrites=true&w=majority');
module.exports = mongoose;
