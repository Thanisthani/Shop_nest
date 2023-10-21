import { NextFunction, Request, Response } from 'express'
import {
  loginUserService,
  registerUserService,
} from '../../services/userService'

export const loginUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = await req.body
    const { accessToken, name, isAdmin } = await loginUserService(
      email,
      password
    )
    return res.status(200).json({
      accessToken,
      name,
      isAdmin,
      email,
    })
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    })
  }
}

export const registerUserController = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = await req.body
    const { accessToken, isAdmin } = await registerUserService(
      name,
      email,
      password
    )

    return res.status(200).json({
      accessToken,
      name,
      isAdmin,
      email,
    })
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    })
  }
}
