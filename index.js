const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')

const server = express()

server.use(cors(), express.json(), helmet(), morgan())

server.get('/', (req, res)=>{
    res.status(200).json({api: "Up"})
})

const PORT = process.env.PORT || 4000


server.listen(PORT, ()=>{console.log(`Server is listening: ${PORT}`)})