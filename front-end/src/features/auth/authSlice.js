import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

//get user from localStorage
const user = JSON.parse(localStorage.getItem('user'));

//create the initial state
const initialState = {
    user: user || null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    isLoggedIn: false,
    message: ''
};

//register the user
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
    try {
        return await authService.register(user)
    } catch (error) {
        const message = error.response?.data?.message || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

//login
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try {
        return await authService.login(user)
    } catch (error) {
        const message = error.response?.data?.message || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

//logout
export const logout = createAsyncThunk('auth/logout', async () => {
    await authService.logout();
})

//create the slice
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // reset state values
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.isLoggedIn = false;
            state.message = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null
            })
    },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;