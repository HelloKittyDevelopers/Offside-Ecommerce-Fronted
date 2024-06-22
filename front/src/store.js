import { configureStore } from '@reduxjs/toolkit';
import {thunk} from 'redux-thunk';

// Configurar la store utilizando configureStore
const store = configureStore({
  reducer: {}, // No reducers por ahora
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;