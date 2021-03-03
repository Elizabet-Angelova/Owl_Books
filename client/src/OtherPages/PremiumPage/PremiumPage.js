import React from 'react';
import './PremiumPage.css'

const PremiumPageContent = () => {
    return ( 
        <div className='premium-container'>
         <div className='plan-container'>
             <i className="fas fa-crown icon" style={{color: 'rgb(255, 215, 107)', fontSize: '1.8vw', padding: '0'}}></i>
             <div className='side-titles plan-title' style={{color: 'rgb(255, 5, 130)'}}>GOLD</div>
             <div style={{textAlign: 'left', height: '25vh'}}>
             <div className='side-text'>• Borrow up to 50 books</div>
             <div className='side-text'>• Post unlimited reviews</div>
             <div className='side-text'>• Unlimited daily votes</div>
             <div className='side-text'>• Upload your custom avatar</div>
             </div>
             <div className='side-titles' style={{fontWeight: 'bold', paddingBottom: '2vh'}}>$20/mo</div>
             <div className='borrow-return-button' style={{margin: 'auto', paddingLeft: '2vw', paddingRight: '2vw'}}>BUY NOW</div>
         </div>

         <div className='plan-container'>
             <i className="fas fa-crown icon" style={{color: 'rgb(229, 229, 229)', fontSize: '1.8vw', padding: '0'}}></i>
             <div className='side-titles plan-title' style={{color: 'rgb(255, 5, 130)'}}>SILVER</div>
             <div style={{textAlign: 'left', height: '25vh'}}>
             <div className='side-text'>• Borrow up to 10 books</div>
             <div className='side-text'>• Unlimited daily votes</div>
             <div className='side-text'>• Post up to 10 reviews a day</div>
             </div>
             <div className='side-titles' style={{fontWeight: 'bold', paddingBottom: '2vh'}}>$15/mo</div>
             <div className='borrow-return-button' style={{margin: 'auto', paddingLeft: '2vw', paddingRight: '2vw'}}>BUY NOW</div>
         </div>

         <div className='plan-container'>
    
             <i className="fas fa-crown icon" style={{color: 'rgb(255, 189, 127)', fontSize: '1.8vw', padding: '0'}}></i>
             <div className='side-titles plan-title' style={{color: 'rgb(255, 5, 130)'}}>BRONZE</div>
             <div style={{textAlign: 'left', height: '25vh'}}>
             <div className='side-text'>• Borrow up to 3 books</div>
             <div className='side-text'>• Post up to 3 reviews a day</div>
             <div className='side-text'>• Unlimited daily votes</div>
             </div>
             <div className='side-titles' style={{fontWeight: 'bold', paddingBottom: '2vh'}}>$10/mo</div>
             <div className='borrow-return-button' style={{margin: 'auto', paddingLeft: '2vw', paddingRight: '2vw'}}>BUY NOW</div>
         </div>
        </div>
     );
}
 
export default PremiumPageContent;