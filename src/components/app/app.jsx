import React, { Component } from 'react';
import Header from '../header/header';
import Main from '../main/main';

import {Switch, Route} from 'react-router-dom'

import styles from './app.css';



class App extends Component {
    render() {
        return (
            <div className="container-fluid bg-light    ">
                <Header/>
                <div className="continer-fluid pl-2"><h5>CURRENT loc</h5></div>
                <Main/>
                {/*
                <Switch>
                    <Route exact path='/kontaktai' component={Contacts}/>
                    <Route exact path='/products' component={Products}/>
                    <Route exact path='/news' component={News}/>
                </Switch>
                */}

            </div>
        );
    }
}

export default App;