import React, { useContext, useEffect, useState } from 'react';
import DiscItem from './DiscItem.js';
import Spinner from '../layout/Spinner';
import BagContext from '../../context/bag/bagContext';

const BagWrapper = () => {
    const bagContext = useContext(BagContext);
    const { loading, discs, loadDiscs, loadUser } = bagContext;

    useEffect(() => {
        loadDiscs();
        loadUser();
        // eslint-disable-next-line
    }, []);

    if (loading) return <Spinner />;
    return (
        <div><h1>Test </h1></div>
 
    );
};

const discStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gridGap: "1rem",
  };

export default BagWrapper;