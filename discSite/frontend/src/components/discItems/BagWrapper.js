import React, { useContext, useEffect, useState } from 'react';
import DiscItem from './DiscItem.js';
import Spinner from '../layout/Spinner';
import BagContext from '../../context/bag/bagContext';
import InventoryContainer from './InventoryContainer';
import InventoryItem from './InventoryItem.js';

const BagWrapper = () => {
    const bagContext = useContext(BagContext);
    const { loading, discs, loadDiscs, loadUser, user } = bagContext;

    useEffect(() => {
        loadDiscs();
        loadUser();
        // eslint-disable-next-line
    }, []);


    if (loading) return <Spinner />;
    return (

            <div style={viewItem}>
                Main View Item
            
                <InventoryContainer />
            </div>
                
    );
};

const viewItem = {
    padding: '2%',
    border: "navy 1px dotted",
    height: "100%",
    width: "100%",
}

export default BagWrapper;