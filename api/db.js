'use strict';
const mysql = require('mysql');

const db = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "123456789",
    database: process.env.DB_NAME || "instagram_luan",
    charset: 'utf8mb4'
});

module.exports = db
