const mongoose = require('mongoose')

const connectDb = () => {
    mongoose.set('strictQuery', true);
    mongoose.connect('mongodb://127.0.0.1:27017/compatibleDb', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        retryWrites: true,
    })
        .then(() => console.log('Db Connection established.'))
        .catch(err => console.log('Something went wrong...', err))
};

module.exports = connectDb