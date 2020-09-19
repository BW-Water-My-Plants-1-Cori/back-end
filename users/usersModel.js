const db = require("../knexconfig");

function add(newUser) {
    const user = newUser
    user.phonenumber = "Not Registered"
    user.first_name = "Roman";
    user.last_name = "Plantski";
    user.experience = 0;
    user.level = 1
    user.num_of_plants = 0;

  return db("users")
    .insert(user)
    .then((id) => {
      return db("users").where({"id": id[0]}).first();
    })
    .catch((err) => {
      return err;
    });
}

function findById(id) {
    return db('users as u').where({'u.id':id})
    .join('plants as p', 'u.id', 'p.user_id')
    .select('u.id', 'u.username', 'u.first_name', 'u.last_name', 'u.email', 'u.phonenumber', )
  ;
}

function findByName(user) {
  return db("users").where({ "username": user.username }).first().select('*');
}

function remove(id) {
  return db("users").where({ id }).del();
}

function update(user) {
  return db("users").where({ id }).update(user);
}

module.exports = { add, findById, findByName, remove, update };
