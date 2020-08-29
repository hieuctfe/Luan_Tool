'use strict'

const util = require('util')
const mysql = require('mysql')
const db = require('../db')
const cheerio = require('cheerio')
const request = require('request')
const fs = require('fs');

module.exports = {
    addAccount: (req, res) => {
        let sql = 'insert into accountfb (xs, c_user) values (?,?)';
        db.query(sql, [req.body.xs, req.body.c_user], (err, response) => {
            if (err) throw err;
            res.json({status: "true"})
        })
    },
}
