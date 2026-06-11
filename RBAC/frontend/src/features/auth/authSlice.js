import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

const savedSession = authService.restoreSession()

const initialState = {
  user: savedSession ? savedSession.user : null,
  token: savedSession ? savedSession.token : null,
  role: savedSession ? savedSession.user.role : null,
  isAuthenticated: savedSession !== null,
  isLoading: false,
  error: null,
}

// Thunk to handle user authentication
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const data = await authService.login(username, password)
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

// Thunk to clear auth session and logout user
export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async () => {
    authService.logout()
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.user
        state.token = action.payload.token
        state.role = action.payload.user.role
        state.isAuthenticated = true
        state.error = null
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        state.isAuthenticated = false
      })

    builder
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null
        state.token = null
        state.role = null
        state.isAuthenticated = false
        state.error = null
      })
  },
})

export const { clearError } = authSlice.actions

export const selectUser = (state) => state.auth.user
export const selectRole = (state) => state.auth.role
export const selectToken = (state) => state.auth.token
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated
export const selectIsLoading = (state) => state.auth.isLoading
export const selectError = (state) => state.auth.error

export default authSlice.reducer
