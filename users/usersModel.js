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
  return db("plants").where({"user_id": id}).join("users", "users.id", "plants.user_id").select("*")
  .then(plants => {
      const resultMap = plants.reduce((result, row) => {
          result[row.user_id] = result[row.user_id] || {
            ...row,
            plants: []
          };
          result[row.user_id].plants.push(row);
          return result;
        }, {});
        return resultMap;
  })
  .catch(err => {
    return err
  })
}

function findByName(user) {
  return db("users").where({ "username": user.username }).first()

}

function remove(id) {
  return db("users").where({ id }).del();
}

function update(user, id) {
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
