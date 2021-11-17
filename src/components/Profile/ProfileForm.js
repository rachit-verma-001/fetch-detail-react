// import { useRef, useContext } from 'react';
import { useRef } from 'react';
import { useHistory } from 'react-router-dom';
// import AuthContext from '../../store/auth-context';
import classes from './ProfileForm.module.css';
import { localUrl, ngrokUrl } from '../../store/HostUrl';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
    axios.put(`${ngrokUrl}/api/v1/change_password`, password, { headers })
    .then((responseData) => { console.log(responseData);
        toast.success("Password updated successfully",  {
          position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
          onClose: () => history.replace('/')
        });
    })
    .catch((error) => { console.log(error); alert('Something Went Wrong') })
  };

  return (<>
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength="7" required ref={newPasswordInputRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    <ToastContainer position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover/>
    </form>
    </>
  );
};

export default ProfileForm;
