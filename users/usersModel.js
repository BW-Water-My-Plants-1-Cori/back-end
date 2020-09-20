const db = require("../knexconfig");
const plants = require('../plants/plantsModel')

function add(user) {

  return db("users").insert(user)
    .then((id) => {
      return db("users").where({"id": id[0]}).first();
    })
    .catch((err) => {
      return err;
    });
}

function findById(id) {
  return db("users").where({id}).first()
}

function findByName(user) {
  return db("users").where({ "username": user.username }).first()

}

function remove(id) {
  return db("users").where({ id }).del();
}

function update(user, id) {
  console.log("to the user")
  return db("users").where({ id }).update(user)
  .then(user => {
    return findById(id)
  })
  .catch(err => {
    return err
  })
  ;
}

module.exports = { add, findById, findByName, remove, update };
