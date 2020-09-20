const express = require('express')
const db = require('./plantsModel')
const router = express.Router()

router.get('/:id', (req, res)=>{
    db.findById(req.params.id)
      .then((plant) => {
        if (plant) {
          res.status(200).json(plant).end();
        } else {
          res.status(404).json({ message: "No Plant by that Id" }).end();
        }
      })
      .catch((err) => {
        res.status(500).json({ message: "Unknown", error: err.message }).end();
      });
})

router.put('/:id', (req, res)=>{
    db.findById(req.params.id)
    .then(plant=>{
        if(plant){
            db.update(req.params.id, req.body)
            .then(update =>{
                res.status(200).json(update).end()
            })
            .catch(err =>{
                res.status(500).json({message: "Oddball Error", error: err}).end()
            })
        }else{
            res.status(404).json({message: "There is no plant"}).end()
        }
    })
    .catch(err => {
        res.status(500).json({message: "Major Error", error: err.message}).end()
    })

})

router.delete('/:id', (req, res)=>{
    db.findById(req.params.id)
    .then(plant => {
        if(plant){
            db.remove(req.params.id)
            .then(data => {
                res.status(204).json(data).end()
            })
            .catch(err => {
                res.status(500).json({message: "Anne Error!", error: err.message}).end()
            })
        }else{
            res.status(404).json({message: "No plant by that name"}).end();
        }
    })
    .catch(err => {
        res.status(500).json({message: "ERRORS GALORE!", error: err.message}).end()
    })
    
})

module.exports = router