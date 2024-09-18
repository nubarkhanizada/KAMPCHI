const mysql = require ('mysql2/promise')
const dotenv = require ('dotenv').config()

const mySqlPool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'kampchi_db'
})

module.exports = mySqlPool