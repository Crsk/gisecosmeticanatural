import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  displayName: null,
  photoURL: null
}

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setActiveUser: (state, action) => {
      state.displayName = action.payload?.displayName
      state.photoURL = action.payload?.photoURL
    },
    setLogoutState: (state) => {
      state.displayName = null,
      state.photoURL = null
    }
  },
})
export const { setActiveUser, setLogoutState } = userSlice.actions
export const selectUser = (state: any) => state.user
export default userSlice.reducer