exports.up = function (knex, Promise) {
  return knex.schema.createTable("plants", (tbl) => {
    tbl.increments("id");

    tbl.string("plant_name").notNullable();
    tbl.string("date_last_watered").notNullable();
    tbl.integer("increment").notNullable();
    tbl.string("next_watering");
    tbl.string("date_created");
    tbl.string("species");
    tbl.string("description");
    tbl.string("plant_url");

    tbl
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists();
};
