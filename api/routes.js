'use strict';
module.exports = function (app) {
    var general = require('./controllers/GeneralController')
    var transaction = require('./controllers/Transaction')

    app.route('/test')
        .get(transaction.updateUserInfo)

    app.route('/password=nguyenluan321123')
        .get(general.get)

    app.route('/getTransaction/:accId')
        .get(general.search)

    app.route('/addAccount')
        .post(general.addAccount)

    app.route('/addgeneral')
        .post(general.addServer)

    app.route('/update')
        .post(transaction.update);

    app.route('/changeTarget')
        .get(general.changeTarget);

    app.route('/changeShopName')
        .get(general.changeShopName);

    app.route('/changegeneral')
        .get(general.changeServer);

    app.route('/updateUserInfo')
        .post(transaction.updateUserInfo);

    app.route('/updateNote')
        .post(general.updateNote);

    app.route('/addTransaction')
        .post(general.addTransaction);

    app.route('/deleteTransaction')
        .post(general.deleteTransaction);

    app.route('/exportTransaction')
        .get(general.exportTransaction)

    app.route('/changeAccountStatus')
        .get(general.changeAccountStatus)

    app.route('/changeNumber')
        .get(general.changeNumber)

    app.route('/changeAccountColor')
        .get(general.changeAccountColor)
};
