import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    mode: 'light',
    primaryColor: '#2563eb',
    backgroundColor: '#f8fafc',
    textColor: '#0f172a',
}

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleMode(state) {
            state.mode = state.mode === 'light' ? 'dark' : 'light'
            state.backgroundColor = state.mode === 'light' ? '#f8fafc' : '#0f172a'
            state.textColor = state.mode === 'light' ? '#0f172a' : '#f8fafc'
        },
        setPrimaryColor(state, action) {
            state.primaryColor = action.payload
        },
    },
})

export const { toggleMode, setPrimaryColor } = themeSlice.actions
export default themeSlice.reducer
