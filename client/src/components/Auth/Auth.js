import React, { useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import { GoogleLogin } from "react-google-login";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import useStyles from "./styles";
import Input from "./Input";
import Icon from "./Icon";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { signin, signup } from "../../actions/authActions";

const initialState = { firstName: '', lastName:'', email:'', password:'', confirmPassword:''}

const Auth = () => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch()
  const history = useHistory()

  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);
  // OR   const handleShowPassword = () => setShowPassword(!showPassword)

  const handleSubmit = (e) => {
      e.preventDefault();
      if(isSignup) {
        dispatch(signup(formData, history)) // We pass the formData 'cause we can have it in our database. 
        //we pass the history 'cause we can navigate once something happens
      } else {
        dispatch(signin(formData, history)) // We pass the formData 'cause we can have it in our database. 

      }
    console.log(formData);
  };

  //How can we know on which input are we currently ? with the name
  const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name] : e.target.value })
  };
  const switchMode = () => {
    setIsSignup(!isSignup);
    setShowPassword(false)
  };

  const googleSuccess = async (res) => {
      console.log(res);
      const result = res?.profileObj; // For the error if i write res.profileObj in console error
      const token = res?.tokenId;
      

      try {
          dispatch({ type: 'AUTH', data:{result, token} })
          history.push('/'); // redirection
          
      } catch (error) {
          console.log(error);
      }
  };
  const googleFailure = (err) => {
      console.log(err);
      console.log('Google Sign in was unsucessful. Try again later');
  };



  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? "Sign Up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label=" Email Adress"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
          <GoogleLogin
            clientId="8044367583-3u448gtjd5uvd3m8cptuhippaq5lqsj8.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                  Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy='single_host_origin'
          />
          <Grid container justify="flex-end" item>
            <Button onClick={switchMode}>
              {isSignup
                ? "Already have an account ? Sign In"
                : "Don't have an account ? Sign Up"}
            </Button>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
