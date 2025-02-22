import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    response: {},
}

const setStorageUser = (data, newUser) => {
    if (data.userId != null)
        localStorage.setItem("currentUser", data.userId.toString());
    localStorage.setItem("tokenKey", data.accessToken);
    localStorage.setItem("refreshKey", data.refreshToken);
    localStorage.setItem("userName", newUser.username);

}

//You can only pass one argument to the thunk when you dispatch it.
//If you need to pass multiple values, pass them in a single object
//createAsyncThunk dispatch(sendRequest(path,newUser));
//böyle çağırdığımızda bir tane parametre kabul ettiği için object Destructing yapıyoruz
//diğer türlü bu method özeline çalışmıyor.
//alırken de  async ({ path, newUser }) şeklinde alıyoruz.
export const sendRequest = createAsyncThunk("sendRequest", async ({ path, newUser }) => {
    try {
        const response = await axios.post(`/auth/${path}`, newUser, {
            // newUser'ı takip et
            headers: {
                "Content-Type": "application/json",
            }
        });
        return { data: response.data, newUser };
    } catch (error) {
        console.log("Response", response.data);
        console.log("SendRequest Error", error);
    }
})

export const refreshToken = createAsyncThunk("refreshToken", async (_,{rejectWithValue}) => {
    try {
        const refresh = {
            userId: localStorage.getItem("currentUser"),
            refreshToken: localStorage.getItem("refreshKey")
        }
        const response = await axios.post("/auth/refresh", refresh);
        return response.data;
    } catch (error) {
        console.error("Refresh Token Hatası:", error.response?.data || error.message);
        return rejectWithValue(error.response?.data || "Bilinmeyen bir hata oluştu.");
    }

})


export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(sendRequest.fulfilled, (state, action) => {
            const { data, newUser } = action.payload;
            state.response = data;
            setStorageUser(data, newUser);

        }),
            builder.addCase(sendRequest.rejected, (state, action) => {
                console.log("SendRequest failed:", action.error.message); // Hataları ele alıyoruz
                // Eğer hata response'dan geldiyse, detaylı bilgi
                if (action.error.response) {
                    console.log("Response Status:", action.error.response.status);
                    console.log("Response Data:", action.error.response.data);
                }
                // Eğer bir network hatası varsa
                if (action.error.request) {
                    console.log("Request Error:", action.error.request);
                }
            })
    }

})


export const { } = authSlice.actions

export default authSlice.reducer


