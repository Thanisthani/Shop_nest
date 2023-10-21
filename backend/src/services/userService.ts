import {
  createUserRepo,
  findUserByEmailRepo,
} from '../database/repository/userRepository'
import { encryptPassword, generateToken, validatePassword } from '../utils'

export const loginUserService = async (email: string, password: string) => {
  try {
    const existingUser = await findUserByEmailRepo(email)
    if (existingUser) {
      const isValidate = await validatePassword(password, existingUser.password)

      if (isValidate) {
        const { name, isAdmin } = await existingUser
        const accessToken = await generateToken({ name, email, isAdmin })
        return { accessToken, name, isAdmin }
      } else {
        throw new Error('Incorrect Password')
      }
    } else {
      throw new Error('User not found')
    }
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export const registerUserService = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const checkExistingUser = await findUserByEmailRepo(email)
    if (!checkExistingUser) {
      const hashPassword = await encryptPassword(password)
      const newUser = await createUserRepo(name, email, hashPassword)
      const isAdmin = false

      const accessToken = await generateToken({ name, email, isAdmin })
      return { accessToken, isAdmin }
    } else {
      throw new Error('Email Already Registered')
    }
  } catch (error: any) {
    throw new Error(error.message)
  }
}
