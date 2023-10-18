import userModel from '../models/userModel'

export const findUserByEmailRepo = async (email: string) => {
  try {
    const user = await userModel.findOne({ email: email })
    return user
  } catch (error: any) {
    throw new Error(error.message)
  }
}
