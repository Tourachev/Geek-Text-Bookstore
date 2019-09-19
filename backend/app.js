const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const mariadb = require("mariadb");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const booksRouter = require("./routes/books");

//purchase router
const purchaseRouter = require("./routes/purchase");

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

//purchase router
app.use("/purchase", purchaseRouter);

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
    database: "GeekTextDB"
});

//Make connection
pool.getConnection()
    .then(conn => {
        conn.query("SELECT * FROM Author")
            .then(rows => {
                var arr = rows;
                console.log(rows); //Wont output an arry if there is no data, like now
                //however, metadata of table will be shown in json
                //access array with for each loop and indexes
            })
            .catch(err => {
                console.log("Error executing query: " + err);
                conn.end();
            });
    })
    .catch(err => {
        console.log("Error making connection: " + err);
        conn.end();
    });

app.listen(PORT, () => {
    console.log("Magic on port 3001");
});
