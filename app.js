const path = require('path')
    , express = require('express')
    , connect = require('express/node_modules/connect')
    , cookie = require('express/node_modules/cookie')
    , app = express()
    , http = require('http')
    , server = http.createServer(app)
    , port = process.env.PORT || 1337
    , sessionStore = new express.session.MemoryStore({ reapInterval: 60000 * 10 })
    , sessionSecret = "some private string"
    ;

// Public API: distinct app (Express) and actual server (HttpServer)
module.exports = { app: app, server: server };

/** Configuration */
app.configure(function() {
  this.engine('ejs', require('ejs-locals'));
  this.set('views', path.join(__dirname, 'views'));
  this.set('view engine', 'ejs');
  this.use(express.static(path.join(__dirname, '/checkISEP')));
  // Allow parsing cookies from request headers
  this.use(express.cookieParser());
  // Session management
  // Internal session data storage engine, this is the default engine embedded with connect.
  // Much more can be found as external modules (Redis, Mongo, Mysql, file...). look at "npm search connect session store"
  this.use(express.session({ "secret": sessionSecret, "store": sessionStore }));
  // Allow parsing form data
  this.use(express.bodyParser());
});
app.configure('development', function(){
  this.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});
app.configure('production', function(){
  this.use(express.errorHandler());
});

/** Routes */
app.get('/session-index', function (req, res, next) {
  // Increment "index" in session
  req.session.index = (req.session.index || 0) + 1;
  // View "session-index.ejs"
  res.render('session-index', {
    "index": req.session.index,
    "sessId": req.sessionID
  });
});

/** Middleware for limited access */
function requireLogin (req, res, next) {
  if (req.session.username) {
    // User is authenticated, let him in
    next();
  } else {
    // Otherwise, we redirect him to login form
    res.redirect("/login");
  }
}

/** Home page (requires authentication) */
app.get('/', [requireLogin], function (req, res, next) {
  res.render('index', { "username": req.session.username });
});

/** Login form */
app.get("/login", function (req, res) {
  // Show form, default value = current username & empty password
  res.render("login", { "username": req.body.username, "pass": "","error": null });
});
app.post("/login", function (req, res) {
  var options = { "username": "", "pass": "","error": null };
  if (req.body.username == req.session.username) {
    // User has not changed username, accept it as-is
    res.redirect("/");
  } else if (!req.body.username.match(/^[a-zA-Z0-9\-_]{3,}$/)) {
    options.error = "User name must have at least 3 alphanumeric characters";
    res.render("login", options);
  } else {
    // Validate if username is free
    sessionStore.all(function (err, sessions) {
      if (!err) {
        var found = false;
        for (var i=0; i<sessions.length; i++) {
          var session = JSON.parse(sessions[i]);
          if (session.username == req.body.username) {
            err = "User name already used by someone else";
            found = true;
            break;
          }
        }
      }
      if (err) {
        //if error, display error message
        options.error = ""+err;
        res.render("login", options);
      } else {
        console.log('Tu es seul');
        var sql = 'SELECT * FROM projet_web.users WHERE name = '+ connection.escape(req.body.username);
        connection.query(sql, function(errSql, rows, fields) {
          if (errSql) throw errSql;
          console.log(rows[0].password);
          var motpasse = rows[0].password;
          console.log(motpasse);
          if (req.body.pass != motpasse) {
            options.error = "Je suis presque sûr que tu t'es trompé de de mot de passe!!";
            res.render("login", options);
          }else if (req.body.pass == motpasse)
          {
            req.session.username = req.body.username;
            req.session.pass = req.body.pass;
            console.log("le mot de passe est censé être ok");
            res.redirect("/");
          }
        });
      }
    });
  }
});

/** WebSocket */
//var sockets = require('socket.io').listen(server).of('/Application ISEP');


//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
/** Start server */
if (!module.parent) {
  server.listen(port, function () {
    console.log('Listening', this.address());
  })
}

//DataBase connection
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
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
