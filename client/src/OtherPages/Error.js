import React from 'react'
import './Error.css'
import { withRouter } from 'react-router-dom'
import ButtonLanding from '../LandingPage/ComponentsLandingPage/Button/button';

export const ErrorPage = ({history}) => {
    return (
        <div className='error-container'>
            <div className='blur-container3'>
                <div className='column'>
                    <img className='error-owl' src='/404owl.png' />
                    <h1>Ooops!</h1>
                    <h2 style={{fontSize: '4.6vmin'}}>Something went wrong.</h2>
                    <h4>Please try refreshing the page or accessing it later.</h4>
                    <ButtonLanding label='home' onClick={() => history.push('/home')} style={{width: '6vw', display: 'inline-block', fontSize: '1.6vw', marginLeft: '2vw', paddingLeft: '1vw', paddingRight: '1vw'}}/>
                </div>
            </div>
        </div>
    );
}


 export const fourOfourPage = ({history}) => {

    const directToBooks = () => {
        history.push('/books')
    }

    return (
        <div className='error-container'>
            <div className='blur-container3'>
                <div className='column'>
                    <img className='error-owl2' src='/404owl.png' />
                    <h1>404</h1>
                    <h3>It appears that the page you're looking for doesn't exist!</h3>
                    <h4>Maybe you were looking for some of the following content?</h4>
                    <ButtonLanding label='books' onClick={directToBooks} style={{width: '6vw', display: 'inline-block', fontSize: '1.6vw', marginLeft: '2vw', paddingLeft: '1vw', paddingRight: '1vw'}}/>
                    <ButtonLanding label='trending' onClick={directToBooks} style={{width: '6vw', display: 'inline-block', fontSize: '1.6vw', marginLeft: '2vw', paddingLeft: '1vw', paddingRight: '1vw'}}/>
                    <ButtonLanding label='profile' onClick={() => history.push('/profile')} style={{width: '6vw', display: 'inline-block', fontSize: '1.6vw', marginLeft: '2vw', paddingLeft: '1vw', paddingRight: '1vw'}}/>
                </div>
            </div>
        </div>
    );
}

export default ErrorPage;