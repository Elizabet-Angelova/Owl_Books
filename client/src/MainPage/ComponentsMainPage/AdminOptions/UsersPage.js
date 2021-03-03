import React, { useState, useEffect, useContext } from 'react';
import './UsersPage.css'
import { withRouter } from 'react-router-dom';
import AdminButton from './AdminButton';
import { getLoggedUser } from '../../../Providers/UserContext'
import jwtDecode from 'jwt-decode';
import { UserContext } from '../../../Providers/UserContext.js';


const SingleUser = ({ user, history }) => {
   const [banDate, setBanDate] = useState('')

   const BanFunc = () => {
      let body = {
         period: Number(banDate)
      }
      fetch(`http://localhost:3000/admin/${user.id}/ban`, {
         method: 'POST',
         headers: {
            Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(body)
      })
         .then(result => {
            if (result.error) {
               throw new Error(result.message)
            }
         })
         .catch(error => alert(error.message));
   }

   const setBanValue = (ev) => {
      setBanDate(ev.target.value)
   }

    const deleteUser = (id) => {
      fetch(`http://localhost:3000/admin/${id}`, {
         method: 'PUT',
         headers: {
             'Content-Type': 'application/json',
             Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
         },
     })
         .then(result => {
             if (result.error) {
                alert(result.message);
             }
             alert(`User with ID:${id} has been deleted!`)
         })
         .catch(() => history.push('/error'));
 }
    

   return (
       <div className='single-user-container'>
           <img className='user-avatar' src={user.avatar} alt='avatar'/>
           <div style={{gridCol: '2 / span 1'}}>
           <div className='side-titles' style={{color: 'white', display: 'inline-block'}}>{user.username}</div>
           <AdminButton style={{height: '3.4vh', marginTop: '0', padding: '0.1vw', width: 'fit-content', marginLeft: '1vw', marginRight: '0'}} 
           AdminButtonLabel={<input key={user.id} value={banDate} onChange={setBanValue} style={{padding: '0.1vw', width: '6vw', height: '2vh', fontSize: '1vw'}} placeholder='ban period'/>}/>
           <AdminButton style={{height: '3.4vh', width: '2.7vw', marginTop: '0', textAlign: 'center', padding: '0.1vw', marginLeft: '0'}} 
           AdminButtonLabel='Ban' onClick={BanFunc}/>
           <AdminButton style={{height: '3.4vh', marginTop: '0', padding: '0.1vw', textAlign: 'center'}} 
           AdminButtonLabel='Delete'onClick={() => deleteUser(user.id)}/>
           <div className='side-titles' style={{fontSize: '1.4vw', color: 'rgba(0, 0, 0, 0.7)', margin:'0'}}>{user.displayName}</div>
           <div className='side-text'>Ban: {user.banEndDate ? user.banEndDate : 'this user is not banned'}</div>
       </div>
       </div>
   )
}

const UsersPageContent = ({ history }) => {
   const [users, setUsers] = useState([])

   useEffect(() => {
      fetch(`http://localhost:3000/users`, {
         headers: {
            Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
         },
      })
         .then(response => response.json())
         .then(result => {
            if (Array.isArray(result)) {
               setUsers(result);
            } else {
               throw new Error(result.message);
            }
         })
         .catch(error => { history.push('/error') })
   }, [users])

   return (
      <div className='users-container'>
         {users.map(user => {
            return <SingleUser key={user.id} user={user} history={history} />
         })}
      </div>
   );
}



export default withRouter(UsersPageContent);