import React from 'react';
import './landingSquares.css'

const LandingSquare = ({style, icon, content}) => {
    return (
        <div className='square-container' style={style}>
            <i className={icon}></i>
            <div className='square-content'>{content}</div>
        </div>
    );
}

export default LandingSquare;