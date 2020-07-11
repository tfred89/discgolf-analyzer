import React, { useContext, useEffect } from 'react';
import DiscItem from './DiscItem.js';
import Spinner from '../layout/Spinner';
import BagContext from '../../context/bag/bagContext';

const Discs = () => {
    const bagContext = useContext(BagContext);
    const { loading, discs, searchDiscs } = bagContext;

    useEffect(() => {
        searchDiscs();
        // eslint-disable-next-line
    }, []);

    if (loading) return <Spinner />;
    return (
        <div style={discStyle}>
            {discs.map((disc) => (
                <DiscItem key={disc.id} disc={disc} />
            ))}
        </div>
    );
};

const discStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gridGap: "1rem",
  };

export default Discs