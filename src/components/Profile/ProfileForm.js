// import { useRef, useContext } from 'react';
import { useRef } from 'react';
import { useHistory } from 'react-router-dom';
// import AuthContext from '../../store/auth-context';
import classes from './ProfileForm.module.css';

const ProfileForm = () => {
  const history = useHistory();

  const newPasswordInputRef = useRef();
  // const authCtx = useContext(AuthContext);
  const submitHandler = (event) => {

    event.preventDefault();
    const enteredNewPassword = newPasswordInputRef.current.value;
    const password = { update_password: enteredNewPassword };
    const headers = {
      'X-USER-TOKEN': localStorage.getItem('token'),
      "X-USER-EMAIL":localStorage.getItem('email')
    };
    const axios = require('axios').default;
    axios.put('http://localhost:4000/api/v1/change_password', password, { headers })
    .then((responseData) => { console.log(responseData);
      alert('password updated successfully')
      history.replace('/');
    })
    .catch((error) => { console.log(error); alert('Something Went Wrong') })

  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength="7" required ref={newPasswordInputRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
