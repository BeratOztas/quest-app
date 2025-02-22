import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { act } from "react";

const initialState = {
    posts: [],
    post :{},
    loading: false,
    getPostLoading: false,
    isUpdated: false,
    error: null
}

export const getAllPosts = createAsyncThunk("getAllPosts", async () => {
    try {
        const response = await axios.get("/posts");
        return response.data;
    } catch (error) {
        console.log("Get All Post Error", error);
    }
})

export const getPost = createAsyncThunk("getPost",async (postId)=>{
    try {
      const response =  await axios.get(`/posts/${postId}`,{
            headers:{
                "Content-Type":"application/json",
                "Authorization":localStorage.getItem("tokenKey")
            }
        });
        return response.data;
    } catch (error) {
        console.log("Get Post Error", error);
    }
})

export const savePost = createAsyncThunk("savePost", async (newPost) => {
    try {
        const response = await axios.post("/posts", newPost,{
            headers:{
                "Content-Type":"application/json",
                "Authorization":localStorage.getItem("tokenKey")
            }
        });
        console.log("New Post created" + response.data);
        return response.data;
    } catch (error) {
        console.log("Post Error", error);
    }
})

export const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        setUpdated: (state, action) => {
            state.isUpdated = action.payload; // isUpdated durumunu değiştirme
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAllPosts.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(getAllPosts.fulfilled, (state, action) => {
            state.loading = false;
            state.posts = action.payload;
        })
        builder.addCase(getAllPosts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        builder.addCase(savePost.fulfilled,(state,action)=>{
            state.posts=[...state.posts,action.payload];
        })
        builder.addCase(getPost.pending, (state, action) => {
            state.getPostLoading = true;
        });
        builder.addCase(getPost.fulfilled,(state,action)=>{
            state.getPostLoading = false;
            state.post =action.payload;
        })
        builder.addCase(getPost.rejected, (state, action) => {
            state.getPostLoading = false;
            state.error = action.payload;
        });
    }
})


export const { setUpdated } = postSlice.actions

export default postSlice.reducer