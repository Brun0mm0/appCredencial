class AppError extends Error {
    constructor(message, isOperational ,statusCode) {
        super(message);

        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = isOperational;
        // this.msg = message

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;