const express = require("express");
const db = require("./plantsModel");
const mw = require("./plantsMiddleware");
const router = express.Router();

router.use("/:id", mw.verifyPlant);

router.get("/:id", (req, res) => {
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
});

router.put("/:id", mw.validPlantForm, (req, res) => {
  db.update(req.params.id, req.body)
    .then((update) => {
      res.status(200).json({plant: update}).end();
    })
    .catch((err) => {
      res.status(500).json({ message: "Oddball Error", error: err }).end();
    });
});

router.put("/:id/water", (req, res)=>{
  db.water(req.params.id)
  .then(ret =>{
    if(ret.length>0){
      res.status(200).json({message: "Watered", user: ret[0]}).end()
    }else{
      res.status(400).json({message: "Plant could not be watered"}).end()
    }
  })
  .catch(err=>{
    res.status(500).json({message: "Something went wrong"}).end()
  })
})

router.delete("/:id", (req, res) => {
        db.remove(req.params.id)
          .then((data) => {
            res.status(204).json({user: data[0]}).end();
          })
          .catch((err) => {
            res
              .status(500)
              .json({ message: "Anne Error!", error: err.message })
              .end();
    })
});

module.exports = router;
