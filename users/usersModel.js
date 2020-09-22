const db = require("../knexconfig");
const plants = require("../plants/plantsModel");

function add(user) {
  return db("users")
    .insert(user)
    .then((id) => {
      return db("users").where({ id: id[0] }).first();
    })
    .catch((err) => {
      return err;
    });
}

function findById(id) {
  return (
    db("plants as p")
      .where({ user_id: id })
      .join("users as u", "u.id", "p.user_id")
      .select(
        "u.username",
        "u.email",
        "u.phonenumber",
        "u.first_name",
        "u.last_name",
        "u.experience",
        "u.level",
        "u.num_of_plants",
        "u.id",
        "p.plant_name",
        "p.date_last_watered",
        "p.increment",
        "p.next_watering",
        "p.date_created",
        "p.species",
        "p.description",
        "p.plant_url",
        "p.id as plant_id"
      )
      .then((plants) => {
        if (plants.length > 0) {
          const resultMap = plants.reduce((result, row) => {
            result[row.id] = result[row.id] || {
              ...row,
              plants: [],
            };
            result[row.id].plants.push({
              id: row.plant_id,
              plant_name: row.plant_name,
              date_last_watered: row.date_last_watered,
              next_watering: row.next_watering,
              date_created: row.date_created,
              increment: row.increment,
              species: row.species,
              desription: row.description,
              plant_url: row.plant_url,
            });
            return result;
          }, {});
          return Object.values(resultMap)[0];
        } else {
          return db("users").where({ id }).first();
        }
      })
      .catch((err) => {
        return err;
      })
  );
}

function findByName(user) {
  return db("users").where({ username: user.username }).first();
}

function remove(id) {
  return db("users").where({ id }).del();
}

function update(user, id) {
  return db("users")
    .where({ id })
    .update(user)
    .then((user) => {
      return findById(id);
    })
    .catch((err) => {
      return err;
    });
}



module.exports = { add, findById, findByName, remove, update };
