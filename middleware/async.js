module.exports = function (handler) {
    return async (req, res, next) => {
        try {
            await handler(req, res);
        } catch (ex) {
            // console.log("error middleware");
            // console.log(ex);
            next(ex);
        }
    };
};
