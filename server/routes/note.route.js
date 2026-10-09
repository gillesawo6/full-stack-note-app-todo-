const router = require('express').Router()
const { getNotes, createNote, modifyNote, deleteNote } = require('../controllers/note.controller')

router.get('/', getNotes)
router.post('/new', createNote)
router.delete("/:id", deleteNote)
router.patch("/:id", modifyNote)

module.exports = router