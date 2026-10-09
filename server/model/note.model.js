const mongoose = require('mongoose')

const noteSchema = mongoose.Schema(
    {
        task: {
            type: String,
            require: [true, "a task wasn't provided"]
        },
        category: {
            type: String,
            require: [true, "a category wasn't provided"]
        },
        priority: {
            type: String,
            require: [true, "a priority wasn't provided"]
        },
        completed: {
            type: Boolean,
            default: false
        },
    },
    {
        timestamp: true
    }
)

const Note = mongoose.model("Note", noteSchema)
module.exports = Note