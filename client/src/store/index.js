import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
// We will add postReducer here later

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});