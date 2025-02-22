import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPosts, setUpdated } from '../../redux/slices/postSlice';
import Post from './Post';

import "../../css/Post.css";
import PostFrom from './PostForm';
import PostForm from './PostForm';

function PostList() {

    const dispatch = useDispatch();
    const { posts, isUpdated } = useSelector((store) => store.post);

    const refreshPosts = () => {
        dispatch(getAllPosts());
    }

    useEffect(() => {
        if (isUpdated) {
            refreshPosts();
            dispatch(setUpdated(false));
        }
    }, [dispatch, isUpdated])

    useEffect(() => {
        refreshPosts(); // Yalnızca bir kez çağır
    }, [dispatch]);

    console.log("LocalStorage Current User : "+localStorage.currentUser);
    return (
        <div >
            {localStorage.getItem("currentUser") == null ? "" :
                <PostForm userId={localStorage.getItem("currentUser")} userName={localStorage.getItem("userName")} refreshPosts={refreshPosts} />
            }
            {
                posts?.map((post) => (
                    <Post key={post.id} post={post} />
                ))
            }
        </div>
    )
}


export default PostList
