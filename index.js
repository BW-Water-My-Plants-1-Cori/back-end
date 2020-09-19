const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')

const users = require('./users/usersRoute')
const plants = require('./plants/plantsRoute')
const auth = require('./auth/server')
const server = express()

server.use(cors(), express.json(), helmet(), morgan('dev'))
server.use('/users', users)
server.use('/plants', plants)
server.use('/', auth)



const PORT = process.env.PORT || 4000


server.listen(PORT, ()=>{console.log(`Server is listening: ${PORT}`)})