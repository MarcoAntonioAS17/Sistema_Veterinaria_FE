import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});



export default function TablaCarrito(props) {
  const classes = useStyles();
  const [rows] = React.useState(props.datos);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Código</TableCell>
            <TableCell align="right">Nombre</TableCell>
            <TableCell align="right">Cantidad</TableCell>
            <TableCell align="right">Precio Unitario</TableCell>
            <TableCell align="right">Precio Total</TableCell>
            <TableCell ></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {row.codigo_producto}
              </TableCell>
              <TableCell align="right">{row.nombre_producto}</TableCell>
              <TableCell align="right">{row.cantidad}</TableCell>
              <TableCell align="right">{row.precio}</TableCell>
              <TableCell align="right">{row.cantidad * row.precio}</TableCell>
              <TableCell>
                <IconButton color="secondary" edge="end" onClick={() => props.eliminar(index)}>
                        <Delete />
                    </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}