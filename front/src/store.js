import { configureStore } from '@reduxjs/toolkit';
import {thunk} from 'redux-thunk';
import productReducer from './reducers/productReducers';
import reviewReducer from './reducers/reviewReducer';
const store = configureStore({
  reducer: {
    productList: productReducer,
    reviewList: reviewReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;