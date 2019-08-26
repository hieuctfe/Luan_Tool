var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var routes = require('./api/router');
// require('dotenv').load()
var model = require('./models');
model.sequelize
  .sync()
  .then(function() {
    //     console.log('nice');
  })
  ['catch'](function() {
    //     console.log('not nice');
  });
var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
var port = process.env.PORT || 3001;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// let routes = require('./api/routes');
routes(app);
app.use(function(req, res) {
  res.status(404).send({ url: req.originalUrl + ' not found' });
});
app.listen(port);
console.log('RESTful API server started on: ' + port);
