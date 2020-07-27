import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Discs from "./components/discItems/Discs";
import BagWrapper from "./components/discItems/BagWrapper";
import BagState from "./context/bag/BagState";
import Grid from '@material-ui/core/Grid';
import InventoryContainer from "./components/discItems/InventoryContainer";

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
          <Grid
                container
                spacing={0}
                direction="row"
                alignItems="stretch"
            >
                <Grid item xs={12} sm={8} md={8} lg={8} xl={9}>
                  <div style={testMainView}>
                      <BagWrapper />
                  </div>
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4} xl={3}>
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
                    <div>
                      <InventoryContainer />
                    </div>
                    </div>
                    </div>
                </Grid>
            </Grid>

        </div>
      </Router>
    </BagState>
  );
};

const testStyle = {
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
  height: "600px"
};
const tabRow = {
  height: "auto",
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


// <div className="container" style={testStyle}>
// {/* Main Viewing Area */}
// <div style={testMainView}>
//   <BagWrapper />
// </div>

// {/* Side Drawer */}
// <div style={tabRow}>
//   {/* Side Drawer Header / Bar */}
//   <div style={drawerHeader}>
//     <nav className="blue">
//       <div className="nav-wrapper" style={{ paddingLeft: "10px" }}>
//         <a href="#" className="brand-logo">
//           Inventory
//         </a>
//         <ul id="nav-mobile" className="right hide-on-med-and-down">
//           <li>
//             <a href="#">Bag</a>
//           </li>
//           <li>
//             <a href="#">Inventory</a>
//           </li>
//         </ul>
//       </div>
//     </nav>

//     {/* Side Item */}
//     <div>
//       <InventoryContainer />
//     </div>
//     {/* <div style={drawerItem}>
//       <img
//         src="https://infinitediscs.com/Inf_Uploads/Inventory_Images/II_Infinite0020ba9cc.jpg"
//         alt=""
//         style={invImg}
//       />
//       <div>
//         Innova Wraith
//         <br />
//         11 5 -1 3
//       </div>
//     </div>
//     <div style={drawerItem}>
//       <img
//         src="https://infinitediscs.com/Inf_Uploads/Inventory_Images/II_Infinite0020ba9cc.jpg"
//         alt=""
//         style={invImg}
//       />
//       <div>
//         Innova Wraith
//         <br />
//         11 5 -1 3
//       </div>
//     </div>
//     <div style={drawerItem}>
//       <img
//         src="https://infinitediscs.com/Inf_Uploads/Inventory_Images/II_Infinite0020ba9cc.jpg"
//         alt=""
//         style={invImg}
//       />
//       <div>
//         Innova Wraith
//         <br />
//         11 5 -1 3
//       </div>
//     </div>
//     <div style={drawerItem}>
//   <img
//     src="https://infinitediscs.com/Inf_Uploads/Inventory_Images/II_Infinite0020ba9cc.jpg"
//     alt=""
//     style={invImg}
//   />
//   <div>
//     Innova Wraith
//     <br />
//     11 5 -1 3
//   </div>
// </div>
// <div style={drawerItem}> */}
//   {/* <img
//     src="https://infinitediscs.com/Inf_Uploads/Inventory_Images/II_Infinite0020ba9cc.jpg"
//     alt=""
//     style={invImg}
//   />
//   <div>
//     Innova Wraith
//     <br />
//     11 5 -1 3
//   </div> */}
// </div>

// </div>


// {/* Bottom Tabs */}

// </div>