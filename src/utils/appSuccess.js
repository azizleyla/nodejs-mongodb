const sendResponseDev = (res, data, messages, body) => {
    const jsonData = {
        id: new Date().getTime(),
        uuid: "",
        status: 200,
        ...body,
        messages,
        data: data ? data : null,
    };

    res.status('200').json(jsonData);
};

module.exports = (res, data, messages = [], body = {}) => {
    return sendResponseDev(res, data, messages, body);
};