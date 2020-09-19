exports.up = function (knex, Promise) {
  return knex.schema.createTable("users", (tbl) => {
    //user id
    tbl.increments("id");

    tbl.string("username").notNullable().unique();
    tbl.string("email").notNullable().unique();
    tbl.string("password").notNullable();
    tbl.string("phonenumber").unique().defaultTo("Not Registered");
    tbl.string("first_name").defaultTo("Roman");
    tbl.string("last_name").defaultTo("Plantski");
    tbl.integer("experience").defaultTo(0);
    tbl.integer("level").defaultTo(1);
    tbl.integer("num_of_plants").defaultTo(0);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists("users");
};
