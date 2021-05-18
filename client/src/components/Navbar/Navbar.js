import React, { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import useStyles from "./styles";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import decode from 'jwt-decode'
import { useDispatch } from "react-redux";

const Navbar = () => {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  console.log(user);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const logout = () => {
    dispatch({ type: "LOGOUT" });

    history.push("/");
    setUser(null)
  };

  useEffect(() => {
    const token = user?.token; // if token exist

    // JWT
    if(token) {
      const decodedToken = decode(token)
      console.log(decodedToken);

      if(decodedToken.exp * 1000 < new Date().getTime()) {
        logout()
      }
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location, user.token]); // Refresh the page 
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Link to="/">
        <img
          className={classes.image}
          src="https://fontmeme.com/permalink/210517/f3b5748607b3195917344de642d142b2.png"
          alt="memories"
          height="60"
        />
      </Link>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user.result.name}
              src={user.result.imageUrl}
            >
              {" "}
              {user.result.name.charAt(0)}{" "}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {" "}
              {user.result.name}{" "}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
