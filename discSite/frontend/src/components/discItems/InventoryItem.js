import React from 'react'

const InventoryItem = ({disc: {name, manufacturer, speed, glide, turn, fade, img, style}}) => {
    return (
        
        <li className="card text-center">
            <img src={img} alt ="" className="round-img" style={{width:"60px"}} />
            <h3>{manufacturer} - {name}</h3>
            <h4>Flight Numbers: {speed}  {glide}  {turn}  {fade}</h4>
            <h4>{style}</h4>
        </li>
       
    )
}

export default InventoryItem;
