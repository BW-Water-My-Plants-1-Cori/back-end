function verifyPlant(req, res, next) {
  db.findById(req.params.id)
    .then((plant) => {
      if (plant) {
        next();
      } else {
        res.status(404).json({ message: "No Plant by that Id" }).end();
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Unknown", error: err.message }).end();
    });
}

function isValid(plant){
    return Boolean(plant.plant_name && typeof plant.plant_name === "string" && plant.date_last_watered && typeof plant.date_last_watered === "string" && plant.increment && typeof plant.increment === "number");
  }

function validPlantForm(req, res, next){
    const plant = req.body
    if(plant.plant_name &&typeof plant.plant_name !== "string"){
        res.status(400).json({message: "Please use correct type"}).end()
    }else if(plant.date_last_watered &&typeof plant.date_last_watered !== "string"){
        res.status(400).json({message: "Please use correct type"}).end()
    }else if(plant.increment &&typeof plant.increment !== "number"){
        res.status(400).json({message: "Please use correct type"}).end()
    }else if(plant.species && typeof plant.species !== "string"){
        res.status(400).json({message: "Please use correct type"}).end()
    }else if(plant.description && typeof plant.description !== "string"){
        res.status(400).json({message: "Please use correct type"}).end()
    }else if(plant.plant_url && typeof plant.plant_url !== "string"){
        res.status(400).json({message: "Please use correct type"}).end()
    }else{
        next()
    }
}

module.exports = {verifyPlant, isValid, validPlantForm}