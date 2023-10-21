import express, { Router } from 'express'
import {
  loginUserController,
  registerUserController,
} from '../controllers/userController'

const userRouter: Router = express.Router()

userRouter.post('/login', loginUserController)

userRouter.post('/register', registerUserController)

export default userRouter
