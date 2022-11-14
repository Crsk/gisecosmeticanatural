import { createSlice } from '@reduxjs/toolkit';
import { UserJSON } from '../../data/users/models/user.interface';

const initialState: UserJSON = {
  uid: '',
  name: null,
  photo: null,
  isAdmin: false
}

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setActiveUser: (state, action) => Object.assign(state, action.payload),
    setLogoutState: (state) => Object.assign(state, initialState)
  },
})
export const { setActiveUser, setLogoutState } = userSlice.actions
export const selectUser = (state: any) => state.user
export default userSlice.reducer