import React, { useContext, useState } from 'react';
import './SingleBook.css'
import AdminButton from '../AdminOptions/AdminButton';
import { getLoggedUser } from '../../../Providers/UserContext';
import { useHistory } from 'react-router-dom';

const SingleBook = ({ bookImg, bookTitle, bookAuthor, buttonLabel, loading, onClick, id, book }) => {
    const user = getLoggedUser()
    const history = useHistory();
    const [alert, setAlert] = useState(false)
    const [alertMessage, setAlertMessage] = useState('')
    const goToSingleBook = (id) => {
        history.push(`/books/${id}`)
    }

    const deleteBook = (id) => {
        fetch(`http://localhost:3000/admin/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
            },

        })
            .then(result => {
                if (result.error) {
                    throw new Error(result.message);
                }
                // alert(`Book with ID:${id} has been deleted!`)
            })
            .catch(() => history.push('/error'))

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
            setAlertMessage(`${bookTitle} was returned`)
        } else if (!book.borrowedBy) {
            borrowBook()
            setAlertMessage(`${bookTitle} was borrowed`)
        }
    }

    const borrowBook = () => {
        fetch(`http://localhost:3000/books/${id}/`, {
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
        fetch(`http://localhost:3000/books/${id}/`, {
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
        <>
            <div className='book-main-container' onClick={onClick} style={loading ? { opacity: '0' } : { opacity: '1' }} style={{ transition: 'opacity 0.3s ease-in-out' }} >
                <div className='triangle'></div>
                <div className='single-book-container' >
                    <img src={bookImg} onClick={() => goToSingleBook(id)} />
                    <div className='book-details-container'>
                        <div className='borrow-return-button' onClick={() => navigateBorrowing()}>{buttonLabel}</div>
                        <h2 className='book-title'>{bookTitle}</h2>
                        <h5 className='book-author'>{bookAuthor}</h5>
                        <div style={alert ? { opacity: '1', color: 'white', zIndex: '1', position: 'absolute', background: 'rgba(0, 0, 0, 0.5)', lineHeight: '3vh', width: '10vw', padding: '0.7vw', textAlign: 'center', borderRadius: '8px', marginTop: '0.7vw', transition: 'all 0.2s ease-in-out' } :
                            { opacity: '0', color: 'white', zIndex: '-5', position: 'absolute', background: 'rgba(0, 0, 0, 0.5)', lineHeight: '3vh', width: '10vw', padding: '0.7vw', textAlign: 'center', borderRadius: '8px', marginTop: '0.7vw', transition: 'all 0.2s ease-in-out' }}
                            className='side-text'>{alertMessage}</div>
                    </div>
                    {user.role === 'Admin' &&
                        <>
                            <AdminButton AdminButtonLabel='Edit' onClick={() => history.push(`/update/${id}`)}/>
                            <AdminButton AdminButtonLabel='Delete' onClick={() => deleteBook(id)} />
                        </>
                    }
                </div>
            </div>
        </>

    );
}

export default SingleBook;