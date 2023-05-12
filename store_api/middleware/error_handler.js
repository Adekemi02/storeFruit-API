const errorMessages = {
    USER_NOT_FOUND: "The requested user could not be found",
    INVALID_CREDENTIALS: "The provided credentials are invalid",
};

const errorHandlerMiddleware = (err, req, res, next) => {
    console.error("Middleware Error Handling: ", err);

    const status = err.status || 500;
    const message = errorMessages[err.code] || "Something went wrong";

    res.status(status).json({
        success: false,
        status,
        message,
    });
};


module.exports = errorHandlerMiddleware