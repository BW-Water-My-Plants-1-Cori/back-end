const express = require('express')
const db = require('./usersModel')
const plants = require('../plants/plantsModel')
const bcrypt = require('bcryptjs')
const router = express.Router()

router.get('/:id', (req, res)=>{
    db.findById(req.params.id)
    .then(user => {
        if(user){
            res.status(200).json({message: "Hooray", user}).end()
        }else{
            res.status(404).json({message: "This user id could not be found"}).end()
        }
    })
    .catch(err => {
        res.status(500).json({message: "Unknown Server error", error: err.message}).end()
    })
})

router.get('/:id/plants',(req, res)=>{
    plants.fetchByUserId(req.params.id)
    .then(plants => {
        if(plants){
            res.status(200).json(plants).end()
        }else{
            res.status(404).json({message: "THIS USER HAS NO PLANTS"}).end()
        }
    })
    .catch(err => {
        res.status(500).json({message: "Something went wrong"}).end()
    })

})

router.post('/:id/plants', (req, res)=>{
    plants.add(req.params.id, req.body)
    .then(plant => {
        if(plant){
            res.status(200).json(plant).end()
        }else{
            res.status(404).json({message: "This is not the plant you are looking for"}).end();
        }
    })
    .catch(err =>{
        res.status(500).json({message: "Nope."}).end();
    })
})

router.put('/:id', (req, res)=>{
    const changes = req.body
db.findById(req.params.id)
.then(user => {
    if(user){
        if(changes.password){
            const hash = bcrypt.hashSync(req.body.password)
            changes.password = hash
            db.update(changes, req.params.id)
            .then(user => {
                if(user){
                    res.status(200).json(user).end()
                }else{
                    res.status(400).json({message: "There was a problem."}).end()
                }
            })
            .catch(err => {
                res.status(500).json({message: "There was an unknown issue", error: err.message}).end()
            })
        }else{
            db.update(changes, req.params.id)
            .then(user => {
                if(user){
                    res.status(200).json(user).end()
                }else{
                    res.status(400).json({message: "There was a problem."}).end()
                }
            })
            .catch(err => {
                res.status(500).json({message: "There was an unknown issue", error: err.message}).end()
            })
        }
       
    }else{
        res.status(404).json({message: "This user does not exist"}).end()
    }
}) 
.catch(err => {
    res.status(500).json({message: "There was an error in the back"}).end()
}) 
})

router.delete('/:id', (req, res)=>{
    db.findById(req.params.id)
    .then(user => {
        if(user){
            db.remove(user.id)
            .then(num => {
                if(num !== 0){
                    res.status(204).json({message: "You are gone!"}).end()
                }else{
                    res.status(204).json({message: "Something is strange"}).end()
                }
            })
            .catch(err => {
                res.status(500).json({message: "There was an error", error: err.message})
            })
        }
    })
    .catch(err => {
        res.status(500).json({message: "Unknown Error", error: err.message})
    })    
})

module.exports = router
