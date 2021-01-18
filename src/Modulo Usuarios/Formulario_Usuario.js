import React from 'react'
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
import MuiAlert from '@material-ui/lab/Alert';
import InputAdornment from '@material-ui/core/InputAdornment';
import{
    Save,
    AccountCircle,
    Lock,
    Cancel
} from '@material-ui/icons';


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

export default function FormUsuarios() {

    const classes = useStyles();
    const Token = localStorage.getItem('ACCESS_TOKEN');

    const [userName, setUserName] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [nivel, setNivel] = React.useState(2);

    const [openbar, setOpenbar] = React.useState(false);
    const [succesbar, setSuccesbar] = React.useState(false);

    const handleGuardarClick = () => {
        
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
                    console.log("Guardado con exito");
                    
                    handleCancel();

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
                    label="Contraseña"
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
                        {succesbar ? "Registrado con exito": "Error al registrar"}
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