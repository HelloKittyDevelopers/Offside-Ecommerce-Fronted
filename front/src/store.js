import { configureStore } from '@reduxjs/toolkit';
import {thunk} from 'redux-thunk';
import productReducer from './reducers/productReducers';

const store = configureStore({
  reducer: {
    productList: productReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;