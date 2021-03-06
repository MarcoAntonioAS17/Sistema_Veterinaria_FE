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
import Alert from '../Componentes_Genericos/Alerta';
import InputAdornment from '@material-ui/core/InputAdornment';
import{
    Save,
    Cancel,
    CalendarToday,
    Info,
    AttachMoney
} from '@material-ui/icons';
import { Link, Redirect } from 'react-router-dom';


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

export default function EditarInventario(props) {

    const classes = useStyles();
    const [idProductos] = useState(props.match.params.id);
    const Token = sessionStorage.getItem('ACCESS_TOKEN');

    const [nombre, setNombre] = useState("");
    const [precioVenta, setPrecioVenta] = useState(0.0);
    const [precioCompra, setPrecioCompra] = useState(0.0);
    const [cantidad, setCantidad] = useState(0);
    const [caducidad ,setCaducidad] = useState(new Date());
    const [descripcion, setDescripcion] = useState("");
    const [rCategoria, setRCategoria] = useState(1);
    const [rProveedor, setRProveedor] = useState(1);

    const [erridProductos, setErrIdProductos] = useState(false);
    const [errnombre, setErrNombre] = useState(false);
    const [errprecioVenta, setErrPrecioVenta] = useState(false);
    const [errprecioCompra, setErrPrecioCompra] = useState(false);
    const [errcantidad, setErrCantidad] = useState(false);
    const [errdescripcion, setErrDescripcion] = useState(false);
    const [erRCategoria, setErrRCategoria] = useState(false);
    const [errRProveedor, setErrRProveedor] = useState(false);

    const [categoria, setCategoria] = useState(null);
    const [proveedor, setProveedor] = useState(null);

    const [barMensaje, setBarMensaje] = useState("");
    const [openbar, setOpenbar] = useState(false);
    const [succesbar, setSuccesbar] = useState(false);
    const [redi, setRedi] = React.useState(false);

    useEffect(() =>{

        const ac = new AbortController();
        Promise.all([
            axios.get("http://localhost:50563/api/Categorias",{
                signal: ac.signal,
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer ' + Token
                }
            })
            .then (response => {
                if (response.status === 200) {
                    var res = response.data;
                    setCategoria(res);
                }
            })
            .catch (function (error) {
                console.log(error);
            }),
            axios.get("http://localhost:50563/api/Proveedores",{
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
                    var res2 = response2.data;
                    setProveedor(res2);

                    axios.get("http://localhost:50563/api/Productos/"+idProductos,{
                        signal: ac.signal,
                        method: 'GET',
                        mode: 'cors',
                        headers: {
                            'Accept': 'application/json',
                            'Content-type': 'application/json',
                            'Authorization': 'Bearer ' + Token
                        }
                    })
                    .then (response3 => {
                        if (response3.status === 200) {
                            var res3 = response3.data;
                            
                            setNombre(res3.nombre);
                            setPrecioVenta(res3.precioVenta);
                            setPrecioCompra(res3.precioCompra);
                            setCantidad(res3.cantidad);
                            setDescripcion(res3.descripcion);
                            setCaducidad(res3.caducidad.slice(0,10));
                            setRCategoria(res3.rCategoria)
                            setRProveedor(res3.rProveedor)
                            
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
    },[idProductos, Token]);

    function validar_parametros() {
        let error = false;
        setErrIdProductos(false);
        setErrNombre(false);
        setErrPrecioVenta(false);
        setErrPrecioCompra(false);
        setErrCantidad(false);
        setErrDescripcion(false);
        setErrRCategoria(false);
        setErrRProveedor(false);

        if (!idProductos.match("^[A-Za-z0-9]+$") || idProductos.length > 15){
            error = true;
            setErrIdProductos(true);
        }
        if (!nombre.match("^[A-Za-z0-9., ]+$") || nombre.length > 45){
            error = true;
            setErrNombre(true);
        }
        if (parseFloat(precioVenta) < 0 || !String(precioVenta).match("^[0-9.]+$")){
            error = true;
            setErrPrecioVenta(true);
        }
        if (parseFloat(precioCompra) < 0 || !String(precioCompra).match("^[0-9.]+$")){
            error = true;
            setErrPrecioCompra(true);
        }
        if (parseInt(cantidad) < 0 || !String(cantidad).match("^[0-9.]+$")){
            error = true;
            setErrCantidad(true);
        }
        if (parseInt(rCategoria) < 1){
            error = true;
            setErrRCategoria(true);
        }
        if (parseInt(rProveedor) < 1){
            error = true;
            setErrRProveedor(true);
        }
        if (descripcion.length > 0 )
            if (!descripcion.match("^[A-Za-z0-9., ]+$") || descripcion >60){
                error = true;
                setErrDescripcion(true);
            }
        if (error){
            setBarMensaje("Corregir campos");
            setOpenbar(true);
            setSuccesbar(false);
        }

        return error;
    }

    const handleActualizar = () => {

        if (validar_parametros())
            return;

        let data;
        if (caducidad.length > 0)
            data = {
                "IdProductos" : idProductos,
                "Nombre" : nombre,
                "PrecioVenta" : parseFloat(precioVenta),
                "PrecioCompra" : parseFloat(precioCompra),
                "Cantidad" : parseInt(cantidad),
                "Caducidad" : caducidad+"T00:00:00",
                "Descripcion" : descripcion,
                "RCategoria" : parseInt(rCategoria),
                "RProveedor" : parseInt(rProveedor)
            }
        else
            data = {
                "IdProductos" : idProductos,
                "Nombre" : nombre,
                "PrecioVenta" : parseFloat(precioVenta),
                "PrecioCompra" : parseFloat(precioCompra),
                "Cantidad" : parseInt(cantidad),
                "Descripcion" : descripcion,
                "RCategoria" : parseInt(rCategoria),
                "RProveedor" : parseInt(rProveedor)
            }
        
        axios.put ('http://localhost:50563/api/Productos/'+idProductos,
            JSON.stringify(data)
            ,{
            headers: {
				'Accept': 'application/json',
				'Content-type': 'application/json',
				'Authorization': 'Bearer ' + Token
			}
        }).then (
			(response) => {
                console.log(response);
				if (response.data.status === "Success") {
                    
                    setBarMensaje("Producto actualizado");
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
        if (succesbar)
            setRedi(true);
        if (reason === 'clickaway') {
          return;
        }
    
        setOpenbar(false);
    };

    if (proveedor == null || categoria == null) {
        return(
            <React.Fragment>
                <div className = {classes.buttonContainer}>
                    <Alert severity="error">Error al conectar con el servidor.</Alert>
                </div>
            </React.Fragment>
        );
    }else{

        const opcProveedor = proveedor.map((elem) => 
            <MenuItem key={elem.idProveedores} value={elem.idProveedores}>{elem.proveedorNombre}</MenuItem>
        );

        const opcCategorias = categoria.map((elem) => 
            <MenuItem key={elem.idCategorias} value={elem.idCategorias}>{elem.nombre}</MenuItem>
        );
        
        return(
            <React.Fragment>
                <form>
                    <TextField
                        error = {erridProductos}
                        id="IdProducto"
                        label="Clave del producto"
                        style={{ margin: 8 }}
                        fullWidth
                        
                        margin="normal"
                        required = {true}
                        variant="outlined"
                        disabled = {true}
                        placeholder ="Ingrese el codigo"
                        value = {idProductos}
                        
                    />
                    <TextField
                        error = {errnombre}
                        id="Producto_Nombre"
                        label="Nombre"
                        style={{ margin: 8 }}
                        fullWidth
                        margin="normal"
                        required = {true}
                        variant="outlined"
                        placeholder ="Nombre del producto"
                        value = {nombre}
                        onChange = {event => setNombre(event.target.value)}
                        
                    />
                    <TextField
                        error = {errprecioVenta}
                        id="Producto_PVenta"
                        label="Precio de venta"
                        style={{ margin: 8 }}
                        fullWidth
                        margin="normal"
                        required = {true}
                        variant="outlined"
                        value = {precioVenta}
                        onChange = {event => setPrecioVenta(event.target.value)}
                        InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <AttachMoney />
                              </InputAdornment>
                            ),
                          }}
                    />
                    <TextField
                        error = {errprecioCompra}
                        id="Producto_PCompra"
                        label="Precio de compra"
                        style={{ margin: 8 }}
                        fullWidth
                        margin="normal"
                        required = {true}
                        variant="outlined"                        
                        value = {precioCompra}
                        onChange = {event => setPrecioCompra(event.target.value)}
                        InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <AttachMoney />
                              </InputAdornment>
                            ),
                          }}
                    />
                    <TextField
                        error = {errcantidad}
                        id="Producto_Canidad"
                        label="Cantidad en inventario"
                        style={{ margin: 8 }}
                        fullWidth
                        margin="normal"
                        required = {true}
                        variant="outlined"
                        type="number"
                        value = {cantidad}
                        onChange = {event => setCantidad(event.target.value)}
                    />
                    <TextField  
                        required = {true}
                        id="Producto_Caducidad"
                        label="Caducidad más proxima"
                        style={{ margin: 8 }}
                        fullWidth
                        value = {caducidad}
                        onChange = {event => setCaducidad(event.target.value)}
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
                    <FormControl
                        error = {erRCategoria}
                        required = {true}
                        variant="outlined" fullWidth={true} className={classes.formControl} >
                        <InputLabel className={classes.label} id="demo-simple-select-label">Categoria</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value = {rCategoria}
                            onChange={event => setRCategoria(event.target.value)}
                        >
                            {opcCategorias}
                        </Select>
                    </FormControl>

                    <FormControl 
                        error = {errRProveedor}
                        required = {true}
                        variant="outlined" fullWidth={true} className={classes.formControl} >
                        <InputLabel className={classes.label} id="demo-simple-select-label">Proveedor</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value = {rProveedor}
                            onChange={event => setRProveedor(event.target.value)}
                        >
                            {opcProveedor}
                        </Select>
                    </FormControl>
                    <TextField
                        error = {errdescripcion}
                        id="Producto_Descripcion"
                        label="Descripcion"
                        style={{ margin: 8 }}
                        fullWidth
                        value = {descripcion}
                        onChange = {event => setDescripcion(event.target.value)}
                        margin="normal"
                        variant="outlined"
                        placeholder = "Detalles del producto"
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
                        onClick = {handleActualizar}
                    >
                        Actualizar
                    </Button>
                    <Snackbar open={openbar} autoHideDuration={4000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity= {succesbar ? "success" :"error"}>
                            {barMensaje}
                        </Alert>
                    </Snackbar>
                    {redi? <Redirect to="/Inventario" />:null}
                    <Link to={"/Inventario"} className = {classes.enlace} >
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