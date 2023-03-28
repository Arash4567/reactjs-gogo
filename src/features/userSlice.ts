import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { UserInfo } from '../models/interfaces'

const initialState: UserInfo = {
  firstname: '',
  lastname: '',
  role: 'admin'
} 

const userSlice = createSlice({
  name: "UserStore",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserInfo>) => {
      state = action.payload
    }
  }
})

export const { setUserData } = userSlice.actions

export default userSlice.reducer