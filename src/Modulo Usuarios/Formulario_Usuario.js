import React, {useState} from 'react'
import axios from 'axios';
import {
    Button,
    makeStyles,
    TextField,
    Snackbar,
    FormControl,
    Select,
    MenuItem,
    InputLabel
    } from '@material-ui/core'
import Alert from '../Componentes_Genericos/Alerta';
import InputAdornment from '@material-ui/core/InputAdornment';
import{
    Save,
    AccountCircle,
    Lock,
    Cancel
} from '@material-ui/icons';


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

export default function FormUsuarios() {

    const classes = useStyles();
    const Token = sessionStorage.getItem('ACCESS_TOKEN');

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [nivel, setNivel] = useState(2);
    const [errorName, setErrorN] = useState(false);
    const [errorPass, setErrorP] = useState(false);

    const [openbar, setOpenbar] = useState(false);
    const [succesbar, setSuccesbar] = useState(false);
    const [barMensaje, setBarMensaje] = useState("");

    const handleGuardarClick = () => {
        let error = false;
        setErrorN(false);
        setErrorP(false);

        if (userName.length < 8) {
            setErrorN(true);
            error = true;
        }
        if (password.length < 6){
            setErrorP(true);
            error = true;
        }
        if (error){
            setBarMensaje("Campos por corregir");
            setOpenbar(true);
            setSuccesbar(false);
            return;
        }
            
        axios.post ('http://localhost:50563/api/Usuarios/',
		{
			"userName": userName,
			"password": password,
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
                    handleCancel();

                    setBarMensaje("Registrado con exito");
                    setOpenbar(true);
                    setSuccesbar(true);
				}else{
                    setBarMensaje("Error el registrar");
                    setOpenbar(true);
                    setSuccesbar(false);
                }
			},
			(error) => {
                console.log("Exception " + error);
                setBarMensaje("Error el registrar");
                setOpenbar(true);
                setSuccesbar(false);
            }
        );
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpenbar(false);
    };

    const handleCancel = () =>{
        setUserName("");
        setPassword("");
        setNivel(2);
    }

    return(
        <React.Fragment>
            <form>
                <TextField
                    error = {errorName}
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
                    helperText= "Min. 8 caracteres"
                    InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountCircle />
                          </InputAdornment>
                        ),
                      }}
                />
                <TextField
                    error = {errorPass}
                    id="User_password"
                    label="Contraseña"
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
                    onClick = {handleGuardarClick}
                >
                    Guardar
                </Button>
                <Snackbar open={openbar} autoHideDuration={4000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity= {succesbar ? "success" :"error"}>
                        {barMensaje}
                    </Alert>
                </Snackbar>
                <Button
                    className = {classes.button}
                    variant="contained"
                    color="secondary"
                    onClick = {handleCancel}
                    startIcon={<Cancel />}
                >
                    Cancelar
                </Button>
                </div>
            </form>
            
        </React.Fragment>
    );
    
}