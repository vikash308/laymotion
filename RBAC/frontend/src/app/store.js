import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'

// Central Redux store configuration
const store = configureStore({
  reducer: {
    auth: authReducer,
  },
})

export default store
