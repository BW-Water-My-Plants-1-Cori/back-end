const db = require("../knexconfig");
const moment = require("moment");
const users = require("../users/usersModel");

function fetchByUserId(id) {
  //returns all plants for user
  return db("plants").where({ user_id: id }).orderBy("next_watering");
}

function findById(id) {
  //returns single plant
  return db("plants").where({ id }).first();
}

function add(id, plant) {
  plant.user_id = id;
  plant.date_created = moment().format("L");

//    plant.last_watered = moment(plant.last_watered, "DDMMYYYY").format('L')
  // plant.next_watering = moment(plant.last_watered, DDMMYYYY).add(plant.increment, 'days').calendar()

  return db("plants")
    .insert(plant)
    .then((plant) => {
      return db("users")
        .where({ id })
        .first()
        .then((user) => {
          const changes = user;
          changes.experience = user.experience + 7;
          changes.num_of_plants = user.num_of_plants + 1;
          if (changes.experience > 100) {
            changes.experience = user.experience - 100 + 7;
            changes.level = user.level + 1;
          }
          return db("users")
            .where({ id })
            .update(changes)
            .then((changed) => {
              return db("plants")
                .where({ user_id: id })
                .join("users", "users.id", "plants.user_id")
                .select("*")
                .then((plants) => {
                  const resultMap = plants.reduce((result, row) => {
                    result[row.user_id] = result[row.user_id] || {
                      ...row,
                      plants: [],
                    };
                    result[row.user_id].plants.push(row);
                    return result;
                  }, {});
                  return resultMap;
                })
                .catch((err) => {
                  return err;
                });
            })
            .catch((err) => {
              return err;
            });
        })
        .catch((err) => {
          return err;
        })
        .catch((err) => {
          return err;
        });
    });
}

function update(id, plant) {
  return db("plants")
    .where({ id })
    .update(plant)
    .then((plant) => {
      return findById(id);
    })
    .catch((err) => {
      return err;
    });
}
function water(id) {
  findById(id)
    .then((plant) => {
      const newThings = plant;
      newThings.next_watering = moment(plant.last_watered)
        .add(plant.increment, "days")
        .calendar();
      newThings.last_watered = moment().format("L");
      return update(id, newThings)
        .then((plant) => {
          return users
            .findById(plant.user_id)
            .then((user) => {
              user.experience + 7;
              if (user.experience > 100) {
                user.experience - 100;
                user.level + 1;
              }
              return users.update(user);
            })
            .catch((err) => {
              return err;
            });
        })
        .catch((err) => {
          return err;
        });
    })
    .catch((err) => {
      return err;
    });
}

function remove(id) {
  return db("plants")
    .where({ id })
    .then((plant) => {
      return db("users")
        .where({ id })
        .first()
        .then((user) => {
          const changes = user;
          changes.experience = user.experience - 7;
          changes.num_of_plants = user.num_of_plants - 1;
          if (changes.experience < 0) {
            changes.experience = 0;
            changes.level = user.level - 1;
          }
          return db("users")
            .where({ id })
            .update(changes)
            .then((changed) => {
              return db("plants")
                .where({ user_id: id })
                .join("users", "users.id", "plants.user_id")
                .select("*")
                .then((plants) => {
                  const resultMap = plants.reduce((result, row) => {
                    result[row.user_id] = result[row.user_id] || {
                      ...row,
                      plants: [],
                    };
                    result[row.user_id].plants.push(row);
                    return result;
                  }, {});
                  return resultMap;
                })
                .catch((err) => {
                  return err;
                });
            })
            .catch((err) => {
              return err;
            });
        })

        .catch((err) => {
          return err;
        })
        .catch((err) => {
          return err;
        });
    });
}

module.exports = { add, update, findById, fetchByUserId, remove, water };
