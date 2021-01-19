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
import Alert from '../Componentes_Genericos/Alerta';
import InputAdornment from '@material-ui/core/InputAdornment';
import{
    Save,
    Cancel,
    CalendarToday,
    AccessTime,
    AddShoppingCart,
    AttachMoney
} from '@material-ui/icons';
import TablaCarrito from '../Componentes_Genericos/Tabla_Carrito';


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
    const Token = sessionStorage.getItem('ACCESS_TOKEN');

    const [fecha, setFecha] = useState(date.toISOString().slice(0,10));
    const [hora, setHora] = useState(date.toString().slice(16,21));
    const [rCliente, setRCliente] = useState(1);
    const [clientes, setClientes] = React.useState(null);
    const [opcion, setOpcion] = useState(1);
    const [codigo_pro, setCodigo_pro] = useState("");
    const [productos, setProductos] = useState(null);
    const [cantidad, setCantidad] = useState(0);
    const [tipoServicio, setTipoServicio] = useState("Estetica");
    const [precioServicio, setPrecioServicio] = useState(0);
    
    const [total, setTotal] = useState(0);
    const [pago, setPago] = useState(0);
    const [cambio, setCambio] = useState(0);

    const [opcProductos, setOpcProductos] = useState(true);

    const [openbar, setOpenbar] = React.useState(false);
    const [succesbar, setSuccesbar] = React.useState(false);
    const [mensaje, setMensaje] = useState(" ");

    const [rows] = useState([]);

    const handleGuardarClick = () => {
        
        if (cambio < 0){
            setMensaje("¡Pago insuficiente!");
            setOpenbar(true);
            setSuccesbar(false);
            return;
        }

        var carrito = [];
        rows.forEach(function (item){
            if (item.indexPro == null){
                carrito.push({
                    "cantidad": parseInt(item.cantidad),
                    "rProducto" : "",
                    "rProductoNombre" : item.nombre_producto,
                    "Precio": parseFloat(item.precio)
                });
            }else{
                carrito.push({
                    "cantidad": parseInt(item.cantidad),
                    "rProducto" : item.codigo_producto,
                    "rProductoNombre" : item.nombre_producto,
                    "Precio": parseFloat(item.precio)
                });
            }
            
        });
        
        if (carrito.length < 1) {
            setMensaje("¡Carrito vacío!");
            setOpenbar(true);
            setSuccesbar(false);
            return;
        }

        axios.post ('http://localhost:50563/api/Ventas',
		{
			"rCliente" : rCliente,
            "fechaHora" : fecha+"T"+hora,
            "rUsuario" : 1000,
            "productos" : carrito
		},{
            headers: {
				'Accept': 'application/json',
				'Content-type': 'application/json',
				'Authorization': 'Bearer ' + Token
			}
        }).then (
			(response) => {
                
				if (response.data.status === "Success") {                    
                    
                    rows.splice(0,rows.length);
                    setTotal(0);
                    setCambio(0);
                    setMensaje("Venta completada");
                    setOpenbar(true);
                    setSuccesbar(true);
				}else{
                    setMensaje("Venta no guardada");
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

        rows.forEach(function (item){
            if (item.indexPro != null){        
                productos[item.indexPro].cantidad += parseInt(item.cantidad);
            }
        });
        setTotal(0)
        setCambio(-1);
        setPago(0);
        rows.splice(0,rows.length);
        setMensaje("Venta cancelada");
        setOpenbar(true);
        setSuccesbar(true);
    }

    function handleOpcionChange (value) {
        setOpcion(value);
        if (value < 2)
            setOpcProductos(true);
        else
            setOpcProductos(false);
    }

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
            .then (response => {
                if (response.status === 200) {
                    var res = response.data;
                    setClientes(res);
                    setRCliente(res[0].idClientes)
                    
                    axios.get("http://localhost:50563/api/Productos",{
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
                            setProductos(res2);
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
    },[Token]);

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
            if (cantidad < 1){
                setMensaje("Asigna una cantidad");
                setOpenbar(true);
                setSuccesbar(false);
                return;
            }
            if (codigo_pro === ""){
                setMensaje("Escoje un producto");
                setOpenbar(true);
                setSuccesbar(false);
                return;
            }
            
            if (productos[codigo_pro].cantidad >= cantidad){
                productos[codigo_pro].cantidad = productos[codigo_pro].cantidad - cantidad;
                rows.push(createData(productos[codigo_pro].idProductos, productos[codigo_pro].nombre, cantidad, productos[codigo_pro].precioVenta, codigo_pro));
                
                
                setTotal(total + parseFloat(productos[codigo_pro].precioVenta) * parseFloat(cantidad))
                setCambio(pago - total);
                
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
            if (precioServicio < 1){
                setMensaje("Asigne una precio");
                setOpenbar(true);
                setSuccesbar(false);
                return;
            }
            rows.push(createData("100",tipoServicio, 1,precioServicio,null));
            setTotal(total + parseFloat(precioServicio))
            setCambio(pago - total);
            
            setMensaje("Servicio agregado");
            setOpenbar(true);
            setSuccesbar(true);
        }

        const handleEliminarItem = (index) => {
            
            if (rows[index].indexPro){
                productos[rows[index].indexPro].cantidad += parseInt(rows[index].cantidad);
            }
            setTotal(total - parseFloat(rows[index].precio)*parseInt(rows[index].cantidad));
            setCambio(pago - total);
            

            rows.splice(index,1);
            setMensaje("Producto/Servicio eliminado del carrito");
            setOpenbar(true);
            setSuccesbar(true);
        }

        const handleCambio = (event) => {
            setPago(event.target.value);
            if (event.target.value === "")
                setCambio(0 - parseFloat(total));
            else
                setCambio(parseFloat(event.target.value) - parseFloat(total));
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
                    { rows.length > 0? (
                        <div><Typography variant="h4" align="center">Carrito</Typography>
                        <TablaCarrito
                            datos = {rows}
                            eliminar = {handleEliminarItem}
                            total = {total}
                        />
                        <div className = {classes.buttonContainer}>
                        <TextField
                            id="Venta_Pago"
                            label="Pago"
                            className = {classes.input50}
                            style={{ margin: 8 }}
                            margin="normal"
                            required = {true}
                            variant="outlined"
                            value = {pago}
                            type = "number"
                            onChange = {handleCambio}
                            InputProps={{
                                startAdornment: (
                                <InputAdornment position="start">
                                    <AttachMoney />
                                </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            id="Venta_Cambio"
                            label="Cambio"
                            className = {classes.input50}
                            style={{ margin: 8 }}
                            margin="normal"
                            variant="outlined"
                            value = {cambio}
                            onChange = {handleCambio}
                            type = "numbre"
                            disabled = {true}
                            InputProps={{
                                startAdornment: (
                                <InputAdornment position="start">
                                    <AttachMoney />
                                </InputAdornment>
                                ),
                            }}
                        />
                        </div>

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
                        </div>
                    ):null}
                    <Snackbar open={openbar} autoHideDuration={4000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity= {succesbar ? "success" :"error"}>
                            {mensaje}
                        </Alert>
                    </Snackbar>
                </form>
                
            </React.Fragment>
        );
    }
    
}