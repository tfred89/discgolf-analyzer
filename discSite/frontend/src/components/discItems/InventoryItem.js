import React, { useContext } from "react";
import BagContext from "../../context/bag/bagContext";
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";

const InventoryItem = ({
  disc: {
    name,
    manufacturer,
    speed,
    glide,
    turn,
    fade,
    id,
    img,
    style,
    bagged,
  },
}) => {
  const bagContext = useContext(BagContext);
  const { bag, inventory, addToBag, discs, removeFromBag } = bagContext;

  const updateBagAdd = (e) => {
    e.preventDefault();
    const id = e.currentTarget.value;
    // TODO: Gotta be a better way than iterating through everything like this. Maybe map to object and use
    for (const d of inventory) {
      if (d.id == id) {
        d.bagged = true;
        var disc = d;
        break;
      }
    }
    addToBag(disc);
  };

  const updateBagRemove = (e) => {
    e.preventDefault();
    const id = e.currentTarget.value;
    for (const d of inventory) {
      if (d.id == id) {
        d.bagged = false;
        var disc = d;
        break;
      }
    }
    removeFromBag(disc);
  };

  return (
    <div className="card text-center drawer" style={drawerItem}>
      <img src={img} alt="" className="round-img" style={invImg} />
      <p>
        {manufacturer} - {name}
      </p>
      <p>
        Flight Numbers: {speed} {glide} {turn} {fade}
      </p>
      <p>{style}</p>
      {bagged ? (
        <IconButton onClick={updateBagRemove} color="secondary" style={{backgroundColor: "transparent"}} value={id} aria-label="remove">
          <RemoveCircleIcon />
        </IconButton>
      ) : (
        <IconButton onClick={updateBagAdd} color="primary" style={{backgroundColor: "transparent"}} value={id} aria-label="add">
          <AddCircleIcon />
        </IconButton>
      )}
    </div>
  );
};
const invImg = {
  display: "block",
  marginLeft: "auto",
  marginRight: "auto",
  height: "125px",
  width: "125px",
};
const drawerItem = {
  padding: "1rem",
  border: "navy 1px dotted",
  display: "flex",
  flexDirection: "row",
  height: "150px",
};
export default InventoryItem;
