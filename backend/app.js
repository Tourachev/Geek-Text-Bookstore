const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const mariadb = require("mariadb");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;

//----------Connecting to mariadb(need to have a mariadb server installed locally)
//----------Testing how to make the connection and displaying errors if there are any
connection = mariadb.createConnection({
    //connects to mariadb server hosted on one of my servers (Steven)
    //Anyone can access the db server remotely with info below
    //Only access to GeekTextDB is given, no access to other dbs
    //for security reasons
    host: 'virt-servers.mynetgear.com',
    port: 30000,
    user: 'team8',
    password: 'WehaveControl',
    database: 'GeekTextDB',
    rowsAsArray: true
    })
    .then(conn => {
        console.log("connected ! connection id is " + conn.threadId);
        conn.end()
        .then(() => {
            console.log('connection has ended properly');
          })
          .catch(err => {
            console.log("connection not closed properly due to error: " + err);
          });
      })
      .catch(err => {
        console.log("not connected due to error: " + err);
      });
/*-----------Executing sql table definition
Defines the database (starts a child process that uses mysql client to pass the file)
uncomment to define the database locally

const cp = require('child_process');
cp.exec('mysql -uroot -pIhaveControl4 < geek-text-def.sql', (error, stdout, stderr) => {
    if (error) throw error;
    console.log('stdout: ${stdout}');
    console.log('stderr: ${stderr}');
});
----------------------------------------------------*/

app.listen(PORT, () => {
    console.log("Magic on port 3001");
});
