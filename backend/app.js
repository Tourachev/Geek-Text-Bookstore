const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
let bodyParser = require('body-parser');

const cartRouter = require('./routes/cart');
const indexRouter = require('./routes/index');
const booksRouter = require('./routes/books');
const wishlistRouter = require('./routes/wishlist');
const savedForLaterRouter = require('./routes/saved-for-later');
const personalInfoRouter = require('./routes/personal-info');
const addressInfoRouter = require('./routes/address-info');
const creditInfoRouter = require('./routes/credit-info');
const authRouter = require('./routes/auth.js');
const usersRouter = require('./routes/registration.js');

//purchase router
const purchaseRouter = require('./routes/purchase');

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/books', booksRouter);
app.use('/personal-info', personalInfoRouter);
app.use('/address-info', addressInfoRouter);
app.use('/credit-info', creditInfoRouter);
app.use('/registration', usersRouter);
app.use('/auth', authRouter);
app.use('/cart', cartRouter);
app.use('/saved-for-later', savedForLaterRouter);
app.use('/wishlist', wishlistRouter);

//purchase router
app.use('/purchase', purchaseRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;

app.listen(PORT, () => {
	console.log('Magic on port 3001');
});
