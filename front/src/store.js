import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import { productListReducer } from './reducers/productReducers';
import productDetailsReducer from './reducers/productDetailReducer';

// Configuración del store
const store = configureStore({
  reducer: {
    productList: productListReducer,
    productDetails: productDetailsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
