import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import Snackbar from '@mui/material/Snackbar';
import { styled } from '@mui/material/styles';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import { InputAdornment } from '@mui/material';
import { useDispatch } from 'react-redux';
import "../../css/Post.css";
import { savePost, setUpdated } from '../../redux/slices/postSlice';


const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme }) => ({
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
    variants: [
        {
            props: ({ expand }) => !expand,
            style: {
                transform: 'rotate(0deg)',
            },
        },
        {
            props: ({ expand }) => !!expand,
            style: {
            },
        },
    ],
}));

function PostForm(props) {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");

    const [isSent, setIsSent] = useState(false);

    const dispatch = useDispatch();

    const [like, setLike] = useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleLike = () => {
        setLike(!like);
    }

    const handleSubmit = () => {
        const newUser = {
            text: text,
            title: title,
            userId: userId
        }
        dispatch(savePost(newUser));
        setText("");
        setTitle("");
        dispatch(setUpdated(true));
        setIsSent(true);
    }


    const { id, userId, userName, refreshPosts = { refreshPosts } } = props;
    const navigate = useNavigate();

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setIsSent(false);
    };

    return (
        <div className='postContainer'>
            <Box sx={{ width: "1000" }}>
                <Snackbar open={isSent} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: "bottom", horizontal: "center" }} sx={{ width: "500" }}>
                    <Alert
                        onClose={handleClose}
                        severity="success"
                        variant="filled"
                        sx={{ width: '100%' }}
                    >
                        Your Post Is Sent!
                    </Alert>
                </Snackbar>
            </Box>
            <Card >
                <CardHeader
                    avatar={
                        <Button onClick={() => navigate("/users/" + userId)}>
                            <Avatar sx={{ background: "linear-gradient(90deg, rgb(226, 243, 245) 0%, rgb(96, 228, 243) 30%, rgb(112, 220, 228) 100%)" }} aria-label="recipe">
                                {userName.charAt(0).toUpperCase()}
                            </Avatar>
                        </Button>
                    }
                    action={
                        <IconButton aria-label="settings">
                        </IconButton>
                    }
                    title={<OutlinedInput id='outlined-adorment-amount'
                        multiline
                        placeholder='Title'
                        inputProps={{ maxLength: 25 }}
                        fullWidth
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    >

                    </OutlinedInput>}
                />
                <CardContent>
                    <OutlinedInput id='outlined-adorment-amount'
                        multiline
                        placeholder='Text'
                        inputProps={{ maxLength: 250 }}
                        fullWidth
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        endAdornment={
                            <InputAdornment position='end'>
                                <Button variant='contained' sx={{ background: "linear-gradient(90deg, rgb(226, 243, 245) 0%, rgb(96, 228, 243) 30%, rgb(112, 220, 228) 100%)" }}
                                    onClick={handleSubmit}>Post</Button>
                            </InputAdornment>
                        }
                    >
                    </OutlinedInput>

                </CardContent>

            </Card>
        </div>
    )
}

export default PostForm
