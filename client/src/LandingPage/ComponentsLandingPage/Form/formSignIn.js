import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import './form.css'
import FormInput from './input/input';
import FormButton from './formButton/formButton';


const BASE_URL = 'http://localhost:3000'

const FormSignIn = ({ style }) => {
    const history = useHistory()
    const [success, setSuccess] = useState(false)

    const [user, setUser] = useState({
        username: {
            value: '',
            touched: false,
            valid: undefined,
        },
        firstName: {
            value: '',
            touched: false,
            valid: undefined,
        },
        lastName: {
            value: '',
            touched: false,
            valid: undefined,
        },
        password: {
            value: '',
            touched: false,
            valid: undefined,
        }
    });



    const updateUser = (prop, value) => setUser({
        ...user,
        [prop]: {
            value,
            touched: true,
            valid: userValidators[prop].reduce((isValid, validatorFn) => isValid && (typeof validatorFn(value) !== 'string'), true),
        }
    });


    const getValidationErrors = (prop) => {
        return userValidators[prop].map((validatorFn) => validatorFn(user[prop].value))
            .filter(value => typeof value === 'string');
    }



    const signUp = () => {

        const userToSend = {
            username: user.username.value,
            displayName: `${user.firstName.value} ${user.lastName.value}`,
            password: user.password.value
        }

        fetch(`${BASE_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userToSend),
        })

            .then(result => {
                if (result.error) {
                    return alert(result.message);
                }
                
                setSuccess(true)
                setTimeout(() => {
                    setSuccess(false)
                    history.go(0);
                }, 2700)
            })
            .catch(() => history.push('/error'))

    }

    const handleKeyPress = (event) => {
        if (event.charCode === 13) {
            signUp()
        }
    }

    const getClassNames = (prop) => {
        let classes = '';
        if (user[prop].touched) {
            classes += ' touched '
        }
        if (user[prop].valid) {
            classes += ' valid ';
        } 
        if (user[prop].invalid) {
            classes += ' invalid ';
        } else {
            classes += ''
        }

        return classes
    }

    // const validateForm = () => {
    //     const isUsernameValid = user.username.touched && user.username.valid
    //     const isPasswordValid = user.password.touched && user.password.valid
    //     return !(isUsernameValid && isPasswordValid)
    // }

    const validateForm = () => !Object
    .keys(user)
    .reduce((isValid, prop) => isValid && user[prop].valid && user[prop].touched, true)

    const userValidators = {
        username: [
            value => value?.length >= 4 || 'Username should be at least 4 characters',
            value => value?.length <= 12 || 'Username should be no more than 12 characters',
            value => /^[^<>%$#&@*-/@!?^=`'"]*$/.test(value) || 'Username can only contain "_"',

        ],
        firstName: [
            value => value?.length >= 4 || 'First name should be at least 4 characters',
            value => value?.length <= 12 || 'First name should be no more than 12 characters',
            value => /^[^<>%$#&@*-/._@!?^=`'"]*$/.test(value) || 'First name can\'t contain special characters',
        ],
        lastName: [
            value => value?.length >= 4 || 'Last name should be at least 4 characters',
            value => value?.length <= 12 || 'Last name should be no more than 12 characters',
            value => /^[^<>%$#&@*-/._@!?^=`'"]*$/.test(value) || 'Last name can\'t contain special characters',
        ],
        password: [
            value => value?.length >= 4 || 'Password should be at least 4 characters',
            value => value?.length <= 12 || 'Password should be no more than 12 characters',
            value => /[a-z]/.test(value) || 'Password should contain at least 1 letter',
            value => /[0-9]/.test(value) || 'Password should contain at least 1 number',
            value => /^[^<>%$#&@*-/._@!?^=`'"]*$/.test(value) || 'Password can\'t contain special characters',
        ],
    };

    return (
        <div className='form-container' style={style} onKeyPress={(ev) => handleKeyPress(ev)}>
            <FormInput placeholder='Username' className={getClassNames('username')} value={user.username.value} type='text' onChange={(ev) => updateUser('username', ev.target.value)}
                style={{ gridRow: '5 / span 2', gridColumn: '7 / span 10'}} 
                label={user.username.touched && !user.username.valid 
                ? getValidationErrors('username').filter((er) => getValidationErrors('username').indexOf(er) === 0 && <div style={{marginTop:'-3.8vh'}}>{er}</div>)
                : 'Username:'} />
            <FormInput placeholder='First Name' className={getClassNames('firstName')} value={user.firstName.value} type='text' onChange={(ev) => updateUser('firstName', ev.target.value)}
                style={{ gridRow: '8 / span 2', gridColumn: '7 / span 10'}} 
                label={user.firstName.touched && !user.firstName.valid 
                    ? getValidationErrors('firstName').filter((er) => getValidationErrors('firstName').indexOf(er) === 0 && <div style={{marginTop:'-3.9vh'}}>{er}</div>)
                    : 'First Name:'} />
            <FormInput id='lastName' placeholder='Last Name' className={getClassNames('lastName')} value={user.lastName.value} type='text' onChange={(ev) => updateUser('lastName', ev.target.value)}
                style={{ gridRow: '11 / span 2', gridColumn: '7 / span 10'}} 
                label={user.lastName.touched && !user.lastName.valid 
                    ? getValidationErrors('lastName').filter((er) => getValidationErrors('lastName').indexOf(er) === 0 && <div style={{marginTop:'-3.9vh'}}>{er}</div>)
                    : 'Last Name:'} />
            <FormInput placeholder='Password' className={getClassNames('password')} value={user.password.value} type='password' onChange={(ev) => updateUser('password', ev.target.value)}
                style={{ gridRow: '14 / span 2', gridColumn: '7 / span 10'}} 
                 label={user.password.touched && !user.password.valid 
                ? getValidationErrors('password').filter((er) => getValidationErrors('password').indexOf(er) === 0 && <div style={{marginTop:'-3.9vh'}}>{er}</div>)
                : 'Password:'}/>
            <FormButton label='sign up' onClick={() => signUp()}
                style={{ gridRow: '17 / span 4', gridColumn: '8 / span 5', marginTop: '1.4rem' }} />
                {success ? <div className='side-titles' style={{gridRow: '19 / span 4', gridColumn: '3 / span 20', lineHeight: '4vh', fontSize: '1.5vw', marginTop: '2.6vh', color:'green'}}>✔️ Successfully signed in! Please log into your account.</div> 
                : ''}
        </div>
    );
}

export default FormSignIn;