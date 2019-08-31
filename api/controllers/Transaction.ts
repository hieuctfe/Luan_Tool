import 'dotenv/config';
import {IgApiClient} from '../../src';
import {userInfo} from "os";
const mysql = require('mysql')
const db = require('../db')
const fs = require('fs');

Array.prototype.groupBy = function (prop) {
    return this.reduce(function (groups, item) {
        const val = item[prop]
        groups[val] = groups[val] || []
        groups[val].push(item)
        return groups
    }, {})
};

function twoDigits(d) {
    if (0 <= d && d < 10) return "0" + d.toString()
    if (-10 < d && d < 0) return "-0" + (-1 * d).toString();
    return d.toString();
}

Date.prototype.toMysqlFormat = function () {
    return this.getUTCFullYear() + "-" + twoDigits(1 + this.getUTCMonth()) + "-" + twoDigits(this.getUTCDate()) + " " + twoDigits(this.getUTCHours()) + ":" + twoDigits(this.getUTCMinutes()) + ":" + twoDigits(this.getUTCSeconds());
};

async function doRequest(username, ig, idx) {
    return await new Promise(async function (rs, rj) {
        setTimeout(async function () {
            try {
                let userId = await ig.user.getIdByUsername(username);
                userInfo = await ig.user.info(userId);
                console.log(userInfo.username, userInfo.follower_count)
                let sql2 = 'SELECT * FROM account where accountId = ?'
                db.query(sql2, [userInfo.username], (err, response) => {
                    let sql = 'insert into report (date,following,follower,post, accId, shopName) values (?,?,?,?,?,?)';
                    let date = new Date().toMysqlFormat()
                    let id = response[0].accId
                    db.query(sql, [date, userInfo.following_count, userInfo.follower_count, userInfo.media_count, id, userInfo.full_name], (err, response) => {
                        if (err) throw err;
                        rs(response)
                    })
                })
            }
            catch (err) {
                rs({});
            }
        }, 2000 * idx);
    })
}

module.exports = {
    updateUserInfo: async (req, res) => {
        let userId = req.body.userId;
        const ig = new IgApiClient();
        ig.state.generateDevice("katun.meoz");
        try {
            await ig.account.login("katun.meoz", "Yeutho123")
            doRequest(userId, ig).then(function (res2) {
                res.json({status: "true"})
            })
        } catch (e) {
            res.json({status: "false"})
        }
    },
    update: async (req, res) => {
        const ig = new IgApiClient();
        ig.state.generateDevice("katun.meoz");
        try {
            await ig.account.login("katun.meoz", "Yeutho123")
            let sql = 'SELECT * FROM account where serverId != 11';
            await db.query(sql, async (err, response) => {
                if (err) throw err;
                let links = [];
                for (let i = 0; i < response.length; i++) {
                    links.push(response[i].accountId)
                }
                await Promise.all(links.map((el, idx) => doRequest(el, ig, idx))).then(function (res2) {
                    res.json({status: "true"});
                });
            })
        } catch (e) {
            res.json({status: "false"})
        }
    },
}
