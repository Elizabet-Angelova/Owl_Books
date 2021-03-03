import React, { useState } from 'react';
import './input.css'

const FormInput = ({label, placeholder, value, onChange, type, style, className}) => {
   const [focus, setFocus] = useState(null)



   const getFocusClass = () => {
       if (focus) {
           return 'focused'
       } else if (focus === null) {
           return ''
       } else {
           return 'blurred'
       }
   }

    return ( 
     <label style={style}>
         <span>{label}</span>
         <input 
         className={`form-input ${getFocusClass()} ${className}`}
         placeholder={placeholder} 
         value={value} 
         onChange={onChange}
         type={type}
         onFocus={() => {setFocus(true)}}
         onBlur={() => {setFocus(false)}}
         />
         
     </label>
     );
}
 
export default FormInput;