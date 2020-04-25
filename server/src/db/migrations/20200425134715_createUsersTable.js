exports.up = function (knex) {
  return knex.schema.createTable("Users", (Users) => {
    Users.increments();
    Users.string("firstName", 255).notNullable();
    Users.string("lastName", 255).notNullable();
    Users.string("email", 255).notNullable().unique();
    Users.string("password", 255).notNullable();
    Users.string("avatarURL", 510);
    Users.string("avatarId", 255);
    Users.boolean("isVerified").defaultTo(false).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("Users");
};
