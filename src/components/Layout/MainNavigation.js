import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import { useContext } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import AuthContext from '../../store/auth-context';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  button_color: {
    color: 'white',
  }
}));


const MainNavigation = () => {
  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = () => {
    authCtx.logout();
  };

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            </IconButton>
          <Typography variant="h6" className={classes.title}>
            {/* Detail Fetch */}
            <Button><Link to='/' style={{ textDecoration: 'none' }} className={classes.button_color}>Web Scrapping</Link></Button>
          </Typography>
          {/* <Button color="inherit" >Login</Button> */}
          <nav>
            <ul>
              {!isLoggedIn && (
                <li>
                  <Link to='/auth' className={classes.button_color}>Login</Link>
                </li>
              )}
              {isLoggedIn && (
                <li>
                  <Button><Link to='/profile' style={{ textDecoration: 'none' }} className={classes.button_color}>Profile</Link></Button>
                </li>
              )}
              {isLoggedIn && (
                <li>
                  <Button onClick={logoutHandler} className={classes.button_color}>Logout</Button>
                </li>
              )}
            </ul>
          </nav>
        </Toolbar>
      </AppBar>
    </div>
  );

}

export default MainNavigation;