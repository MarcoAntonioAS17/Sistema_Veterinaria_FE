import React from 'react';
import PropTypes from 'prop-types';

import {
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
    }from '@material-ui/core';


    

export default function TableHeadAll(props) {
    const { classes, order, orderBy, onRequestSort, headCells } = props;
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
                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
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

TableHeadAll.propTypes = {
    classes: PropTypes.object.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
    headCells : PropTypes.array.isRequired,
};