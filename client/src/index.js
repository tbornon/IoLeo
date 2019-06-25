import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './index.css';
import * as serviceWorker from './serviceWorker';

import Navbar from "./Components/Navbar";
//import Home from "./Pages/Home";
import CreateRoom from "./Pages/CreateRoom";
import JoinRoom from "./Pages/JoinRoom";

ReactDOM.render((
    <Router>
        <Navbar />
        <Route path="/create" exact component={CreateRoom} />
        <Route path="/join" exact component={JoinRoom} />
    </Router>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
