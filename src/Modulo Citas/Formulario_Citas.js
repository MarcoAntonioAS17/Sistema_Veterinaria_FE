import React, {useEffect, useState} from 'react'
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
    CalendarToday,
    Cancel,
    Schedule,
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

    const [fecha, setFecha] = useState(new Date().toISOString().slice(0,10));
    const [hora, setHora] = useState(new Date().toTimeString().slice(0,5));
    const [rcliente, setRcliente] = useState(0);
    const [tipo, setTipo] = useState("Estetica");
    const [rmascota, setRmascota] = useState('');
    const [notas, setNotas] = useState("");

    const [errnotas, setErrNotas] = useState(false);
    const [err_rmascota, setErrRmascota] = useState(false);

    const [clientes, setClientes] = useState(null);
    const [mascotas, setMascotas] = useState(null);

    const [barMensaje, setBarMensaje] = useState("");
    const [openbar, setOpenbar] = useState(false);
    const [succesbar, setSuccesbar] = useState(false);

    function validar_campos(){
        let error = false;
        setErrRmascota(false);
        setErrNotas(false);

        if (notas.length > 0){
            if (!notas.match("^[A-Za-z0-9 ]+$")){
                error = true;
                setErrNotas(true);
            }
        }
        if (mascotas == null || mascotas.length < 1){
            error = true
            setErrRmascota(true);
        }else{
            let encontrado = false;
            mascotas.forEach(element => {
                if (parseInt(element.idMascotas) === parseInt(rmascota)){
                    encontrado = true;
                }
            });
            if (!encontrado){
                error = true
                setErrRmascota(true);
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
        
        if (validar_campos())
            return;

        axios.post ('http://localhost:50563/api/Citas/',
		{
			"RCliente" : parseInt(rcliente),
            "FechaHora" : fecha+"T"+hora,
            "Tipo" : tipo,
            "RMascota" : parseInt(rmascota),
            "Notas" : notas
		},{
            headers: {
				'Accept': 'application/json',
				'Content-type': 'application/json',
				'Authorization': 'Bearer ' + Token
			}
        }).then (
			(response) => {
                
				if (response.data.status === "Success") {
                    
                    setNotas("");
                    setBarMensaje("Cita registrada");
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
                }
            })
            .catch (function (error) {
                console.log(error);
            })
        ]);
            return () => ac.abort();
    },[Token]);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpenbar(false);
    };

    const handleCancel = () =>{
        setNotas("");
    }
    
    const handleClienteChange = (event) =>{
        setRcliente(event.target.value)
        
        const ac = new AbortController();
        Promise.all([
            axios.get("http://localhost:50563/api/Mascotas/Cliente/"+event.target.value,{
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
                    setMascotas(res);
                    
                    if(res.length > 0)
                        setRmascota(res[0].idMascotas)
                }
            })
            .catch (function (error) {
                console.log(error);
            })
            
        ]);
        return () => ac.abort();
    }

    if (clientes != null) {
        const opciones = clientes.map((elem) => 
            <MenuItem key={elem.idClientes} value={elem.idClientes}>{elem.nombre}</MenuItem>
        );

        if (mascotas != null) {

            const opcMascota = mascotas.map((elem) => 
                <MenuItem key={elem.idMascotas} value={elem.idMascotas}>{elem.nombre}</MenuItem>
            );
            return(
                <React.Fragment>
                    <form>
                        <FormControl 
                            required = {true}
                            variant="outlined" fullWidth={true} className={classes.formControl} >
                            <InputLabel className={classes.label} id="demo-simple-select-label">Tipo de Cita</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value = {tipo}
                                onChange={event => setTipo(event.target.value)}
                            >
                                <MenuItem value="Estetica">Estética</MenuItem>
                                <MenuItem value="Consulta">Consulta</MenuItem>
                                <MenuItem value="Vacunacion">Vacunación</MenuItem>
                                <MenuItem value="Operacion">Operación</MenuItem>
                                <MenuItem value="Otro">Otro</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField  
                                id="Cita_Fecha"
                                label="Fecha de la cita"
                                style={{ margin: 8 }}
                                fullWidth
                                value = {fecha}
                                onChange = {event => setFecha(event.target.value)}
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
                            id="Cita_Hora"
                            label="Hora de la Cita"
                            style={{ margin: 8 }}
                            fullWidth
                            margin="normal"
                            required = {true}
                            variant="outlined"
                            value = {hora}
                            onChange = {event => setHora(event.target.value)}
                            type="time"
                            InputProps={{
                                startAdornment: (
                                <InputAdornment position="start">
                                    <Schedule />
                                </InputAdornment>
                                ),
                            }}
                        />
                        
                        <FormControl 
                            placeholder = "Da clic y selecciona un cliente"
                            required = {true}
                            variant="outlined" fullWidth={true} className={classes.formControl} >
                            <InputLabel className={classes.label} id="demo-simple-select-label">Cliente</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value = {rcliente}
                                onChange={handleClienteChange}
                            >
                                {opciones}
                            </Select>
                        </FormControl>
                        
                        <FormControl 
                            placeholder = "Da clic y selecciona una mascota"
                            required = {true}
                            error = {err_rmascota}
                            variant="outlined" fullWidth={true} className={classes.formControl} >
                            <InputLabel className={classes.label} id="demo-simple-select-label">Mascota</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value = {rmascota}
                                onChange = {event => setRmascota(event.target.value)}
                            >
                                {opcMascota}
                            </Select>
                        </FormControl>

                        <TextField
                            error = {errnotas}
                            id="Cita_Notas"
                            label="Notas"
                            style={{ margin: 8 }}
                            fullWidth
                            value = {notas}
                            onChange = {event => setNotas(event.target.value)}
                            margin="normal"
                            variant="outlined"
                            placeholder = "Detalles extra"
                            InputProps={{
                                startAdornment: (
                                <InputAdornment position="start">
                                    <Info/>
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
                            <Alerta onClose={handleClose} severity= {succesbar ? "success" :"error"}>
                                {barMensaje}
                            </Alerta>
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

        } else{
            
            return(
                <React.Fragment>
                    <form>
                        <FormControl variant="outlined" fullWidth={true} className={classes.formControl} >
                            <InputLabel className={classes.label} id="demo-simple-select-label">Tipo de Cita</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value = {tipo}
                                onChange={event => setTipo(event.target.value)}
                            >
                                <MenuItem value="Estetica">Estética</MenuItem>
                                <MenuItem value="Consulta">Consulta</MenuItem>
                                <MenuItem value="Vacunacion">Vacunación</MenuItem>
                                <MenuItem value="Operacion">Operación</MenuItem>
                                <MenuItem value="Otro">Otro</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField  
                                id="Cita_Fecha"
                                label="Fecha de la cita"
                                style={{ margin: 8 }}
                                fullWidth
                                value = {fecha}
                                onChange = {event => setFecha(event.target.value)}
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
                            id="Cita_Hora"
                            label="Hora de la Cita"
                            style={{ margin: 8 }}
                            fullWidth
                            margin="normal"
                            required = {true}
                            variant="outlined"
                            value = {hora}
                            onChange = {event => setHora(event.target.value)}
                            type="time"
                            InputProps={{
                                startAdornment: (
                                <InputAdornment position="start">
                                    <Schedule />
                                </InputAdornment>
                                ),
                            }}
                        />
                        
                        <FormControl 
                            variant="outlined" fullWidth={true} className={classes.formControl} >
                            <InputLabel className={classes.label} id="demo-simple-select-label">Cliente</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value = {rcliente}
                                onChange={handleClienteChange}
                            >
                                {opciones}
                            </Select>
                        </FormControl>
                        
                        <FormControl 
                            error = {err_rmascota}
                            variant="outlined" fullWidth={true} className={classes.formControl} >
                            <InputLabel className={classes.label} id="demo-simple-select-label">Mascota</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value = {rmascota}

                            >
                                
                            </Select>
                        </FormControl>

                        <TextField
                            error = {errnotas}
                            id="Cita_Notas"
                            label="Notas"
                            style={{ margin: 8 }}
                            fullWidth
                            value = {notas}
                            onChange = {event => setNotas(event.target.value)}
                            margin="normal"
                            variant="outlined"
                            placeholder = "Detalles extra"
                            InputProps={{
                                startAdornment: (
                                <InputAdornment position="start">
                                    <Info/>
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
                            <Alerta onClose={handleClose} severity= {succesbar ? "success" :"error"}>
                                {barMensaje}
                            </Alerta>
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
    }else{
        return(
            <React.Fragment>
                <div className = {classes.buttonContainer}>
                    <Alerta severity="error">Error al conectar con el servidor.</Alerta>
                </div>
            </React.Fragment>
        );

    }
}