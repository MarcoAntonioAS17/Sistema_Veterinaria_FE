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
import TablaCarrito from '../Componentes_Genericos/Tabla_Carrito';


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

function createData(codigo_producto, nombre_producto, cantidad, precio) {
    return { codigo_producto, nombre_producto, cantidad, precio};
}
  
var date = new Date();

export default function FormCompras() {

    const classes = useStyles();
    const Token = localStorage.getItem('ACCESS_TOKEN');

    const [fecha, setFecha] = useState(date.toISOString().slice(0,10));
    const [hora, setHora] = useState(date.toString().slice(16,21));
    const [rProveedor, setRProveedor] = useState(1);
    const [proveedores, setProveedores] = useState(null);
    const [codigo_pro, setCodigo_pro] = useState("");
    const [productos, setProductos] = useState(null);
    const [product_selec, setProduc_selec] = useState([]);
    const [cantidad, setCantidad] = useState(0);
    const [prov_active, setProv_active] = useState(true);    
    
    const [errcantidad, setErrCantidad] = useState(false);

    const [openbar, setOpenbar] = useState(false);
    const [succesbar, setSuccesbar] = useState(false);
    const [mensaje, setMensaje] = useState(" ");

    const [rows] = useState([]);

    const handleGuardarClick = () => {

        var carrito = [];
        rows.forEach(function (item){
            
            carrito.push({
                "cantidad": parseInt(item.cantidad),
                "rProducto" : item.codigo_producto,
            });
            
        });
        
        if (carrito.length < 1) {
            setMensaje("¡Carrito vacío!");
            setOpenbar(true);
            setSuccesbar(false);
            return;
        }

        axios.post ('http://localhost:50563/api/Compras',
		{
			"rProveedor" : rProveedor,
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
                    setMensaje("Venta completada");
                    setOpenbar(true);
                    setSuccesbar(true);
                    setProv_active(true);
                    rows.splice(0,rows.length);
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
        setProv_active(true);

        setMensaje("Compra cancelada");
        setOpenbar(true);
        setSuccesbar(true);
        rows.splice(0,rows.length);
    }

    useEffect(() =>{

        const ac = new AbortController();
        Promise.all([
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
            .then (response => {
                if (response.status === 200) {
                    var res = response.data;
                    setProveedores(res);
                    
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

    const handleProveedorChange = (event) =>{
        
        setRProveedor(event.target.value)
        setProduc_selec([]);
        var productos_select = [];
        productos.forEach(function (item){
            if (item.rProveedor === event.target.value)
                productos_select.push(item);
        });
        if (productos_select.length > 0)
            setProduc_selec(productos_select);

    };

    if (proveedores == null || productos == null) {
        return(
            <React.Fragment>
                <div className = {classes.buttonContainer}>
                    <Alert severity="error">Error al conectar con el servidor.</Alert>
                </div>
            </React.Fragment>
        );
    }else{
        
        const handleAgregarProducto = () => {

            setErrCantidad(false);

            if (cantidad < 1){
                setErrCantidad(true);
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
            
            rows.push(createData(productos[codigo_pro].idProductos, productos[codigo_pro].nombre, cantidad, productos[codigo_pro].precioCompra));
            setProv_active(false);
            setMensaje("Producto agregado");
            setOpenbar(true);
            setSuccesbar(true);
            
        }

        const handleEliminarItem = (index) => {
            
            rows.splice(index,1);
            if (rows.length < 1)
                setProv_active(true);
            setMensaje("Producto/Servicio eliminado del carrito");
            setOpenbar(true);
            setSuccesbar(true);
        }

        const opcProveedores = proveedores.map((elem) => 
            <MenuItem key={elem.idProveedores} value={elem.idProveedores}>{elem.proveedorNombre}</MenuItem>
        );
        
        const menuProductos = product_selec.map((elem, index) =>
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
                        <InputLabel className={classes.label} id="demo-simple-select-label" >Proveedor</InputLabel>
                        <Select
                            disabled={!prov_active}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value = {rProveedor}
                            onChange={handleProveedorChange}
                        >
                            {opcProveedores}
                        </Select>
                    </FormControl>

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
                            error = {errcantidad}
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
                    { rows.length > 0? (
                        <div><Typography variant="h4" align="center">Carrito</Typography>
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