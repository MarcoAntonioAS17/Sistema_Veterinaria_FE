import React, { useState, useEffect} from 'react'
import axios from 'axios';
import {
    Button,
    makeStyles,
    TextField,
    Snackbar,
    FormControl,
    Select,
    MenuItem,
    InputLabel,
    Typography
    } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert';
import InputAdornment from '@material-ui/core/InputAdornment';
import{
    Save,
    AccountCircle,
    Lock,
    Cancel
} from '@material-ui/icons';
import { Link, Redirect } from 'react-router-dom';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }  

const useStyles = makeStyles((theme) => ({
    button: {
        textAlign: 'center',
        margin: '1rem'
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
    },
    formControl: {
        margin: theme.spacing(1),
        
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    label: {
        backgroundColor: "#fff",
    }
}));

export default function EditarUsuarios(props) {

    const classes = useStyles();
    const [idUser] = useState(props.match.params.id);

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordNueva, setPasswordNueva] = useState("");
    const [passwordConfi, setPasswordConfi] = useState("");
    const [nivel, setNivel] = useState(2);

    const [openbar, setOpenbar] = useState(false);
    const [succesbar, setSuccesbar] = useState(false);
    const [redi, setRedi] = useState(false);

    const handleActualizar = () => {
        if (passwordNueva !== passwordConfi){
            setOpenbar(true);
            setSuccesbar(false);
            return;
        } 
        
        axios.put ('http://localhost:50563/api/Usuarios/'+idUser,
		{
			"userName": userName,
            "password": password,
            "passwordN" : passwordNueva,
			"nivel": parseInt(nivel),
		}).then (
			(response) => {
                
				if (response.data.status === "Success") {
                    console.log("Guardado con exito");
                    
                    setOpenbar(true);
                    setSuccesbar(true);
				}else{
                    setOpenbar(true);
                    setSuccesbar(false);
                }
			},
			(error) => {
                console.log("Exception " + error);
                setOpenbar(true);
                setSuccesbar(false);
            }
        );
    };

    useEffect(() => {
        axios.get ('http://localhost:50563/api/Usuarios/' + idUser,
		{
            method: "GET",
            mode: 'cors'
		})
		.then (response => {
			if (response.status === 200) {
                console.log(response);
                setUserName(response.data.userName);
                setNivel(response.data.nivel);
			}
		})
		.catch (function (error) {
			console.log(error);
		})
    },[idUser]);


    const handleClose = (event, reason) => {
        setRedi(true);
        if (reason === 'clickaway') {
          return;
        }
    
        setOpenbar(false);
    };


    return(
        <React.Fragment>
            <Typography variant="h4"> Actualizar datos de usuario: {userName}</Typography>
            <form>
                <TextField
                    id="User_userName"
                    label="Nombre"
                    style={{ margin: 8 }}
                    fullWidth
                    margin="normal"
                    required = {true}
                    variant="outlined"
                    placeholder ="Ingrese su nombre de usuario"
                    value = {userName}
                    onChange = {event => setUserName(event.target.value)}
                    InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountCircle />
                          </InputAdornment>
                        ),
                      }}
                />
                
                <TextField
                    
                    id="User_password"
                    label="Contraseña actual"
                    style={{ margin: 8 }}
                    fullWidth
                    required = {true}
                    value = {password}
                    onChange = {event => setPassword(event.target.value)}
                    margin="normal"
                    variant="outlined"
                    type = "password"
                    InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Lock/>
                          </InputAdornment>
                        ),
                      }}
                    
                />

                <TextField
                    id="User_password"
                    label="Contraseña nueva"
                    style={{ margin: 8 }}
                    fullWidth
                    required = {true}
                    value = {passwordNueva}
                    onChange = {event => setPasswordNueva(event.target.value)}
                    margin="normal"
                    variant="outlined"
                    type = "password"
                    InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Lock/>
                          </InputAdornment>
                        ),
                      }}
                    
                />
                
                <TextField
                    
                    id="User_password"
                    label="Confirmar contraseña"
                    style={{ margin: 8 }}
                    fullWidth
                    required = {true}
                    value = {passwordConfi}
                    onChange = {event => setPasswordConfi(event.target.value)}
                    margin="normal"
                    variant="outlined"
                    type = "password"
                    InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Lock/>
                          </InputAdornment>
                        ),
                      }}
                    
                />
                
                <FormControl variant="outlined" fullWidth={true} className={classes.formControl} >
                    <InputLabel className={classes.label} id="demo-simple-select-label">Tipo de Usuario</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value = {nivel}
                        required = {true}
                        onChange={event => setNivel(event.target.value)}
                    >
                        <MenuItem value="1">Administrador</MenuItem>
                        <MenuItem value="2">Empleado</MenuItem>
                    </Select>
                </FormControl>
                
                <div className = {classes.buttonContainer}>
                <Button
                    className = {classes.button}
                    variant="contained"
                    color="primary"
                    startIcon = {<Save/>}
                    onClick = {handleActualizar}
                >
                    Actualizar
                </Button>
                <Snackbar open={openbar} autoHideDuration={4000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity= {succesbar ? "success" :"error"}>
                        {succesbar ? "Registrado con exito": "Error al registrar"}
                    </Alert>
                </Snackbar>
                {redi? <Redirect to="/Usuarios" />:null}
                <Link to={"/Usuarios"} className = {classes.enlace} >
                    <Button
                        className = {classes.button}
                        variant="contained"
                        color="secondary"
                        startIcon={<Cancel />}
                    >
                        Cancelar
                    </Button>
                </Link>
                </div>
            </form>
            
        </React.Fragment>
    );
    
}