import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    likes:[],
    like:{}
}

export const saveLike = createAsyncThunk("saveLike", async (newLike) => {
    try {
        const response = await axios.post("/likes", newLike,{
            headers:{
                "Content-Type":"application/json",
                "Authorization":localStorage.getItem("tokenKey"),
            }
        })
        return response.data;
    } catch (error) {
        console.log("SaveLike Error", error);
    }
})

export const deleteLike =createAsyncThunk("deleteLike",async(likeId)=>{
    try {
        const response = await axios.delete(`/likes/${likeId}`,{
            headers:{
                "Authorization":localStorage.getItem("tokenKey"),
            }
        });
    } catch (error) {
        console.log("Delete Like Error",error);
    }
})

export const likeSlice = createSlice({
    name: "like",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(saveLike.fulfilled,(state,action)=>{
            state.like =action.payload;
        })

    }
})


export const { } = likeSlice.actions

export default likeSlice.reducer
