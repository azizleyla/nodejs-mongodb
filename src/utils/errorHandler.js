
const obtainErrorMessages = async (response) => {
    let message = [];
    if (typeof response.formatter !== "undefined") {
        let errors = validatorMessageCollector(response);
        message.push(...errors);
    }

    if (typeof response === "string") {
        message.push({
            type: "error",
            text: response,
        });
    }

    if (typeof response.message !== "undefined") {
        if (Array.isArray(response.message)) {
            message.push(...response.message);
        } else {
            message.push({
                type: "error",
                text: String(response.message),
            });
        }
    }

    if (typeof response.json === "function") {
        let parsedJson = await safeParseJson(response);
        if (Array.isArray(parsedJson.messages)) {
            parsedJson.messages.forEach((msg) => {
                message.push({
                    type: "error",
                    text: msg.message,
                });
            });
        } else {
            message.push({
                type: "error",
                text: typeof parsedJson === "string" ? parsedJson : JSON.stringify(parsedJson),
            });
        }
    }
    if (response?.messages !== undefined && Array.isArray(response?.messages)) {
        message = [...message, ...response.messages];
    }
    return message;
};

const sendErrorDev = async (err, req, res) => {
    let collectMessages = await obtainErrorMessages(err.message);
    console.error({
        title: "ERROR HAPPENED",
        status: err.status,
        isOperational: err.isOperational,
        name: err.name,
        descprition: err.descprition,
        messages: collectMessages,
        stack: `${err.message}, ${err.stack}`,
    });

    res.status(err.status).json({
        id: new Date().getTime(),
        status: err.status,
        messages: collectMessages,
        error: {
            isOperational: err.isOperational,
            stack: `${err.message}, ${err.stack}`,
        },
        data: null,
    });
};


const errorHandler = (err, req, res, next) => {
    console.log(err)
    let error = {
        status: err.status ?? 500,
        message: err.message ?? [],
        name: err.name,
        description: err.description,
        isOperational: err.isOperational ?? false,
    };
    sendErrorDev(error, req, res);
};

module.exports = { errorHandler };