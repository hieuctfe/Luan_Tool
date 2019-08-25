const express = require('express')
var path = require('path');
const app = express()
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
const bodyParser = require('body-parser')
require('dotenv').load()
const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


let routes = require('./api/routes') //importing route
routes(app)


app.listen(port)

console.log('RESTful API server started on: ' + port)
