import React, { useState, useEffect } from 'react';
import './MenuComponent.css'
import { NavLink, withRouter } from 'react-router-dom'


const MenuComponent = ({ location }) => {
    const [trending, setTrending] = useState(false)
    const [books, setBooks] = useState(false)
    const [profile, setProfile] = useState(false)
    const [premium, setPremium] = useState(false)

    useEffect(() => {
        if (location.pathname.includes('trending')) {
            setTrending(true)
            setBooks(false)
            setProfile(false)
            setPremium(false)
        } if (location.pathname.includes('books')) {
            setBooks(true)
            setTrending(false)
            setProfile(false)
            setPremium(false)
        } if (location.pathname.includes('profile')) {
            setProfile(true)
            setBooks(false)
            setTrending(false)
            setPremium(false)
        } if (location.pathname.includes('premium')) {
            setPremium(true)
            setBooks(false)
            setProfile(false)
            setTrending(false)
        }
    }, [location])

    return (
        <>
            <div className='menu-container'>
                <img className='logo-img' src='/logoWhite.png' alt='logo' />
                <hr style={{ border: 'none', backgroundColor: 'white', height: '0.3px', width: '30vmin' }} />
                <div className='menu-items-container'>
                    <NavLink style={{ textDecoration: 'none' }} to="/trending"><div className='menu-item-cont' style={trending ? { background: 'rgba(255, 255, 255, 0.23)' } : {}}><i className="fas fa-star icon"></i><span className='menu-item'>TRENDING</span></div></NavLink>
                    <NavLink style={{ textDecoration: 'none' }} to="/books"><div className='menu-item-cont' style={books ? { background: 'rgba(255, 255, 255, 0.23)' } : {}}><i className="fas fa-book icon"></i><span className='menu-item'>BOOKS</span></div></NavLink>
                    <NavLink style={{ textDecoration: 'none' }} to="/profile"><div className='menu-item-cont' style={profile ? { background: 'rgba(255, 255, 255, 0.23)' } : {}}><i className="fas fa-user-circle icon"></i><span className='menu-item'>PROFILE</span></div></NavLink>
                    <NavLink style={{ textDecoration: 'none' }} to="/premium"><div className='menu-item-cont' style={premium ? { background: 'rgba(255, 255, 255, 0.23)' } : {}}><i className="fas fa-crown icon"></i><span className='menu-item'>PREMIUM</span></div></NavLink>
                </div>
            </div>
        </>
    );
}

export default withRouter(MenuComponent);