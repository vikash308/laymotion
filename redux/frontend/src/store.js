import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlice'
import userReducer from './userSlice'
import themeReducer from './themeSlice'
import usersListReducer from './usersListSlice'

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        user: userReducer,
        theme: themeReducer,
        usersList: usersListReducer,
    },
})
