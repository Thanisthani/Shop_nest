import { findUserByEmailRepo } from '../database/repository/userRepository'
import { generateToken, validatePassword } from '../utils'

export const loginUserService = async (email: string, password: string) => {
  try {
    const existingUser = await findUserByEmailRepo(email)
    if (existingUser) {
      const isValidate = await validatePassword(password, existingUser.password)

      if (isValidate) {
        const { name, isAdmin } = await existingUser
        const accessToken = await generateToken({ name, email, isAdmin })
        return accessToken
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
