import { createSlice } from '@reduxjs/toolkit';
import {
  PRODUCT_REVIEW_REQUEST,
  PRODUCT_REVIEW_SUCCESS,
  PRODUCT_REVIEW_FAIL,
} from '../constants/reviewConstants';

const initialState = {
  reviews: [],
  loading: false,
  error: null,
};

const reviewSlice = createSlice({
  name: 'reviewList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(PRODUCT_REVIEW_REQUEST, (state) => {
        state.loading = true;
        state.reviews = [];
      })
      .addCase(PRODUCT_REVIEW_SUCCESS, (state, action) => {
        state.loading = false;
        state.reviews = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(PRODUCT_REVIEW_FAIL, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.reviews = [];
      });
  },
});

export default reviewSlice.reducer;