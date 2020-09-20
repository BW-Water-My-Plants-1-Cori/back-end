const db = require('./usersModel')

function verifyUser(req, res, next){
    db.findById(req.params.id)
    .then(user =>{
        if(user){
            next()
        }else{
            res.status(404).json({message: "This user could not be found"}).end()
        }
    })
    .catch(err =>{
        res.status(500).json({message: "Unknown server error"}).end()
    })
}

function verifyForm(req, res, next){
    const changes = req.body

    if(changes.username && typeof changes.username !== "string"){
        res.status(400).json({message: "Please use correct type of username"}).end()
    }else if( chances.email && typeof changes.email !== "string"){
        res.status(400).json({message: "Please use correct type of email"}).end()
    }else if(changes.phonenumber && typeof changes.phonenumber !== "string"){
        res.status(400).json({message: "Please use correct type of username"}).end()
    }else if(changes.first_name && typeof changes.first_name !== "string"){
        res.status(400).json({message: "Please use correct type of first name"}).end()
    }else if(changes.last_name && changes.last_name !== "string"){
        res.status(400).json({message: "Please use correct type of last name"}).end()
    }else if(changes.password && typeof changes.password !== "string"){
        res.status(400).json({message: "Please user correct type of password"}).end()
    }else{
        next()
    }
}

module.exports = {verifyUser, verifyForm}