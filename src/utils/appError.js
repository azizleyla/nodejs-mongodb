// utils/appError.js
class AppError extends Error {
    constructor(message, status = 404) {
        super(message);
        this.status = status;
        this.message = Array.isArray(message) ? message[0]?.message : message;
        this.statusType = status.toString().startsWith("4") ? "fail" : "error"; // Convert status to string
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;
