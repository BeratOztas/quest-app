import { Button, CardContent, InputAdornment, OutlinedInput } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import "../../css/Comment.css";
import { useDispatch } from 'react-redux';
import { saveComment, setUpdated } from '../../redux/slices/commentSlice';

function CommentForm(comment) {
  const { postId, userId, userName } = comment;
  const [text, setText] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSubmit = () => {
    const newComment = {
      userId: userId,
      postId: postId,
      text: text
    }
    dispatch(saveComment(newComment));
    setText(""); // Formu temizle
    dispatch(setUpdated(true)); // Yalnızca başarı durumunda güncelleme tetikle
  }

  

  return (
    <div>
      <CardContent className='comment' >

        <OutlinedInput
          id='outlined-adorment-amount'
          multiline
          inputProps={{ maxLength: 250 }}
          fullWidth
          value={text}
          onChange={(e) => setText(e.target.value)}
          startAdornment={
            <InputAdornment
              position='start'>
              <Button onClick={() => navigate("/users/" + userId)}>
                <Avatar sx={{ background: "linear-gradient(90deg, rgb(226, 243, 245) 0%, rgb(96, 228, 243) 30%, rgb(112, 220, 228) 100%)" }} aria-label="recipe">
                  {userName.charAt(0).toUpperCase()}
                </Avatar>
              </Button>
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment position='end'>
              <Button variant='contained' sx={{ background: "linear-gradient(90deg, rgb(226, 243, 245) 0%, rgb(96, 228, 243) 30%, rgb(112, 220, 228) 100%)" }}
                onClick={handleSubmit}>Comment</Button>
            </InputAdornment>
          }
        ></OutlinedInput>
      </CardContent>
    </div>
  )
}

export default CommentForm
