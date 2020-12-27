import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Form from './Form_Clientes';
import NavBar from './NavBar';
import MenuDrawer from './MenuDrawer';

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
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

export default function MiniDrawer() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleDrawer = () => {
    setOpen(!open);
  };


  return (
    <div className={classes.root}>
        <NavBar handleDrawer = {handleDrawer}/>
        <MenuDrawer
            open={open}/>
        <main >
            <div className={classes.toolbar} />
            <Form className={classes.content}/>
        </main>
    </div>
  );
}
