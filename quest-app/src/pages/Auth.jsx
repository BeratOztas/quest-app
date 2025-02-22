import { Button, FormControl, FormHelperText, Input, InputLabel } from '@mui/material'
import React, { useEffect, useState } from 'react'

import "../css/Home.scss";
import { useDispatch } from 'react-redux';
import { sendRequest } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

function Auth() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleButton = (path) => {
        const newUser = {
            username: username,
            password: password
        }
        dispatch(sendRequest({ path, newUser }));
        setUsername("");
        setPassword("");
        console.log(localStorage)
        navigate("/auth");
    }
      


    return (
        <div className='authContainer'>
            <FormControl sx={{ margin: "30px 500px", width: "230px" }} >
                <InputLabel >Username</InputLabel>
                <Input value={username} onChange={(e) => setUsername(e.target.value)} />
            </FormControl>
            <FormControl sx={{ margin: "0px 500px", width: "230px" }}>
                <InputLabel  >Password</InputLabel>
                <Input value={password} onChange={(e) => setPassword(e.target.value)} />
                <Button onClick={() => handleButton("register")} variant='contained' style={{ marginTop: 30, color: "white", background: "linear-gradient(90deg, #de4558 0%, #d32f2f 30%, #f96a6a 100%)" }}>
                    Register
                </Button>
                <FormHelperText sx={{ marginTop: 2 }}>Are you already registered?</FormHelperText>
                <Button onClick={() => handleButton("login")} variant='contained' style={{ marginTop: 10, color: "white", background: "linear-gradient(90deg, #de4558 0%, #d32f2f 30%, #f96a6a 100%)" }}>
                    Login
                </Button>
            </FormControl>

        </div>
    )
}

export default Auth
