var createError = require('http-errors');
const express = require('express');

const indexRouter = require('./routes/index');

const app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());


app.use('/', indexRouter);
app.use('/reveal', express.static(__dirname + '/reveal'));
app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next) {
    next(createError(404));
});

app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.listen(8080);
module.exports = app;
