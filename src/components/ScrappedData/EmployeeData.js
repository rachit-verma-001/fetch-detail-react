import * as React from 'react';
import {useParams} from 'react-router-dom';
import { useEffect} from 'react';
import Grid from '@mui/material/Grid';
import Card from '../UI/Card';
import { styled} from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState} from 'react';
import ButtonBase from '@mui/material/ButtonBase';
import DropDownFilter from "./DropDownFilter"
import { ngrokUrl } from '../../store/HostUrl';



const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
  height:'237px'
});


const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));



const EmployeeData = (props) => {

  const { id } = useParams();
  console.log(id)
  let heading_title;
  let employee_details;
  let founders_details;


  const [isFetched, setIsFetched] = useState(false);
  const [userData, setUserData] = useState({});
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
      const axios = require('axios').default;
      try {
        axios.get(`${ngrokUrl}/api/v1/companies/${id}`, {
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
            setUserData(response.data)
            setIsFetched(true);
            // setIsFiltered(false);
            setShowDetails(true);
          }
            // setError(false);



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


  }, [id]);



  if (isFetched)
  {
    console.log(userData)
    heading_title = (
    <div>
      <h2>{userData.company.name}</h2>
      <p> {userData.company.tagline}</p>
      <p>Followers:{userData.company.followers}</p>
      <p>No of employees:{userData.company.no_of_employees}</p>
       {/* <h2>Protonshub</h2>
      <p> Tagline:</p>
      <p>Followers:</p>
      <p>No of employees:</p> */}

    </div>
    );
    // company_name = userData.company_detail.name;

    console.log(userData,"deta")
    employee_details = userData.employee_details.map((user) => (
      <Data user = {user}/>
    ));

    founders_details = userData.founders_details.map((user) => (
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

  console.log(userData)
let filteredData =(founderDetails,employeeDetails)=>{


  let data = {}
  
  data.founders_details = founderDetails
  data.employee_details = employeeDetails
  console.log(data.founders_details)

  setUserData({company:userData.company,founders_details:founderDetails,employee_details:employeeDetails })

  console.log(data.founders_details)

  console.log(founderDetails,employeeDetails)


  // setUserData(userData.founders_details)
  // userData.employee_details

}

useEffect(()=>{
  console.log(userData)
},[userData])



  return (

    <section >

      <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">

      </Grid>

      {showDetails && <div> <Card>
      <ul><li>{heading_title}</li></ul>
      </Card>
      
      <Card> 
      <DropDownFilter   userData = {userData}  filteredData={filteredData} />
      </Card>
      <Card>
        {/* <Filters handleClick = {() => handleButtonClick()}/> */}
        <Grid container spacing={2}>
    {/* <Grid item xs={6}>
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
    </Grid> */}

    {/* <Grid item xs={6}>
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
    </Grid> */}


    {/* <Grid item xs={6}>
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
    </Grid> */}


    {/* <Grid item xs={6}>
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
    </Grid> */}

    {/* <Grid item xs={12}>
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
    </Grid> */}


  </Grid>

  {/* <Grid container spacing={2}>
    <Grid item xs={6} mt={2} container spacing={0} direction="column" alignItems="center" justifyContent="center" >
      <Button variant="outlined" onClick={filterData} style={{width:'240px'}}>Filter</Button>
    </Grid>
    <Grid item xs={6} mt={2} spacing={0} direction="column" alignItems="center" justifyContent="center"><Csv/></Grid>
  </Grid> */}

      <ul><li><h2>Founders Details:</h2><br></br>{founders_details}</li></ul>
      </Card>
      <Card>
      <ul><li><h2>Employee Details:</h2><br></br>{employee_details}</li></ul>
      </Card></div>}
      {/* {error &&
        <span style={{ color: 'red' }}>{message}</span>} */}
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
}

export default EmployeeData