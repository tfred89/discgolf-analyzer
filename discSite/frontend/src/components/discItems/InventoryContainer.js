import React, { useContext, useEffect, Fragment } from "react";
import InventoryItem from "./InventoryItem.js";
import BagContext from "../../context/bag/bagContext";

const InventoryContainer = () => {


  const bagContext = useContext(BagContext);
  const { loading, inventory } = bagContext;

  if (loading)
    return (
      <div>
        <h2>Hi</h2>
      </div>
    );

  if (typeof inventory !== "undefined") {
    return (
        <ul id="slide-out" className="sidenav">
          {inventory.map((item) => (
            <Fragment>
              <InventoryItem disc={item} key={item.id} />
            </Fragment>
          ))}
        </ul>
        
    );
  }
};

export default InventoryContainer;
