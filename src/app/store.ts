import { configureStore } from "@reduxjs/toolkit"
import userReducer from "../features/user/userSlice"
import productsReducer from "../features/products/productsSlice"
import newProductReducer from "../features/products/newProductSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    products: productsReducer,
    newProduct: newProductReducer
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>