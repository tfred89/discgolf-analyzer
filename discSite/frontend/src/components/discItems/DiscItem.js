import React from 'react'

const DiscItem = ({disc: {name, manufacturer, speed, glide, turn, fade, img, style}}) => {

    return (
        <div className="card text-center">
            <img src={img} alt ="" className="round-img" style={{width:"60px"}} />
            <h3>{manufacturer} - {name}</h3>
            <h4>Flight Numbers: {speed}  {glide}  {turn}  {fade}</h4>
            <h4>{style}</h4>
        </div>
    )
}
export default DiscItem