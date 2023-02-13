import {createSlice} from "@reduxjs/toolkit";

const hitSlice = createSlice({
    name: "hits",
    initialState: {
        data: [],
    },
    reducers: {
        setData(state, action) {
            state.data = action.payload.data;
        },
        deleteData(state) {
            state.data = [];
        }
    },
})

export const { setData, deleteData } = hitSlice.actions;

export default hitSlice.reducer;
