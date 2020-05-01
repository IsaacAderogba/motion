exports.up = function (knex) {
  return knex.schema.createTable("Reviews", (Reviews) => {
    Reviews.increments();
    Reviews.unique(["userId", "movieId"]);
    Reviews.integer("userId")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("Users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    Reviews.string("movieId", 255).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("Reviews");
};
