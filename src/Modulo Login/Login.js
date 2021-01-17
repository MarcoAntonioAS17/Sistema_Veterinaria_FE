import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import{ 
    Typography,    
    }from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        WebkitBoxShadow: "0px 2px 4px rgba(0,0,0,.5)",
        width: '80%',
        backgroundColor: "#fff",
        marginBottom: "1rem",
    },
}));

export default function Login() {
  const classes = useStyles();

  return (
    <React.Fragment>
        <Typography>Hola mundo del login :D</Typography>
    </React.Fragment>
  );
}
