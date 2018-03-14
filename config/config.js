var dotenv = require("dotenv").config();

module.exports = {
  development: {
    database: "jobpostdb",
    username: process.env.DB_USER,
    password: process.env.DB_PW,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    define: {
      underscored: true
    }
  },
  test: {
    database: process.env.DATABASE,
    username: process.env.USER_NAME,
    password: process.env.SQL_PW,
    host: process.env.HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    define: {
      underscored: true
    }
  },
  production: {
    database: process.env.DATABASE,
    username: process.env.USER_NAME,
    password: process.env.SQL_PW,
    host: process.env.HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    define: {
      underscored: true
    }
  },
}
