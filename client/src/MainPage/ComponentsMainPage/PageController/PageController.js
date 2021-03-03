import React from 'react';
import './PageController.css'

const PageController = ({page, navigatePage}) => {
    return ( 
        <div className='page-controller'>
      <span className='chevron' onClick={() => navigatePage(page-1)}><i className="fas fa-chevron-circle-left"></i></span>
      <span className='page-number' style={{marginLeft: '3vmin', marginRight: '3vmin'}}>{page}</span>
      <span className='chevron' onClick={() => navigatePage(page+1)}><i className="fas fa-chevron-circle-right"></i></span>
   </div>
     );
}
 
export default PageController;