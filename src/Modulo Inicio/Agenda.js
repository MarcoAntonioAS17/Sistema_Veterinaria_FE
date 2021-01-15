import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import{ 
    Grid, 
    Paper,
    Typography
    }from '@material-ui/core';



const useStyles = makeStyles((theme) => ({
  agenda: {
    width: "100%",
    height: "auto",
    padding: theme.spacing(1),
  }
}));

export default function Agenda() {
  const classes = useStyles();

  return (
    <Paper className={classes.agenda}>
        <Typography variant="h4" align="center">
            Agenda
        </Typography>
    </Paper>
  );
}

