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
import DropDownFilter from "./DropDownFilter";
import { ngrokUrl } from '../../store/HostUrl';
import Pagination from '@material-ui/lab/Pagination';

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

  const [designation2, setDesignation2] = useState([''])
  const [state, setState] = useState('')
  const [country, setCountry] = useState('')
  const [city, setCity] = useState('')

  const [isFetched, setIsFetched] = useState(false);
  const [userData, setUserData] = useState({});
  const [showDetails, setShowDetails] = useState(false);
  const [ userDataBackup,setUserDataBackup] = useState({})
  const [totalPages, setTotalPages] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [isFiltered, setIsFiltered] = useState(false);

  useEffect(() => {
      const axios = require('axios').default;

      axios.defaults.withCredentials=false

      localStorage.removeItem('fcity')
      localStorage.removeItem('fstate')
      localStorage.removeItem('fcountry')
      localStorage.removeItem('fdesignation')
      try {
        axios.get(`${ngrokUrl}/api/v1/companies/${id}`, {
          headers:{
            'X-USER-TOKEN': localStorage.getItem('token'),
            "X-USER-EMAIL":localStorage.getItem('email')
          },
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
            setUserData(response.data);
            setUserDataBackup(response.data);
            setIsFetched(true);
            setTotalPages(response.data.pagination.total_pages);
            // setIsFiltered(false);
            setShowDetails(true);
            setCurrentPage(response.data.pagination.current_page);
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
      <p>About:{userData.company.about}</p>

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
              <Img alt="logo" src={props.user.image} />
            </ButtonBase>
            </Grid>
        </Grid>
      </Card>
    </div>)
  }

  console.log(userData)

  let filteredData =(founderDetails,employeeDetails, pagination_details, fcity,fstate,fcountry,fdesignation2)=>{

  let data = {}

  data.founders_details = founderDetails
  data.employee_details = employeeDetails
  console.log(data.founders_details)

  setUserData({company:userData.company,founders_details:founderDetails,employee_details:employeeDetails })
  console.log(data.founders_details)
  setTotalPages(pagination_details.total_pages);
  setCity(fcity);
  setState(fstate);
  setCountry(fcountry);
  setDesignation2(fdesignation2);
  setIsFiltered(true);
  console.log(founderDetails,employeeDetails)
  // setUserData(userData.founders_details)
  // userData.employee_details

}

useEffect(()=>{
  console.log(userData)
},[userData])

  const handleUserPagination = (event,value) => {
    setCurrentPage(value);
    console.log("After Value Changes")
    console.log(currentPage);
    const axios = require('axios').default;

    try {


    //   axios.get(`${ngrokUrl}/api/v1/search`, {
    //     headers:
    // {
    //         'X-USER-TOKEN': localStorage.getItem('token'),
    //         "X-USER-EMAIL":localStorage.getItem('email')
    //       },
    //       params:{
    //           id: id,
    //           city:localStorage.getItem('fcity'),
    //           state:localStorage.getItem('fstate'),
    //           country:localStorage.getItem('fcountry'),
    //           employee_types:localStorage.getItem('fdesignation').map(desig=>desig.value),
    //           page:value
    //       }
    //   })


        if (isFiltered)
        {
          const fcity = localStorage.getItem('fcity')
          const fstate = localStorage.getItem('fstate')
          const fcountry = localStorage.getItem('fcountry')
          const employee_type = localStorage.getItem('fdesignation')

          axios.get(`${ngrokUrl}/api/v1/search`, {
            headers:
              {
                'X-USER-TOKEN': localStorage.getItem('token'),
                "X-USER-EMAIL":localStorage.getItem('email')
              },
              params:{
                id: id,
                city:fcity,
                state:fstate,
                country:fcountry,
                employee_types:employee_type,
                page:value
              }
          })
          .then(function (response) {
            if (response.data.success === false)
            {
              // alert(response.data.message)
              localStorage.removeItem('fcity')
              localStorage.removeItem('fstate')
              localStorage.removeItem('fcountry')
              localStorage.removeItem('fdesignation')

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

              localStorage.removeItem('fcity')
              localStorage.removeItem('fstate')
              localStorage.removeItem('fcountry')
              localStorage.removeItem('fdesignation')
              setUserData(response.data);

              setUserDataBackup(response.data);
              setIsFetched(true);
              setTotalPages(response.data.pagination.total_pages);
              // setIsFiltered(false);
              setShowDetails(true);
              // setCurrentPage(response.data.pagination.current_page);
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
        }

        else{
          localStorage.removeItem('fcity')
          localStorage.removeItem('fstate')
          localStorage.removeItem('fcountry')
          localStorage.removeItem('fdesignation')
          axios.get(`${ngrokUrl}/api/v1/companies/${id}`, {
            headers:{
              'X-USER-TOKEN': localStorage.getItem('token'),
              "X-USER-EMAIL":localStorage.getItem('email')
            },
            params:{
              page: value
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
              setUserData(response.data);

              setUserDataBackup(response.data);
              setIsFetched(true);
              setTotalPages(response.data.pagination.total_pages);
              // setIsFiltered(false);
              setShowDetails(true);
              // setCurrentPage(response.data.pagination.current_page);
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
        }

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


  // this.setState({ setUserPage: value }, () => {
  //   this.getUsersByBrand(this.state.selectedBrandId);
  // });


};

  return (

    <section >
      <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">
      </Grid>

      {showDetails &&
      <div>
         <Card>
            <ul><li>{heading_title}</li></ul>
          </Card>
      <Card>
        <DropDownFilter   userData = {userDataBackup}  filteredData={filteredData} />
      </Card>

     {founders_details.length>0 ? <Card>
      {/* <Pagination count={10} /> */}
        <Grid container spacing={2}>

    </Grid>

      <ul><li><h2>Founders Details:</h2><br></br>{founders_details}</li></ul>
      </Card>:null}

     {employee_details.length>0 ? <Card>
      {/* <Pagination count={10} /> */}
      <ul><li><h2>Employee Details:</h2><br></br>{employee_details}</li></ul>
      </Card>:null}
      </div>}

      <Pagination style={{marginTop:"18px", marginBottom:"25px"}}
          count={totalPages}
          variant="outlined"
          color="primary"
          page={currentPage}
          onChange={handleUserPagination}
        />

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
