import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { UserInfo } from '../../types/user.type'
import userService from '../../api/userService'
import { AuthState } from '../../types/auth.type'

const initialState: AuthState = {
  name: localStorage.getItem('userInfo')
    ? (JSON.parse(localStorage.getItem('userInfo')!).name as string)
    : null,
  email: localStorage.getItem('userInfo')
    ? (JSON.parse(localStorage.getItem('userInfo')!).email as string)
    : null,
  token: localStorage.getItem('userInfo')
    ? (JSON.parse(localStorage.getItem('userInfo')!).accessToken as string)
    : null,
  isAdmin: localStorage.getItem('userInfo')
    ? (JSON.parse(localStorage.getItem('userInfo')!).isAdmin as boolean)
    : false,
  errMsg: '',
}

export const signInUser = createAsyncThunk(
  'user/signIN',
  async (data: UserInfo, thunkAPI) => {
    try {
      const response = await userService.signInUserService(data)
      console.log('Sign user response', response.data)
      await localStorage.setItem('userInfo', JSON.stringify(response.data))
      return response.data
    } catch (error: any) {
      console.log('sign error', error.response.data.error)
      return thunkAPI.rejectWithValue(error.response.data.error)
    }
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signInUser.fulfilled, (state, action) => {
      state.name = action.payload.name
      state.email = action.payload.email
      state.isAdmin = action.payload.isAdmin
      state.token = action.payload.token
    })
    builder.addCase(signInUser.rejected, (state, action) => {
      state.errMsg = action.payload as string
      console.log('sign rroorr', state.errMsg)
    })
  },
})

export default userSlice.reducer
