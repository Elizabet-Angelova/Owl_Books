import React, { useContext, useState, useEffect, contentEditable } from 'react';
import './ReviewComponent.css'
import AdminButton from '../../MainPage/ComponentsMainPage/AdminOptions/AdminButton';
import { getLoggedUser } from '../../Providers/UserContext';
import { withRouter } from 'react-router-dom'
import { LoadingContainer } from '../../OtherPages/Loading';

const ReviewComponent = ({ history, style, bookORusernam, text, thisReview }) => {
    const user = getLoggedUser()
    const [likes, setLikes] = useState(0)
    const [dislikes, setDislikes] = useState(0)
    const [editingMode, setEditingMode] = useState(false)
    const [newText, setNewText] = useState(text)
    const [users, setUsers] = useState({})


    useEffect(() => {

        getavatar()
        fetch(`http://localhost:3000/reviews/votes`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
                'Content-Type': 'application/json',
            },
        }).then(result => result.json())
            .then(result => {
                if (result.error) {
                    throw new Error(result.message);
                }
                filterVotes(result)


            })
            .catch(error => { history.push('/error') })

    }, [likes, dislikes])

    const filterVotes = (result) => {
        const votesForThisReview = result.filter(vote => vote.review.id === thisReview.id)
        const likesLabel = votesForThisReview.filter(vote => vote.reaction === 1)
        const dislikesLabel = votesForThisReview.filter(vote => vote.reaction === -1)
        setLikes(likesLabel.length)
        setDislikes(dislikesLabel.length)
    }


    const likeReview = () => {
        fetch(`http://localhost:3000/reviews/${thisReview.id}/vote`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ reaction: 1 })
        })
            .then(result => {
                if (result.error) {
                    throw new Error(result.message);
                }
                setLikes('')
            })
            .catch(error => history.push('/error'))

    }

    const dislikeReview = () => {
        fetch(`http://localhost:3000/reviews/${thisReview.id}/vote`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ reaction: -1 })
        })
            .then(result => {
                if (result.error) {
                    throw new Error(result.message);
                }
                setDislikes('')
            })
            .catch(error => history.push('/error'))
    }


    const deleteReview = () => {
        fetch(`http://localhost:3000/admin/review/${thisReview.id}/`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
                'Content-Type': 'application/json',
            }

        })
            .then(result => {
                if (result.error) {
                    throw new Error(result.message);
                }

            })

            .catch(error => history.push('/error'))
    }


    const reviewText = () => {
        return editingMode ? <textarea style={{ fontFamily: '"Comfortaa", cursive', fontSize: '1.1vw', lineHeight: '3.3vh' }} className='textarea' onChange={(ev) => editingReview(ev.target.value)} value={newText} type='textarea' /> : text
    }

    const editingReview = (value) => {
        setNewText(value)
    }

    const updateReview = () => {
        setEditingMode(!editingMode)
        if (editingMode && text !== newText) {

            const reviewToSend = { content: newText }
            fetch(`http://localhost:3000/reviews/${thisReview.id}`, {
                method: 'PUT',
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
        }
    }

    const getavatar = () => {
        fetch(`http://localhost:3000/users`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(result => {
                if (Array.isArray(result)) {
                    setUsers( result.filter(u => u.username === thisReview.authorUsername)[0].avatar)
                } else {
                    throw new Error(result.message);
                }
            })
            .catch(error => { history.push('/error') })
    }


    return (
        <div className='review-container' style={style}>
            <img className='user-review-avatar' src={users} alt='avatar' />
            <div className='user-and-review'>
                <div className='side-titles' style={{ fontSize: '3.5vmin', display: 'inline-block' }}>{bookORusernam}</div>
                {user.role === 'Admin' &&
                    <>
                        <AdminButton AdminButtonLabel={editingMode ? 'Update' : 'Edit'} onClick={updateReview} style={{ marginTop: '0', textAlign: 'center', width: '4vw', marginLeft: '1vw' }} />
                        <AdminButton AdminButtonLabel='Delete' onClick={deleteReview} style={{ marginTop: '0', textAlign: 'center', width: '4vw' }} />
                    </>
                }
                {thisReview.authorUsername === user.username && user.role != 'Admin' &&
                    <>
                        <AdminButton AdminButtonLabel={editingMode ? 'Update' : 'Edit'} onClick={updateReview} style={{ marginTop: '0', textAlign: 'center', width: '4vw', marginLeft: '1vw' }} />
                        <AdminButton AdminButtonLabel='Delete' onClick={deleteReview} style={{ marginTop: '0', textAlign: 'center', width: '4vw' }} />
                    </>

                }
                <div className='side-text'>{reviewText()} </div>
            </div>
            <div className='voting-container' >
                <span style={{ position: 'absolute', marginTop: '1vh', marginLeft: '-1vw' }} className='side-text'>{likes}</span>
                <i onClick={likeReview} className="fas fa-thumbs-up"></i>
                <i onClick={dislikeReview} className="fas fa-thumbs-down"></i>
                <span style={{ position: 'absolute', marginTop: '1vh', marginLeft: '0.4vw' }} className='side-text'>{dislikes}</span>
            </div>

        </div>
    );
}

export default withRouter(ReviewComponent);