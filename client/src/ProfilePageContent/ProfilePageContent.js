import React, { useEffect, useState, useContext } from 'react';
import './ProfilePageContent.css'
import SingleBook from '../MainPage/ComponentsMainPage/SingleBook/SingleBook';
import ReviewComponent from '../IndividualBookContent/ReviewComponent/ReviewComponent';
import { LoadingContainer } from '../OtherPages/Loading';
import { getLoggedUser } from '../Providers/UserContext';


const ProfilePageContent = ({history}) => {
    const [loading, setLoading] = useState(true)
    const [opacity, setOpacity] = useState(true)
    const [book, setBook] = useState({})
    const [reviewByUser, setReviewByUser] = useState([])
    const [user, setUser] = useState({})
    const user2 = getLoggedUser()
    
    useEffect(() => {
        fetch(`http://localhost:3000/users/${user2.id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
                'Content-Type': 'application/json',
            },
        }).then(result => result.json())
        .then(result => {
            if (result.error) {
                throw new Error(result.message);
            }
            setUser(result)
            setBook(result.borrowedBooks[0])

    
        })
        .catch(error => { history.push('/error') })


            fetch(`http://localhost:3000/reviews`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
                },
            })
                .then(response => response.json())
                .then(result => {
                    if (result) {
                        result = result.filter(review => review.authorUsername === user2.username)
                        setReviewByUser(result[result.length - 1])
                        console.log(result)
                        setTimeout(() => {
                            setLoading(false)
                            setOpacity(false)
                        }, 700)
            
                    } else {
                        throw new Error(result.message);
                    }
                })
                .catch(error => { history.push('/error') })
    }, [])
    
   
    return (
        <>
        {loading ? <LoadingContainer /> :
        <div className='profile-page-main-container' >
            <img className='avatar' src={user.avatar} />
            <div className='user-details'>
                <div className='side-titles' style={{ fontSize: '4vmin' }}>{user.displayName}</div>
                <div className='side-titles' style={{ fontSize: '3.5vmin' }}>{user.username}</div>
            </div>

            <div className='currently-borrowing'  style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.4)'}}>
                <div className='side-titles' style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.4)', paddingBottom: '2vmin' }}>Currently reading</div>
            {!loading && user.borrowedBooks.length ? 
            <SingleBook 
            style={{borderBottom: '2px solid pink'}}
            id={book.id} 
            bookTitle={book.name} 
            bookAuthor={book.author} 
            buttonLabel='See details'
            bookImg={book.img} />
                : <div className="side-text" style={{marginTop: '5vh'}}>Nothing to show</div> 
            }
                

            </div>

            <div className='user-reviews' style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.4)'}}>
                <div className='side-titles' style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.4)', paddingBottom: '2vmin' }}>Reviews</div>
                  
            <div style={{marginTop: '5vh'}} className='side-titles'>Reviewed: {reviewByUser ? reviewByUser.book.name : 'No reviews yet'}</div> 
            <div className='side-text' style={{width: '90%', margin: 'auto'}}>{reviewByUser ? reviewByUser.content : ''}</div> 
                <div className='side-text see-more' style={{
                    border: '1px solid white', width: 'fit-content',
                    padding: '1vmin', borderRadius: '3px', color: 'rgba(255, 255, 255, 0.8)', marginTop: '2vh', marginBottom: '2vh'
                }}
                >See more...</div>


            </div>

            <div className='user-votes' style={{ borderRight: 'none', borderBottom: '1px solid rgba(255, 255, 255, 0.4)' }}>
                <div className='side-titles' style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.4)', paddingBottom: '2vmin' }}>Wishlist</div>
                <div className='side-titles'
                    style={{ opacity: '0.5', width: '14vw', margin: 'auto', marginTop: '7vh' }}>No books added to wishlist</div>
                <div className='side-text see-more' style={{
                    border: '1px solid white', width: '8vmin', marginBottom: '3vh',
                    padding: '1vmin', borderRadius: '3px', color: 'rgba(255, 255, 255, 0.8)', marginTop: '5vmin'
                }}
                >Edit</div>
            </div> 
            </div> }
        </>
    );
}

export default ProfilePageContent;