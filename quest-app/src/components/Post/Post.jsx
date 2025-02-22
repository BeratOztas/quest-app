import CommentIcon from '@mui/icons-material/Comment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";

import { Button, Container } from '@mui/material';
import "../../css/Post.css";
import { useDispatch, useSelector } from 'react-redux';
import { getCommentsByPostId, setUpdated } from '../../redux/slices/commentSlice';
import { store } from '../../redux/store';
import Comment from '../Comment/Comment';
import LoadingComment from '../Comment/LoadingComment';
import CommentForm from '../Comment/CommentForm';
import { deleteLike, saveLike } from '../../redux/slices/likeSlice';


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

function Post({ post }) {
    
    const [expanded, setExpanded] = useState(false);
    const { id, userId, userName, title, text, postLikes } = post;

    const { comments, isUpdated } = useSelector((store) => store.comment);


    const isInitialMount = useRef(true);
    const [likeCount, setLikeCount] = useState(postLikes.length);
    const [isLiked, setIsLiked] = useState(false);
    const [likeId, setLikeId] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    let disabled = localStorage.getItem("currentUser") == null ? true : false;

    const handleExpandClick = () => {
        setExpanded(!expanded);
        dispatch(getCommentsByPostId(id));
    };

    const handleLike = () => {
        setIsLiked(!isLiked);
        if (!isLiked) {
            const newLike = {
                userId: localStorage.getItem("currentUser"),
                postId: id
            }
            dispatch(saveLike(newLike));
            setLikeCount(likeCount + 1);
        }
        else {
            dispatch(deleteLike(likeId));
            setLikeCount(likeCount - 1);
        }
    }

    const refreshComments = () => {
        if (isInitialMount.current)
            isInitialMount.current = false;
        else {
            dispatch(getCommentsByPostId(id));
        }
    }
    console.log("Comments:", comments);

    const checkLikes = () => {
        var likeControl = postLikes.find((like => ""+like.userId === localStorage.getItem("currentUser")));
        if (likeControl != null) {
            setLikeId(likeControl.id);
            setIsLiked(true);
        }
    }

    useEffect(() => {
        if (isUpdated && !isInitialMount.current) {
            refreshComments();
            dispatch(setUpdated(false));
            console.log("UseEffect Tetiklendi.");
        }
    }, [dispatch, isUpdated])

    useEffect(() => { checkLikes() }, [])

    return (
        <div className='postContainer'>
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
                    title={title}
                />
                <CardContent>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {text}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    {
                        disabled ? <IconButton
                            disabled
                            onClick={handleLike}
                            aria-label="add to favorites">
                            <FavoriteIcon sx={isLiked ? { color: "red" } : null} />
                        </IconButton> :
                            <IconButton
                                onClick={handleLike}
                                aria-label="add to favorites">
                                <FavoriteIcon sx={isLiked ? { color: "red" } : null} />
                            </IconButton>
                    }
                    {likeCount}
                    <IconButton aria-label="share">
                    </IconButton>
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <CommentIcon />
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <Container fixed >
                        {
                            comments?.map((comment) => (
                                <Comment key={comment.id} userId={comment.userId} userName={comment.username} text={comment.text} />
                            ))
                        }
                        <LoadingComment />
                        {disabled ? "" :
                            <CommentForm userId={localStorage.getItem("currentUser")} userName={localStorage.getItem("userName")} postId={id} />
                        }
                    </Container>
                </Collapse>
            </Card>
        </div>
    )
}

export default Post
