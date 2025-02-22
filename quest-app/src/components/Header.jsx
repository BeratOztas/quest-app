import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Menu, MenuItem } from '@mui/material';
import "../css/Header.css";
import { LockOpen } from '@mui/icons-material';

function Header() {

    const navigate = useNavigate();

    const logOut = () => {
        localStorage.removeItem("tokenKey");
        localStorage.removeItem("refreshKey");
        localStorage.removeItem("currentUser");
        localStorage.removeItem("userName");
        navigate(0);
    }

    return (
        <div>
            <AppBar position="fixed" sx={{ width: '100%' }}>
                <Toolbar className='toolbar'>
                    <IconButton >
                        <MenuIcon sx={{ color: "#fff" }} />
                    </IconButton>
                    <Typography sx={{ textAlign: "left", flexGrow: "1" }} variant='h6' >
                        <Link className="link" to="/">Home</Link>
                    </Typography>
                    <Typography variant='h6'>
                        {
                            localStorage.getItem("currentUser") == null ? <Link className="link" to="/auth">Login/Register</Link> :
                                <div>
                                    <IconButton onClick={logOut}><LockOpen className='link' ></LockOpen> </IconButton>
                                    <Link className="link" to={"/users/" + localStorage.getItem("currentUser")}>Profile</Link>
                                </div>
                        }
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Header
