import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import{ 
    Grid, 
    Paper,
    Typography
    }from '@material-ui/core';
import Agenda from './Agenda';
import IcoProducto from '../Imgs/producto-icono.png';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  paper:{
    width: 160,
    height: 160,
    padding: theme.spacing(2),
  },
  img:{
    width: 70,
    height: 70,
  },
  agenda: {
    width: "100%",
    height: "auto",
    padding: theme.spacing(1),
  },
  imgText: {
    marginTop: theme.spacing(3),
  },

}));

export default function Inicio() {
  const classes = useStyles();

  return (
    <Grid container className={classes.root} spacing={2}>
        <Grid item container xs={8} justify="space-around" spacing={3} >
            <Grid item >
                <Paper className={classes.paper} style={{backgroundColor: "rgb(108, 218, 146)"}} >
                    <Typography align="center" variant="h5">Productos</Typography>
                    <Grid item container spacing={2}  className={classes.imgText} alignItems="center">
                        <Grid item >
                            <img className={classes.img} src={IcoProducto} alt ="Icono Productos" />
                        </Grid>
                        <Grid item >
                            <Typography > $1,000.0</Typography>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
            <Grid item >
                <Paper className={classes.paper} style={{backgroundColor: "#6c6ee6"}} >
                    <Typography align="center" variant="h5">Productos</Typography>
                    <Grid item container spacing={2}  className={classes.imgText} alignItems="center">
                        <Grid item >
                            <img className={classes.img} src={IcoProducto} alt ="Icono Productos" />
                        </Grid>
                        <Grid item >
                            <Typography > $1,000.0</Typography>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
            <Grid item >
                <Paper className={classes.paper} style={{backgroundColor: "rgb(108, 230, 219)"}} >
                    <Typography align="center" variant="h5">Productos</Typography>
                    <Grid item container spacing={2}  className={classes.imgText} alignItems="center">
                        <Grid item >
                            <img className={classes.img} src={IcoProducto} alt ="Icono Productos" />
                        </Grid>
                        <Grid item >
                            <Typography > $1,000.0</Typography>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
            <Grid item >
                <Paper className={classes.paper} style={{backgroundColor: "rgb(230, 108, 125)"}} >
                    <Typography align="center" variant="h5">Productos</Typography>
                    <Grid item container spacing={2}  className={classes.imgText} alignItems="center">
                        <Grid item >
                            <img className={classes.img} src={IcoProducto} alt ="Icono Productos" />
                        </Grid>
                        <Grid item >
                            <Typography > $1,000.0</Typography>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
            <Grid item >
                <Paper className={classes.paper} style={{backgroundColor: "rgb(175, 230, 108)"}} >
                    <Typography align="center" variant="h5">Productos</Typography>
                    <Grid item container spacing={2}  className={classes.imgText} alignItems="center">
                        <Grid item >
                            <img className={classes.img} src={IcoProducto} alt ="Icono Productos" />
                        </Grid>
                        <Grid item >
                            <Typography > $1,000.0</Typography>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
            <Grid item >
                <Paper className={classes.paper} style={{backgroundColor: "rgb(180, 108, 230)"}} >
                    <Typography align="center" variant="h5">Productos</Typography>
                    <Grid item container spacing={2}  className={classes.imgText} alignItems="center">
                        <Grid item >
                            <img className={classes.img} src={IcoProducto} alt ="Icono Productos" />
                        </Grid>
                        <Grid item >
                            <Typography > $1,000.0</Typography>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
        <Grid item container xs={4}>
            <Grid container>
                <Agenda/>
            </Grid>
        </Grid>

    </Grid>
  );
}