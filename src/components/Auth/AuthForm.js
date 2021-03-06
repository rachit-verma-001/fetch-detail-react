import { useState, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import AuthContext from '../../store/auth-context';
import classes from './AuthForm.module.css';
import {ngrokUrl } from '../../store/HostUrl';

const AuthForm = () => {
  const history = useHistory();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  // const [isLoading, setIsLoading] = useState(false);


  const [error, setError] = useState(false);
  const[message, setMessage] = useState();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // if (enteredPassword.length < 5) {
    //   alert('Password must contain atleast 5 characters');
    //   return;
    // }

    // setIsLoading(true);
    let url;

    if (isLogin) {
      // url ='https://react-fetch-detail.herokuapp.com/users/sign_in';
        // url=`${ngrokUrl}/api/v1/auth/sign_in"
        url = `${ngrokUrl}/api/v1/users/sign_in`
      } else {
        // url ='https://react-fetch-detail.herokuapp.com/users';
        // url=`${ngrokUrl}/api/v1/auth"
      url = `${ngrokUrl}/api/v1/users`
    }

    // if (url === "https://react-fetch-detail.herokuapp.com/users")
    if (url === `${ngrokUrl}/api/v1/users`)
    // if (url === "http://460b-157-47-214-197.ngrok.io/api/v1/auth")

    {
      fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          user:
          {
            email: enteredEmail,
            password: enteredPassword,
            password_confirmation: enteredPassword
          }
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        // setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = data.message;
            throw new Error(errorMessage);
          });
        }
      })
      .catch((err) => {
        alert(err.message);
        setIsLogin(true);
        history.replace('/auth');
      });
    }

    else {
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        user:
        {
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true
        }
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        // setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = data.message;
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {

        const expirationTime = new Date(
          new Date().getTime() + 28800000
        );

        // authCtx.login(data.user.auth_token, data.user.email, expirationTime.toISOString());
        authCtx.login(data.user.auth_token, data.user.email);

        history.replace('/');
      })
      .catch((err) => {
        setError(true);
        setMessage(err.message);
        // alert(err.message);
      });
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email' style={{float:'left'}}>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef}  />
        </div>
        <div className={classes.control}>
          <label htmlFor='password' style={{float:'left'}}>Your Password</label>
          <input
            type='password'
            id='password'
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          { (
            // <button>{isLogin ? 'Login' : 'Create Account'}</button>
            <button>{isLogin ? 'Login' : 'Create Account'}</button>
          )}
          {/* {isLoading && <p>Sending request...</p>} */}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {/* {isLogin ? 'Create new account' : 'Login with existing account'} */}
          </button>
          {/* <Button variant="contained">Hello World</Button> */}
        </div>
      </form>
          {error &&
            <span style={{ color: 'red' }}>{message}</span>}
    </section>
  );
};

export default AuthForm;
