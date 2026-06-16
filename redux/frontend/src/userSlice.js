import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    name: 'Aman Sharma',
    email: 'aman.sharma@example.com',
    role: 'Employee',
    phone: '+91 98765 43210',
    location: 'Mumbai, India',
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser(state, action) {
            return { ...state, ...action.payload }
        },
        resetUser(state) {
            return initialState
        },
    },
})

export const { updateUser, resetUser } = userSlice.actions
export default userSlice.reducer
