import './ColorCircle.css'
import React from 'react'

function ColorCircle({ color }) {
    

    return (
        <div className="color-circle" style={{ color: `${color}` }}
        value={color}  ></div>
    )
}

export default ColorCircle