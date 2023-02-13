import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "userInfo",
    initialState: {
        id: undefined,
        username: "Not authorized",
        authorized: false,
        token: "",
    },
    reducers: {
        setUserInfo(state, action) {
            state.id = action.payload.id;
            state.username = action.payload.username;
            state.authorized = action.payload.authorized;
            state.token = action.payload.token;
        },
        deleteUserInfo(state) {
            state.id = undefined;
            state.username = "Not authorized";
            state.authorized = false;
            state.token = "";
        }
    },
})

export const {setUserInfo, deleteUserInfo} = userSlice.actions;

export default userSlice.reducer;
