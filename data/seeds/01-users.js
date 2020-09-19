exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("table_name")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("table_name").insert([
        {
          id: 1,
          username: "Bobby",
          phonenumber: "12342345555",
          email: "bobby@bobby.com",
          password: "12345",
          first_name: "Bobby",
          last_name: "Bobbson",
          experience: 5,
          level: 1,
          num_of_plants: 1
        },
        {
          id: 2,
          username: "Froncios",
          phonenumber: "12342445555",
          email: "frank@email.com",
          password: "12345",
          first_name: "Froncion",
          last_name: "Frank",
          experience: 95,
          level: 2,
          num_of_plants: 1
        },
        {
          id: 3,
          username: "St.James",
          phonenumber: "44342345555",
          email: "St@james.com",
          password: "12345",
          first_name: "Saint",
          last_name: "James",
          experience: 100,
          level: 77,
          num_of_plants: 1
        },
      ]);
    });
};
