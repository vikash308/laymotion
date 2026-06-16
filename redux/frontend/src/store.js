import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlice'
import userReducer from './userSlice'
import themeReducer from './themeSlice'

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        user: userReducer,
        theme: themeReducer,
    },
})
