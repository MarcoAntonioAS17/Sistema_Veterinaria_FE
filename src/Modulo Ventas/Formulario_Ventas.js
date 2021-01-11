import React, { useState, useEffect } from 'react'
import axios from 'axios';
import {
    Button,
    makeStyles,
    TextField,
    Snackbar,
    FormControl,
    Select,
    MenuItem,
    InputLabel,
    Typography
    } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert';
import InputAdornment from '@material-ui/core/InputAdornment';
import{
    Save,
    Cancel,
    CalendarToday,
    AccessTime,
    AddShoppingCart
} from '@material-ui/icons';
import TablaCarrito from './Tabla_Carrito';


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
    },
    input50: {
        width: "50%",
    },
    input33: {
        margin: theme.spacing(1),
        width: "33%",
    },
}));

function createData(codigo_producto, nombre_producto, cantidad, precio, indexPro) {
    return { codigo_producto, nombre_producto, cantidad, precio, indexPro};
}
  
var date = new Date();

export default function FormVentas() {

    const classes = useStyles();
    const [fecha, setFecha] = useState(date.toISOString().slice(0,10));
    const [hora, setHora] = useState(date.getHours() + ':' + date.getMinutes());
    const [rCliente, setRCliente] = useState(1);
    const [clientes, setClientes] = React.useState(null);
    const [opcion, setOpcion] = useState(1);
    const [codigo_pro, setCodigo_pro] = useState("");
    const [productos, setProductos] = useState(null);
    const [cantidad, setCantidad] = useState(0);
    const [tipoServicio, setTipoServicio] = useState("Estetica");
    const [precioServicio, setPrecioServicio] = useState(0);
    

    const [opcProductos, setOpcProductos] = useState(true);

    const [openbar, setOpenbar] = React.useState(false);
    const [succesbar, setSuccesbar] = React.useState(false);
    const [mensaje, setMensaje] = useState(" ");

    const [rows] = useState([]);

    const handleGuardarClick = () => {
        
        
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        
        setOpenbar(false);
    };

    const handleCancel = () =>{
        setFecha(new Date());
        
    }

    function handleOpcionChange (value) {
        setOpcion(value);
        if (value < 2)
            setOpcProductos(true);
        else
            setOpcProductos(false);
        console.log(opcProductos);
    }

    useEffect(() =>{

        const ac = new AbortController();
        Promise.all([
            axios.get("http://localhost:50563/api/Clientes",{
            signal: ac.signal,
            method: 'GET',
            mode: 'cors'
            })
            .then (response => {
                if (response.status === 200) {
                    var res = response.data;
                    setClientes(res);
                    setRCliente(res[0].idClientes)
                    
                    axios.get("http://localhost:50563/api/Productos",{
                    signal: ac.signal,
                    method: 'GET',
                    mode: 'cors'
                    })
                    .then (response2 => {
                        if (response2.status === 200) {
                            var res2 = response2.data;
                            setProductos(res2);
                            console.log(res2);
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
    },[]);

    if (clientes == null || productos == null) {
        return(
            <React.Fragment>
                <div className = {classes.buttonContainer}>
                    <Alert severity="error">Error al conectar con el servidor.</Alert>
                </div>
            </React.Fragment>
        );
    }else{
        
        const handleAgregarProducto = () => {
            
            if (productos[codigo_pro].cantidad >= cantidad){
                productos[codigo_pro].cantidad = productos[codigo_pro].cantidad - cantidad;
                rows.push(createData(productos[codigo_pro].idProductos, productos[codigo_pro].nombre, cantidad, productos[codigo_pro].precioVenta, codigo_pro));
                
                setMensaje("Producto agregado");
                setOpenbar(true);
                setSuccesbar(true);
            }
            else{
                setMensaje("Producto insuficiente");
                setOpenbar(true);
                setSuccesbar(false);
            }
            
        }

        const handleAgregarServicio = () => {
            rows.push(createData("100",tipoServicio, 1,precioServicio,null));
            setMensaje("Servicio agregado");
            setOpenbar(true);
            setSuccesbar(true);
        }

        const handleEliminarItem = (index) => {
            console.log("Index Padre"+rows[index].indexPro);
            if (rows[index].indexPro){
                console.log("Producto");
                productos[rows[index].indexPro].cantidad += parseInt(rows[index].cantidad);
                
            }
            console.log(productos);
            rows.splice(index,1);
            setMensaje("Producto/Servicio eliminado del carrito");
            setOpenbar(true);
            setSuccesbar(true);
        }

        const opcClientes = clientes.map((elem) => 
            <MenuItem key={elem.idClientes} value={elem.idClientes}>{elem.nombre}</MenuItem>
        );
        
        const menuProductos = productos.map((elem, index) =>
            <MenuItem key={elem.idProductos} value={index}>{elem.nombre}</MenuItem>
        );

        return(
            <React.Fragment>
                <form>
                    <div className = {classes.buttonContainer}>
                    <TextField
                        id="Venta_Fecha"
                        label="Fecha"
                        className = {classes.input50}
                        style={{ margin: 8 }}
                        margin="normal"
                        required = {true}
                        variant="outlined"
                        value = {fecha}
                        type = "date"
                        onChange = {event => setFecha(event.target.value)}
                        InputProps={{
                            startAdornment: (
                            <InputAdornment position="start">
                                <CalendarToday />
                            </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        id="Venta_Hora"
                        label="Hora"
                        className = {classes.input50}
                        style={{ margin: 8 }}
                        margin="normal"
                        required = {true}
                        variant="outlined"
                        value = {hora}
                        type = "time"
                        onChange = {event => setHora(event.target.value)}
                        InputProps={{
                            startAdornment: (
                            <InputAdornment position="start">
                                <AccessTime />
                            </InputAdornment>
                            ),
                        }}
                    />
                    </div>

                    <FormControl variant="outlined" fullWidth={true} className={classes.formControl} >
                        <InputLabel className={classes.label} id="demo-simple-select-label">Cliente</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value = {rCliente}
                            onChange={event => setRCliente(event.target.value)}
                        >
                            {opcClientes}
                        </Select>
                    </FormControl>

                    <FormControl variant="outlined" fullWidth={true} className={classes.formControl} >
                        <InputLabel className={classes.label} id="demo-simple-select-label">Opción</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value = {opcion}
                            onChange={event => handleOpcionChange(event.target.value)}
                        >
                            <MenuItem value="1">Producto</MenuItem>
                            <MenuItem value="2">Servicio</MenuItem>
                        </Select>
                    </FormControl>
                    
                    { opcProductos? (
                    <div className = {classes.buttonContainer}  >
                        <FormControl variant="outlined"  className={classes.input33} >
                            <InputLabel className={classes.label} id="demo-simple-select-label">Código del producto</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value = {codigo_pro}
                                onChange={event => setCodigo_pro(event.target.value)}
                            >
                                {menuProductos}
                            </Select>
                        </FormControl>
                                        
                        <TextField
                            id="Producto_Cantidad"
                            label="Cantidad"
                            className={classes.input33}
                            style={{ margin: 8 }}
                            margin="normal"
                            required = {true}
                            type = "number"
                            variant="outlined"
                            value = {cantidad}
                            onChange = {event => setCantidad(event.target.value)}
                        />

                        <Button
                            className={classes.input33}
                            variant="contained"
                            color="primary"
                            onClick = {handleAgregarProducto}
                            startIcon = {<AddShoppingCart/>}
                        >
                            Agregar
                        </Button>
                    </div>
                    ):(
                    <div className = {classes.buttonContainer}>
                        <FormControl variant="outlined"  className={classes.input33} >
                            <InputLabel className={classes.label} id="demo-simple-select-label">Tipo de servicio</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value = {tipoServicio}
                                onChange={event => setTipoServicio(event.target.value)}
                            >
                                <MenuItem value="Estetica">Estética</MenuItem>
                                <MenuItem value="Consulta">Consulta</MenuItem>
                                <MenuItem value="Operacion">Operación</MenuItem>
                            </Select>
                        </FormControl>
                                        
                        <TextField
                            id="Precio_Servicio"
                            label="Precio"
                            className={classes.input33}
                            style={{ margin: 8 }}
                            margin="normal"
                            required = {true}
                            type = "number"
                            variant="outlined"
                            value = {precioServicio}
                            onChange = {event => setPrecioServicio(event.target.value)}
                        />

                        <Button
                            className={classes.input33}
                            variant="contained"
                            color="primary"
                            onClick = {handleAgregarServicio}
                            startIcon = {<AddShoppingCart/>}
                        >
                            Agregar
                        </Button>
                    </div>
                    )}

                    <Typography variant="h4" align="center">Carrito</Typography>
                    <TablaCarrito
                        datos = {rows}
                        eliminar = {handleEliminarItem}
                    />

                    <div className = {classes.buttonContainer}>
                    <Button
                        className = {classes.button}
                        variant="contained"
                        color="primary"
                        startIcon = {<Save/>}
                        onClick = {handleGuardarClick}
                    >
                        Finalizar venta
                    </Button>
                    <Snackbar open={openbar} autoHideDuration={4000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity= {succesbar ? "success" :"error"}>
                            {mensaje}
                        </Alert>
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
    
}