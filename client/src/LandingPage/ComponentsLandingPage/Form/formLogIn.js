import React, { useState, useContext, useEffect } from 'react';
import './form.css'
import FormInput from './input/input';
import FormButton from './formButton/formButton';
import { useHistory } from "react-router-dom";
import UserContext from '../../../Providers/UserContext';
import jwtDecode from 'jwt-decode';

const FormLogIn = ({ style }) => {

    const BASE_URL = 'http://localhost:3000'

    const history = useHistory();

    const { setUser } = useContext(UserContext);

    const [user, setUserObject] = useState({
        username: '',
        password: ''
    });


    const logIn = () => {
        if (!user.username) {
            return alert('Invalid username');
        }
        if (!user.password) {
            return alert('Invalid password');
        }

        fetch(`${BASE_URL}/session`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        })
            .then(r => r.json())
            .then(result => {
                if (result.error) {
                    return alert(result.message);
                }

                try {
                    const payload = jwtDecode(result.token);
                    setUser(payload);
                    
                } catch (e) {
                    return alert(e.message);
                }
                localStorage.setItem('token', result.token);
                history.push('/trending');
            })
            .catch(() => history.push('/error'));
    }

    const updateUser = (prop, value) => {
        setUserObject({ ...user, [prop]: value });
    }

    const handleKeyPress = (event) => {
        if (event.charCode === 13) {
           logIn()
        }
    }

    return (
        <div className='form-container' style={style} onKeyPress={(ev) => handleKeyPress(ev)}>
            <FormInput placeholder='Username' label='Username:' type='text' value={user.username} onChange={(ev) => updateUser('username', ev.target.value)}
                style={{ gridRow: '9 / span 2', gridColumn: '7 / span 10' }} />
            <FormInput placeholder='Password' label='Password:' type='password' value={user.password} onChange={(ev) => updateUser('password', ev.target.value)}
                style={{ gridRow: '11 / span 2', gridColumn: '7 / span 10', marginTop: '1.5rem' }} />
            <FormButton label='log in' onClick={() => logIn()} 
                style={{ gridRow: '15 / span 3', gridColumn: '8 / span 5', marginTop: '1.5vmin' }}

            />
        </div>
    );
}

export default FormLogIn;