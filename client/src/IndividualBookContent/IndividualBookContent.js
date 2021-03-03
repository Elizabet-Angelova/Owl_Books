import React, { useState, useEffect } from 'react';
import './IndividualBookContent.css'
import SingleBook from '../MainPage/ComponentsMainPage/SingleBook/SingleBook';
import ReviewComponent from './ReviewComponent/ReviewComponent';
import { getLoggedUser } from '../Providers/UserContext';
import { withRouter } from 'react-router-dom'
import { LoadingContainer } from '../OtherPages/Loading';


const IndividualBookContent = ({ match, history, style }) => {
    const [book, setBook] = useState({})
    const [loading, setLoading] = useState(true)
    const [reviewLoading, setReviewLoading] = useState(false)
    const user = getLoggedUser()
    const bookId = match.params.id
    const [review, setReview] = useState('')
    const [alert, setAlert] = useState(false)
    const [alertMessage, setAlertMessage] = useState('')

    useEffect(() => {
        fetch(`http://localhost:3000/books/${bookId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
            },
        })
            .then(response => response.json())
            .then(result => {
                if (result) {
                    setBook(result);
                } else {
                    throw new Error(result.message);
                }
            })
            .catch(error => { history.push('/error') })
            .finally(() => setLoading(false))
    }, [review, alert, book])

    const determineLabel = (book) => {
        if (book.borrowedBy) {
            if (book.borrowedBy.id === user.id) {
                return book.borrowedBy.id === user.id ? 'Return' : 'Borrow'
           }
          if (book.borrowedBy.id !== user.id) {
              return book.borrowedBy.id !== user.id ? 'Borrowed' : 'Borrow' 
           }
        
        } 
        
        return 'Borrow'
    }

    const createReview = () => {
        setReviewLoading(true)
        const reviewToSend = {
            content: review
        }

        fetch(`http://localhost:3000/reviews/${bookId}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reviewToSend)

        })
            .then(result => {
                if (result.error) {
                    throw new Error(result.message);
                }
            })
            .catch(error => history.push('/error'))
            .finally(() => {
                setReview('');
                setReviewLoading(false)
            })
    }

    const navigateBorrowing = () => {
        if (book.borrowedBy && book.borrowedBy.id !== user.id) {
            setAlert(true)
            setTimeout(() => {
                setAlert(false)
            }, 4000)
            setAlertMessage('This book is borrowed by someone else')
        } else if (book.borrowedBy && book.borrowedBy.id === user.id) {
            returnBook()
            setAlertMessage(`${book.name} was returned`)
        } else if (!book.borrowedBy) {
            borrowBook()
            setAlertMessage(`${book.name} was borrowed`)
        }
    }

    const borrowBook = () => {
        fetch(`http://localhost:3000/books/${bookId}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token') || ''}`
            },
        })
            .then(result => {
                if (result.error) {
                    throw new Error(result.message);
                }
                setAlert(true)
                setTimeout(() => {
                    setAlert(false)
                }, 4000)
            })
            .catch(() => history.push('/error'));
    }

    const returnBook = () => {
        fetch(`http://localhost:3000/books/${bookId}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token') || ''}`
            },

        })
            .then(result => {
                if (result.error) {
                    throw new Error(result.message);
                }
                setAlert(true)
                setTimeout(() => {
                    setAlert(false)
                }, 4000)
            })
            .catch(() => history.push('/error'));
    }

    return (
        <div className='individual-book-content'>
            {loading ? <LoadingContainer /> :
                <>
                    <div className='book-container'>
                        <div className='book-main-container2'>
                            <div className='triangle2'></div>
                            <div className='single-book-container2' style={style}>
                                <img src={book.img} />
                                <div className='book-details-container2'>
                                    <div className='borrow-return-button2' onClick={() => navigateBorrowing()}>{determineLabel(book)}</div>
                                    <h2 className='book-title2'>{book.name}</h2>
                                    <h5 className='book-author2'>{book.author}</h5>
                                </div>
                            </div>

                        </div>
                    </div>


                    <div className='descriptionNreview-container'>
                        <div className='book-description'>
                            <div className='side-titles'>Description:</div>
                            <div className='side-text'>{book.description}</div>
                        </div>
                        <div className='leave-review-form'>
                            <div className='side-titles'>Leave a review:</div>
                            <textarea type='text' className='textarea' value={review} onChange={(ev) => setReview(ev.target.value)} />
                            <div className='post-review-button' onClick={createReview}>Post</div>
                        </div>
                    </div>

                    <div className='reviews-container'>
            <div className='side-titles' style={{ fontSize: '4.5vmin', marginBottom: '6vh' }}>Reviews ({book.reviews.length})</div>
                        { book.reviews.map((review) => {
                           return <ReviewComponent key={review.id} bookORusernam={review.authorUsername} text={review.content} thisReview={review}/>
                        }).reverse()}
                    </div>
                </>}
        </div>
    );
}

export default withRouter(IndividualBookContent);