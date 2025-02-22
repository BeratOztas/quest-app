import React from 'react'
import { useSelector } from 'react-redux';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function LoadingUserActivity() {
    const { getPostLoading } = useSelector((store) => store.post);
  return (
    <div>
       <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={getPostLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
    </div>
  )
}

export default LoadingUserActivity
