import React, {useEffect , useState} from 'react'
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
import Alerta from '../Componentes_Genericos/Alerta';
import InputAdornment from '@material-ui/core/InputAdornment';
import{
    Save,
    Cancel,
    Pets,
    CalendarToday,
    Info
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

export default function FormClientes() {

    const classes = useStyles();
    const Token = sessionStorage.getItem('ACCESS_TOKEN');

    const [nombre, setNombre] = useState("");
    const [edad, setEdad] = useState(new Date().toISOString().slice(0,10));
    const [tipo, setTipo] = useState("");
    const [raza, setRaza] = useState("");
    const [descrip, setDescrip] = useState("");
    const [rcliente, setRcliente] = useState(0);
    const [clientes, setClientes] = useState(null);

    const [errnombre, setErrNombre] = useState(false);
    const [errtipo, setErrTipo] = useState(false);
    const [errraza, setErrRaza] = useState(false);
    const [errdescrip, setErrDescrip] = useState(false);
    const [erredad, setErrEdad] = useState(false);

    const [barMensaje, setBarMensaje] = useState("");
    const [openbar, setOpenbar] = useState(false);
    const [succesbar, setSuccesbar] = useState(false);

    useEffect(() =>{

        const ac = new AbortController();
        Promise.all([
            axios.get("http://localhost:50563/api/Clientes",{
                signal: ac.signal,
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer ' + Token
                }
            })
            .then (response2 => {
                if (response2.status === 200) {
                    var res = response2.data;
                    setClientes(res);
                    setRcliente(res[0].idClientes)
                    
                }
            })
            .catch (function (error) {
                console.log(error);
            })
        ]);
            return () => ac.abort();
    },[Token]);

    function handleValidar(){
        let error = false;
        setErrNombre(false);
        setErrTipo(false);
        setErrRaza(false);
        setErrDescrip(false);
        setErrEdad(false);
        
        if (!nombre.match("^[A-Za-z ]+$")){
            error = true;
            setErrNombre(true);
        }
        if (new Date(edad).getTime() > new Date().getTime()){
            console.log("Error en fecha");
            setErrEdad(true);
            error =true;
        }
        if (tipo.length > 0){
            if(!tipo.match("^[A-Za-z ]+$")){
                error = true;
                setErrTipo(true);
            }
        }
        if (raza.length > 0){
            if(!raza.match("^[A-Za-z ]+$")){
                error = true;
                setErrRaza(true);
            }
        }
        if (descrip.length > 0){
            if(!descrip.match("^[A-Za-z ]+$")){
                error = true;
                setErrDescrip(true);
            }
        }
        if (error){
            setBarMensaje("Corregir campos");
            setOpenbar(true);
            setSuccesbar(false);
        }

        return error;
    }

    const handleGuardarClick = () => {
        
        if (handleValidar())
            return;

        axios.post ('http://localhost:50563/api/Mascotas',
		{
			"nombre": nombre,
            "edad": edad+"T00:00:00",
            "tipo": tipo,
            "raza": raza,
            "descripcion": descrip,
            "rcliente": parseInt(rcliente,10)
		},{
            headers: {
				'Accept': 'application/json',
				'Content-type': 'application/json',
				'Authorization': 'Bearer ' + Token
			}
        }).then (
			(response) => {
                
				if (response.data.status === "Success") {
                    
                    setNombre("");
                    setTipo("");
                    setRaza("");
                    setDescrip("");

                    setBarMensaje("Mascota guardada");
                    setOpenbar(true);
                    setSuccesbar(true);
				}else{
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
        setNombre("");
        setTipo("");
        setRaza("");
        setDescrip("");
    }

    if (clientes == null) {
        return(
            <React.Fragment>
                <div className = {classes.buttonContainer}>
                    <Alerta severity="error">Error al conectar con el servidor.</Alerta>
                </div>
            </React.Fragment>
        );
    }else{

        const opciones = clientes.map((elem) => 
            <MenuItem key={elem.idClientes} value={elem.idClientes}>{elem.nombre}</MenuItem>
        );
        
        return(
            <React.Fragment>
                <form>
                    <TextField
                        error={errnombre}
                        id="Mascota_Nombre"
                        label="Nombre de la Mascota"
                        style={{ margin: 8 }}
                        fullWidth
                        margin="normal"
                        required = {true}
                        variant="outlined"
                        placeholder ="Nombre"
                        helperText = "Solo letras"
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
                        error = {erredad}
                        id="Mascota_Edad"
                        required={true}
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
                        error={errtipo}
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
                        error={errraza}   
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
                        error={errdescrip}
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
                        onClick = {handleGuardarClick}
                    >
                        Guardar
                    </Button>
                    <Snackbar open={openbar} autoHideDuration={4000} onClose={handleClose}>
                        <Alerta onClose={handleClose} severity= {succesbar ? "success" :"error"}>
                            {barMensaje}
                        </Alerta>
                    </Snackbar>
                    <Button
                        className = {classes.button}
                        variant="contained"
                        color="secondary"
                        onClick={handleCancel}
                        startIcon={<Cancel />}
                    >
                        Cancelar
                    </Button>
                    </div>
                </form>
                
            </React.Fragment>
        );
        
    }
    
}