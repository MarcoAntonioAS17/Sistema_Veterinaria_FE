import React, {useState, useEffect} from 'react';
import axios from 'axios';
import MuiAlert from '@material-ui/lab/Alert';
import {
    Grid,
    TextField,
    Typography,
    makeStyles,
    Button,
    Snackbar,
}from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    space8: {
        marginTop: theme.spacing(2),
    },
    container: {
        display: "grid",
        justifyContent: "center",
    },
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Config() {

    const classes = useStyles();
    const Token = sessionStorage.getItem('ACCESS_TOKEN');
    const Name = sessionStorage.getItem('USER_NAME');
    const Nivel = sessionStorage.getItem('NIVEL');
    
    const [dias, setDias] = useState(0);
    const [cantidad, setCantidad] = useState(0);

    const [openbar, setOpenbar] = useState(false);
    const [succesbar, setSuccesbar] = useState(false);

    useEffect(() => {
        axios.get ('http://localhost:50563/api/Config',
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
                setDias(response.data.diasCaducidad);
                setCantidad(response.data.cantidadInventario);
			}
		})
		.catch (function (error) {
			console.log(error);
		})
    },[Token]);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpenbar(false);
    };

    const handleGuardarClick = () => {
        if (cantidad < 1 || dias < 1){
            setOpenbar(true);
            setSuccesbar(false);
            return;
        }
        
        axios.put ('http://localhost:50563/api/Config',
		{
			"diasCaducidad": parseInt(dias),
            "cantidadInventario": parseInt(cantidad)
		},{
            headers: {
				'Accept': 'application/json',
				'Content-type': 'application/json',
				'Authorization': 'Bearer ' + Token
			}
        }).then (
			(response) => {
				if (response.data.status === "Success") {
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

    return (
    <React.Fragment>
        <Grid container alignItems="center" alignContent="center">
            <Grid item xs = {12}>
                <Typography align="center" variant="h5">Hola {Name}<br/> Tipo de Usuario: {Nivel < 2? "Administrador":"Empleado"}
                </Typography>
            </Grid>
            <Grid item  xs= {12} className={classes.container}>
                <Typography 
                    className={classes.space8} 
                    >Aviso de productos próximos a caducar</Typography>
                <TextField 
                    id="dias" 
                    label="Días próximos a caducar" 
                    variant="outlined" 
                    className={classes.space8}
                    type="number"
                    InputLabelProps={{ shrink: true }}
                    value = {dias}
                    onChange = {event => setDias(event.target.value)}
                    
                />
                <Typography
                    className={classes.space8} 
                    >Aviso de productos próximos a agotarse</Typography>
                <TextField 
                    id="dias" 
                    label="Cantidad de aviso" 
                    variant="outlined" 
                    className={classes.space8} 
                    InputLabelProps={{ shrink: true }}
                    value = {cantidad}
                    onChange = {event => setCantidad(event.target.value)}
                />
                <Button 
                    variant="contained" 
                    color="primary"
                    className={classes.space8}
                    onClick={handleGuardarClick}
                >
                    Guardar
                </Button>
            </Grid>
            <Snackbar open={openbar} autoHideDuration={4000} onClose={handleClose}>
                <Alert onClose={handleClose} severity= {succesbar ? "success" :"error"}>
                    {succesbar ? "Actualizado con exito": "Error al registrar"}
                </Alert>
            </Snackbar>
        </Grid>
    </React.Fragment>
  );
}