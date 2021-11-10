import Card from '../UI/Card';
import { useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled, alpha } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import Box from '@material-ui/core/Box';
import Input from '@mui/material/Input';
// import Filters from './Filters'
// import { dataFiltered } from './Filters';
import Csv from './ExportCsv'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';



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

// const Item = styled(Paper)(({ theme }) => ({
//   ...theme.typography.body2,
//   padding: theme.spacing(0),
//   color: theme.palette.text.secondary,
// }));


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


const ariaLabel = { 'aria-label': 'description' };

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
  height:'237px'
});


const useStyles = makeStyles((theme) => ({
  dataClass:{
    maxWidth: "60rem",
    width: "90%",
    margin: "2rem auto",
    animation: "data-appear 1s ease-out forwards",
  },
}));

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

let company_name = null;

const AvailableData = (props) => {

  const [firstName, setUserFirstName] = useState();
  const [isFiltered, setIsFiltered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const[filteredCompany, setFilteredCompany] = useState();
  // const[filterCall, setFilterCall] = useState(false);
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

  const filterData =  async (event) => {
    event.preventDefault();
    const axios = require('axios').default;

    try {
      axios.get('http://c2c8-122-168-240-116.ngrok.io/api/v1/search', {
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
          setIsFiltered(false)
        }
        else{

          // dataFiltered = response.data;
          setFilteredCompany(response.data)
          setIsFiltered(true);
          setIsFetched(false);
          // setFilterCall(true);
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
    }

  }

  const data_classes = useStyles();
  const [isFetched, setIsFetched] = useState(false);
  const [userData, setUserData] = useState({});
  const [showDetails, setShowDetails] = useState(false);
  const [url, setUrl] = useState('');
  const [name, setName] = useState('');

  const [error, setError] = useState(false);
  const[message, setMessage] = useState();

  let heading_title;
  let employee_details;
  let founders_details;

  let filtered_employee_details;
  let filtered_founders_details;

  const switchDetailModeHandler = async (event) => {
    let sent_url;
    event.preventDefault();
    if (event.nativeEvent.submitter.name === "Fetch"){
      sent_url = "http://c2c8-122-168-240-116.ngrok.io/api/v1/company_profile"
    }
    else{
      setIsLoading(true);
      sent_url = "http://c2c8-122-168-240-116.ngrok.io/api/v1/resync"
      // sent_url = "http://localhost:4000/api/v1/company_profile"

    }
    const axios = require('axios').default;

    // if (!isFetched){
      if(!showDetails){
      try {
        axios.get(sent_url, {
          params: {
            company_name: name,
            url:url
          },
          headers:{
            'X-USER-TOKEN': localStorage.getItem('token'),
            "X-USER-EMAIL":localStorage.getItem('email')
          }
        })
        .then(function (response) {
          setIsLoading(false);
          if (response.data.success === false)
          {
            setError(true);
            setMessage(response.data.message);
            toast.error(response.data.message,  {
              position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });

            // alert(response.data.message)
          }
          else{

          setUserData(response.data)
          setIsFetched(true);
          setIsFiltered(false);
          setShowDetails(true);}
          setError(false);
        })
        .catch(function (error) {
          setIsLoading(false);
          console.log(error);
          toast.error("No Such Company Details Present",  {
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
        setIsLoading(false);
        // alert(error)
        console.error(error);
        toast.error("No Such Company Details Present",  {
          position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      }

    }
    else
    {
      if (showDetails){
      setShowDetails(false);
      }
      else{
        setShowDetails(true);
      }
    }

  };

  if (isFetched)
  {
    heading_title = (
    <div>
      <h2>{userData.company_detail.name}</h2>
      <p> {userData.company_detail.tagline}</p>
      <p>Followers:{userData.company_detail.followers}</p>
      <p>No of employees:{userData.company_detail.no_of_employees}</p>
    </div>
    );
    company_name = userData.company_detail.name;
    employee_details = userData.employee_details.map((user) => (
      <Data user = {user}/>
    ));

    founders_details = userData.founder_details.map((user) => (
      <Data user = {user}/>
      ));
  }

  if (isFiltered)
  {

    heading_title = (
      <div>
        <h2>{userData.company_detail.name}</h2>
        <p> {userData.company_detail.tagline}</p>
        <p>Followers:{userData.company_detail.followers}</p>
        <p>No of employees:{userData.company_detail.no_of_employees}</p>
      </div>
      );

    filtered_employee_details = filteredCompany.employee_details.map((user) => (
      <Data user = {user}/>
    ));

    filtered_founders_details = filteredCompany.founder_details.map((user) => (
      <Data user = {user}/>
    ));
  }


  function Data(props){
    return (<div>
      <Card>
        <Grid container spacing={0} >
          <Grid item md={8}>
            <Item><p><u><b>Name:</b></u>  {props.user.first_name + " " + props.user.last_name}</p></Item>
            <Item><p><u><b>Designation:</b></u>  {props.user.designation}</p></Item>
            <Item><p><u><b>City:</b></u>  {props.user.city}</p></Item>
            <Item><p><u><b>Email:</b></u>  {props.user.email}</p></Item>
            <Item><p><u><b>Phone:</b></u>  {props.user.mobile_no}</p></Item>
            {/* <Item><p><u><b>Description:</b></u>  {props.user.description}</p></Item> */}
          </Grid>
          <Grid item>
            <ButtonBase sx={{ width: 226 }}>
              <Img alt="complex" src={props.user.image} />
            </ButtonBase>
            </Grid>
        </Grid>
      </Card>
    </div>)
  }

  return (
    <section className={data_classes.dataClass}>
      <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">
      <form alignItems="center" onSubmit={switchDetailModeHandler}>
        <div >
          <Input placeholder="Name" inputProps={ariaLabel} required onChange={e => setName(e.target.value)} disabled={showDetails} style={{width:"500px"}}  />
        </div>
        <div >
          <Input placeholder="Url" inputProps={ariaLabel} required onChange={e => setUrl(e.target.value)} disabled={showDetails} style={{width:"500px", marginTop:"10px"}}  />
        </div>

        <Grid container spacing={2}>
          <Grid item>
            <Box pt={2}>
              <Button variant='outlined'
                  type='submit' sx = {{mt:20}}
                  className={data_classes.toggle} name="Fetch"
                disabled = {isLoading}>
                  {showDetails ? 'Hide Details' : 'Fetch Detais'}
                </Button>
            </Box>
          </Grid>
          <Grid item>
            <Box pt={2}>

              {/* <Button variant="outlined"
                  type='submit' sx = {{mt:20}}
                  className={data_classes.toggle} name="Resync" disabled={showDetails}
                >
                  Resync
                  {/* {showDetails ? 'Hide Details' : 'Resync'} */}
                {/* </Button> */}


                {!isLoading && (
            // <button>{isLogin ? 'Login' : 'Create Account'}</button>
            <Button variant="outlined"
            type='submit' sx = {{mt:20}}
            className={data_classes.toggle} name="Resync" disabled={showDetails}
          >
            Resync
            {/* {showDetails ? 'Hide Details' : 'Resync'} */}
          </Button>
            // <button>{isLogin ? 'Login' : 'Create Account'}</button>
          )}
          {isLoading &&


          <Button variant="outlined"
          type='submit' sx = {{mt:20}}
          className={data_classes.toggle} name="Resync" disabled={true}
        >
          Resyncing..
          {/* {showDetails ? 'Hide Details' : 'Resync'} */}
        </Button>
          }








            </Box>






          </Grid>
        </Grid>
      </form>
      </Grid>
      {showDetails && <div> <Card>
      <ul><li>{heading_title}</li></ul>
      </Card>
      <Card>
        {/* <Filters handleClick = {() => handleButtonClick()}/> */}
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
  <Grid container spacing={2}>
    <Grid item xs={6} mt={2} container spacing={0} direction="column" alignItems="center" justifyContent="center" >
      <Button variant="outlined" onClick={filterData} style={{width:'240px'}}>Filter</Button>
    </Grid>
    <Grid item xs={6} mt={2} spacing={0} direction="column" alignItems="center" justifyContent="center"><Csv/></Grid>
  </Grid>
      <ul><li><h2>Founders Details:</h2><br></br>{isFiltered ? filtered_founders_details : founders_details}</li></ul>
      </Card>
      <Card>
      <ul><li><h2>Employee Details:</h2><br></br>{isFiltered ? filtered_employee_details : employee_details}</li></ul>
      </Card></div>}
      {error &&
            <span style={{ color: 'red' }}>{message}</span>}
                <ToastContainer position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover/>
    </section>
  );
};

export default AvailableData;
