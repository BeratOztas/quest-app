import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    activityList: [],
    user:{},
    getUserLoading:false,
    loading: false,
    error: null
}

export const getActivityList = createAsyncThunk("getActivitiyList", async (userId) => {
    try {
        const response = await axios.get(`/users/activity/${userId}`,{
            headers:{
                "Content-Type":"application/json",
                "Authorization":localStorage.getItem("tokenKey")
            },
        });
        return response.data;
    } catch (error) {
        console.log("Get ActivityList Error",error);
        if(error =="Unauthorized"){
            
        }
    }
})

export const getUser =createAsyncThunk("getUser",async (userId)=>{
    try {
      const response =  await axios.get(`/users/${userId}`,{
            headers:{
                "Content-Type":"application/json",
                "Authorization":localStorage.getItem("tokenKey")
            }
        })
        return response.data;
    } catch (error) {
        console.log("getUser Id Error: ",error);
    }
})

export const saveAvatar =createAsyncThunk("saveAvatar",async (newAvatar)=>{
    try {
       const response = await axios.put("/users/avatar/"+localStorage.getItem("currentUser"),newAvatar,{
            headers:{
                "Content-Type":"application/json",
                "Authorization":localStorage.getItem("tokenKey")
            }
        })
        return response.data;
    } catch (error) {
        console.log("Save Avatar Error",error);
    }

})

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getActivityList.pending,(state,action)=>{
            state.loading=true;
        })
        builder.addCase(getActivityList.fulfilled,(state,action)=>{
            state.loading=false;
            state.activityList=action.payload;
        })
        builder.addCase(getActivityList.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        })
        builder.addCase(getUser.pending,(state,action)=>{
            state.getUserLoading=true;
        })
        builder.addCase(getUser.fulfilled,(state,action)=>{
            state.getUserLoading=false;
            state.user=action.payload;
        })
        builder.addCase(getUser.rejected,(state,action)=>{
            state.getUserLoading=false;
            state.error=action.payload;
        })
        builder.addCase(saveAvatar.fulfilled,(state,action)=>{
            state.user=action.payload;
        })
    }
})

export const { } = userSlice.actions

export default userSlice.reducer