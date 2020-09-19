exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("table_name")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("table_name").insert([
        {
          id: 1,
          plant_name: "Herbert Plant Face",
          description: "It's a plant",
          date_last_watered: "09/16/2020",
          increment: 5,
          next_watering: "09/21/2020",
          species: "Plant Species",
          plant_url: "None ATM",
          date_created: "09/18/2020",
          user_id: 3
        },
        {
          id: 2,
          plant_name: "Audrey",
          description: "It's a plant?",
          date_last_watered: "09/18/2020",
          increment: 1,
          next_watering: "09/19/2020",
          species: "Plant Species",
          plant_url: "None ATM",
          date_created: "09/12/2020",
          user_id: 1
        },
        {
          id: 3,
          plant_name: "ROCK",
          description: "ROCK NOT PLANT",
          date_last_watered: "09/01/2020",
          increment: 29,
          next_watering: "09/30/2020",
          species: "Plant Species",
          plant_url: "None ATM",
          date_created: "09/12/2020",
          user_id: 2
        },
      ]);
    });
};
