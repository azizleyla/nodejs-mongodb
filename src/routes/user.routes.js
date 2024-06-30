const Router = require('express')
const { signUpUser, loginUser, getProfile } = require('../controllers/users');
const { checkIsAuth } = require('../utils/helpers');

const userRouter = Router();

userRouter.post('/signup', signUpUser)
userRouter.post('/login', loginUser)
userRouter.get('/profile', checkIsAuth(['admin', 'doctor']),
    getProfile
)

module.exports = {
    userRouter
}