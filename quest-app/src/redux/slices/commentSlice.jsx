import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { refreshToken } from "./authSlice";


const initialState = {
    comments: [],
    loading: false,
    isUpdated: false,
    error: null,
}

export const getCommentsByPostId = createAsyncThunk("getCommentsByPostId", async (postId) => {
    try {
        const response = await axios.get("/comments?postId=" + postId);
        console.log("Response", response.data);
        return response.data;
    } catch (error) {
        console.log("Error GetComments By Post Id ", error);
    }

})

const logOut = () => {
    localStorage.removeItem("tokenKey");
    localStorage.removeItem("refreshKey");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("userName");
    navigate(0);
}

export const saveComment = createAsyncThunk("saveComment", async (newComment, { dispatch, rejectWithValue }) => {
    try {
        const response = await axios.post("/comments", newComment, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("tokenKey")
            }
        });
        console.log("New Comment Created", response.data);
        return response.data;
    } catch (error) {
        // Eğer Axios yanıtı varsa (yani response dönerse)
        if (error.response) {
            const { status, data } = error.response;
            if (status === 401) {
                console.warn("Token süresi dolmuş. Yenileniyor...");
                try {
                    //unwrap() Thunkdan gelen action.payload yapmadan direkt  payload'ı kullanmamızı sağlıyor.
                    const refreshResponse = await dispatch(refreshToken()).unwrap(); // unwrap, sonucu bekler ve hata fırlatırsa yakalar
                    console.log("RefreshAccessToken",refreshResponse.accessToken);
                    console.log("RefreshedRefreshToken",refreshResponse.refreshToken);
                    localStorage.setItem("tokenKey", refreshResponse.accessToken);
                    localStorage.setItem("refreshKey", refreshResponse.refreshToken);

                    const retryResponse = await axios.post("/comments", newComment, {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": refreshResponse.accessToken
                        }
                    });
                    console.log("Yorum Yeniden Kaydedildi.", retryResponse.data);
                    return retryResponse.data;

                } catch (refreshError) {
                    console.error("Refresh Token Başarısız:", refreshError.response?.data || refreshError.message);
                    // Eğer refreshToken da 401 dönerse logout yapılıyor
                    if (refreshError.response?.status === 401) {
                        logOut(); // Kullanıcıyı çıkışa yönlendir
                    }
                    return rejectWithValue(refreshError.response?.data || "Refresh Token hatası");
                }
            }
        }
        console.error("Yorum Kaydetme Hatası:", error.response?.data || error.message);
        return rejectWithValue(error.response?.data || "Yorum kaydedilemedi.");
    }
});

export const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {
        setUpdated: (state, action) => {
            state.isUpdated = action.payload; // isUpdated durumunu değiştirme
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getCommentsByPostId.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(getCommentsByPostId.fulfilled, (state, action) => {
            state.loading = false;
            state.comments = action.payload;
        })
        builder.addCase(getCommentsByPostId.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        builder.addCase(saveComment.fulfilled, (state, action) => {
            state.comments = [...state.comments, action.payload];
        })
    }
})


export const { setUpdated } = commentSlice.actions

export default commentSlice.reducer