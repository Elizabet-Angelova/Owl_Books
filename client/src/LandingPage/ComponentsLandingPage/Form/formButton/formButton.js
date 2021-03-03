import React from 'react';
import './formButton.css'

const FormButton = ({style, label, onClick}) => {


    return ( 
    <div className='form-button' onClick={onClick} style={style}>{label}</div>
     );
}
 
export default FormButton;