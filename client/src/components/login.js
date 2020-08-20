import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import qs from 'querystring'
import {Snackbar} from '@material-ui/core'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Emilia-Tan
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const initState = {
  password:'',
  email:''
}

function reducer(state,{field,value}){
  return {
      ...state,
      [field]:value
  }
}

export default function SignIn(props) {
  const classes = useStyles();

  const [data,dispatch] = React.useReducer(reducer,initState)
  const [errorCatched,setErrorCatched] = React.useState(false)

  const handleChange = e =>{
    dispatch({field : e.target.name, value : e.target.value})
  }

  const handleAuth = data =>{
    props.handleLogin(data);
    props.history.push('/main');
  }

  const handleSubmit = e =>{
    const requestBody ={
      password:data.password,
      email:data.email
  }

  const config = {
      headers: {
          'Content-Type':'application/x-www-form-urlencoded'
      }
  }

  axios.post('/api/login',qs.stringify(requestBody),config)
  .then(res=> {
    handleAuth(res.data)})
  .catch(err => setErrorCatched(true))

  e.preventDefault()
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            value={data.email}
            onChange={handleChange}
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            value={data.password}
            label="Password"
            type="password"
            id="password"
            onChange={handleChange}
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
            <Snackbar
            anchorOrigin={{
              vertical:'bottom',
              horizontal:'center'
            }}
            open={errorCatched}
            autoHideDuration={4000}
            onClose={()=> setErrorCatched(false)}
            message="❌Login Failed, please try again"

            ></Snackbar>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}