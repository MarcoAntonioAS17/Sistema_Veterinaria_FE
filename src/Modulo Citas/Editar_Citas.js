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
import MuiAlert from '@material-ui/lab/Alert';
import InputAdornment from '@material-ui/core/InputAdornment';
import{
    Save,
    CalendarToday,
    Cancel,
    Schedule,
    Info
} from '@material-ui/icons';
import { Link, Redirect} from 'react-router-dom';


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

export default function Editar_Citas(props) {

    const Token = localStorage.getItem('ACCESS_TOKEN');
    const classes = useStyles();
    const [idCita] = useState(props.match.params.id);

    const [fecha, setFecha] = useState();
    const [hora, setHora] = useState();
    const [rcliente, setRcliente] = useState(0);
    const [tipo, setTipo] = useState("Estetica");
    const [rmascota, setRmascota] = useState('');
    const [notas, setNotas] = useState("");

    const [clientes, setClientes] = useState(null);
    const [mascotas, setMascotas] = useState(null);

    const [openbar, setOpenbar] = useState(false);
    const [succesbar, setSuccesbar] = useState(false);
    const [redi, setRedi] = React.useState(false);

    const handleActualizarClick = () => {
        
        axios.put ('http://localhost:50563/api/Citas/'+idCita,
		    {
                "RCliente" : parseInt(rcliente),
                "FechaHora" : fecha+"T"+hora,
                "Tipo" : tipo,
                "RMascota" : parseInt(rmascota),
                "Notas" : notas,
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
                    
                    setTipo("");
                    setNotas("");
                    
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

    useEffect(() =>{

        const ac = new AbortController();
        Promise.all([
            axios.get("http://localhost:50563/api/Citas/"+idCita,
            {
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
                    setTipo(res.tipo);
                    setNotas(res.notas);
                    var fecha = new Date(res.fechaHora);
                    
                    var month = '' + (fecha.getMonth() + 1),
                    day = '' + fecha.getDate(),
                    year = fecha.getFullYear(),
                    hours = fecha.getHours(),
                    minutes = fecha.getMinutes();

                    if (month.length < 2) 
                        month = '0' + month;
                    if (day.length < 2) 
                        day = '0' + day;
                    if (hours < 10)
                        hours = '0' + hours;
                    if (minutes < 10)
                        minutes = '0' + minutes;
                    
                    setFecha([year, month, day].join('-'));
                    setHora([hours, minutes].join(':'));

                    consultar_clientes(res.rCliente, res.rMascota, Token);
                    
                }
            })
            .catch (function (error) {
                console.log(error);
            })
        ]);
            return () => ac.abort();
    },[idCita, Token]);

    function consultar_clientes(ref_cliente, ref_Mascota, token) {
        const ac = new AbortController();
            Promise.all([
                axios.get("http://localhost:50563/api/Clientes",
                {
                    signal: ac.signal,
                    method: 'GET',
                    mode: 'cors',
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    }
                })
                .then (response2 => {
                    if (response2.status === 200) {
                        var res = response2.data;
                        setClientes(res);
                        setRcliente(ref_cliente);
                        //consultar_mascotas(ref_cliente,ref_Mascota);
                        axios.get("http://localhost:50563/api/Mascotas/Cliente/"+ref_cliente,{
                            signal: ac.signal,
                            method: 'GET',
                            mode: 'cors',
                             headers: {
                                'Accept': 'application/json',
                                'Content-type': 'application/json',
                                'Authorization': 'Bearer ' + token
                            }
                            })
                            .then (response2 => {
                                if (response2.status === 200) {
                                    var res = response2.data;
                                    setMascotas(res);
                                    if(res.length > 0)
                                        setRmascota(ref_Mascota);
                                    else
                                        setRmascota(0);
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
            ]);
                return () => ac.abort();
    }

    const handleClose = (event, reason) => {
        setRedi(true);
        if (reason === 'clickaway') {
          return;
        }
        
        setOpenbar(false);
    };

    const handleCancel = () =>{
        setTipo("");
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
                        setRmascota(res[0].idMascotas);
                        
                    else
                        setRmascota(0);
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
                        
                        <FormControl variant="outlined" fullWidth={true} className={classes.formControl} >
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
                        
                        <FormControl variant="outlined" fullWidth={true} className={classes.formControl} >
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
                            onClick = {handleActualizarClick}
                        >
                            Actualizar
                        </Button>
                        <Snackbar open={openbar} autoHideDuration={4000} onClose={handleClose}>
                            <Alert onClose={handleClose} severity= {succesbar ? "success" :"error"}>
                                {succesbar ? "Registrado con exito": "Error al registrar"}
                            </Alert>
                        </Snackbar>
                        {redi? <Redirect to="/Mascotas" />:null}
                        <Link to={"/Citas"} className = {classes.enlace}>
                            <Button
                                className = {classes.button}
                                variant="contained"
                                color="secondary"
                                onClick = {handleCancel}
                                startIcon={<Cancel />}
                            >
                                Cancelar
                            </Button>
                        </Link>
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
                        
                        <FormControl variant="outlined" fullWidth={true} className={classes.formControl} >
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
                        
                        <FormControl variant="outlined" fullWidth={true} className={classes.formControl} >
                            <InputLabel className={classes.label} id="demo-simple-select-label">Mascota</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value = {rmascota}
                                
                            >
                                
                            </Select>
                        </FormControl>

                        <TextField
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
                        
                        <Snackbar open={openbar} autoHideDuration={4000} onClose={handleClose}>
                            <Alert onClose={handleClose} severity= {succesbar ? "success" :"error"}>
                                {succesbar ? "Actualizado con exito": "Error al registrar"}
                            </Alert>
                        </Snackbar>
                        <Link to={"/Citas"} className = {classes.enlace}>
                            <Button
                                className = {classes.button}
                                variant="contained"
                                color="secondary"
                                onClick = {handleCancel}
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
    }else{
        return(
            <React.Fragment>
                <div className = {classes.buttonContainer}>
                    <Alert severity="error">Error al conectar con el servidor.</Alert>
                </div>
            </React.Fragment>
        );

    }
}