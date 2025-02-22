import React from 'react'
import { useSelector } from 'react-redux';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function LoadingUserAvatar() {
  const { getUserLoading } = useSelector((store) => store.user);
  return (
    <div>
      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={getUserLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  )
}

export default LoadingUserAvatar
