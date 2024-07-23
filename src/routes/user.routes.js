const Router = require('express')
const { signUpUser, loginUser, getProfile, checkAuth } = require('../controllers/users');

const userRouter = Router();

userRouter.post('/signup', signUpUser)
userRouter.post('/login', loginUser)
userRouter.get('/profile', checkAuth(),
    getProfile
)

module.exports = {
    userRouter
}