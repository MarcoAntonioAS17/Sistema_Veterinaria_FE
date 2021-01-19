import React, {useState} from 'react'
import axios from 'axios';
import {
    Button,
    makeStyles,
    TextField,
    Snackbar
    } from '@material-ui/core'
import Alert from '../Componentes_Genericos/Alerta';
import InputAdornment from '@material-ui/core/InputAdornment';
import{
    Save,
    AccountCircle,
    Phone,
    AlternateEmail,
    Cancel
} from '@material-ui/icons';


const useStyles = makeStyles(() => ({
    button: {
        textAlign: 'center',
        margin: '1rem'
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
    },
}));

export default function FormProveedores() {

    const classes = useStyles();
    const Token = localStorage.getItem('ACCESS_TOKEN');
    
    const [nombre, setNombre] = useState("");
    const [telefono, setTelefono] = useState("");
    const [correo, setCorreo] = useState("");

    const [errNombre, setErrNombre] = useState(false);
    const [errTelefono, setErrTelefono] = useState(false);
    const [errCorreo, setErrCorreo] = useState(false);

    const [barMensaje, setBarMensaje] = useState("");
    const [openbar, setOpenbar] = useState(false);
    const [succesbar, setSuccesbar] = useState(false);

    function handleValidar(){
        let error = false;
        setErrNombre(false);
        setErrTelefono(false);
        setErrCorreo(false);

        if (nombre.length < 5 || !nombre.match("^[A-Za-z0-9ñ ]+$")) {
            setErrNombre(true);
            error = true;
        }
        if (telefono.length > 1){
            if (telefono.length < 9 || !telefono.match("^[0-9-]+$")){
                setErrTelefono(true);
                error = true;
            }
        }
        if (correo.length > 0){
            let lastAtPos = correo.lastIndexOf('@');
            let lastDotPos = correo.lastIndexOf('.');

            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && correo.indexOf('@@') === -1 && lastDotPos > 2 && (correo.length - lastDotPos) > 2)) {
                setErrCorreo(true);
                error = true;
            }
        }
        if (error)
            setBarMensaje("Campos por corregir");
        if (correo.length < 1 && telefono.length <1){
            error =true;
            setBarMensaje("Ingresa telefono o correo");
            setErrTelefono(true);
        }
        if (error){    
            setOpenbar(true);
            setSuccesbar(false);
        }

        return error;
    }

    const handleGuardarClick = () => {
        if (handleValidar()){
            return;
        }

        axios.post ('http://localhost:50563/api/Proveedores/',
		{
			"ProveedorNombre": nombre,
			"telefono": telefono,
            "correo": correo
        },
        {
            headers: {
				'Accept': 'application/json',
				'Content-type': 'application/json',
				'Authorization': 'Bearer ' + Token
			}
        }).then (
			(response) => {
                
				if (response.data.status === "Success") {
                    console.log("Guardado con exito");
                    setCorreo("");
                    setNombre("");
                    setTelefono("");
                    setBarMensaje("Cliente registrado");
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

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpenbar(false);
    };

    const handleCancel = () =>{
        setCorreo("");
        setNombre("");
        setTelefono("");
    }

    return(
        <React.Fragment>
            <form>
                <TextField
                    error = {errNombre}
                    id="Proveedor_Nombre"
                    label="Nombre del Proveedor"
                    style={{ margin: 8 }}
                    fullWidth
                    margin="normal"
                    required = {true}
                    variant="outlined"
                    placeholder ="Nombre"
                    value = {nombre}
                    helperText= "Solo letras y números"
                    onChange = {event => setNombre(event.target.value)}
                    InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountCircle />
                          </InputAdornment>
                        ),
                      }}
                />
                <TextField
                    error = {errTelefono}
                    id="Proveedor_Telefono"
                    label="Número de telefono"
                    style={{ margin: 8 }}
                    fullWidth
                    value = {telefono}
                    helperText= "Solo números y guiones"
                    onChange = {event => setTelefono(event.target.value)}
                    margin="normal"
                    variant="outlined"
                    placeholder = "299-XXX-XXXX"
                    InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Phone/>
                          </InputAdornment>
                        ),
                      }}
                    
                />
                <TextField
                    error = {errCorreo}
                    id="Proveedor_Email"
                    label="Correo electrónico"
                    style={{ margin: 8 }}
                    fullWidth
                    value = {correo}
                    onChange = {event => setCorreo(event.target.value)}
                    margin="normal"
                    variant="outlined"

                    placeholder = "email@dominio.com"
                    InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AlternateEmail/>
                          </InputAdornment>
                        ),
                      }}
                />
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