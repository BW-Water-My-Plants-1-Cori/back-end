const db = require('../knexconfig')
const moment = require('moment')
const users = require('../users/usersModel')

function fetchByUserId(id){
    //returns all plants for user
    return db("plants").where({"user_id":id}).orderBy("next_watering")
}

function findById(id){
    //returns single plant
 return db("plants").where({id}).first();
}

function add(id, plant){
    plant.user_id = id;
    plant.date_created = moment().format('L');
    // plant.last_watered = moment(plant.last_watered, DDMMYYYY).format('L')
    // plant.next_watering = moment(plant.last_watered, DDMMYYYY).add(plant.increment, 'days').calendar()

    return db('plants').insert(plant)
    .then(id=>{
        return findById(id[0])
    })
    .catch(err => {
        return err
    })
    // .then(id => {
    //     console.log(id)
    //     return users.findById(plant.user_id)
    //     .then(user => {
    //         console.log("pm 26")
    //         const changes = user
    //         changes.experience = user.experience + 5
    //         changes.num_of_plants = user.num_of_plants + 1
    //         return users.update(changes, id)
    //     })
    //     .catch(err => {
    //         return err
    //     })
    // })
    // .catch(err => {
    //     console.log(err.message)
    //     return err
    // })
}

function update(id, plant){
    return db("plants").where({id}).update(plant)
    .then(plant=>{
        return findById(id)
    })
    .catch(err=>{
        return err
    })
}
function water(id){
    findById(id)
    .then(plant => {
        const newThings = plant
        newThings.next_watering = moment(plant.last_watered).add(plant.increment, 'days').calendar()
        newThings.last_watered = moment().format('L');
        return update(id, newThings)
        .then(plant => {
            return users.findById(plant.user_id)
            .then(user => {
                user.experience + 7
                if(user.experience > 100){
                    user.experience - 100
                    user.level + 1
                }
                return users.update(user)
            })
            .catch(err => {
                return err
            })
        })
        .catch(err => {
            return err
        })
    })
    .catch(err =>{
        return err
    })

}

function remove(id){

    return db("plants").where({id}).del()
    // return findById(id)
    // .then(plant => {
    //     return users.findById(plant.user_id)
    //     .then(user => {
    //         user.num_of_plants - 1
    //         user.experience - 5
    //         return db("plants").where({id}).del()
    //         .then(id => {
    //             return users.findById(user.id)
    //         })
    //         .catch(err => {
    //             return err
    //         })
    //     })
    //     .catch(err => {return err})
    // })
    // .catch(err => {return err})
}

module.exports = { add, update, findById, fetchByUserId, remove, water }