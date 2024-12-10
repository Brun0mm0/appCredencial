const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const userRout = require('./routes/routes');
const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError')

//middelwears
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//routes
app.use('/v1.2/',userRout);
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
})

app.use(globalErrorHandler);

module.exports = app;