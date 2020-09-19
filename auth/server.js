const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('./jwtoken')

const server = express.Router()

server.get('/', (req, res)=>{
    res.status(200).json({api: "Up"})
})

server.post('/register', (req, res)=>{

})

server.post('/login', (req, res)=>{

})




module.exports = server