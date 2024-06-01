import { configureStore } from '@reduxjs/toolkit';
import authReducer from './states/authSlice';
import { authApi } from './states/authApi';
import { gamesApi } from './states/games.slice'; 
 

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [gamesApi.reducerPath]: gamesApi.reducer,  
    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, gamesApi.middleware),  
});