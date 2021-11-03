import Card from '../UI/Card';
import { useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import Box from '@material-ui/core/Box';
import Input from '@mui/material/Input';
import Filters from './Filters'

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

const AvailableData = () => {
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

  const switchDetailModeHandler = async (event) => {
    event.preventDefault();
    const axios = require('axios').default;

    // if (!isFetched){
      if(!showDetails){
      try {
        axios.get('http://localhost:4000/api/v1/company_profile', {
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
          if (response.data.success === false)
          {
            setError(true);
            setMessage(response.data.message);
            alert(response.data.message)
          }
          else{
          setUserData(response.data)
          setIsFetched(true);
          setShowDetails(true);}
          setError(false);
        })
        .catch(function (error) {
          console.log(error);
          alert(error);
        })
      } catch (error) {
        console.error(error);
        alert(error);
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

    employee_details = userData.employee_details.map((user) => (
      <Data user = {user}/>
    ));

    founders_details = userData.founder_details.map((user) => (
      <Data user = {user}/>
      ));
    }

  function Data(props){
    return (<div>
      <Card>
        <Grid container spacing={2}>
          <Grid item md={8}>
            <Item><p><u><b>Name:</b></u>  {props.user.first_name + " " + props.user.last_name}</p></Item>
            <Item><p><u><b>Designation:</b></u>  {props.user.designation}</p></Item>
            <Item><p><u><b>City:</b></u>  {props.user.city}</p></Item>
            <Item><p><u><b>Email:</b></u>  {props.user.email}</p></Item>
            <Item><p><u><b>Phone:</b></u>  {props.user.mobile_no}</p></Item>
            <Item><p><u><b>Description:</b></u>  {props.user.description}</p></Item>
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
      <form onSubmit={switchDetailModeHandler}>
        <div >
          <Input placeholder="Name" inputProps={ariaLabel} required onChange={e => setName(e.target.value)} disabled={showDetails} />
        </div>
        <div >
          <Input placeholder="Url" inputProps={ariaLabel} required onChange={e => setUrl(e.target.value)} disabled={showDetails} />
        </div>

        <Grid container spacing={2}>
          <Grid item>
            <Box pt={2}>
              <Button variant="contained"
                  type='submit' sx = {{mt:20}}
                  className={data_classes.toggle}
                >
                  {showDetails ? 'Hide Details' : 'Fetch Detais'}
                </Button>
            </Box>
          </Grid>
          <Grid item>
            <Box pt={2}>
              <Button variant="contained"
                  type='submit' sx = {{mt:20}}
                  className={data_classes.toggle}
                >
                  {showDetails ? 'Hide Details' : 'Resync'}
                </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
      {showDetails && <div> <Card>
      <ul><li>{heading_title}</li></ul>
      </Card>
      <Card>
        <Filters/>
      <ul><li><h2>Founders Details:</h2><br></br>{founders_details}</li></ul>
      </Card>
      <Card>
      <ul><li><h2>Employee Details:</h2><br></br>{employee_details}</li></ul>
      </Card></div>}
      {error &&
            <span style={{ color: 'red' }}>{message}</span>}
    </section>
  );
};

export default AvailableData;
