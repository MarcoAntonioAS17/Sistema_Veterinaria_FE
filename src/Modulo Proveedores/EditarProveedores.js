import React, { useEffect } from 'react'
import axios from 'axios';
import {
    Button,
    makeStyles,
    TextField,
    Snackbar,
    Typography
    } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert';
import InputAdornment from '@material-ui/core/InputAdornment';
import{
    Save,
    AccountCircle,
    Phone,
    AlternateEmail,
    Cancel
} from '@material-ui/icons';
import { Link, Redirect } from 'react-router-dom';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }  

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

export default function EditarProveedores(props) {

    const classes = useStyles();
    const Token = localStorage.getItem('ACCESS_TOKEN');
    const [idProveedor] = React.useState(props.match.params.id);
    
    const [nombre, setNombre] = React.useState("");
    const [telefono, setTelefono] = React.useState("");
    const [correo, setCorreo] = React.useState("");
    
    const [openbar, setOpenbar] = React.useState(false);
    const [succesbar, setSuccesbar] = React.useState(false);
    const [redi, setRedi] = React.useState(false);

    const handleClose = (event, reason) => {
        if (succesbar)
            setRedi(true);

        if (reason === 'clickaway') {
          return;
        }
        
        setOpenbar(false);
    };

    const handleActualizar = () =>{
        axios.put ('http://localhost:50563/api/Proveedores/' + idProveedor, {
            "proveedorNombre": nombre,
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
        axios.get ('http://localhost:50563/api/Proveedores/' + idProveedor,
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
                setNombre(response.data.proveedorNombre);
                setTelefono(response.data.telefono);
                setCorreo(response.data.correo);
			}
		})
		.catch (function (error) {
			console.log(error);
		})
    },[idProveedor, Token]);

    return(
        <React.Fragment>
            <Typography variant="h4"> Actualizar datos de proveedor {idProveedor}</Typography>
            <form>
                <TextField
                    id="Proveedor_Nombre"
                    label="Nombre del Proveedor"
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
                    
                    id="Proveedor_Telefono"
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
                    onClick = {handleActualizar}
                >
                    Actualizar
                </Button>
                <Snackbar open={openbar} autoHideDuration={4000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity= {succesbar ? "success" :"error"}>
                        {succesbar ? "Actualizado con exito": "Error al actualizar"}
                    </Alert>
                </Snackbar>
                {redi? <Redirect to="/Proveedores" />:null}
                
                <Link to={"/Proveedores"} className = {classes.enlace} >
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