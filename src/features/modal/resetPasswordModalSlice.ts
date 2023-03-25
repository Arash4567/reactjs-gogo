import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface ResetPasswordModal {
  isOpenModal: boolean,
}

const initialState: ResetPasswordModal = {
  isOpenModal: false
} 

const resetPasswordModalSlice = createSlice({
  name: "ResetPasswordModalStore",
  initialState,
  reducers: {
    toggleModal: (state, action: PayloadAction<boolean>) => {
      state.isOpenModal = action.payload
    }
  }
})

export const { toggleModal } = resetPasswordModalSlice.actions

export default resetPasswordModalSlice.reducer