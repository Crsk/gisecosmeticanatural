import { createSlice } from '@reduxjs/toolkit';
import { IProductWithRefs } from '../../data/product/models/productWithRefs.model';

const initialState: IProductWithRefs[] = []

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => state = action.payload
  },
})
export const { setProducts } = productSlice.actions
export default productSlice.reducer