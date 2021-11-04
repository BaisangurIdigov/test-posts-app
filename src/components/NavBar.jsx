import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import Modal from "./Modal";
import { NavLink } from "react-router-dom";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles(theme => ({
  link: {
    textDecoration: "none",
    color: "white"
  }
}))

function NavBar() {
  const classes = useStyles()
  const [opened, setOpened] = useState(false);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
             <NavLink to={"/"} className={classes.link}>News</NavLink>
          </Typography>
          <Button color="inherit" onClick={() => setOpened(true)}>
            Добавить пост
          </Button>
          <Modal setOpened={setOpened} opened={opened} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavBar;
