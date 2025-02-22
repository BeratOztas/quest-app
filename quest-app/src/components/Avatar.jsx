import { Radio } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveAvatar } from '../redux/slices/userSlice';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function Avatar(props) {
    const { avatarId, userId ,username} = props;
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(avatarId);


    const dispatch = useDispatch();

    const handleOpen = () => setOpen(true);

    const handleClose = () => {
        const newAvatar = {
            avatarId: selectedValue
        }
        dispatch(saveAvatar(newAvatar));
        setOpen(false);
    }

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    }

    return (
        <div>
            <Card sx={{ margin: 5, width: "350px", maxWidth: 500 }}>
                <CardMedia
                    sx={{ height: 400, width: "100%" }}
                    image={`/avatars/avatar${selectedValue}.png`}
                    title="User Avatar"
                />
                <CardContent>
                    <Typography sx={{ textAlign: "center" }} gutterBottom variant="h5" component="div">
                        {username}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: "center" }}>
                        User Info
                    </Typography>
                </CardContent>
                <CardActions sx={{ marginLeft: "100px" }}>
                    {localStorage.getItem("currentUser") == userId ?
                        <Button onClick={handleOpen} variant='contained' size="small">Change Avatar</Button>
                        : ""}
                </CardActions>
            </Card>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <List dense>
                        {[1, 2, 3, 4, 5, 6].map((key) => {
                            const labelId = `checkbox-list-secondary-label-${key}`;
                            return (
                                <ListItem key={key} button secondaryAction={
                                    <Radio edge="end"
                                        value={key}
                                        onChange={handleChange}
                                        checked={"" + selectedValue === "" + key}
                                        inputProps={{ 'aria-labelledby': labelId }}
                                        color='error' />
                                } >
                                    <CardMedia
                                        style={{ maxWidth: 100 }}
                                        component="img"
                                        alt={`Avatar n°${key}`}
                                        image={`/avatars/avatar${key}.png`}
                                        title="User Avatar"
                                    />
                                </ListItem>
                            );
                        })}
                    </List>
                </Box>
            </Modal>
        </div>
    )
}

export default Avatar
