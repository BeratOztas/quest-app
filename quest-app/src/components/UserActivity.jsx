import CloseIcon from '@mui/icons-material/Close';
import { Button } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getActivityList } from '../redux/slices/userSlice';
import Post from "./Post/Post.jsx";
import { useState } from 'react';
import { getPost } from '../redux/slices/postSlice.jsx';
import LoadingUserActivity from './LoadingUserActivity.jsx';

const columns = [
  {
    id: 'User Activity',
    label: 'User Activity',
    minWidth: 170,
    align: 'left',
    format: (value) => value.toLocaleString('en-US'),
  }
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function PopUp(props) {

  const [open, setOpen] = useState(false);

  const { isOpen, postId, setIsOpen } = props;

  const { getPostLoading, post } = useSelector((store) => store.post);

  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsOpen(false);
  };

  useEffect(() => {
    setOpen(isOpen)
  }, [isOpen]);

  useEffect(() => {
    dispatch(getPost(postId));
  }, [dispatch, postId]);


  return (
    getPostLoading ? <LoadingUserActivity /> :
      <React.Fragment>
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <AppBar sx={{ position: 'relative' }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
                <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                  Close
                </Typography>
              </IconButton>
            </Toolbar>
          </AppBar>
          <Post post={post} />
        </Dialog>
      </React.Fragment>
  );
}


function UserActivity(props) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const { userId } = props;

  const dispatch = useDispatch();

  const { activityList: rows = [], loading, error } = useSelector((store) => store.user);

  console.log(rows);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleNotification = (postId) => {
    setSelectedPost(postId);
    setIsOpen(true);
  }

  useEffect(() => {
    dispatch(getActivityList(userId));
  }, [dispatch, userId])


  return (
    <div>
      {isOpen ? <PopUp isOpen={isOpen} postId={selectedPost} setIsOpen={setIsOpen} /> : ""}
      <Paper sx={{ width: '100%', overflow: 'hidden', marginBottom: "97px" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>User Activity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={row.code || index}
                  onClick={() => handleNotification(row[1])} // Tıklama olayını buraya taşıyabilirsiniz
                  style={{ cursor: "pointer" }} // Satırın tıklanabilir olduğunu belirtmek için
                >
                  <TableCell>
                    <Button onClick={() => handleNotification(row[1])}>
                      {row[3] + " " + row[0] + " your post"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  )
}

export default UserActivity
