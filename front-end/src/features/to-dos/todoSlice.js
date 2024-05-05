import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import todoService from "./todoService";

//1. create initial state
const initialState = {
    todos: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

//3. thunk f(x) to create a todo
export const createToDo = createAsyncThunk('calendar/create', async (todoData, thunkAPI) => {
    try {
        //get our token from thunkAPI
        const token = thunkAPI.getState().auth.user.token;

        return await todoService.createtodo(todoData, token)
    } catch (error) {
        const message = error.response?.data?.message || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

//get user todos
export const getToDos = createAsyncThunk('calendar/getAll', async (_, thunkAPI) => {
    try {
        //get our token from thunkAPI
        const token = thunkAPI.getState().auth.user?.token;

        return await todoService.gettodos(token)
    } catch (error) {
        const message = error.response?.data?.message || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

//delete a todo
export const deleteToDo = createAsyncThunk('calendar/delete', async (id, thunkAPI) => {
    try {
        //get our token from thunkAPI
        const token = thunkAPI.getState().auth.user.token;

        return await todoService.deleteToDo(id, token)
    } catch (error) {
        const message = error.response?.data?.message || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

//create the slice
export const todoSlice = createSlice({
    name: 'to do',
    initialState,
    reducers: {
        // reset state values
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createToDo.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createToDo.fulfilled, (state, action) => {
                state.isLoading = false,
                state.isSuccess = true,
                //redux toolkit allows us to push the todo into our action.payload
                state.todos.push(action.payload)
            })
            .addCase(createToDo.rejected, (state, action) => {
                state.isLoading = false,
                state.isError = true,
                state.message = action.payload
            })

            .addCase(getToDos.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getToDos.fulfilled, (state, action) => {
                state.isLoading = false,
                state.isSuccess = true,
                state.todos = (action.payload)
            })
            .addCase(getToDos.rejected, (state, action) => {
                state.isLoading = false,
                state.isError = true,
                state.message = action.payload
            })

            .addCase(deleteToDo.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteToDo.fulfilled, (state, action) => {
                state.isLoading = false,
                state.isSuccess = true,
                //take it out of the UI (filter out the todo that was deleted using the id)
                state.todos = state.todos.filter((todo) => todo._id !== action.payload.id)
            })
            .addCase(deleteToDo.rejected, (state, action) => {
                state.isLoading = false,
                state.isError = true,
                state.message = action.payload
            })
    },
});

export const { reset } = todoSlice.actions;
export default todoSlice.reducer;