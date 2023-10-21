import userModel from '../models/userModel'

export const findUserByEmailRepo = async (email: string) => {
  try {
    const user = await userModel.findOne({ email: email })
    return user
  } catch (error: any) {
    throw new Error(error.message)
  }
}

export const createUserRepo = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const user = await new userModel({ name, email, password, isAdmin: false })
    const userResult = await user.save()
    return userResult
  } catch (error: any) {
    console.log('register repo error', error)
    throw new Error(error.message)
  }
}
