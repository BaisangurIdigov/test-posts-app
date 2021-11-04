import React, { useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  CardContent,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { makeStyles } from "@mui/styles";
import { editPost, removePost } from "../redux/features/posts";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  buttons: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& > *": {
      m: 1,
    },
  },
  card: {
    width: 300,
    height: 280,
  },
  content: {
    height: 230,
  },
  text: {
    height: 140,
    display: "-webkit-box",
    webkitLineSlamp: "3",
    webkitBoxOrient: "vertical",
    overflow: "hidden",
  },
  link: {
    textDecoration: "none"
  }
}));

const Card = ({ item }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState(item.title);
  const [body, setBody] = useState(item.body);

  const handleDeletePost = (id) => {
    dispatch(removePost(id));
  };

  const handlePostEdit = () => {
    dispatch(editPost(item.id, title, body));
    setEdit(false);
  };

  return (
    <Box key={item.id}>
      <Paper className={classes.card} elevation={9}>
        <Box className={classes.content} >
          {edit ? (
            <>
              <Box>
                <TextField
                  id="outlined-basic"
                  label="Название поста"
                  variant="filled"
                  style={{ width: 300 }}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Box>
              <Box style={{ marginTop: 10 }}>
                <TextField
                  id="outlined-multiline-static"
                  label="Описание поста"
                  multiline
                  rows={4}
                  style={{ width: 300 }}
                  variant="filled"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                />
              </Box>
            </>
          ) : (
            <NavLink to={`/posts/${item.id}`} className={classes.link}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" >
                  {item.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  className={classes.text}
                >
                  {item.body}
                </Typography>
              </CardContent>
            </NavLink>
          )}
        </Box>
        <Box className={classes.buttons}>
          {edit ? (
            <ButtonGroup disableElevation variant="contained">
              <Button onClick={() => setEdit(false)}>Отмена</Button>
              <Button onClick={handlePostEdit}>Сохранить</Button>
            </ButtonGroup>
          ) : (
            <ButtonGroup disableElevation variant="contained">
              <Button onClick={() => handleDeletePost(item.id)}>
                <DeleteIcon fontSize="small" />
              </Button>
              <Button onClick={() => setEdit(true)}>
                <BorderColorIcon fontSize="small" />
              </Button>
            </ButtonGroup>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default Card;
