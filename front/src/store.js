import { configureStore } from '@reduxjs/toolkit';
import { productReducer } from './reducers/productReducers';
import { userLoginReducer, userRegisterReducer } from './reducers/userReducers';
import { productListReducer } from './reducers/productReducers'; // Asegúrate de que este sea el nombre correcto del reducer
import productDetailsReducer from './reducers/productDetailReducer';
import { cartReducer } from './reducers/cartReducer';
import { productListingReducer } from './reducers/ProductListingReducer';

const getLocalStorageItem = (key, defaultValue) => {
    const localStorageValue = localStorage.getItem(key);
    if (localStorageValue && localStorageValue !== 'undefined') {
        return JSON.parse(localStorageValue);
    }
    return defaultValue;
};

const cartItemsFromStorage = getLocalStorageItem('cartItems', []);
const userInfoFromStorage = getLocalStorageItem('userInfo', null);

const preloadedState = {
    cart: {
        cartItems: cartItemsFromStorage
    },
    userLogin: {
        userInfo: userInfoFromStorage
    },
};

const store = configureStore({
    reducer: {
        productList: productListReducer,
        productDetails: productDetailsReducer,
        cart: cartReducer,
        userLogin: userLoginReducer,
        userRegister: userRegisterReducer,
        productListing: productListingReducer,
    },
    preloadedState,
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;
