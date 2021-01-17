import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import{
  GridList, 
  Paper,
  Typography,
  IconButton,
  Button, 
  ButtonGroup,
  CircularProgress,
  }from '@material-ui/core'; 
import IcoEstetica from '../Imgs/estetica-icono.svg';
import IcoConsulta from '../Imgs/consulta-icono.svg';
import IcoOperacion from '../Imgs/operacion-icono.svg';
import IcoOtros from '../Imgs/otros-icono.svg';
import IcoVacuna from '../Imgs/vacuna-icono.svg';
import CardCita from './Cita_Card';

function mostrar_datos(data, consulta, estetica, operacion, vacuna, otros, hoy, semana, mes) {
  
  var array = []
  var Now = new Date();

  data.forEach(element => {
    var Fecha = new Date(element.fechaHora);
    var resta = Fecha.getTime() - Now.getTime();
    var dias = resta/ (1000*60*60*24);
    
    var agregar = false;
    if (hoy && dias < 1)
      agregar = true;
    if (semana && dias < 7)
      agregar = true;
    if (mes && dias < 31)
      agregar = true;

    if (agregar){
      if( element.tipo.search("Consulta") >= 0 && consulta)
      {
        array.push(element);
      }
      else
      { if(element.tipo.search("Estetica") >= 0 && estetica)
        {          
          array.push(element);
        }
      else{
        if(element.tipo.search("Operacion") >= 0 && operacion)
        {           
          array.push(element);
        }
      else{
        if(element.tipo.search("Vacunacion") >= 0 && vacuna)
        { 
          array.push(element);
        }
      else{
        if(element.tipo.search("Otro") >= 0 && otros)
        { 
          array.push(element);
        }
      }
      }
      }
      }
    }
    
  });
  return array;
};

const useStyles = makeStyles((theme) => ({
  agenda: {
    width: "100%",
    height: "auto",
    padding: theme.spacing(1),
  },
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
  gridList: {
    width: "98%",
    height: 390,
    padding: theme.spacing(1),  
    display: "block",
  },
  IconButton: {
    backgroundColor: "rgb(164, 239, 225)",
  },
  IconButton2: {
    backgroundColor: "#aaa",
  },
  ButtonIco:{
    width: theme.spacing(5),
  },
  ContOpc: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

export default function Agenda() {
  const classes = useStyles();
  const [estetica, setEstetica ] = useState(true);
  const [consulta, setConsulta ] = useState(true);
  const [operacion, setOperacion ] = useState(true);
  const [otros, setOtros ] = useState(true);
  const [vacuna, setVacuna ] = useState(true);

  const [hoy, setHoy] = useState(true);
  const [semana, setSemana] = useState(false);
  const [mes, setMes] = useState(false);

  const [data, setData] = useState([]);
  const [fectched, setFectched] = useState(false);
  const [error, setError] = useState(false);

  const handleHoyClick = () => {
    setHoy(true);
    setSemana(false);
    setMes(false);
  };

  const handleSemanaClick = () => {
    setHoy(false);
    setSemana(true);
    setMes(false);
  };

  const handleMesClick = () => {
    setHoy(false);
    setSemana(false);
    setMes(true);
  };

  useEffect(() =>{
    const ac = new AbortController();
    Promise.all([
      axios.get("http://localhost:50563/api/Citas/Inicio",{
      signal: ac.signal,
      method: 'GET',
      mode: 'cors'
      })
      .then (response2 => {
        if (response2.status === 200) {
          var res = response2.data;
          setData(res);
          setFectched(true);
          
        }
      })
      .catch (function (error) {
        setError(true);
        console.log(error);
      })
    ]);
        return () => ac.abort();
  },[]);

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
      <Paper className={classes.agenda}>
          <Typography variant="h4" align="center">
              Agenda
          </Typography>
          
          <Typography align="center">Tipo</Typography>
          <div className={classes.ContOpc}>
            <IconButton size="small" aria-label="delete" className={consulta? classes.IconButton: classes.IconButton2} 
              onClick={() => setConsulta(!consulta)}>
              <img className={classes.ButtonIco} alt="Icono-Veterinaria" src={IcoConsulta} />
            </IconButton>
            <IconButton size="small" aria-label="delete" className={estetica? classes.IconButton: classes.IconButton2} 
              onClick={() => setEstetica(!estetica)}>
              <img className={classes.ButtonIco} alt="Icono-Veterinaria" src={IcoEstetica} />
            </IconButton>
            <IconButton size="small" aria-label="delete" className={operacion? classes.IconButton: classes.IconButton2} 
              onClick={() => setOperacion(!operacion)}>
              <img className={classes.ButtonIco} alt="Icono-Veterinaria" src={IcoOperacion} />
            </IconButton>
            <IconButton size="small" aria-label="delete" className={vacuna? classes.IconButton: classes.IconButton2} 
              onClick={() => setVacuna(!vacuna)}>
              <img className={classes.ButtonIco} alt="Icono-Veterinaria" src={IcoVacuna} />
            </IconButton>
            <IconButton size="small" aria-label="delete" className={otros? classes.IconButton: classes.IconButton2} 
              onClick={() => setOtros(!otros)}>
              <img className={classes.ButtonIco} alt="Icono-Veterinaria" src={IcoOtros} />
            </IconButton>
          </div>

          <ButtonGroup  color="primary" fullWidth style={{marginTop: "8px"}}>
            <Button variant={hoy? "contained":"outlined"} onClick={handleHoyClick}>24 Hrs</Button>
            <Button variant={semana? "contained":"outlined"} onClick={handleSemanaClick}> 7 Días</Button>
            <Button variant={mes? "contained":"outlined"} onClick={handleMesClick}>31 Días</Button>
          </ButtonGroup>

          <GridList cellHeight="auto" className={classes.gridList} cols={1} spacing={1}>
            {
              mostrar_datos(data,consulta, estetica, operacion, vacuna, otros, hoy, semana, mes)
              .map((elem) =>{
                return(
                <CardCita
                  key = {elem.idCitas}
                  id = {elem.idCitas}
                  cliente = {elem.nombreCliente}
                  mascota = {elem.nombreMascota}
                  fecha = {elem.fechaHora}
                  tipo = {elem.tipo}
                />
                );
              })
            }
          </GridList>
      </Paper>
    );
  }}
}

