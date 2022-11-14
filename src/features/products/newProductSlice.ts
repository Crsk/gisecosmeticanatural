import { createSlice } from '@reduxjs/toolkit';
import { ProductWithRefsJSON } from '../../data/product/models/productWithRefs.model';

const initialState: ProductWithRefsJSON = {
  id: '',
  name: '',
  description: '',
  photo: '',
  position: 0,
  ingredientIds: [],
  ingredients: []
}

const newProductSlice = createSlice({
  name: "newProduct",
  initialState,
  reducers: {
    newProduct: (state, action) => Object.assign(state, action.payload),
    resetNewProduct: (state) => initialState
  },
})
export const { newProduct, resetNewProduct } = newProductSlice.actions
export default newProductSlice.reducer

