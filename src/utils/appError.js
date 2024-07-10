// utils/appError.js
class AppError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.messages = message; // Add this line to assign the message to this.messages

        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;
