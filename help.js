'use strict';
var http = require('http');
var port = process.env.PORT;
 
http.createServer(function (req, res) {
res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
var str = '��y l� m�n h�nh <font color="red">hu?ng d?n s? d?ng</font>\n'
+ '<br/>'
+ 'Mu?n h?c l?p tr�nh chuy�n nghi?p, v�o:'
+'<a href = "http://communityuni.com"> http://communityuni.com</a>'
res.end(str)
}).listen(port);