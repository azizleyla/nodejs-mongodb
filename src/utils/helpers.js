const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

require("dotenv").config()

const { JWT_SECRET = "" } = process.env;

class encrypt {
    static async encryptpass(password) {
        return bcrypt.hashSync(password, 12);
    }
    static comparepassword(hashPassword, password) {
        return bcrypt.compareSync(password, hashPassword);
    }

    static generateToken(payload) {
        return jwt.sign(payload, `${process.env.JWT_SECRET_KEY}`, { expiresIn: "5s" });
    }
}



const checkIsAuth = (roles) => {
    return [
        authentification,
        async (req, res, next) => {
            const user = await User.findOne({ _id: req[" currentUser"].id });
            if (roles && !roles.includes(user?.role)) {
                return res.status(403).json({ error: "Forbidden" });
            }
            next();
        },
    ];
};

const parseSocialMedia = (data) => {
    if (typeof data === 'string') {
        return JSON.parse(data);
    }
    return data;
};

module.exports = {
    encrypt,
    checkIsAuth,
    parseSocialMedia
}


