import { configureStore } from '@reduxjs/toolkit';
import {productReducer} from './reducers/productReducers';
import {userLoginReducer } from './reducers/userReducers'
import {productListReducer} from './reducers/productReducers'; // Asegúrate de que este sea el nombre correcto del reducer
import productDetailsReducer from './reducers/productDetailReducer';
import { cartReducer } from './reducers/cartReducer';

const cartItemsFromStorage = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [];

const userInfoFromStorage = localStorage.getItem('userInfo') 
? JSON.parse(localStorage.getItem('userInfo')) 
: null

    
const preloadedState = {
    cart: {
        cartItems: cartItemsFromStorage,
    },
    userLogin: {
      userInfo: userInfoFromStorage
    }
};

const store = configureStore({
    reducer: {
        productList: productListReducer,
        productDetails: productDetailsReducer,
        cart: cartReducer,
        userLogin: userLoginReducer,
    },
    preloadedState,
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;
