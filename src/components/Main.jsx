import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { fetchPosts } from "../redux/features/posts";
import { useDispatch, useSelector } from "react-redux";
import Card from "./Card";

const useStyles = makeStyles((theme) => ({
  container: {
    marginRight: "5%",
    marginLeft: "5%",
    marginTop: 50,
    display: "flex",
    justifyContent: "center",
  },
  cards: {
    display: "flex",
    justifyContent: "center",
    gap: 30,
    flexWrap: "wrap",
  },
}));

const Main = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.items);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <Box className={classes.container}>
      <Box className={classes.cards}>
        {posts.map((item) => {
          return <Card item={item} key={item.id} />;
        })}
      </Box>
    </Box>
  );
};

export default Main;
