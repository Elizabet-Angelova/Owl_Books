import React, { useContext, useState, createContext } from 'react';
import './SearchBarComponent.css'
import { withRouter } from 'react-router-dom'
import AdminButton from '../AdminOptions/AdminButton';
import UserContext from '../../../Providers/UserContext';
import { getLoggedUser } from '../../../Providers/UserContext';

const SearchBarComponent = ({ history }) => {
    const [searchString, setSearchString] = useState('')
    const [booksFromSearch, setBooksFromSearch] = useState([])

    const { setUser } = useContext(UserContext);
    const user = getLoggedUser()

    const navigatToLanding = () => {
        history.push('/home')
    }

    const navigatToUsers = () => {
        history.push('/users')
    }

    const navigatToCreate = () => {
        history.push('/books/create')
    }

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
        navigatToLanding();

    }

    const updateSearchString = (value) => setSearchString(value)

    const searchBook = () => {
        history.push(`/search/${searchString}`)
        setSearchString('')

    }

    const handleKeyPress = (event) => {
        if (event.charCode === 13) {
            searchBook()
        }
    }

    return (
        <div className='search-bar-container'>
            {user.role === 'Admin' &&
                <>
                    <AdminButton AdminButtonLabel='New book' onClick={navigatToCreate} style={{ marginTop: '0', textAlign: 'center', width: '6vw' }} />
                    <AdminButton AdminButtonLabel='Users' onClick={navigatToUsers} style={{ marginTop: '0vh', textAlign: 'center', marginRight: '2vw' }} />
                </>
            }
            <span onClick={() => console.log(booksFromSearch)} ><i className="fas fa-search"></i></span>
            <input type='text' placeholder='Search' onKeyPress={(ev) => handleKeyPress(ev)} value={searchString} onChange={ev => updateSearchString(ev.target.value)} />
            <span className='log-out-button' onClick={logout}
            >Log out</span>
        </div>
    );
}

export default withRouter(SearchBarComponent);