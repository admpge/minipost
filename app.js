const express = require('express')
const app = express()

const mongoose = require('mongoose')
require('dotenv').config()

const bodyParser = require('body-parser')
const postsRoute = require('./routes/posts')

app.use(bodyParser.json())
app.use('/posts', postsRoute)

app.get('/', (req, res) => {
    res.send('Homepage')
})

mongoose.connect(process.env.DB_CONNECTOR).then(() => {
    console.log('DB is now connected')
})

app.listen(3000, () => {
    console.log('Server running on port 3000')
})