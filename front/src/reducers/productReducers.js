import { createSlice } from '@reduxjs/toolkit';
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
} from '../constants/productConstants';

const initialState = {
  products: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'productList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(PRODUCT_LIST_REQUEST, (state) => {
        state.loading = true;
        state.products = [];
      })
      .addCase(PRODUCT_LIST_SUCCESS, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(PRODUCT_LIST_FAIL, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;