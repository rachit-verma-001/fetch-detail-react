import React, { useState, useEffect, useCallback } from 'react';

let logoutTimer;

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpirationTime - currentTime;
  // const remainingDuration = 2880000000;
  return remainingDuration;
};

const retrieveStoredToken = () => {

  const storedToken = localStorage.getItem('token');

  const storedExpirationDate = localStorage.getItem('expirationTime');

  const remainingTime = calculateRemainingTime(storedExpirationDate);

  if (remainingTime <= 5600)
  {
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime,
  };
};

export const AuthContextProvider = (props) => {
  const tokenData = retrieveStoredToken();

  let initialToken;
  if (tokenData) {
    initialToken = tokenData.token;
  }

  const [token, setToken] = useState(initialToken);

  const userIsLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('expirationTime');

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = (token, email, expirationTime) => {
    setToken(token);

    localStorage.setItem('token', token);
    localStorage.setItem('email', email);

    const expirationTime2 = new Date(
      new Date().getTime() + 28800000
      );

      localStorage.setItem('expirationTime', expirationTime2);

    const remainingTime = calculateRemainingTime(expirationTime2);


    // localStorage.setItem('expirationTime', expirationTime);

    // const remainingTime = calculateRemainingTime(expirationTime);

    // logoutTimer = setTimeout(logoutHandler, remainingTime);
    // logoutTimer = setTimeout(logoutHandler, remainingTime);

  };

  useEffect(() => {
    if (tokenData) {
      console.log(tokenData.duration);
      // logoutTimer = setTimeout(logoutHandler);
    }
  }, [tokenData, logoutHandler]);

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
