import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import { productListReducer } from './reducers/productReducers'; // Asegúrate de que este sea el nombre correcto del reducer
import productDetailsReducer from './reducers/productDetailReducer';
import { cartReducer } from './reducers/cartReducer';
import {productListingReducer} from './reducers/ProductListingReducer';

const cartItemsFromStorage = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [];

const preloadedState = {
    cart: {
        cartItems: cartItemsFromStorage,
    },
};

// Configuración del store
const store = configureStore({
  reducer: {
    productList: productListReducer,
    productDetails: productDetailsReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
