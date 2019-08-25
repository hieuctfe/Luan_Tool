'use strict';
var http = require('http');
var port = process.env.PORT;
 
http.createServer(function (req, res) {
res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
var str = 'Ðây là màn hình <font color="red">hu?ng d?n s? d?ng</font>\n'
+ '<br/>'
+ 'Mu?n h?c l?p trình chuyên nghi?p, vào:'
+'<a href = "http://communityuni.com"> http://communityuni.com</a>'
res.end(str)
}).listen(port);