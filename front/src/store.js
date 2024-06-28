import { configureStore } from '@reduxjs/toolkit';
import {productListReducer} from './reducers/productReducers'; // Asegúrate de que este sea el nombre correcto del reducer
import productDetailsReducer from './reducers/productDetailReducer';
import { cartReducer } from './reducers/cartReducer';
import {productListingReducer} from './reducers/ProductListingReducer';

const cartItemsFromStorage = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [];
const shippingAddressFromStorage=localStorage.getItem('shippingAddress')
    ? JSON.parse(localStorage.getItem('shippingAddress')): {}

const preloadedState = {
    cart: {
        cartItems: cartItemsFromStorage,shippingAddress:shippingAddressFromStorage
    },
    
    
};

const store = configureStore({
    reducer: {
        productList: productListReducer,
        productDetails: productDetailsReducer,
        cart: cartReducer,
        productListing: productListingReducer,
    },
    preloadedState,
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;