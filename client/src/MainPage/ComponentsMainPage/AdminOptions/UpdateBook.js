import React, { useState, useEffect } from 'react';
import './CreateNewBook.css'
import FormInput from '../../../LandingPage/ComponentsLandingPage/Form/input/input';
import AdminButton from './AdminButton';
import { withRouter } from 'react-router-dom';

const UpdateBookPage = ({match, history}) => {
  const bookId = match.params.id
  const [book, setBook] = useState({})

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
}, [])

const updateField = (prop, value) => setBook({ ...book, [prop]: value });


const updateBook = () => {
  if (!book.name) {
    alert('Invalid book name')
 }
 if (!book.author) {
     alert('Invalid book author')
 }
 if (!book.description) {
     alert('Invalid description')
 }
 if (!book.img) {
     alert('Invalid img')
 }

 

 fetch(`http://localhost:3000/admin/${book.id}/`, {
     method: 'POST',
     headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
     },
     body: JSON.stringify(book),
 })
 
    
     .then(result => {
         if (result.error) {
             return alert(result.message);
         }
         history.push('/books');
     })
     
}


  return (
    <div className='new-book-page-container'>
      <FormInput style={{ display: 'grid', marginBottom: '4vh' }} label='New title' value={book.name} onChange={(ev)=> updateField('name', ev.target.value)} />

      <FormInput style={{ display: 'grid', marginBottom: '4vh' }} label='New author' value={book.author} onChange={(ev)=> updateField('author', ev.target.value)} />

      <FormInput style={{ display: 'grid', marginBottom: '4vh' }} label='New description' value={book.description} onChange={(ev)=> updateField('description', ev.target.value)} />

      <FormInput style={{ display: 'grid', marginBottom: '4vh' }} label='New image URL' value={book.img} onChange={(ev)=> updateField('img', ev.target.value)}/>

      <AdminButton style={{ padding: '1vw', width: 'fit-content', textAlign: 'center', fontSize: '1.4vw', marginLEft: '3vw' }} AdminButtonLabel='Update Book' onClick={()=> updateBook()}/>
    </div>
  );
}

export default withRouter(UpdateBookPage);