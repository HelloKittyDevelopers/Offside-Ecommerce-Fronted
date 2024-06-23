import { configureStore } from '@reduxjs/toolkit';
import {productListReducer} from './reducers/productReducers';
import productDetailsReducer from './reducers/productDetailReducer';

const store = configureStore({
  reducer: {
    productList: productListReducer,
    productDetails: productDetailsReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;