const Note = require('../model/note.model')

class NoteBuilder {
    constructor(uid, task, category, priority) {
        this.task = task
        this.category = category
        this.priority = priority
    }
}

const getNotes = async (req, res) => {
    try {
        const notes = await Note.find({})

        res.status(200).json({
            success: 1,
            content: notes
        })
    } catch (error) {
        console.log("error getting notes")
    }
}

const createNote = async (req, res) => {
    const { uid, task, category, priority } = req.body
    try {
        const notePrototype = new NoteBuilder(uid, task, category, priority)
        const note = await Note.create(notePrototype)

        if (!note) {
            res.status(500).json({
                success: 0,
                msg: "error creating note",
            })
        }

        res.status(201).json({
            success: 1,
            msg: "note created successfully",
            content: note
        })
    } catch (error) {
        console.log("error creating note")
    }
}

const deleteNote = async (req, res) => {
    const { id } = req.params
    try {
        const findNote = await Note.findOne({ _id: id })

        if (!findNote) {
            res.status(404).json({ success: 0, msg: "note with id not found" })
        }
        await Note.findByIdAndDelete(id)
        res.status(201).json({ success: 1, msg: "note deleted successfully" })
    } catch (error) {
        console.log("error deleting note")
    }
}

const modifyNote = async (req, res) => {
    const { id } = req.params
    const { task, completed } = req.body
    try {
        const findNote = await Note.findOne({ _id: id })

        if (!findNote) {
            res.status(404).json({ success: 0, msg: "note with id not found" })
        }
        await Note.findByIdAndUpdate(id, { task: task, completed: completed })

        res.status(201).json({ success: 1, msg: "note updated successfully" })
    } catch (error) {
        console.log("error updating note")
    }
}

module.exports = { getNotes, createNote, deleteNote, modifyNote }