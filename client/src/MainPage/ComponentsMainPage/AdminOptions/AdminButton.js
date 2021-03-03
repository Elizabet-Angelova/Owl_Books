import React from 'react';
import './AdminButton.css'

const AdminButton = ({AdminButtonLabel, style, onClick}) => {
    return ( 
        <div className='admin-button' style={style} onClick={onClick}>
          {AdminButtonLabel}
        </div>
     );
}
 
export default AdminButton;