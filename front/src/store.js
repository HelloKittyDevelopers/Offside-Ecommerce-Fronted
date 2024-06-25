import { configureStore } from '@reduxjs/toolkit';
import {productListReducer} from './reducers/productReducers'; // Asegúrate de que este sea el nombre correcto del reducer
import productDetailsReducer from './reducers/productDetailReducer';
import { cartReducer } from './reducers/cartReducer';

const cartItemsFromStorage = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [];

const preloadedState = {
    cart: {
        cartItems: cartItemsFromStorage,
    },
};

const store = configureStore({
    reducer: {
        productList: productListReducer,
        productDetails: productDetailsReducer,
        cart: cartReducer,
    },
    preloadedState,
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;