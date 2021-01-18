import React, { Component } from 'react';
import Demo from "./Demo";
import {
	BrowserRouter as Router,
	Switch,
	Route,
    } from 'react-router-dom';
import Login from './Modulo Login/Login';

class App extends Component{
    render(){
        
        return(
            <Router>
                <div>
                    <Switch>
                        <Route path = '/Login'  component={Login}/>
                        <Route path = '/' component={Demo} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App