import React from 'react'
import {
    Button,
    makeStyles,
    TextField,
} from '@material-ui/core'

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

export default function FormClientes() {

    const classes = useStyles();

    return(
        <React.Fragment>
            <form>
                <TextField
                    id="Cliente_Nombre"
                    label="Nombre del Cliente"
                    style={{ margin: 8 }}
                    fullWidth
                    margin="normal"
                    required = 'true'
                    variant="outlined"
                    placeholder ="Nombre"
                    InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountCircle />
                          </InputAdornment>
                        ),
                      }}
                />
                <TextField
                    
                    id="Cliente_Correo"
                    label="Número de telefono"
                    style={{ margin: 8 }}
                    fullWidth
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
                    id="Cliente_Email"
                    label="Correo electrónico"
                    style={{ margin: 8 }}
                    fullWidth
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
                >
                    Guardar
                </Button>
                <Button
                    className = {classes.button}
                    variant="contained"
                    color="secondary"
                    startIcon={<Cancel />}
                >
                    Cancelar
                </Button>
                </div>
            </form>
            
        </React.Fragment>
    );
    
}