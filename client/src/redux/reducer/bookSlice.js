import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const bookSlice = createSlice({
    name: 'books',
    initialState: { books: [], loading: false, error: null, success: false },
    reducers: {
        resetStatus: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addBook.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(addBook.fulfilled, (state, action) => {
                state.books.push(action.payload);
                state.loading = false;
                state.success = true;
            })
            .addCase(addBook.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const addBook = createAsyncThunk(
    'books/addBook',
    async (bookData, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            for (const key in bookData) {
                formData.append(key, bookData[key]);
            }
            const response = await axios.post('/api/books', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Error de red');
        }
    }
);

export const { resetStatus } = bookSlice.actions;
export default bookSlice.reducer;