import React from 'react';
import './button.css'

const ButtonLanding = ({label, style, onClick}) => {
    return ( 
    <div className='button-landing' onClick={onClick} style={style}>{label}</div>
     );
}
 
export default ButtonLanding;