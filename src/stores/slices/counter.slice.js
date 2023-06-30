import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const findAllUsers = createAsyncThunk(
    "findAllUsers",
    async () => {
        let res = await axios.get(process.env.REACT_APP_SERVER_JSON + 'user');
        return res.data
    }
)

const counterSlice = createSlice(
    {
        name: "counter",
        initialState: {
            counter: 0,
            loading: false,
            users: []
        },
        reducers: {
            increment: (state, action) => {
                return { ...state, counter: state.counter + 1 }
            },
            decrement: (state, action) => ({ ...state, counter: state.counter - 1 }),
            resetCounter: (state, action) => {
                return { ...state, counter: action.payload.number * action.payload.temp }
            }
        },
        extraReducers: (builder) => {
            builder.addCase(findAllUsers.pending, (state, action) => {
                state.loading = true;
                console.log("da vao pending");
            });
            builder.addCase(findAllUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = [...action.payload]
                console.log("da vao fulfilld", action.payload);
            });
            builder.addCase(findAllUsers.rejected, (state, action) => {
                state.loading = false;
                console.log("da vao rejected");
            });
        }
    }
)


export const counterActions = {
    ...counterSlice.actions,
    findAllUsers
};


export default counterSlice.reducer;