import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import{ 
  Grid, 
  Paper,
  Typography,
  }from '@material-ui/core';
import {
  Link,
    } from 'react-router-dom'; 
import IcoEstetica from '../Imgs/estetica-icono.svg';
import IcoConsulta from '../Imgs/consulta-icono.svg';
import IcoOperacion from '../Imgs/operacion-icono.svg';
import IcoOtros from '../Imgs/otros-icono.svg';
import IcoVacuna from '../Imgs/vacuna-icono.svg';


const useStyles = makeStyles((theme) => ({
  enlace:{
    textDecoration: "none",
  },
  paper: {
    width: "95%",
    marginBottom: theme.spacing(1),
    padding: theme.spacing(1),
    backgroundColor: "rgb(240, 240, 240)",
  },
  icono: {
    width: theme.spacing(7),
  },
}));

export default function CardCita(props) {
    const classes = useStyles();
    
    const [fecha, setFecha] = useState(new Date());

    useEffect(() => {
        setFecha(new Date(props.fecha));
    }, [props.fecha]);

    if (props.tipo === "Estetica")
        return (
            <React.Fragment>
              <Link to={"/Citas/Editar/"+props.id} className = {classes.enlace} >
                <Paper className={classes.paper}   >
                  <Grid container spacing={3} alignItems="center">
                    <Grid item xs={3}>
                      <img alt="Icono-Veterinaria" src={IcoEstetica} className={classes.icono}/>
                    </Grid>
                    <Grid item xs={9}>
                      <Typography>{fecha.toLocaleDateString("es-MX", {dateStyle: "long"})} {fecha.getHours()}:{fecha.getMinutes()} Hrs</Typography>
                      <Typography variant="body2">Mascota: {props.mascota} <br/> Cliente: {props.cliente}</Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Link>
            </React.Fragment>
        );
    else if (props.tipo === "Consulta")
        return (
            <React.Fragment>
                <Link to={"/Citas/Editar/"+props.id} className = {classes.enlace} >
                    <Paper className={classes.paper}   >
                    <Grid container spacing={3} alignItems="center">
                        <Grid item xs={3}>
                        <img alt="Icono-Veterinaria" src={IcoConsulta} className={classes.icono}/>
                        </Grid>
                        <Grid item xs={9}>
                        <Typography>{fecha.toLocaleDateString("es-MX", {dateStyle: "long"})} {fecha.getHours()}:{fecha.getMinutes()} Hrs</Typography>
                        <Typography variant="body2">Mascota: {props.mascota} <br/> Cliente: {props.cliente}</Typography>
                        </Grid>
                    </Grid>
                    </Paper>
                </Link>
            </React.Fragment>
        );
    else if (props.tipo === "Operacion")
        return (
            <React.Fragment>
                <Link to={"/Citas/Editar/"+props.id} className = {classes.enlace} >
                    <Paper className={classes.paper}   >
                    <Grid container spacing={3} alignItems="center">
                        <Grid item xs={3}>
                        <img alt="Icono-Veterinaria" src={IcoOperacion} className={classes.icono}/>
                        </Grid>
                        <Grid item xs={9}>
                        <Typography>{fecha.toLocaleDateString("es-MX", {dateStyle: "long"})} {fecha.getHours()}:{fecha.getMinutes()} Hrs</Typography>
                        <Typography variant="body2">Mascota: {props.mascota} <br/> Cliente: {props.cliente}</Typography>
                        </Grid>
                    </Grid>
                    </Paper>
                </Link>
            </React.Fragment>
        );
    else if (props.tipo === "Vacunacion")
        return (
            <React.Fragment>
                <Link to={"/Citas/Editar/"+props.id} className = {classes.enlace} >
                    <Paper className={classes.paper}   >
                    <Grid container spacing={3} alignItems="center">
                        <Grid item xs={3}>
                        <img alt="Icono-Veterinaria" src={IcoVacuna} className={classes.icono}/>
                        </Grid>
                        <Grid item xs={9}>
                        <Typography>{fecha.toLocaleDateString("es-MX", {dateStyle: "long"})} {fecha.getHours()}:{fecha.getMinutes()} Hrs</Typography>
                        <Typography variant="body2">Mascota: {props.mascota} <br/> Cliente: {props.cliente}</Typography>
                        </Grid>
                    </Grid>
                    </Paper>
                </Link>
            </React.Fragment>
        );
    else if (props.tipo === "Otro")
        return (
            <React.Fragment>
                <Link to={"/Citas/Editar/"+props.id} className = {classes.enlace} >
                    <Paper className={classes.paper}   >
                    <Grid container spacing={3} alignItems="center">
                        <Grid item xs={3}>
                        <img alt="Icono-Veterinaria" src={IcoOtros} className={classes.icono}/>
                        </Grid>
                        <Grid item xs={9}>
                        <Typography>{fecha.toLocaleDateString("es-MX", {dateStyle: "long"})} {fecha.getHours()}:{fecha.getMinutes()} Hrs</Typography>
                        <Typography variant="body2">Mascota: {props.mascota} <br/> Cliente: {props.cliente}</Typography>
                        </Grid>
                    </Grid>
                    </Paper>
                </Link>
            </React.Fragment>
        );
}

