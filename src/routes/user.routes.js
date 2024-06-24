const Router = require('express')
const { signUpUser, loginUser, getProfile } = require('../controllers/users');
const { authentification } = require('../../middleware/authentification');
const { authorization } = require('../../middleware/authorization');

const userRouter = Router();

userRouter.post('/signup', signUpUser)
userRouter.post('/login', loginUser)
userRouter.get('/profile', authentification,
    authorization(['admin', 'doctor']),
    getProfile
)

module.exports = {
    userRouter
}