const express = require('express')
const db = require('./config/db')

const app = express()
db()

app.use(express.json())

const createData = require('./routes/createData')

app.use('/post', createData)

const port = 5000
app.listen(port, () => {
  console.log("Server is running on port 5000")
})
