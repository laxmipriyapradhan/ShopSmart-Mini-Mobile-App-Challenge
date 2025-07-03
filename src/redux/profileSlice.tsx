
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ProfileState {
  name: string
  email: string
  avatar: string
}

const initialState: ProfileState = {
  name: '',
  email: '',
  avatar: '',
}

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload
    },
    setAvatar: (state, action: PayloadAction<string>) => {
      state.avatar = action.payload
    },
  },
})

export const { setName, setEmail, setAvatar } = profileSlice.actions
export default profileSlice.reducer
