import { Button, CardContent, InputAdornment, OutlinedInput } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import  "../../css/Comment.css";

function Comment( comment ) {
    const { text,userId,userName} = comment;


    const navigate =useNavigate();
    return (
        <div>
            <CardContent className='comment' >

                <OutlinedInput disabled
                    id='outlined-adorment-amount'
                    multiline
                    inputProps={{ maxLength: 25 }}
                    fullWidth
                    value={text}
                    
                    startAdornment={
                        <InputAdornment
                            position='start'>
                            <Button onClick={() => navigate("/users/" + userId)}>
                                <Avatar sx={{ background: "linear-gradient(90deg, rgb(226, 243, 245) 0%, rgb(96, 228, 243) 30%, rgb(112, 220, 228) 100%)" }} aria-label="recipe">
                                     { userName.charAt(0).toUpperCase()}
                                </Avatar>
                            </Button>
                        </InputAdornment>
                    }
                    sx={{
                        color: "black", // Ana input yazı rengi
                        backgroundColor: "white", // Arka plan rengi
                        "& .MuiInputAdornment-root": {
                          color: "black", // Adornment içeriği için renk
                        },
                        "&.Mui-disabled": {
                          color: "black", // Disabled durumundaki yazı rengi
                        },
                      }}></OutlinedInput>
            </CardContent>
        </div>
    )
}

export default Comment
