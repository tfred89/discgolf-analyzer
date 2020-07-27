import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      },

  }));

export default function MainGrid() {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Grid
                container
                spacing={0}
                direction="row"
                alignItems="stretch"
            >
                <Grid item xs={12} sm={8} md={8} lg={8} xl={8}>

                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>

                </Grid>
            </Grid>
        </div>
    )
};
  