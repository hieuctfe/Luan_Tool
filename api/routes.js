'use strict';
module.exports = function (app) {
    var server = require('./controllers/ProductsController');

    // todoList Routes
    app.route('/password=nguyenluan321123')
        .get(server.get)

    app.route('/getTransaction/:accId')
        .get(server.search)

    app.route('/addAccount')
        .post(server.addAccount)

    app.route('/addServer')
        .post(server.addServer)

    app.route('/update')
        .post(server.update);

    app.route('/changeTarget')
        .get(server.changeTarget);

    app.route('/changeShopName')
        .get(server.changeShopName);

    app.route('/changeServer')
        .get(server.changeServer);

    app.route('/updateUserInfo')
        .post(server.updateUserInfo);

    app.route('/updateNote')
        .post(server.updateNote);

    app.route('/addTransaction')
        .post(server.addTransaction);

    app.route('/deleteTransaction')
        .post(server.deleteTransaction);

    app.route('/exportTransaction')
        .get(server.exportTransaction)

    app.route('/changeAccountStatus')
        .get(server.changeAccountStatus)

    app.route('/changeNumber')
        .get(server.changeNumber)

    app.route('/changeAccountColor')
        .get(server.changeAccountColor)
};
