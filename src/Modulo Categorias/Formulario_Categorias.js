import React, {useState} from 'react'
import axios from 'axios';
import {
    makeStyles,
    TextField,
    Snackbar,
    IconButton
    } from '@material-ui/core'
import Alert from '../Componentes_Genericos/Alerta';
import InputAdornment from '@material-ui/core/InputAdornment';
import{
    Save,
    Category,
    Cancel
} from '@material-ui/icons';


const useStyles = makeStyles(() => ({
    
    Form: {
        display: 'flex',
        justifyContent: 'left',
    },
}));

export default function FormMascotas() {

    const classes = useStyles();

    const Token = sessionStorage.getItem('ACCESS_TOKEN');
    const [nombre, setNombre] = useState("");
    
    const [errnombre, setErrNombre] = useState(false);
    
    const [openbar, setOpenbar] = useState(false);
    const [succesbar, setSuccesbar] = useState(false);

    const handleGuardarClick = () => {
        setErrNombre(false);
        if (!nombre.match("^[A-Za-z ]+$")){
            setErrNombre(true);
            setOpenbar(true);
            setSuccesbar(false);
            return;
        }

        axios.post ('http://localhost:50563/api/Categorias/',
            {
                "nombre": nombre
            },
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer ' + Token
                }
            }
        ).then (
			(response) => {
                
				if (response.data.status === "Success") {
                    
                    setNombre("");
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
        setNombre("");
    }

    
    return(
        <React.Fragment >
            <form className = {classes.Form}>
                
                <TextField
                    required = {true}
                    error = {errnombre}
                    helperText = "No numeros"
                    id="categoria_Nombre"
                    label="Nombre de la categoría"
                    style={{ margin: 8 }}
                    fullWidth
                    value = {nombre}
                    onChange = {event => setNombre(event.target.value)}
                    margin="normal"
                    variant="outlined"
                    placeholder = "Nueva de la categoria"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                            <Category/>
                            </InputAdornment>
                        ),
                        }}
                />
                
                <IconButton 
                    aria-label="guardar" 
                    color="primary"
                    onClick = {handleGuardarClick}
                >
                    <Save/>
                </IconButton>
                
                <Snackbar open={openbar} autoHideDuration={4000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity= {succesbar ? "success" :"error"}>
                        {succesbar ? "Registrado con exito": "Error al registrar"}
                    </Alert>
                </Snackbar>

                <IconButton 
                    aria-label="delete" 
                    color="secondary"
                    onClick = {handleCancel}
                >
                    <Cancel/>
                </IconButton>
                
            </form>
            
        </React.Fragment>
    );
   
    
}