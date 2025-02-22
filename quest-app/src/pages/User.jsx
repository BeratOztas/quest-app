import React from 'react'
import { useParams } from 'react-router-dom'
import Avatar from '../components/Avatar';
import UserActivity from '../components/UserActivity';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUser } from '../redux/slices/userSlice';
import Loading from '../components/Loading';
import LoadingUserAvatar from '../components/LoadingUserAvatar';

function User() {

  const { userId } = useParams();

  const { getUserLoading, user } = useSelector((store) => store.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser(userId));
  }, [dispatch, userId])



  return (
    <div className='userContainer'>
      {getUserLoading ? <LoadingUserAvatar /> : <Avatar userId={userId} avatarId={user.avatarId} username={user.username}/>}
      {localStorage.getItem("currentUser") == userId ? <UserActivity userId={userId} /> : ""}
    </div>
  )
}

export default User
