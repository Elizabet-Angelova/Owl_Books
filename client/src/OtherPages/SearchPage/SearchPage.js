import React, { useState, useEffect, useContext } from 'react';
import '.././../BooksPageContent/BooksPageContent.css'
import { withRouter } from 'react-router-dom'
import PageController from '../../MainPage/ComponentsMainPage/PageController/PageController';
import SingleBook from '../../MainPage/ComponentsMainPage/SingleBook/SingleBook';
import { LoadingContainer } from '../Loading';
import { getLoggedUser } from '../../Providers/UserContext';

const SearchPageContent = ({ history, match }) => {
   const [loading, setLoading] = useState(true);
   const [books, setBooks] = useState([]);
   const [page, setPage] = useState(1);
   const user = getLoggedUser()
   let searchString = match.params.searchString

   useEffect(() => {
      fetch(`http://localhost:3000/books/${searchString}/search`, {
         headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
         },

      }).then(result => result.json())
         .then(result => {
            if (result.error) {
               throw new Error(result.message);
            }
            if (result.length === 0) {
               setBooks([])
               return
            }
            setBooks(result)
         })
         .catch((er) => history.push('/error'))
         .finally(() => {
            setTimeout(() => {
               setLoading(false)
            }, 700)
         });
   }, [books])


   const size = 12
   const navigatePage = (pageNumber) => {
      if (pageNumber < 1 || pageNumber > Math.ceil(books.length / size)) {
         return
      }
      setPage(pageNumber)
   }


   const booksPage = books.filter((book, index) => {
      const firstIndex = (page - 1) * size
      const lastIndex = firstIndex + size
      return index >= firstIndex && index < lastIndex
   })

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



   return (
      <>
         <div className='books-container' style={loading ? { height: '90vh' } : { height: 'fit-content' }}>
            {loading ? <LoadingContainer /> : 
               books.length === 0 ?   <div className='side-titles' style={{gridColumn: '1 / span 4'}}>No books that match your search were found</div> 
               : booksPage.map(book => {
                  return <SingleBook id={book.id} book={book} loading={loading} key={book.id} id={book.id} bookTitle={book.name} bookAuthor={book.author} bookImg={book.img} buttonLabel={determineLabel(book)} />
               })
            }
         </div>
         {!books.length === 0 && <PageController page={page} navigatePage={navigatePage} />}
      </>
   );
}

export default withRouter(SearchPageContent);