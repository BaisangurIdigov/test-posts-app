import React, { useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  InputBase,
  Paper,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import {editComment, removeComment} from "../redux/features/comments";
import { makeStyles } from "@mui/styles";
import { useDispatch } from "react-redux";
import SendIcon from "@mui/icons-material/Send";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: 50,
    display: "flex",
    justifyContent: "center",
  },
  post: {
    width: "100vh",
    height: 500,
  },
  content: {
    padding: 50,
  },
  comment: {
    marginTop: 10,
    padding: 10,
    display: "flex",
    justifyContent: "space-between",
  },
}));

const Comment = ({ item }) => {
  const classes = useStyles();
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState(item.text);
  const dispatch = useDispatch();
  const handleRemoveComment = (id) => {
    dispatch(removeComment(id));
  };

  const handleEditComment = (id) => {
    dispatch(editComment(id, text))
    setEdit(false)
  }

  return (
    <Paper className={classes.comment} key={item.id} elevation={9}>
      {edit ? (
        <Paper
          elevation={9}
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: "100%",
            marginTop: 3,
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Введите текст"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <ButtonGroup disableElevation variant="contained">
            <Button onClick={() => setEdit(false)}>Отмена</Button>
            <Button onClick={()=> handleEditComment(item.id)}>Сохранить</Button>
          </ButtonGroup>
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        </Paper>
      ) : (
        <>
          <Box>{item.text}</Box>
          <Box>
            <DeleteIcon
              fontSize="small"
              onClick={() => handleRemoveComment(item.id)}
            />
            |
            <BorderColorIcon fontSize="small" onClick={() => setEdit(true)} />
          </Box>
        </>
      )}
    </Paper>
  );
};

export default Comment;
