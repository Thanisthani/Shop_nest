import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from '../config'

export const validatePassword = async (
  enteredPassword: string,
  savedPassword: string
) => {
  return bcrypt.compare(enteredPassword, savedPassword)
}

export const generateToken = async (payload: any) => {
  return jwt.sign(payload, `${config.accessTokenKey}`, { expiresIn: '30d' })
}
