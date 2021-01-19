import React, {useState} from 'react';
import axios from 'axios';
import { 
  Avatar,
  InputAdornment,
  Button,
  CssBaseline,
  TextField,
  Paper,
  Grid,
  Typography,
  Snackbar
} from '@material-ui/core';
import Alert from '../Componentes_Genericos/Alerta';
import {
  LockOutlined,
  AccountCircle,
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import Logo from '../Imgs/Logo-Extend.svg';
import {
  useHistory
} from "react-router-dom";
import {ThemeProvider} from '@material-ui/core/styles';
import theme from '../Tema';


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    paddingTop: '5%',
    paddingBottom: '5%',
  },
  image: {
    backgroundColor: "#70d6c1",
    borderTopLeftRadius: "10px",
    borderBottomLeftRadius: "10px",
    display: "flex",
    justifyContent: "center",
  },
  imageitem: {
    width: "70%",
  },
  paper: {
    margin: theme.spacing(10, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),    
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    height: theme.spacing(5),
  },
  derecha: {
    borderTopRightRadius: "10px",
    borderBottomRightRadius: "10px",
    backgroundColor: "#3a4955",
  },
  input: {
    color: "rgb(255,255,255) !important",
  }
}));

export default function SignInSide() {

  let history = useHistory();
  const classes = useStyles();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const [openbar, setOpenbar] = useState(false);
  const [succesbar, setSuccesbar] = useState(false);
  const [barMensaje, setBarMensaje] = useState("");

  const handleSubmit=(event)=> {
    
    axios.post ('http://localhost:50563/api/Autenticacion',
		{
			"userName": user,
			"password": password,
			"token": ""
		}).then (
			(response) => {
				if (response.status === 200) {
          const json = response.data;
          sessionStorage.setItem("ACCESS_TOKEN", json.token);
          sessionStorage.setItem("USER_NAME", json.userName);
          sessionStorage.setItem("NIVEL", json.nivel);
					history.push("/");
				}else {
          setBarMensaje("Contraseña o usuario invalido");
          setOpenbar(true);
          setSuccesbar(false);
        }
			},
			(error) => {
        console.log("Exception " + error);
        
        setBarMensaje("Contraseña o usuario invalido");
        
        setOpenbar(true);
        setSuccesbar(false);
			}
		);
    event.preventDefault();
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenbar(false);
  };

  return (
    
    <Grid container justify="center" component={Paper} className={classes.root}  >
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid item xs={5} component={Paper}  className={classes.image} square elevation={6} >
        <img alt="Imagen-Logo" src={Logo} className={classes.imageitem}/>
      </Grid>
      <Grid item xs={5}  component={Paper} className={classes.derecha} square elevation={6}>
        <div className={classes.paper} style={{color: "#fff"}}>
          <Avatar className={classes.avatar}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h3"  >
            BIENVENIDO
          </Typography>
          <Typography>Ingrese su usuario y contraseña</Typography>
          <form onSubmit={handleSubmit} className={classes.form} >
            <TextField
              InputLabelProps={{className: classes.input}}
              variant="filled"
              margin="normal"
              required
              fullWidth
              id="user"
              label="Usuario"
              name="user"
              autoComplete="user"
              autoFocus
              onChange={event => setUser(event.target.value)}
              InputProps={{
                className: classes.input,
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              InputLabelProps={{className: classes.input}}
              inputProps={{className: classes.input}}
              variant="filled"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              value={password}
              onChange={event => setPassword(event.target.value)}
              autoComplete="current-password"
              InputProps={{
                className: classes.input,
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlined />
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Ingresar
            </Button>
          </form>
          <Snackbar open={openbar} autoHideDuration={4000} onClose={handleClose}>
              <Alert onClose={handleClose} severity= {succesbar ? "success" :"error"}>
                  {barMensaje}
              </Alert>
          </Snackbar>
        </div>
      </Grid>
      </ThemeProvider>
    </Grid>
    
  );
}