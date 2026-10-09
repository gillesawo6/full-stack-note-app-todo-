const express = require('express')
const cors = require('cors')
const { database_connection } = require('./config/db.js')
const noteRoutes = require('./routes/note.route.js')
const app = express()
const port = 3000

app.use(express.json())
app.use(cors())
app.use("/api/notes", noteRoutes)

app.get('/', (req, res) => {
    res.send("note app backend live")
})

app.listen(port, () => {
    database_connection()
    console.log("server in running on http://localhost:" + port)
})