import { createSlice } from '@reduxjs/toolkit';
import { IProductWithRefs } from '../../data/product/models/productWithRefs.model';

const initialState: IProductWithRefs = {
  id: '',
  name: '',
  description: '',
  photo: '',
  position: 0,
  ingredientIds: [],
  iIngredients: []
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

