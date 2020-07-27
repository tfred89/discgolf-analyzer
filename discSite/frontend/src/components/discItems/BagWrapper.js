import React, { useContext, useEffect, useState } from "react";
import DiscItem from "./DiscItem";
import Spinner from "../layout/Spinner";
import BagContext from "../../context/bag/bagContext";
import InventoryContainer from "./InventoryContainer";
import InventoryItem from "./InventoryItem";
import FlightChart from "./FlightChart";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";

const BagWrapper = () => {
  const bagContext = useContext(BagContext);
  const { loading, discs, loadDiscs, loadUser, user, bag } = bagContext;
  const [pwr, setPwr] = useState(20);

  useEffect(() => {

    loadDiscs();
    loadUser();
    // eslint-disable-next-line
  }, []);

  const valueText = (value) => {
    return `{value}`;
  };

  const marks = [
    {
      value: 0,
      label: "0",
    },
    {
      value: 10,
      label: "10",
    },
  ];

  const updatePwr = (e, v) => {
    const u = v * 4.8;
    setPwr(u);
  };

  if (loading) return <Spinner />;
  return (
    <div style={viewItem} className="col s12">
      <FlightChart pwr={pwr} bag={bag} />
      <div style={{"width":"90%"}}>
        <Slider
          defaultValue={5}
          getAriaValueText={valueText}
          aria-labeledby="discrete-slider-always"
          step={1}
          marks={true}
          valueLabelDisplay="on"
          orientation="horizontal"
          onChange={updatePwr}
          min={0}
          max={10}
        />
        <Typography id="discrete-slider-always" gutterBottom>
          Power
        </Typography>
      </div>
    </div>
  );
};

const viewItem = {
  padding: "2%",
  border: "navy 1px dotted",
  height: "100%",
  width: "100%",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
};

export default BagWrapper;
