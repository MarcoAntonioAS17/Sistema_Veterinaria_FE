import React, {useEffect} from 'react';
import clsx from 'clsx';
import Alert from '@material-ui/lab/Alert';
import { 
    lighten, 
    makeStyles 
    } from '@material-ui/core/styles';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TablePagination,
    TableRow,
    Toolbar,
    Paper,
    IconButton,
    Tooltip,
    CircularProgress,
    Snackbar,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button
    }from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import{ 
    FilterList,
    Delete,
    Edit
    } from '@material-ui/icons';
import axios from 'axios';
import MuiAlert from '@material-ui/lab/Alert';
import TableHeadAll from '../Componentes_Genericos/TableHeadAll';
import {Link} from 'react-router-dom'


function Alerta(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
} 

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = () => {
  const classes = useToolbarStyles();

  return (
    <Toolbar
      className={clsx(classes.root)}
    >
        <Typography className={classes.title} variant="h3" id="tableTitle" component="div">
            Inventario
        </Typography>
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterList />
          </IconButton>
        </Tooltip>
    </Toolbar>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  progress : {
    display: 'flex',
    justifyContent: 'center',
  },
}));

const headCells = [
    { id: 'idProductos', numeric: true, label: 'Clave' },
    { id: 'nombre', numeric: false,  label: 'Nombre' },
    { id: 'precioVenta', numeric: true,  label: 'Precio Venta' },
    { id: 'precioCompra', numeric: true, label: 'Precio Compra' },
    { id: 'cantidad', numeric: true,  label: 'Cantidad' },
    { id: 'caducidad', numeric: false,  label: 'Caducidad' },
    { id: 'rCategoriaNombre', numeric: false,  label: 'Categoria' },
    { id: 'rProveedorNombre', numeric: false,  label: 'Proveedor' },
    { id: 'descripcion', numeric: false,  label: 'Descripción' },
];

export default function TablaInventario(props) {

    const classes = useStyles();
    const Token = localStorage.getItem('ACCESS_TOKEN');
    const Nivel = localStorage.getItem('NIVEL');
    
    const [rows, setRows] = React.useState({});
    const [error, setError] = React.useState(null);
    const [isFectched, setisFectched] = React.useState(false);

    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('idProductos');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const [openbar, setOpenbar] = React.useState(false);
    const [succesbar, setSuccesbar] = React.useState(false);
    const [openDialog, setOpenDialog] = React.useState(false);
    
    const [item, setItem] = React.useState(null);

    function delete_item(item) {
        handleDialogOpen();
        axios.delete ("http://localhost:50563/api/Productos/" + item.idProductos,{
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer ' + Token
                }
            })
            .then(response => {
                if (response.data.status === "Success") {
                  
                    //Borramos del cache
                    var tempRows = rows;
                    var index2 = tempRows.indexOf(item);
                    tempRows.splice(index2,1);
                    setRows(tempRows);
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
        })
      
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpenbar(false);
    };

    function handleDialogOpen(elem){
        setItem(elem);
        setOpenDialog(!openDialog);
    };


    useEffect(() =>{

        const ac = new AbortController();
        Promise.all([
            fetch("http://localhost:50563/api/Productos",{
                signal: ac.signal,
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer ' + Token
                }
            })
            .then(res => res.json())
            .then(
                (result) => {
                    setRows(result);
                    setisFectched(true);
                    setError(null);
                },
                (error) => {
                    setError(error);
                    console.log(error);
                    setRows(null);
                    setisFectched(true);
                }
            )
        ]);
            return () => ac.abort();
    },[Token]);

    
    if (error) {
        return(
            <React.Fragment>
                <div className = {classes.progress}>
                    <Alert severity="error">Error al conectar con el servidor.</Alert>
                </div>
            </React.Fragment>
        );
    } else { if (!isFectched) {
        return(
            <React.Fragment>
                <div className = {classes.progress}>
                    <CircularProgress color="secondary" />
                </div>
            </React.Fragment>
        );
    }else {
        
        return (
            <React.Fragment>
                <div className={classes.root}>
                    <Paper className={classes.paper}>
                        <EnhancedTableToolbar  />
                        <TableContainer>
                            <Table
                                className={classes.table}
                                aria-labelledby="tableTitle"
                                size='small'
                                aria-label="enhanced table"
                            >
                                <TableHeadAll
                                    classes={classes}              
                                    order={order}
                                    orderBy={orderBy}
                                    onRequestSort={handleRequestSort}
                                    rowCount={rows.length}
                                    headCells={headCells}
                                />
                                <TableBody>
                                    {stableSort(rows, getComparator(order, orderBy))
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row, index) => {
                                        const labelId = {index};

                                        return (
                                            <TableRow
                                                hover
                                                tabIndex={-1}
                                                key={row.idProductos}
                                            >
                                                <TableCell component="th" id={labelId} scope="row">
                                                    {row.idProductos}
                                                </TableCell>
                                                <TableCell >{row.nombre}</TableCell>
                                                <TableCell >{row.precioVenta}</TableCell>
                                                <TableCell >{row.precioCompra}</TableCell>
                                                <TableCell >{row.cantidad}</TableCell>
                                                <TableCell >{row.caducidad}</TableCell>
                                                <TableCell >{row.rCategoriaNombre}</TableCell>
                                                <TableCell >{row.rProveedorNombre}</TableCell>
                                                <TableCell >{row.descripcion}</TableCell>
                                                <TableCell >
                                                    {Nivel < 2? (
                                                        <IconButton color="secondary" edge="end" onClick={() => handleDialogOpen(row)}>
                                                            <Delete />
                                                        </IconButton>
                                                    ):null}
                                                    
                                                    <Link to={"/Inventario/Editar/"+row.idProductos} >
                                                        <IconButton color="primary" edge="end">
                                                            <Edit />
                                                        </IconButton>
                                                    </Link>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Dialog
                            fullWidth={true}
                            maxWidth = "sm"
                            open={openDialog}
                            onClose={handleDialogOpen}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">Confirmación</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    ¿Eliminar productos {item !=null? item.nombre+" Código "+item.idProductos: ""}?
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleDialogOpen} color="primary" autoFocus>
                                    Cancelar
                                </Button>
                                <Button onClick={() => delete_item(item)} color="secondary" >
                                    Eliminar
                                </Button>
                            </DialogActions>
                        </Dialog>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                    </Paper>
                    <Snackbar open={openbar} autoHideDuration={6000} onClose={handleClose}>
                        <Alerta onClose={handleClose} severity= {succesbar ? "success" :"error"}>
                            {succesbar ? "Eliminado con exito": "Error al eliminar"}
                        </Alerta>
                    </Snackbar>
                </div>
            </React.Fragment>
        );
    }}
  
    
}
