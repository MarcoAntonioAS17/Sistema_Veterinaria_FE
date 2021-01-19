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
import Alert from '../Componentes_Genericos/Alerta';
import InputAdornment from '@material-ui/core/InputAdornment';
import{
    Save,
    AccountCircle,
    Lock,
    Cancel
} from '@material-ui/icons';
import { Link, Redirect } from 'react-router-dom';

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
    const Token = localStorage.getItem('ACCESS_TOKEN');
    const [idUser] = useState(props.match.params.id);

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordNueva, setPasswordNueva] = useState("");
    const [passwordConfi, setPasswordConfi] = useState("");
    const [nivel, setNivel] = useState(2);

    const [errorName, setErrorN] = useState(false);
    const [errorPass, setErrorP] = useState(false);
    const [errorPassN, setErrorPN] = useState(false);
    const [errorPassNC, setErrorPNC] = useState(false);


    const [openbar, setOpenbar] = useState(false);
    const [succesbar, setSuccesbar] = useState(false);
    const [barMensaje, setBarMensaje] = useState("");
    const [redi, setRedi] = useState(false);

    function handleValidacion(){
        let error = false;
        setErrorP(false);
        setErrorN(false);
        setErrorPN(false);
        setErrorPNC(false);

        if (passwordNueva !== passwordConfi){
            setErrorPNC(true);
            setErrorPN(true);
            setBarMensaje("Las contraseñas no coinciden");
            setOpenbar(true);
            setSuccesbar(false);
            return true;
        }
        if (userName.length < 8) {
            setErrorN(true);
            error = true;
        }
        if (password.length < 6){
            setErrorP(true);
            error = true;
        }
        if (passwordNueva.length < 6){
            setErrorPN(true);
            error = true;
        }
        if (error){
            setBarMensaje("Hay campos por corregir");
            setOpenbar(true);
            setSuccesbar(false);
        }
        
        return error;
    }

    const handleActualizar = () => {
        
        if (handleValidacion()){
            
            return;
        }
        
        axios.put ('http://localhost:50563/api/Usuarios/'+idUser,
		{
			"userName": userName,
            "password": password,
            "passwordN" : passwordNueva,
            "nivel": parseInt(nivel)
		},{
            headers: {
				'Accept': 'application/json',
				'Content-type': 'application/json',
				'Authorization': 'Bearer ' + Token
			}
        }).then (
			(response) => {
                
				if (response.data.status === "Success") {
                    setBarMensaje("Regitrado exitosamente");
                    setOpenbar(true);
                    setSuccesbar(true);
				}else{
                    setBarMensaje("Error al registrar");
                    setOpenbar(true);
                    setSuccesbar(false);
                }
			},
			(error) => {
                console.log("Exception " + error);
                setBarMensaje("Error al registrar");
                setOpenbar(true);
                setSuccesbar(false);
            }
        );
    };

    useEffect(() => {
        axios.get ('http://localhost:50563/api/Usuarios/' + idUser,
		{
            method: "GET",
            mode: 'cors',
            headers: {
				'Accept': 'application/json',
				'Content-type': 'application/json',
				'Authorization': 'Bearer ' + Token
			}
		})
		.then (response => {
			if (response.status === 200) {
                
                setUserName(response.data.userName);
                setNivel(response.data.nivel);
			}
		})
		.catch (function (error) {
			console.log(error);
		})
    },[idUser, Token]);


    const handleClose = (event, reason) => {
        if (succesbar)
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
                    disabled
                    error = {errorName}
                    id="User_userName"
                    label="Nombre"
                    style={{ margin: 8 }}
                    fullWidth
                    margin="normal"
                    required = {true}
                    variant="outlined"
                    placeholder ="Ingrese su nombre de usuario"
                    helperText= "Min. 8 caracteres"
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
                    error={errorPass}
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
                    helperText= "Min. 6 caracteres"
                    InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Lock/>
                          </InputAdornment>
                        ),
                      }}
                    
                />

                <TextField
                    error={errorPassN}
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
                    helperText= "Min. 6 caracteres"
                    InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Lock/>
                          </InputAdornment>
                        ),
                      }}
                    
                />
                
                <TextField
                    error={errorPassNC}
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
                    helperText= "Min. 6 caracteres"
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
                        {barMensaje}
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