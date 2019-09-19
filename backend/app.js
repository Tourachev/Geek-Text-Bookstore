const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const mariadb = require("mariadb/callback");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const booksRouter = require("./routes/books");
const bookSort = require("./book-sort.js");

const Promise = require('promise');

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
app.use("/books", booksRouter);

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

//Create a connection pool
//Anyone can access the db server remotely with info below
//Only access to GeekTextDB is given, no access to other dbs
//for security reasons
const pool = mariadb.createPool({
    host: "virt-servers.mynetgear.com",
    port: 30000,
    user: "team8",
    password: "WehaveControl",
    database: "GeekTextDB",
    connections: 10
    //rowsAsArray: true
});

//var qResult = is th; //to store query result

//Using query function bookTitle
//Get name from front end, then send json back
bookSort.byTitle("Harry Potta", pool, function(err, res, fields){
    if (err){
        console.log('Error: ' + err);
    }
    else{
        console.log(res);
    }
});

app.listen(PORT, () => {
    console.log("Magic on port 3001");
});
