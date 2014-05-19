//attention, ne fonction que pour Aimery car il faut avoir crée la bdd correspondante
var mysql      = require('mysql');
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

var sql = 'INSERT INTO testwebav.table1 VALUES ("Paul","Thomas",2)';
var sqlDisplay = 'SELECT * FROM testwebav.table1';

//connection.query(sql);
connection.query(sqlDisplay, function(err, rows, fields) {
    if (err) throw err;
 
    for (var i in rows) {
        console.log('Post Titles: ', rows[i].name);
    }
});
connection.end();