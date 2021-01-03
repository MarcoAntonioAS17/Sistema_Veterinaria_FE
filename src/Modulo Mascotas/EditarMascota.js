import React, { useEffect } from 'react'
import axios from 'axios';
import {
    Button,
    makeStyles,
    TextField,
    Snackbar,
    Typography,
    FormControl,
    Select,
    MenuItem,
    InputLabel
    } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert';
import InputAdornment from '@material-ui/core/InputAdornment';
import{
    Save,
    Cancel,
    Pets,
    CalendarToday,
    Info
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

export default function EditarMascota(props) {

    const classes = useStyles();
    const [idMascota] = React.useState(props.match.params.id);
    
    const [nombre, setNombre] = React.useState("");
    const [edad, setEdad] = React.useState(new Date());
    const [tipo, setTipo] = React.useState("");
    const [raza, setRaza] = React.useState("");
    const [descrip, setDescrip] = React.useState("");
    const [rcliente, setRcliente] = React.useState(0);
    const [clientes, setClientes] = React.useState(null);
    
    const [openbar, setOpenbar] = React.useState(false);
    const [succesbar, setSuccesbar] = React.useState(false);
    const [redi, setRedi] = React.useState(false);

    const handleClose = (event, reason) => {
        setRedi(true);
        if (reason === 'clickaway') {
          return;
        }
        
        setOpenbar(false);
    };

    const handleActualizar = () =>{
        axios.put ('http://localhost:50563/api/Mascotas/' + idMascota, {
            "nombre": nombre,
            "edad": edad+"T00:00:00",
            "tipo": tipo,
            "raza": raza,
            "descripcion": descrip,
            "rcliente": parseInt(rcliente,10)
        }, {
		}).then (
			(response) => {
                
				if (response.data.status === "Success") {
                    
                    setNombre("");
                    setEdad(new Date());
                    setTipo("");
                    setRaza("");
                    setDescrip("");
                    setRcliente("");

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
        axios.get ('http://localhost:50563/api/Mascotas/' + idMascota,
		{
            method: "GET",
            mode: 'cors'
		})
		.then (response => {
			if (response.status === 200) {
                setNombre(response.data.nombre);
                setEdad(response.data.edad.slice(0, 10));
                setTipo(response.data.tipo);
                setRaza(response.data.raza);
                setDescrip(response.data.descripcion);
                setRcliente(response.data.rCliente);

                axios.get ('http://localhost:50563/api/Clientes',
                {
                    method: "GET",
                    mode: 'cors'
                })
                .then (response2 => {
                    if (response2.status === 200) {
                        var res = response2.data;
                        setClientes(res);
                        console.log(res);
                        console.log(res[0].idClientes);
                    }
                })
                .catch (function (error) {
                    console.log(error);
                })

			}
		})
		.catch (function (error) {
			console.log(error);
        })
       
    },[idMascota]);

    if (clientes == null) {
        return(
            <React.Fragment>
                <div className = {classes.buttonContainer}>
                    <Alert severity="error">Error al conectar con el servidor.</Alert>
                </div>
            </React.Fragment>
        );
    }else{

        const opciones = clientes.map((elem) => 
            <MenuItem key={elem.idClientes} value={elem.idClientes}>{elem.nombre}</MenuItem>
        );
        
        return(
            <React.Fragment>
                <Typography variant="h4"> Actualizar datos de Mascota {idMascota}</Typography>
                <form>
                <TextField
                        id="Mascota_Nombre"
                        label="Nombre de la Mascota"
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
                                <Pets />
                              </InputAdornment>
                            ),
                          }}
                    />
                    <TextField  
                        id="Mascota_Edad"
                        label="Fecha de nacimiento (Aprox)"
                        style={{ margin: 8 }}
                        fullWidth
                        value = {edad}
                        onChange = {event => setEdad(event.target.value)}
                        margin="normal"
                        variant="outlined"
                        type = "date"
                        InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <CalendarToday/>
                              </InputAdornment>
                            ),
                          }}  
                    />
                    <TextField
                        id="Mascota_Tipo"
                        label="Tipo de Mascota"
                        style={{ margin: 8 }}
                        fullWidth
                        value = {tipo}
                        onChange = {event => setTipo(event.target.value)}
                        margin="normal"
                        variant="outlined"
                        placeholder = "¿Perro, gato u otro?"
                        
                    />
                    <TextField       
                        id="Mascota_Raza"
                        label="Raza de la mascota"
                        style={{ margin: 8 }}
                        fullWidth
                        value = {raza}
                        onChange = {event => setRaza(event.target.value)}
                        margin="normal"
                        variant="outlined"
                        placeholder = "Raza (si aplica)"
                          
                    />
                    <TextField
                        id="Mascota_Descripcion"
                        label="Descripción"
                        style={{ margin: 8 }}
                        fullWidth
                        value = {descrip}
                        onChange = {event => setDescrip(event.target.value)}
                        margin="normal"
                        variant="outlined"
                        placeholder = "Datos extra sobre la mascota"
                        InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Info/>
                              </InputAdornment>
                            ),
                          }}  
                    />
                    <FormControl variant="outlined" fullWidth={true} className={classes.formControl} >
                        <InputLabel className={classes.label} id="demo-simple-select-label">Dueño de la mascota</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value = {rcliente}
                            onChange={event => setRcliente(event.target.value)}
                        >
                            {opciones}
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
                            {succesbar ? "Actualizado con exito": "Error al actualizar"}
                        </Alert>
                    </Snackbar>
                    {redi? <Redirect to="/Mascotas" />:null}
                    
                    <Link to={"/Mascotas"} className = {classes.enlace} >
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
    
    
}