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
    Cancel,
    CalendarToday,
    Info,
    AttachMoney
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

export default function EditarInventario(props) {

    const classes = useStyles();
    const [idProductos] = useState(props.match.params.id);
    const Token = localStorage.getItem('ACCESS_TOKEN');

    const [nombre, setNombre] = useState("");
    const [precioVenta, setPrecioVenta] = useState(0.0);
    const [precioCompra, setPrecioCompra] = useState(0.0);
    const [cantidad, setCantidad] = useState(0);
    const [caducidad ,setCaducidad] = useState(new Date());
    const [descripcion, setDescripcion] = useState("");
    const [rCategoria, setRCategoria] = useState(1);
    const [rProveedor, setRProveedor] = useState(1);

    const [categoria, setCategoria] = useState(null);
    const [proveedor, setProveedor] = useState(null);

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

    const handleActualizar = () => {
        
        axios.put ('http://localhost:50563/api/Productos/'+idProductos,
		{
            "Nombre" : nombre,
            "PrecioVenta" : parseFloat(precioVenta),
            "PrecioCompra" : parseFloat(precioCompra),
            "Cantidad" : parseInt(cantidad),
            "Caducidad" : caducidad+"T00:00:00",
            "Descripcion" : descripcion,
            "RCategoria" : parseInt(rCategoria),
            "RProveedor" : parseInt(rProveedor)
		},{
            headers: {
				'Accept': 'application/json',
				'Content-type': 'application/json',
				'Authorization': 'Bearer ' + Token
			}
        }).then (
			(response) => {
                console.log(response);
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

    const handleClose = (event, reason) => {
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
                    <FormControl variant="outlined" fullWidth={true} className={classes.formControl} >
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

                    <FormControl variant="outlined" fullWidth={true} className={classes.formControl} >
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
                            {succesbar ? "Actualizado con exito": "Error al actualizar"}
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