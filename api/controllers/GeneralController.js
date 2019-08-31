'use strict'

const util = require('util')
const mysql = require('mysql')
const db = require('../db')
const cheerio = require('cheerio')
const request = require('request')
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

async function doRequest(link, idx) {
    return await new Promise(function (rs, rj) {
        setTimeout(function () {
            request({
                    url: link.link,
                }, function (err, resp, body) {
                    try {
                        let $ = cheerio.load(body);
                        let shopName = '';
                        $('meta[name=description]').each((_, el) => {
                            console.log('vo duoc res')
                            let data = $(el).attr('content').split('-')[0].match(/((\d+,\d+)|(\d+\.*\d+k*)|(\d+))/g)
                            console.log(resp.request.uri.pathname.replace('/', '').replace('/', ''));
                            try {
                                if (data[0].includes(',') || data[1].includes(',') || data[2].includes(',')) {
                                    data[0] = data[0].replace(',', '')
                                    data[1] = data[1].replace(',', '')
                                    data[2] = data[2].replace(',', '')
                                }
                                data[0] = data[0].includes("k") ? data[0].replace('.', '.').replace('k', '') * 1000 : data[0]
                                data[1] = data[1].includes("k") ? data[1].replace('.', '.').replace('k', '') * 1000 : data[1]
                                data[2] = data[2].includes("k") ? data[2].replace('.', '.').replace('k', '') * 1000 : data[2]

                                console.log(data[0], data[1], data[2]);
                            } catch (e) {
                                console.log('lỗi' + data[0], data[1], data[2]);
                                return true
                            }
                            let shopName = '';
                            $('title').each((_, el2) => {
                                let temp = $(el2).text();
                                console.log(temp)
                                shopName = temp.replace(" • Instagram photos and videos", "")
                            });
                            let accName = resp.request.uri.pathname.replace('/', '').replace('/', '')
                            let sql2 = 'SELECT * FROM account where accountId = ?'
                            db.query(sql2, [accName], (err, response) => {
                                let sql = 'insert into report (date,following,follower,post, accId, shopName) values (?,?,?,?,?,?)';
                                let date = new Date().toMysqlFormat()
                                console.log(response);
                                let id = response[0].accId
                                db.query(sql, [date, data[1], data[0], data[2], id, shopName], (err, response) => {
                                    if (err) throw err;
                                    rs(response)
                                })
                            })

                        });
                    }
                    catch (err) {
                        rs({})
                    }


                }
            );
        }, 1500 * idx);
    })
}

module.exports = {
    get: (req, res) => {
        let sql = 'SELECT * FROM server INNER JOIN account ON server.id = account.serverId'
        db.query(sql, (err, response) => {
            // res.json(arr)
            if (err) throw err;
            response = response.sort(function (a, b) {
                return a.serverId - b.serverId
            }).groupBy("servername");
            for (let i in response) {
                response[i].sort(function (a, b) {
                    return a.number - b.number;
                })
            }
            res.render('index', {
                json: response
            })
        })
    },
    search: (req, res) => {
        let sql = 'SELECT *, report.id as reportId FROM report inner join account on report.accId = account.accId inner join server on account.serverId = server.id  where account.accountId = ?'
        db.query(sql, [req.params.accId], (err, response) => {
            if (err) throw err
            // response = response.groupBy("servername")
            // response = response
            response.sort(function (a, b) {
                return b.date - a.date;
            })
            res.json(response)
        })
    },
    update: async (req, res) => {
        let sql = 'SELECT * FROM account where serverId != 11';
        await db.query(sql, async (err, response) => {
            if (err) throw err;
            let links = [];
            for (let i = 0; i < response.length; i++) {
                links.push({link: "https://instagram.com/" + response[i].accountId, id: response[i].accountId})
            }
            await Promise.all(links.map(doRequest)).then(function (res2) {
                res.json({status: "true"});
            });
        })
    },
    updateUserInfo: (req, res) => {
        let link = "https://instagram.com/" + req.body.userId;
        console.log(link)
        doRequest({link: link}).then(function (res2) {
            res2 = {}
            res.json({status: "true"})
        })
    },
    store: (req, res) => {
        let data = req.body;
        let sql = 'INSERT INTO products SET ?';
        db.query(sql, [data], (err, response) => {
            if (err) res.json({status: "false"});
            res.json({status: "true"})
        })
    },
    addAccount: (req, res) => {
        let sql = 'insert into account (accountId, serverId, number) values (?,?,?)';
        console.log(req.body.accountId.trim());
        db.query(sql, [req.body.accountId.trim(), req.body.serverId, 999], (err, response) => {
            if (err) throw err;
            res.redirect('/')
        })
    },
    addServer: (req, res) => {
        let sql = 'insert into server (servername) values (?)'
        console.log(req.params);
        db.query(sql, [req.body.serverName], (err, response) => {
            if (!err) {
                let sql = 'insert into account (accountId, serverId, number) values (?,?, ?)'
                db.query(sql, [req.body.accountId, response.insertId, 999], (err, response) => {
                    res.redirect('/')
                })
            } else {
                res.redirect('/')
            }
        })
    },
    changeTarget: (req, res) => {
        let sql = 'UPDATE report SET target=? WHERE id = ?'
        console.log(req.params);
        db.query(sql, [req.query['target'], req.query['id']], (err, response) => {
            if (err) res.json({status: "false"})
            res.json({status: "true"})
        })
    },
    changeShopName: (req, res) => {
        let sql = 'UPDATE account SET accountId=? WHERE accountId like ?'
        console.log(req.query['shopname']);
        db.query(sql, [req.query['newShop'].trim(), req.query['shopname']], (err, response) => {
            if (err) res.json({status: "false"})
            res.json({status: "true"})
        })
    },
    changeServer: (req, res) => {
        let sql = 'UPDATE account SET serverId = ? WHERE accountId like ?'
        db.query(sql, [req.query['newServer'], '%' + req.query['shopname'].trim() + '%'], (err, response) => {
            if (err) res.json({status: "false"});
            res.json({status: "true"})
        })
    },
    addTransaction: (req, res) => {
        let following = req.body["following"]
        let follower = req.body["follower"]
        let date = req.body["date"]
        let accId = req.body["accId"]
        console.log(follower, following, date, accId);
        date = new Date(date).toMysqlFormat();
        let sql = 'insert into report (date,following,follower,post, accId) values (?,?,?,?,?)';
        db.query(sql, [date, following, follower, 0, accId], (err, response) => {
            if (err) res.json({status: "false"});
            res.json({status: "true"})
        })
    },
    exportTransaction: (req, res) => {
        let sql = 'select *, server.id as serverId from server inner join account on server.id = account.serverId inner join report on account.accId = report.accId';
        db.query(sql, (err, response) => {
            if (err) throw err
            let temp = response.groupBy("serverId")
            for (var key in temp) {
                temp[key].groupBy("accId")
            }
            res.json(temp);
        })
    },
    deleteTransaction: (req, res) => {
        let sql = 'delete from report where id = ?';
        db.query(sql, [req.body["reportId"]], (err, response) => {
            if (err) res.json({status: "false"});
            res.json({status: "true"})
        })
    },
    updateNote: (req, res) => {
        let sql = 'UPDATE account SET note=? WHERE accId = ?';
        db.query(sql, [req.body["note"], req.body["accId"]], (err, response) => {
            if (err) res.json({status: "false"});
            res.json({status: "true"})
        })
    },

    changeAccountStatus: (req, res) => {
        let sql = 'UPDATE report SET status=? WHERE id = ?';
        db.query(sql, [req.query["status"], req.query["reportId"]], (err, response) => {
            if (err) res.json({status: "false"});
            res.json({status: "true"})
        })
    },
    changeNumber: (req, res) => {
        let sql = 'UPDATE account SET number=? WHERE accountId like ?';
        db.query(sql, [req.query["number"], '%' + req.query["accId"] + '%'], (err, response) => {
            if (err) res.json({status: "false"})
            res.json({status: "true"})
        })
    },
    changeAccountColor: (req, res) => {
        let sql = 'UPDATE account SET accStatus=? WHERE accountId like ?';
        db.query(sql, [req.query["newColor"], '%' + req.query["shopname"] + '%'], (err, response) => {
            if (err) res.json({status: "false"})
            res.json({status: "true"})
        })
    }
}
