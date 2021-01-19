import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {
    Button,
    makeStyles,
    TextField,
    Snackbar,
    Typography
    } from '@material-ui/core'
import Alerta from '../Componentes_Genericos/Alerta'
import InputAdornment from '@material-ui/core/InputAdornment';
import{
    Save,
    AccountCircle,
    Phone,
    AlternateEmail,
    Cancel
} from '@material-ui/icons';
import { Link, Redirect } from 'react-router-dom';

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

export default function EditarClientes(props) {

    const classes = useStyles();
    const Token = localStorage.getItem('ACCESS_TOKEN');
    const [idCliente] = useState(props.match.params.id);
    
    const [nombre, setNombre] = useState("");
    const [telefono, setTelefono] = useState("");
    const [correo, setCorreo] = useState("");

    const [errNombre, setErrNombre] = useState(false);
    const [errTelefono, setErrTelefono] = useState(false);
    const [errCorreo, setErrCorreo] = useState(false);

    const [barMensaje, setBarMensaje] = useState("");
    const [openbar, setOpenbar] = useState(false);
    const [succesbar, setSuccesbar] = useState(false);
    const [redi, setRedi] = useState(false);

    const handleClose = (event, reason) => {
        if (succesbar)
            setRedi(true);
        if (reason === 'clickaway') {
          return;
        }
        setOpenbar(false);
    };

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

    const handleActualizar = () =>{

        if (handleValidar()){
            return;
        }

        axios.put ('http://localhost:50563/api/Clientes/' + idCliente, {
            "nombre": nombre,
			"telefono": telefono,
            "correo": correo
        }, {
            headers: {
				'Accept': 'application/json',
				'Content-type': 'application/json',
				'Authorization': 'Bearer ' + Token
			}
		}).then (
			(response) => {
                
				if (response.data.status === "Success") {
                    setCorreo("");
                    setNombre("");
                    setTelefono("");
                    setBarMensaje("Actualizado con exito")
                    setOpenbar(true);
                    setSuccesbar(true);
				}else{
                    setBarMensaje("Error al actualizar");
                    setOpenbar(true);
                    setSuccesbar(false);
                }
			},
			(error) => {
                console.log("Exception " + error);
                setBarMensaje("Error al actualizar");
                setOpenbar(true);
                setSuccesbar(false);
            }
        );
    };

    useEffect(() => {
        axios.get ('http://localhost:50563/api/Clientes/' + idCliente,
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
                
                setNombre(response.data.nombre);
                setTelefono(response.data.telefono);
                setCorreo(response.data.correo);
			}
		})
		.catch (function (error) {
			console.log(error);
		})
    },[idCliente,Token]);

    return(
        <React.Fragment>
            <Typography variant="h4"> Actualizar datos de cliente {idCliente}</Typography>
            <form>
                <TextField
                    error = {errNombre}
                    id="Cliente_Nombre"
                    label="Nombre del Cliente"
                    style={{ margin: 8 }}
                    fullWidth
                    margin="normal"
                    required = {true}
                    variant="outlined"
                    placeholder ="Nombre"
                    value = {nombre}
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
                    id="Cliente_Telefono"
                    label="Número de telefono"
                    style={{ margin: 8 }}
                    fullWidth
                    value = {telefono}
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
                    id="Cliente_Email"
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
                    onClick = {handleActualizar}
                >
                    Actualizar
                </Button>
                <Snackbar open={openbar} autoHideDuration={4000} onClose={handleClose}>
                    <Alerta onClose={handleClose} severity= {succesbar ? "success" :"error"}>
                        {barMensaje}
                    </Alerta>
                </Snackbar>
                {redi? <Redirect to="/Clientes" />:null}
                
                <Link to={"/Clientes"} className = {classes.enlace} >
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