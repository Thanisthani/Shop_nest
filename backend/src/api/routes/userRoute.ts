import express, { Router } from 'express'
import { loginUserController } from '../controllers/userController'

const userRouter: Router = express.Router()

userRouter.post('/login', loginUserController)

export default userRouter
