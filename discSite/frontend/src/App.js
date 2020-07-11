import React, {Fragment} from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Discs from "./components/discItems/Discs";
import BagState from "./context/bag/BagState"; 

const App = () => {

  return (
    <BagState>
      <Router>
      <div className="App">
        <Navbar title="Disc Bag Dev" />
        <div className="container">
          <Discs />
        </div>
      </div>
      </Router>
    </BagState>
  );
};

export default App;
