import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Alert from '@material-ui/lab/Alert';
import{ 
    Grid, 
    Paper,
    Typography,
    CircularProgress,
    }from '@material-ui/core';
import {
    Link,
    Redirect,
    useHistory
        } from 'react-router-dom'; 
import Agenda from './Agenda';
import IcoProducto from '../Imgs/producto-icono.png';
import IcoAgotarse from '../Imgs/agotarse-icono.png';
import IcoCaducar from '../Imgs/caducar-icono.png';
import IcoCita from '../Imgs/cita-icono.png';
import IcoContactos from '../Imgs/Contactos.png';
import IcoVenta from '../Imgs/venta-icono.svg';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  enlace:{
    textDecoration: "none",
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
  ContOpc: {
    display: "flex",
    justifyContent: "center",
  },
}));

export default function Inicio() {
  const classes = useStyles();

  let history = useHistory();
  const Token = localStorage.getItem('ACCESS_TOKEN');
  const [dataInicio, setDataInicio] = useState();
  const [fectched, setFectched] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() =>{
    
    const ac = new AbortController();
    Promise.all([
      axios.get("http://localhost:50563/api/Inicio",{
            signal: ac.signal,
            method: 'GET',
            mode: 'cors',
            headers: {
				'Accept': 'application/json',
				'Content-type': 'application/json',
				'Authorization': 'Bearer ' + Token
			}
        }
      )
      .then (response2 => {
        if (response2.status === 200) {
          var res = response2.data;
          setDataInicio(res);
          setFectched(true);
        }
      })
      .catch (function (error) {
        console.log(error);
        setError(true);
      })
    ]);
        return () => ac.abort();
  },[Token]);

  if(!Token){
    history.push("/Login");
    window.location.reload();
    return(
        <Redirect push to={{
            pathname: "/Login",
            state: { from: history.location }
        }}/>
    );

  }
  if (error) {
    return(
        <React.Fragment>
            <div className = {classes.ContOpc}>
                <Alert severity="error">Error al conectar con el servidor.</Alert>
            </div>
        </React.Fragment>
    );
  } else { if (!fectched) {
      return(
          <React.Fragment>
              <div className = {classes.ContOpc}>
                  <CircularProgress color="secondary" />
              </div>
          </React.Fragment>
      );
  }else {
    return (
        <Grid container className={classes.root} spacing={2}>
            <Grid item container xs={8} justify="space-around" spacing={3} >
                <Grid item >
                <Link to={"/Clientes"} className = {classes.enlace} >
                    <Paper className={classes.paper} style={{backgroundColor: "rgb(108, 218, 146)"}} >
                        <Typography align="center" variant="h5">Contactos</Typography>
                        <Grid item container spacing={2}  className={classes.imgText} alignItems="center">
                            <Grid item >
                                <img className={classes.img} src={IcoContactos} alt ="Icono Clientes" />
                            </Grid>
                            <Grid item >
                                <Typography variant="h5"> {dataInicio.n_Contactos}</Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </Link>
                </Grid>
                <Grid item >
                <Link to={"/Inventario"} className = {classes.enlace} >
                    <Paper className={classes.paper} style={{backgroundColor: "#6c6ee6"}} >
                        <Typography align="center" variant="h5">Productos</Typography>
                        <Grid item container spacing={2}  className={classes.imgText} alignItems="center">
                            <Grid item >
                                <img className={classes.img} src={IcoProducto} alt ="Icono Inventario" />
                            </Grid>
                            <Grid item >
                                <Typography variant="h5"> {dataInicio.n_Productos}</Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </Link>
                </Grid>
                <Grid item >
                <Link to={"/Citas"} className = {classes.enlace} >
                    <Paper className={classes.paper} style={{backgroundColor: "rgb(108, 230, 219)"}} >
                        <Typography align="center" variant="h5">Citas Vigentes</Typography>
                        <Grid item container spacing={2}  className={classes.imgText} alignItems="center">
                            <Grid item >
                                <img className={classes.img} src={IcoCita} alt ="Icono Citas" />
                            </Grid>
                            <Grid item >
                                <Typography variant="h5"> {dataInicio.n_Cita}</Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </Link>
                </Grid>
                <Grid item >
                <Link to={"/Inventario"} className = {classes.enlace} >
                    <Paper className={classes.paper} style={{backgroundColor: "rgb(230, 108, 125)"}} >
                        <Typography align="center" variant="h6">Productos a caducar</Typography>
                        <Grid item container spacing={2}  className={classes.imgText} alignItems="center">
                            <Grid item >
                                <img className={classes.img} src={IcoCaducar} alt ="Icono Productos" />
                            </Grid>
                            <Grid item >
                                <Typography variant="h5"> {dataInicio.n_Prod_Cadu}</Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </Link>
                </Grid>
                <Grid item >
                <Link to={"/Inventario"} className = {classes.enlace} >
                    <Paper className={classes.paper} style={{backgroundColor: "rgb(175, 230, 108)"}} >
                        <Typography align="center" variant="h6">Productos a agotarse</Typography>
                        <Grid item container spacing={2}  className={classes.imgText} alignItems="center">
                            <Grid item >
                                <img className={classes.img} src={IcoAgotarse} alt ="Icono Productos" />
                            </Grid>
                            <Grid item >
                                <Typography variant="h5"> {dataInicio.n_Prod_Ago}</Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </Link>
                </Grid>
                <Grid item >
                <Link to={"/Ventas"} className = {classes.enlace} >
                    <Paper className={classes.paper} style={{backgroundColor: "rgb(180, 108, 230)"}} >
                        <Typography align="center" variant="h6">Ventas de la semana</Typography>
                        <Grid item container spacing={2}  className={classes.imgText} alignItems="center">
                            <Grid item >
                                <img className={classes.img} src={IcoVenta} alt ="Icono Ventas" />
                            </Grid>
                            <Grid item >
                                <Typography > ${new Intl.NumberFormat('en-US').format(dataInicio.ventas_Sem)}</Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </Link>
                </Grid>
            </Grid>
            <Grid item container xs={4}>
                <Grid container>
                    <Agenda/>
                </Grid>
            </Grid>

        </Grid>
    );
  }}
}