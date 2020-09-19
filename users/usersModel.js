const db = require('../knexconfig')

function add(user){
    return db('users').insert(user)
    .then(id => {
        return findById(id[0])
    })
    .catch(err => {
        return err
    })
}

function findById(id){
    return db('users').where({id}).first()
}

function findByName(user){
    return db('users').where({"username": user}).first()
}

function remove(id){
    return db('users').where({id}).del()
}

function update(user){
    return db('users').where({id}).update(user)
}

module.exports = {add, findById, findByName, remove, update}