import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {thunk} from 'redux-thunk';


// Definir el rootReducer combinando todos los reducers
const rootReducer = combineReducers({
  example: exampleReducer,
});

const initialState = {};

// Configurar la store utilizando configureStore
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  preloadedState: initialState,
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
