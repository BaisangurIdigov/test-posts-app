import React, { useState } from "react";
import { Box, Button, Paper, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useDispatch } from "react-redux";
import { createPosts } from "../redux/features/posts";

const useStyle = makeStyles((theme) => ({
  modal: {
    background: "rgba(0,0,0,0.8)",
    position: "absolute",
    top: 0,
    left: 0,
    transform: "scale(0)",
  },
  "modal active": {
    transform: "scale(1)",
  },
  card: {
    position: "absolute",
    width: 700,
    height: 500,
    marginTop: 100,
    marginRight: "95%",
    zIndex: 100,
  },
  button: {
    textAlign: "right",
    width: "100%",
  },
  display: {
    display: "flex",
    justifyContent: "center",
  },
  buttons: {
    marginTop: 60,
    display: "flex",
    justifyContent: "space-around",
  },
  center: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
}));

const Modal = ({ opened, setOpened }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleClickPost = () => {
    dispatch(createPosts(title, body));
  };

  const classes = useStyle();
  return (
    <div className={opened === true ? classes["modal active"] : classes.modal}>
      <Box className={classes.center}>
        <Paper className={classes.card}>
          <Box className={classes.button} onClick={() => setOpened(false)}>
            <Button color="primary">X</Button>
          </Box>

          <Box className={classes.display}>
            <Box style={{ marginTop: 60 }}>
              <Box style={{ marginTop: 20 }}>
                <TextField
                  id="outlined-basic"
                  label="Название поста"
                  variant="filled"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Box>

              <Box style={{ marginTop: 20 }}>
                <TextField
                  id="outlined-multiline-static"
                  label="Описание поста"
                  multiline
                  rows={4}
                  style={{ width: 500 }}
                  variant="filled"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                />
              </Box>
              <Box className={classes.buttons}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => setOpened(false)}
                >
                  Отмена
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleClickPost}
                >
                  Добавить
                </Button>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>
    </div>
  );
};

export default Modal;