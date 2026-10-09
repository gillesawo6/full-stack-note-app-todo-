const mongoose = require('mongoose')

const database_connection = () => {
    mongoose.connect('mongodb://localhost:27017/noteApp')
        .then(() => {
            console.log("database connected")
        })
        .catch(() => {
            console.log("error connecting to db")
        })
}

module.exports = { database_connection }