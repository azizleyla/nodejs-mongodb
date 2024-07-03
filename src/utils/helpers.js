const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { authentification } = require('../middleware/authentification');
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
        return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
    }
}


const checkIsAuth = (roles) => {
    return [
        authentification,
        async (req, res, next) => {
            const user = await User.findOne({ _id: req[" currentUser"].id });
            if (roles && !roles.includes(user.role)) {
                return res.status(403).json({ error: "Forbidden" });
            }
            next();
        },
    ];
};


module.exports = {
    encrypt,
    checkIsAuth
}


