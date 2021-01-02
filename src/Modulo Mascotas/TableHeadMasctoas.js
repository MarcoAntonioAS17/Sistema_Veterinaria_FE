import React from 'react';
import PropTypes from 'prop-types';

import {
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
    }from '@material-ui/core';

const headCells = [
    { id: 'idMascotas', numeric: true, label: 'ID' },
    { id: 'nombre', numeric: false,  label: 'Nombre' },
    { id: 'clienteNombre', numeric: false,  label: 'Dueño' },
    { id: 'edad', numeric: false, label: 'Edad' },
    { id: 'tipo', numeric: false,  label: 'Tipo' },
    { id: 'raza', numeric: false,  label: 'Raza' },
    { id: 'descripcion', numeric: false,  label: 'Descripción' },
];
    

export default function EnhancedTableHead(props) {
    const { classes, order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
        <TableRow>
            
            {headCells.map((headCell) => (
            <TableCell
                key={headCell.id}
                sortDirection={orderBy === headCell.id ? order : false}
            >
                <TableSortLabel
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : 'asc'}
                    onClick={createSortHandler(headCell.id)}
                >
                    <h4>{headCell.label}</h4>
                    {orderBy === headCell.id ? (
                        <span className={classes.visuallyHidden}>
                            order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                        </span>
                    ) : null}
                </TableSortLabel>
            </TableCell>
            ))}
                <TableCell/>
        </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};