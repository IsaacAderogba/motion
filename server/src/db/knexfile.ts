require('ts-node/register');

export = {
  test: {
    client: "pg",
    connection: "postgres://localhost/motion-test",
    migrations: {
      directory: __dirname + "/migrations",
      tableName: "db_migrations"
    },
    seeds: {
      directory: __dirname + "/seeds"
    },
    useNullAsDefault: true
  },
  development: {
    client: "pg",
    connection: "postgres://localhost/motion",
    migrations: {
      directory: __dirname + "/migrations",
      tableName: "db_migrations"
    },
    seeds: {
      directory: __dirname + "/seeds"
    },
    useNullAsDefault: true
  },
  staging: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: __dirname + "/migrations",
      tableName: "db_migrations"
    },
    seeds: {
      directory: __dirname + "/seeds"
    },
    useNullAsDefault: true
  },
  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: __dirname + "/migrations",
      tableName: "db_migrations"
    },
    seeds: {
      directory: __dirname + "/seeds"
    },
    useNullAsDefault: true
  }
};
