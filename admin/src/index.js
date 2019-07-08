import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './index.css';
import * as serviceWorker from './serviceWorker';

import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import EditRoom from "./Pages/EditRoom";
import SnackbarProvider from "./Components/SnackbarProvider";


ReactDOM.render((
    <SnackbarProvider>
        <Router>
            <Navbar />
            <Route path="/" exact component={Home} />
            <Route path="/edit/:id" component={EditRoom} />
        </Router>
    </SnackbarProvider>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
