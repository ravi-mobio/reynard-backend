exports.successResponse = (msg, data) => {
    return {
        status: true,
        message: msg,
        data: data,
    };
};

exports.errorResponse = (msg, data) => {
    return {
        status: false,
        message: msg ? msg : 'Something went wrong.',
        data: data,
    };
};