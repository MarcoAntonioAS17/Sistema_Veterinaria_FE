import React, {useEffect, useState} from 'react';
import Alert from '@material-ui/lab/Alert';
import { 
    makeStyles 
    } from '@material-ui/core/styles';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TablePagination,
    TableRow,
    Paper,
    CircularProgress,
    IconButton
    }from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom'
import TableHeadAll from '../Componentes_Genericos/TableHeadAll';
import { ArrowBack } from '@material-ui/icons';


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
  title: {
    marginLeft: '1em',
    width: "50%",
  },
  titleContainer: {
    display: 'flex',
    justifyContent: 'center',
    },
    link: {
        textDecoration: 'none',
      },
}));

const headCells = [
    { id: 'rProducto', numeric: true, label: 'Código' },
    { id: 'rProductoNombre', numeric: false,  label: 'Producto' },
    { id: 'precio', numeric: false,  label: 'Precio Unit.' },
    { id: 'cantidad', numeric: false, label: 'Cantidad' },
    { id: 'precio_t', numeric: false,  label: 'Total' },
];

export default function TablaDVentas(props) {

    const classes = useStyles();
    const [idVentas] = useState(props.match.params.id);
    const Token = sessionStorage.getItem('ACCESS_TOKEN');
    
    const [usuario, setUsuario] = useState("");
    const [cliente, setCliente] = useState("");
    const [fecha, setFecha] = useState();

    
    const [rows, setRows] = useState({});
    const [error, setError] = useState(null);
    const [isFectched, setisFectched] = useState(false);

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('rProducto');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

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

    useEffect(() =>{

        const ac = new AbortController();
        Promise.all([
            fetch("http://localhost:50563/api/Ventas/"+idVentas,{
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
                    setUsuario(result.rUsuarioNombre);
                    setCliente(result.rClienteNombre);
                    setFecha(result.fechaHora);
                    setRows(result.productos);
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
    },[idVentas, Token]);

    function get_total(productos) {
        var sum = 0.00;
        productos.forEach(element => sum = sum + element.cantidad * element.precio);
        return sum;
    }
    
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
                        <Link to={"../Ventas"} className={classes.link} >
                            <Typography  variant="h3" >
                                
                                    <IconButton color="primary" edge="end">
                                        <ArrowBack />
                                    </IconButton>
                                
                                Detalle de venta
                            </Typography>
                        </Link>
                        <br/>
                        <div className={classes.titleContainer}>
                            <Typography variant="h6" className={classes.title}>
                                Cliente: {cliente}
                            </Typography>
                            <Typography variant="h6" className={classes.title}>
                                Atendió: {usuario}
                            </Typography>
                        </div>
                        <Typography variant="h6" className={classes.title}>
                            Fecha y Hora: {fecha}
                        </Typography>
                        <Typography variant="h6" className={classes.title}>
                            Total: {get_total(rows)}
                        </Typography>
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
                                                key={row.rProducto}
                                            >
                                                <TableCell component="th" id={labelId} scope="row">
                                                    {row.rProducto}
                                                </TableCell>
                                                <TableCell >{row.rProductoNombre}</TableCell>
                                                <TableCell >{row.precio}</TableCell>
                                                <TableCell >{row.cantidad}</TableCell>
                                                <TableCell >$ {row.precio * row.cantidad}</TableCell>
                                                <TableCell/>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
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
                </div>
            </React.Fragment>
        );
    }}
  
    
}
