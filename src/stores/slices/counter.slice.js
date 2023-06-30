import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const findAllUsers = createAsyncThunk(
    "findAllUsers",
    async () => {
        let res = await axios.get(process.env.REACT_APP_SERVER_JSON + 'user');
        return res.data
    }
)

const createNewUsers = createAsyncThunk(
    "createNewUsers",
    async (newUser) => {
        //http://localhost:4000/users
        let res = await axios.post(process.env.REACT_APP_SERVER_JSON + 'user', newUser);
        return res.data
    }
)

const deleteUserById = createAsyncThunk(
    "deleteUserByid",
    async (userId) => {
        let res = await axios.delete(process.env.REACT_APP_SERVER_JSON + "user/" + userId)
        return userId;
    }
)
// const updateUser = createAsyncThunk(
//     "updateUser",
//     async (editData) => {
//         //http://localhost:4000/users/1   , editData
//         let res = await axios.put(process.env.REACT_APP_SERVER_JSON + 'user/' + editData.id, editData);
//         return res.data
//     }
// )
const updateUser = createAsyncThunk(
    "updateUser",
    async (dataObj) => {
        //http://localhost:4000/users/1   , editData
        let res = await axios.put(process.env.REACT_APP_SERVER_JSON + 'user/' + dataObj.userId, dataObj.editData);
        return res.data
    }
)

const setStatusUser = createAsyncThunk(
    "setStatusUser",
    async (dataObj) => {
        //http://localhost:4000/users/1   , editData
        let res = await axios.patch(process.env.REACT_APP_SERVER_JSON + 'user/' + dataObj.userId, dataObj.patchData);
        return res.data
    }
)

const counterSlice = createSlice({
    name: "counter",
    initialState: {
        counter: 0,
        loading: false,
        users: [],
    },
    reducers: {
        increment: (state, action) => {
            state.counter += 1;
        },
        decrement: (state, action) => {
            state.counter -= 1;
        },
        resetCounter: (state, action) => {
            state.counter = action.payload.number * action.payload.temp;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(findAllUsers.pending, (state, action) => {
                state.loading = true;
                console.log("Đã vào pending");
            })
            .addCase(findAllUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(findAllUsers.rejected, (state, action) => {
                state.loading = false;
                console.log("Đã vào rejected");
            })
            // create new user
            .addCase(createNewUsers.pending, (state, action) => {
                state.loading = true;
                console.log("Đã vào pending");
            })
            .addCase(createNewUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users.push(action.payload);
            })
            .addCase(createNewUsers.rejected, (state, action) => {
                state.loading = false;
                console.log("Đã vào rejected");
            })
        // delete user

        builder.addCase(deleteUserById.pending, (state, action) => {
            state.loading = true;
            console.log("Đã vào pending");
        })
        builder.addCase(deleteUserById.fulfilled, (state, action) => {
            state.loading = false;
            console.log("đã vào fulfilled", action.payload);
            state.users = state.users.filter(user => user.id != action.payload);
        })
        builder.addCase(deleteUserById.rejected, (state, action) => {
            state.loading = false;
            console.log("Đã vào rejected");
        })
        // update User
        builder.addCase(updateUser.pending, (state, action) => {
            state.loading = true;
            console.log("Đã vào pending");
        })
        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.loading = false;
            state.users = state.users.map(user => {
                if (user.id == action.payload.id) {
                    return action.payload
                }
                return user
            })
        })
        builder.addCase(updateUser.rejected, (state, action) => {
            state.loading = false;
            console.log("Đã vào rejected");
        })
        // set status of users
        builder.addCase(setStatusUser.pending, (state, action) => {
            state.loading = true;
            console.log("Đã vào pending");
        })
        builder.addCase(setStatusUser.fulfilled, (state, action) => {
            state.loading = false;
            state.users = state.users.map(user => {
                if (user.id == action.payload.id) {
                    return action.payload
                }
                return user
            })
        })
        builder.addCase(setStatusUser.rejected, (state, action) => {
            state.loading = false;
            console.log("Đã vào rejected");
        })
    },
});


export const counterActions = {
    ...counterSlice.actions,
    findAllUsers,
    createNewUsers,
    deleteUserById,
    updateUser,
    setStatusUser
};


export default counterSlice.reducer;