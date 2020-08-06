import React, { useContext, useEffect } from 'react';
import { Grid } from '@material-ui/core';

import DiscItem from './DiscItem.js';
import Spinner from '../layout/Spinner';
import BagContext from '../../context/bag/bagContext';

const Discs = () => {
    const bagContext = useContext(BagContext);
    const { loading, discs, searchDiscs, loadUser } = bagContext;

    useEffect(() => {
        searchDiscs();
        loadUser();
        // eslint-disable-next-line
    }, []);


    if (loading) return <Spinner />;

    return (
        <Grid
            container
            direction="row"
            justify="space-evenly"
            alignItems="flex-start"
            wrap="wrap"
            spacing={3}
        >
            {discs.map((disc) => (
                <DiscItem key={disc.id} disc={disc} />
            ))}

        </Grid>

        // <div style={discStyle}>
            // {discs.map((disc) => (
            //     <DiscItem key={disc.id} disc={disc} />
            // ))}
        // </div>
    );
};

const discStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gridGap: "1rem",
  };

export default Discs