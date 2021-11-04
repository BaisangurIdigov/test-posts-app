import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Divider,
  InputBase,
  Paper,
  TextField,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import {
  createComment,
  fetchPostById,
  removeComment,
} from "../redux/features/comments";
import Comment from "./Comment";

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

const Post = () => {
  const classes = useStyles();
  const [text, setText] = useState("");
  const { id } = useParams();
  const dispatch = useDispatch();
  const post = useSelector((state) => state.comments.post);
  const comments = useSelector((state) => state.comments.comments);

  useEffect(() => {
    dispatch(fetchPostById(id));
  }, [id]);

  const handleCreateComment = () => {
    const postId = id;
    dispatch(createComment(postId, text));
    setText("");
  };

  return (
    <div className={classes.container}>
      <Box>
        <Paper elevation={9} className={classes.post}>
          {post.map((item) => {
            return (
              <Box className={classes.content} key={item.id}>
                <h1>{item.title}</h1>
                <p>{item.body}</p>
              </Box>
            );
          })}
        </Paper>

        <Paper>
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
            <Button
              type="submit"
              sx={{ p: "10px" }}
              variant="contained"
              onClick={handleCreateComment}
            >
              <SendIcon />
            </Button>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          </Paper>
        </Paper>

        <Box>
          <h4 className={classes.comment}>Комментарии :</h4>
          {comments.map((item) => {
            return (
                <Comment item={item}/>
            );
          })}
        </Box>
      </Box>
    </div>
  );
};

export default Post;
