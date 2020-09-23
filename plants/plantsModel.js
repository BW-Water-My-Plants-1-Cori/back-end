const db = require("../knexconfig");
const moment = require("moment");

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
              return db("plants as p")
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
                  "u.id as id",
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
  return findById(id)
    .then((plant) => {
      plant.date_last_watered = moment().format("L");
      return update(id, plant)
        .then((plant) => {
          const id = plant.user_id;
          return db("users")
            .where({ id })
            .first()
            .then((user) => {
              const changes = user;
              changes.experience = user.experience + 15;
              if (changes.experience > 100) {
                changes.experience - 100;
                changes.level = user.level + 1;
              }
              return (
                db("users")
                  .where({ id: plant.user_id })
                  .update(changes)
                  .then((changed) => {
                    return db("plants as p")
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
                        const resultMap = plants.reduce((result, row) => {
                          result[row.user_id] = result[row.id] || {
                            ...row,
                            plants: [],
                          };
                          result[row.user_id].plants.push({
                            id: row.id,
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
                        return Object.values(resultMap);
                      });
                  })
                  // .then((plant) => {
                  //   const newThings = plant;
                  //   newThings.next_watering = moment(plant.last_watered)
                  //     .add(plant.increment, "days")
                  //     .calendar();
                  //   newThings.last_watered = moment().format("L");
                  //   return update(id, newThings)

                  .catch((err) => {
                    return err;
                  })
              );
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
}

function remove(id) {
  const plant_id = id;
  return db("plants")
    .where({ id })
    .first()
    .then((plant) => {
      return db("users").where({ id: plant.user_id }).first()
      .then((user) => {
          const changes = user;
          changes.experience = user.experience - 7;
          changes.num_of_plants = user.num_of_plants - 1;
          if (changes.experience < 0) {
            changes.experience + 100;
            changes.level = user.level - 1;
          }
          return db("users").where({ id: user.id }).update(changes)
            .then((changed) => {
              return db("plants")
                .where({ id: plant_id })
                .del()
                .then((changed) => {
                  console.log(changed, "delete success", changes.id)
                  return db("plants as p")
                    .where({ user_id: changes.id })
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
                      "u.id as id",
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
