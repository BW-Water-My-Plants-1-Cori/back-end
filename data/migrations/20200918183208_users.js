
exports.up = function(knex, Promise) {
  return knex.schema
  .createTable('users', tbl=>{
      //user id
      tbl.increments('id')

      tbl.string('username').notNullable().unique()
      tbl.string('email').notNullable().unique()
      tbl.string('password').notNullable()
      tbl.string('phonenumber').unique()
      tbl.string('first_name')
      tbl.string('last_name')
      tbl.integer('experience')
      tbl.integer('level')
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users')  
};
