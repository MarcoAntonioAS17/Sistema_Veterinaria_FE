import React from 'react';
import PropTypes from 'prop-types';
import {
    AppBar,
    Tabs,
    Tab,
    Typography,
    Box,
    Grid,
    TextField
}from '@material-ui/core'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function SimpleTabs() {
  
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid lg={12}>
      <AppBar position="static">
        <Tabs 
            value={value} 
            onChange={handleChange} 
            aria-label="simple tabs example"
            centered>
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <h1>Hola Mundo</h1>
        <TextField
          id="outlined-full-width"
          label="Label"
          style={{ margin: 8 }}
          placeholder="Placeholder"
          helperText="Full width!"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <h1>Hola React</h1>
      </TabPanel>
      
    </Grid>
  );
}