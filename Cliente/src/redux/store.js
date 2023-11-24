import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import notificationReducer from './notificationSlice';
import { combineReducers } from "redux";

const persistConfig = {
  key: 'root', // Punto de inicio para almacenar todo el estado de la tienda
  storage, // Define el tipo de almacenamiento
};

const rootReducer = combineReducers({
  auth: authReducer,
  notifications: notificationReducer,
  // otros reducers aquí si los hay
});


const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export default store;