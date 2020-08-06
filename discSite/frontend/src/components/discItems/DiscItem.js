import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';


const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 140,

    },
  });

const DiscItem = ({disc: {name, manufacturer, speed, glide, turn, fade, img, style}}) => {
    const classes = useStyles();
    return (
        <Grid
            item
            lg={3}
            md={4}
            sm={6}
            xs={10}
        >
            <Card className={classes.root} variant="outlined">
                <CardHeader
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                        }
                    title={name}
                    subheader={manufacturer}
                />
                <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={img}
                    title={name}
                    border={1}
                    />
                </CardActionArea>
            <CardContent>

                <Typography variant="body2" component="p">
                Flight Numbers: {speed}  {glide}  {turn}  {fade}
                </Typography>

            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>

        </CardActions>
            </Card>

        </Grid>
    )

    // return (
    //     <div className="card text-center">
    //         <img src={img} alt ="" className="round-img" style={{width:"60px"}} />
    //         <h3>{manufacturer} - {name}</h3>
    //         <h4>Flight Numbers: {speed}  {glide}  {turn}  {fade}</h4>
    //         <h4>{style}</h4>
    //     </div>
    // )
}
export default DiscItem