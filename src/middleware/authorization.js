const User = require("../models/User");

const authorization = (roles) => {
    return async (req, res, next) => {
        const user = await User.findOne({ _id: req[" currentUser"].id });
        console.log(user)
        if (!roles.includes(user.role)) {
            return res.status(403).json({ message: "Forbidden" });
        }
        next();
    };
};
module.exports = {
    authorization
}