import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Discs from "./components/discItems/Discs";
import BagWrapper from "./components/discItems/BagWrapper";
import BagState from "./context/bag/BagState";

import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.min.js";
import "./App.css";

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
          <div className="container" style={testStyle}>
            {/* Main Viewing Area */}
            <div style={testMainView}>
              <BagWrapper />
            </div>

            {/* Side Drawer */}
            <div style={tabRow}>
              {/* Side Drawer Header / Bar */}
              <div style={drawerHeader}>
                <nav className="blue">
                  <div className="nav-wrapper" style={{ paddingLeft: "10px" }}>
                    <a href="#" className="brand-logo">
                      Inventory
                    </a>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                      <li>
                        <a href="#">Bag</a>
                      </li>
                      <li>
                        <a href="#">Inventory</a>
                      </li>
                    </ul>
                  </div>
                </nav>

                {/* Side Item */}
                <div></div>
                <div style={drawerItem}>
                  <img
                    src="https://infinitediscs.com/Inf_Uploads/Inventory_Images/II_Infinite0020ba9cc.jpg"
                    alt=""
                    style={invImg}
                  />
                  <div>
                    Innova Wraith
                    <br />
                    11 5 -1 3
                  </div>
                </div>
                <div style={drawerItem}>
                  <img
                    src="https://infinitediscs.com/Inf_Uploads/Inventory_Images/II_Infinite0020ba9cc.jpg"
                    alt=""
                    style={invImg}
                  />
                  <div>
                    Innova Wraith
                    <br />
                    11 5 -1 3
                  </div>
                </div>
                <div style={drawerItem}>
                  <img
                    src="https://infinitediscs.com/Inf_Uploads/Inventory_Images/II_Infinite0020ba9cc.jpg"
                    alt=""
                    style={invImg}
                  />
                  <div>
                    Innova Wraith
                    <br />
                    11 5 -1 3
                  </div>
                </div>
                <div style={drawerItem}>
              <img
                src="https://infinitediscs.com/Inf_Uploads/Inventory_Images/II_Infinite0020ba9cc.jpg"
                alt=""
                style={invImg}
              />
              <div>
                Innova Wraith
                <br />
                11 5 -1 3
              </div>
            </div>
            <div style={drawerItem}>
              <img
                src="https://infinitediscs.com/Inf_Uploads/Inventory_Images/II_Infinite0020ba9cc.jpg"
                alt=""
                style={invImg}
              />
              <div>
                Innova Wraith
                <br />
                11 5 -1 3
              </div>
            </div>
              </div>
    
            </div>


            {/* Bottom Tabs */}
            <div style={buttonRow}>
              <div className="row">
                <div className="col s12">
                  <ul className="tabs">
                    <li className="tab col s4">
                      <a href="#test1">Bag</a>
                    </li>
                    <li className="tab col s4">
                      <a href="#test2">Flight Chart</a>
                    </li>
                    <li className="tab col s4">
                      <a href="#test3">Number Chart</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Router>
    </BagState>
  );
};

const testStyle = {
  maxWidth: "80% !important",
  width: "80% !important",
  border: "dotted red",
  height: "800px",
  margin: "2% auto",
  display: "grid",
  gridTemplate: " repeat(6, 15%) 10% / repeat(6, 1fr)",
};
const buttonRow = {
  gridRow: "7 / 8",
  gridColumn: "1 / -1",
  border: "dashed orange",
  textAlign: "center",
};
const testMainView = {
  border: "double green",
  gridArea: "1 / 1 / 7 / 5",
  padding: "2%",
};
const tabRow = {
  border: "dashed blue",
  gridArea: "1 / 5 / -2 / -1",
  overflow: "auto"
};
const drawerItem = {
  padding: "1rem",
  border: "navy 1px dotted",
  display: "flex",
  flexDirection: "row",
  height: "160px",
};
const drawerHeader = {};
const invImg = {
  display: "block",
  marginLeft: "auto",
  marginRight: "auto",
};
export default App;
