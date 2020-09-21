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
    if(plants.length > 0){
      const resultMap = plants.reduce((result, row) => {
        result[row.user_id] = result[row.user_id] || {
          ...row,
          plants: []
        };
        result[row.user_id].plants.push(row);
        return result;
      }, {});
      return resultMap;
    }else{
      return db("users").where({id}).first()
    }

  })
  .catch(err => {
    return err
  })
}

function findByName(user) {
  return db("users").where({ "username": user.username }).first()
  .then(user => {
    return db("plants").where({"user_id": user.id}).join("users", "users.id", "plants.user_id").select("*")
    .then(plants => {
     if(plants.length > 0){
      const resultMap = plants.reduce((result, row) => {
        result[row.user_id] = result[row.user_id] || {
          ...row,
          plants: []
        };
        result[row.user_id].plants.push(row);
        return result;
      }, {});
      return resultMap; 
     }else{
       return db("users").where({ "username": user.username }).first()
     }

    })
  })
  .catch(err => {
    return err
  })

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
