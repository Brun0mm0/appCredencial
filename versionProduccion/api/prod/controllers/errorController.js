const AppError = require('./../utils/appError')

const sendErrDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        msg: err.message,
        stack: err.stack
    })
}

const sendErrProd = (err, res) => {
    if(err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            // msg: err.msg
        });
    } else {
        // console.log('Error', err);
        res.status(500).json({
            msg: 'Error en servidor'
        })
    }
}

const handleJWTError = () => 
    new AppError('Token invalido, por favor vuelve a loguearte', 401);

const handleJWTExpiredError = () =>
    new AppError('Tu token expiró, por favor vuelve a loguearte', 401);    

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (process.env.NODE_ENV === 'development') {
        sendErrDev(err, res);
    } else if (process.env.NODE_ENV === 'production') {
        let error = { ...err };
        // console.log(error)
        if (error.name === 'JsonWebTokenError') error = handleJWTError();
        if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

       sendErrProd(err ,res) 
    }
}