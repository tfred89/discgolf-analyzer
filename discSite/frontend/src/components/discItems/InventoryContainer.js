import React, { useContext, useEffect, Fragment } from "react";
import InventoryItem from "./InventoryItem.js";
import BagContext from "../../context/bag/bagContext";


const InventoryContainer = () => {

// This isnt currently working, mock data in use
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
        <div >
          {inventory.map((item) => (
            <Fragment key={item.id}>
              <InventoryItem disc={item} key={item.id}/>
            </Fragment>
          ))}
        </div>
        
    );
  }
};

export default InventoryContainer;
