var html = require('fs').readFileSync(/*__dirname+*/'../client/login.html');
var app = require('http').createServer(function(req, res){ res.end(html); });
app.listen(8080);
var io = require("socket.io");
var io = io.listen(app);
/*io.sockets.on('connection', function (socket) {
    socket.emit('faitUneAlerte');
});*/

io.sockets.on('connection', function (socket) {
 
 console.log('\n nouvel utilisateur...');
 var mysql = require('mysql');
	var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : ''
});
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});

socket.on('clickonbutton', function (data) {
		console.log(data);

		});
});
