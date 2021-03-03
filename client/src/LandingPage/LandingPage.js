import React, { useState, useEffect } from 'react';
import './LandingPage.css'
import ButtonLanding from './ComponentsLandingPage/Button/button';
import LandingSquare from './ComponentsLandingPage/LandingSquares/landingSquares';
import FormLogIn from './ComponentsLandingPage/Form/formLogIn';
import FormSignIn from './ComponentsLandingPage/Form/formSignIn';
import LoadingPage from '../OtherPages/Loading';


const LandingPage = () => {
    const [loginVisible, setLoginVisible] = useState(false);
    const [signInVisible, setSignInVisible] = useState(false);
    const [BGmovement, setBGmovement] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [loginWillBeVisible, setLoginWillBeVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const [startFade, setStartFade] = useState(false);


    useEffect(() => {
        setTimeout(() => {
            setStartFade(true)
        }, 1100)
        setTimeout(() => {
            setLoading(false)
            setStartFade(false)
        }, 1600)
    }, [])

    const onClickLogIn = () => {
        if (isAnimating) {
            return;
        }
        if (signInVisible) {
            setSignInVisible(false);
            setLoginVisible(true);
            setLoginWillBeVisible(true);
        } else if (loginVisible) {
            setLoginVisible(false);
            setBGmovement(false);
            setIsAnimating(true);

            setTimeout(() => {
                setLoginWillBeVisible(false);
                setIsAnimating(false);
            }, 1000);
        }
        else {
            setBGmovement(true);
            setLoginWillBeVisible(true);
            setIsAnimating(true);
            setTimeout(() => {
                setLoginVisible(true);
                setIsAnimating(false);
            }, 1000)
        }
    }

    const onClickSignIn = () => {
        if (isAnimating) {
            return;
        }
        if (loginVisible) {
            setSignInVisible(true);
            setLoginVisible(false);
            setLoginWillBeVisible(false);
        } else if (signInVisible) {
            setSignInVisible(false);
            setBGmovement(false);
            setIsAnimating(true);

            setTimeout(() => {
                setIsAnimating(false);
            }, 1000)
        }
        else {
            setBGmovement(true);
            setIsAnimating(true);
            setTimeout(() => {
                setSignInVisible(true);
                setIsAnimating(false);
            }, 1000)
        }
    }


    return (
        <div >
        {loading && <LoadingPage style={startFade ? {opacity: '0'} : {opacity: '1'}} />}
        <div className='motherShip' style={
            startFade ?
                { opacity: '0' }
                : { opacity: '1' }
        } style={{transition: 'opacity 0.4s ease-in-out'}}>
            <div className={`main-container ${BGmovement ? 'left-bg' : ''}`} >
                <div className='blur-container'></div>
                <div className='content-container'>
                    <h4 className='comfortable'>Get comfortable and grab a book from</h4>
                    <h1 className='websiteName'>OWL BOOKS</h1>
                    <ButtonLanding onClick={onClickLogIn} style={{ gridColumn: '5 / span 4', gridRow: '18' }} label='Log In' />
                    <ButtonLanding onClick={onClickSignIn} style={{ gridColumn: '10 / span 4', gridRow: '18' }} label='Sign Up' />
                    <LandingSquare style={{ gridColumn: '2 / span 5', gridRow: '22 / span 3' }}
                        icon='fas fa-book'
                        content='Get accsess to a huge collection of books on diverse topics!' />
                    <LandingSquare style={{ gridColumn: '7 / span 5', gridRow: '22 / span 3' }}
                        icon='fas fa-book-reader'
                        content='Borrow whichever book you like and enjoy it online for free!' />
                    <LandingSquare style={{ gridColumn: '12 / span 5', gridRow: '22 / span 3' }}
                        icon='fas fa-comments'
                        content='Read real reviews from passionate book-lovers just like yourself.' />
                </div>
            </div>

            {loginVisible || loginWillBeVisible ?
                (<FormLogIn style={{ zIndex: loginVisible ? '1' : '-1' }} />) : (
                    <FormSignIn style={{ zIndex: signInVisible ? '1' : '-1' }} />
                )}

        </div>
        </div>
    );
}

export default LandingPage;