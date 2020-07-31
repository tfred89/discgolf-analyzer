import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import InventoryContainer from "../discItems/InventoryContainer";


const drawerWidth = 480; // TODO: make this responsive

const useStyles = makeStyles({

    drawer: {
        width: drawerWidth,
        flexShrink: 0
    },
    drawerPaper: {
        width: drawerWidth,
      },
    testInside: {
        width: "100%",
        overflow: "auto"
    },
    toolbar: {
        backgroundColor: "#3f51b5"
    }
    
});

const SideDrawer = () => {
    const classes = useStyles()

    return (
       
            <Drawer
                className={classes.drawer}
                variant="permanent"
                anchor="right"
                classes={{
                    paper: classes.drawerPaper,
                  }}
                >
                    <Toolbar
                        className={classes.toolbar}></Toolbar>
                <div id="testInside" className={classes.testInside}>
                    <InventoryContainer />

                </div>
            </Drawer>
    
    )
};

export default SideDrawer;