import React, { useState } from 'react';
import './CreateNewBook.css'
import FormInput from '../../../LandingPage/ComponentsLandingPage/Form/input/input';
import AdminButton from './AdminButton';
import { useHistory } from 'react-router-dom';

const CreateNewBookPage = () => {

  const history = useHistory();

  const [book, setBook] = useState({
    name: '',
    author: '',
    description: '',
    img: '',
  });

  //render function
  const updateBook = (prop, value) => setBook({ ...book, [prop]: value });

  //create new book
  const createBook = () => {
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

    

    fetch(`http://localhost:3000/admin`, {
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
      <FormInput style={{ display: 'grid', marginBottom: '4vh' }} label='Title' value={book.name} onChange={(ev) => updateBook('name', ev.target.value)} />

      <FormInput style={{ display: 'grid', marginBottom: '4vh' }} label='Author' value={book.author} onChange={(ev) => updateBook('author', ev.target.value)} />

      <FormInput style={{ display: 'grid', marginBottom: '4vh' }} label='Description' value={book.description} onChange={(ev) => updateBook('description', ev.target.value)} />

      <FormInput style={{ display: 'grid', marginBottom: '4vh' }} label='Image URL' value={book.img} onChange={(ev) => updateBook('img', ev.target.value)} />

      <AdminButton style={{ padding: '1vw', width: 'fit-content', textAlign: 'center', fontSize: '1.4vw', marginLEft: '3vw' }} AdminButtonLabel='Create Book' onClick={() => createBook()}/>
    </div>
  );
}

export default CreateNewBookPage;