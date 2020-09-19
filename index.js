const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')

const users = require('./users/usersRoute')
const plants = require('./plants/plantsRoute')
const server = express()

server.use(cors(), express.json(), helmet(), morgan())
server.use('/users', users)
server.use('/plants', plants)

server.get('/', (req, res)=>{
    res.status(200).json({api: "Up"})
})

server.post('/register', (req, res)=>{
    
})

server.post('/login', (req, res)=>{

})

const PORT = process.env.PORT || 4000


server.listen(PORT, ()=>{console.log(`Server is listening: ${PORT}`)})