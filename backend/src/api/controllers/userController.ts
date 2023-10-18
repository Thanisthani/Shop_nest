import { NextFunction, Request, Response } from 'express'
import { loginUserService } from '../../services/userService'

export const loginUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = await req.body
    await console.log('Email', email)
    const accessToken = await loginUserService(email, password)
    return res.status(200).json({
      accessToken,
    })
  } catch (error: any) {
    next(error)
  }
}
