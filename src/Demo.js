import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SimpleTabs from './AppBar';
import NavBar from './NavBar';
import MenuDrawer from './MenuDrawer';
import {ThemeProvider} from '@material-ui/core/styles'
import theme from './Tema'
import { Box } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        backgroundColor: "#eeeeee"
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
        height: "1800px",
        backgroundColor: "#fff",
        marginBottom: "1rem",
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
        <ThemeProvider theme={theme}>
        <NavBar handleDrawer = {handleDrawer}/>
        <MenuDrawer
            open={open}/>
        <main style={{ width: '100%' }} >
            <div className={classes.toolbar} />
            <Box 
                className={classes.content}
                mx="auto" 
                mt="1rem"
            >
                <SimpleTabs/>
            </Box>
        </main>
        </ThemeProvider>
    </div>
  );
}
