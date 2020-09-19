const express = require('express')

const server = express.Router()

server.get('/', (req, res)=>{
    res.status(200).json({api: "Up"})
})

server.post('/register', (req, res)=>{

})

server.post('/login', (req, res)=>{

})

module.exports = server