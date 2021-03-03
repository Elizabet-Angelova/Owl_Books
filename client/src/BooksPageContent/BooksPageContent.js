import React, { useState, useEffect, useContext } from 'react';
import './BooksPageContent.css'
import SingleBook from '../MainPage/ComponentsMainPage/SingleBook/SingleBook';
import { LoadingContainer } from '../OtherPages/Loading';
import PageController from '../MainPage/ComponentsMainPage/PageController/PageController';
import ErrorPage from '../OtherPages/Error';
import { withRouter } from 'react-router-dom'
import {getLoggedUser} from '../Providers/UserContext'

const BooksPageContent = ({ history, location }) => {
   const [loading, setLoading] = useState(true);
   const [books, setBooks] = useState([]);
   const [page, setPage] = useState(1);
   const user = getLoggedUser()

   const size = 12
   const navigatePage = (pageNumber) => {
      if (pageNumber < 1 || pageNumber > Math.ceil(books.length / size)) {
         return
      }
      setPage(pageNumber)
   }

   useEffect(() => {
      fetch(`http://localhost:3000/books`, {
         headers: {
            Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
         },
      })
         .then(response => response.json())
         .then(result => {
            if (Array.isArray(result)) {
               if (location.pathname.includes('trending')) {
                  setBooks(result);
               } else {
                  setBooks(result.reverse());
               }
            } else {
               throw new Error(result.message);
            }
         })
         .catch(error => { history.push('/error') })
         .finally(() => {
            setTimeout(() => {
               setLoading(false)
            }, 700)
         });
   }, [books])

   const booksPage = books.filter((book, index) => {
      const firstIndex = (page - 1) * size
      const lastIndex = firstIndex + size
      return index >= firstIndex && index < lastIndex
   })

   const determineLabel = (book) => {
      if (book.borrowedBy){
         if (book.borrowedBy.id === user.id) {
              return book.borrowedBy.id === user.id ? 'Return' : 'Borrow'
         }
        if (book.borrowedBy.id !== user.id) {
            return book.borrowedBy.id !== user.id ? 'Borrowed' : 'Borrow' 
         }
      
      } 
      return 'Borrow'
      
  }

   

   return (
      <>
         <div className='books-container' style={loading ? { height: '90vh' } : { height: 'fit-content' }}>
            {loading  ? <LoadingContainer />:
               booksPage.map(book => {
                  return <SingleBook id={book.id} book={book} loading={loading} key={book.id} id={book.id} bookTitle={book.name} bookAuthor={book.author} bookImg={book.img} buttonLabel={determineLabel(book)} />
               })
            }
         </div>
         {!loading && <PageController page={page} navigatePage={navigatePage} />}
      </>
   );
}

export default withRouter(BooksPageContent);