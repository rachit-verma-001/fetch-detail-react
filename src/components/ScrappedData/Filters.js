import SearchIcon from '@mui/icons-material/Search';
import { useState} from 'react';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { company_name } from './AddData';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(0),
  color: theme.palette.text.secondary,
}));


const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));


const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '12ch',
    },
  },
}));

export let dataFiltered = null;

export default function Filters() {

  const [firstName, setUserFirstName] = useState();

  const[filteredCompany, setFilteredCompany] = useState();
  const[filterCall, setFilterCall] = useState(false);
  const firstNameChangeHandler = (event) => {
    setUserFirstName(event.target.value);
  };

  const [lastName, setUserLastName] = useState();

  const lastNameChangeHandler = (event) => {
    setUserLastName(event.target.value);
  };

  const [email, setUserEmail] = useState();

  const emailChangeHandler = (event) => {
    setUserEmail(event.target.value);
  };

  const [city, setUserCity] = useState();

  const cityChangeHandler = (event) => {
    setUserCity(event.target.value);
  };

  const [designation, setUserDesignation] = useState();

  const designationChangeHandler = (event) => {
    setUserDesignation(event.target.value);
  };

  const filterData = () => {
    const axios = require('axios').default;

    try {
      axios.get('http://localhost:4000/api/v1/search', {
        params: {
          first_name: firstName,
          last_name:lastName,
          city:city,
          email:email,
          designation:designation,
          company_name: company_name
        },
        headers:{
          'X-USER-TOKEN': localStorage.getItem('token'),
          "X-USER-EMAIL":localStorage.getItem('email')
        }
      })
      .then(function (response) {
        if (response.data.success === false)
        {
          // alert(response.data.message)
          toast.error(response.data.message,  {
            position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
          // setIsFiltered(false)
        }
        else{

          dataFiltered = response.data;
          setFilterCall(true);
          setFilteredCompany(response.data)
        }

      })
      .catch(function (error) {
        console.log(error);
        toast.error(error,  {
          position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
        // alert(error);
      })
    } catch (error) {
      console.error(error);
      toast.error(error,  {
        position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
      // alert(error);
    }

  }

  return (<>

  <Grid container spacing={2}>
    <Grid item xs={6}>
      <Item>
        <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="First Name…"
              inputProps={{ 'aria-label': 'search' }} onChange={firstNameChangeHandler}
            />
        </Search>
      </Item>
    </Grid>

    <Grid item xs={6}>
      <Item>
        <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Last Name…"
              inputProps={{ 'aria-label': 'search' }} onChange={lastNameChangeHandler}
            />
        </Search>
      </Item>
    </Grid>


    <Grid item xs={6}>
      <Item>
        <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Email…"
              inputProps={{ 'aria-label': 'search' }} onChange={emailChangeHandler}
            />
        </Search>
      </Item>
    </Grid>


    <Grid item xs={6}>
      <Item>
        <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="City…"
              inputProps={{ 'aria-label': 'search' }} onChange={cityChangeHandler}
            />
        </Search>
      </Item>
    </Grid>

    <Grid item xs={12}>
      <Item>
        <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Designation…"
              inputProps={{ 'aria-label': 'search' }} onChange={designationChangeHandler}
            />
        </Search>
      </Item>
    </Grid>


  </Grid>

    <Grid item mt={2} container spacing={0} direction="column" alignItems="center" justifyContent="center" >
      <Button variant="contained" onClick={filterData} style={{width:'240px'}}>Filter</Button>
    </Grid>
    <ToastContainer position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover/>

  </>
)}