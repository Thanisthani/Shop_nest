import { UserInfo } from '../types/user.type'
import axios from './axios'

const signInUserService = async (userData: UserInfo) => {
  const response = await axios.post('/user/login', userData, {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  })

  return response
}

const userService = {
  signInUserService,
}

export default userService
