import React, { useContext } from "react";
import BagContext from "../../context/bag/bagContext";
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  itemBox: {
    display: "flex",
    flexDirection: "row",
    // maxHeight:120,
    width: "100%"
  },
  media: {
    height: 120,
    width: "auto",
  },
  cardGrid:{
    display:"flex",
    flexDirection:"row",
    justifyContent: "space-between",
    width: "100%"
  },
  cardActions: {
    display: 'flex',
    alignItems: 'center',
    // height: "20%"
  },
  imgContainer: {
    maxHeight:"100%",
    maxWidth: 100
  },
  content: {
    width: "100%"
  }
});

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

  const classes = useStyles();
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
    <Card className={classes.itemBox} variant="outlined">
      
      
    <CardActionArea className={classes.imgContainer}>
      <CardMedia 
        className={classes.media}
        image={img}
        title={name}
      />
      </CardActionArea>
      <div className={classes.cardGrid}>
      <CardContent className={classes.content}>
        <Typography gutterBottom variant="h6" component="h6">
          {manufacturer} - {name}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          <b>Speed: </b>{speed}  <b>Glide: </b>{glide}
         
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">

        <b>Turn: </b>{turn}  <b>Fade: </b>{fade}

        </Typography>
      </CardContent>
     
    <div className={classes.cardActions}>
    <CardActions>
    {bagged ? (
        <IconButton onClick={updateBagRemove} color="secondary" style={{backgroundColor: "transparent"}} value={id} aria-label="remove">
          <RemoveCircleIcon />
        </IconButton>
      ) : (
        <IconButton onClick={updateBagAdd} color="primary" style={{backgroundColor: "transparent"}} value={id} aria-label="add">
          <AddCircleIcon />
        </IconButton>
      )}
    
    </CardActions>
    </div>
    </div>
    
    
  </Card>
    // <div className="card text-center drawer" style={drawerItem}>
    //   <img src={img} alt="" className="round-img" style={invImg} />
    //   <p>
    //     {manufacturer} - {name}
    //   </p>
    //   <p>
    //     Flight Numbers: {speed} {glide} {turn} {fade}
    //   </p>
    //   <p>{style}</p>
    //   {bagged ? (
    //     <IconButton onClick={updateBagRemove} color="secondary" style={{backgroundColor: "transparent"}} value={id} aria-label="remove">
    //       <RemoveCircleIcon />
    //     </IconButton>
    //   ) : (
    //     <IconButton onClick={updateBagAdd} color="primary" style={{backgroundColor: "transparent"}} value={id} aria-label="add">
    //       <AddCircleIcon />
    //     </IconButton>
    //   )}
    // </div>
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


// return (
//   <Card className={classes.itemBox}>
//     <CardActionArea>
//       <CardMedia 
//         className={classes.media}
//         image={img}
//         title={name}
//       />
//       <CardContent>
//         <Typography gutterBottom variant="h5" component="h2">
//           First Words
//         </Typography>
//         <Typography variant="body2" color="textSecondary" component="p">
//           Second Words
//         </Typography>
//       </CardContent>
      
//     </CardActionArea>
//     <CardActions>
//     {bagged ? (
//         <IconButton onClick={updateBagRemove} color="secondary" style={{backgroundColor: "transparent"}} value={id} aria-label="remove">
//           <RemoveCircleIcon />
//         </IconButton>
//       ) : (
//         <IconButton onClick={updateBagAdd} color="primary" style={{backgroundColor: "transparent"}} value={id} aria-label="add">
//           <AddCircleIcon />
//         </IconButton>
//       )}
//     </CardActions>
//   </Card>
// )