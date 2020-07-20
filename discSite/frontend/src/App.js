import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Discs from "./components/discItems/Discs";
import BagWrapper from "./components/discItems/BagWrapper";
import BagState from "./context/bag/BagState";

import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import './App.css';

const App = () => {
  useEffect(() => {
    // Init Materialize JS
    M.AutoInit();
  });
  return (
    <BagState>
      <Router>
      <div className="App">
        <Navbar title="Disc Bag Dev" />
        <div className="container">
         <BagWrapper />
        </div>
      </div>
      </Router>
    </BagState>
  );
};

export default App;
