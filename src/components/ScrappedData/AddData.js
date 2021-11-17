import { useState} from 'react';
import * as React from 'react';
import Button from '@material-ui/core/Button';
// import Grid from '@mui/material/Grid';
import Box from '@material-ui/core/Box';
import Input from '@mui/material/Input';
import 'react-toastify/dist/ReactToastify.css';
// import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Container, Grid} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
// import LoadCompanyData from './LoadCompanyData'

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

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
      width: '20ch',
    },
  },
}));




const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


const ariaLabel = { 'aria-label': 'description' };





const AddData = (props) => {

  const history = useHistory();
  const [userData, setUserData] = useState([]);
  const [url, setUrl] = useState('');
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [foundationYear, setFoundationYear] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFetched, setIsFetched] = useState(false);

  const[filterCall, setFilterCall] = useState(false);
  let table_details;
  let filter_table;
  const [companyDetail, setCompanyDetail] = useState({});
  const fetchCompanyDetail =(id) =>{
    console.log(id)
    history.push(`/details/${id}`)

  }

  const [companyName, setCompanyName] = useState();

  const[filteredCompany, setFilteredCompany] = useState([]);

  const companyNameChangeHandler = (event) => {
    setCompanyName(event.target.value);


    const axios = require('axios').default;
    if (event.target.value.length > 3)
    {
      try {
        axios.get('https://460b-157-47-214-197.ngrok.io/api/v1/search', {
          params: {
            company_name: companyName
          },
          headers:{
            'X-USER-TOKEN': localStorage.getItem('token'),
            "X-USER-EMAIL":localStorage.getItem('email')
          }
        })
        .then(function (response) {
          if (response.data.success === true)
          {
            // dataFiltered = response.data;
            setFilterCall(true);
            setIsFetched(false);
            setFilteredCompany(response.data);
            console.log(filteredCompany);
            console.log(response.data);
            // setUserData(response.data)
          }
          else{
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
            setFilterCall(false);
            console.log(response.data.message)
            // setIsFiltered(false)
          }

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
        setFilterCall(false);
        alert(error);
      }
    }
  };

  const switchDetailModeHandler = async (event) => {
    // let sent_url;
    event.preventDefault();
    const axios = require('axios').default;

    try {
      const headers = {
        'X-USER-TOKEN': localStorage.getItem('token'),
        "X-USER-EMAIL":localStorage.getItem('email')
      }


      // axios.post("http://localhost:4000/api/v1/companies",data, {

      axios.get("https://460b-157-47-214-197.ngrok.io/api/v1/companies/108", {
          headers: headers
        }).then(function (response) {
        setIsLoading(false);
        console.log(response)
        if (response.data.success === false)
        {
          toast.error(response.data.message,  {
            position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
          setFilterCall(false);
          // alert(response.data.message)
        }
        else{

        // setUserData(response.data)
        userData.push(response.data.company)
        setIsFetched(true);
        setFilterCall(false);
        // setIsFiltered(false);
        // setShowDetails(true);
      }
        // setError(false);
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
        setFilterCall(false);
        alert(error);
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
      setFilterCall(false);
    }

  };


  if(filterCall)
  {

    filter_table =(
      <Container maxWidth="lg">
      <Grid container>
      <Grid item xs={12}>
        <TableContainer component={Paper} >
            <Table sx={{ width: 776, marginTop:10, }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell align="right">Type</StyledTableCell>
                  <StyledTableCell align="right">Url</StyledTableCell>
                  <StyledTableCell align="right">Foundation Year</StyledTableCell>
                  <StyledTableCell align="right">Details</StyledTableCell>
                  <StyledTableCell align="right">Resync</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { filteredCompany.length > 0 && filteredCompany.map((company) => (
                  <StyledTableRow key={company.name}>
                    <StyledTableCell component="th" scope="row">
                      {company.name}
                    </StyledTableCell>
                    <StyledTableCell align="right">{company.company_type}</StyledTableCell>
                    <StyledTableCell align="right">{company.url}</StyledTableCell>
                    <StyledTableCell align="right">{company.foundation_year}</StyledTableCell>
                    <StyledTableCell align="right">
                      <Button variant='outlined'
                        type='submit' sx = {{mt:20}}
                        name= {company.id} onClick={ () => fetchCompanyDetail(company.id)}
                      >
                        {/* {showDetails ? 'Hide Details' : 'Fetch Detais'} */}
                        Fetch Details
                      </Button>
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <Button variant='outlined'
                        type='submit' sx = {{mt:20}}
                        name= {company.id} onClick={ () => fetchCompanyDetail(company.id)}
                      >
                        {/* {showDetails ? 'Hide Details' : 'Fetch Detais'} */}
                        Resync
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
      </Grid>
      </Grid>
      </Container>)

  };


  if (isFetched)
  {
    table_details =(
      <Container maxWidth="lg">
      <Grid container>
      <Grid item xs={12}>
        <TableContainer component={Paper} >
            <Table sx={{ width: 776, marginTop:10, }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell align="right">Type</StyledTableCell>
                  <StyledTableCell align="right">Url</StyledTableCell>
                  <StyledTableCell align="right">Foundation Year</StyledTableCell>
                  <StyledTableCell align="right">Details</StyledTableCell>
                  <StyledTableCell align="right">Resync</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userData.map((company) => (
                  <StyledTableRow key={company.name}>
                    <StyledTableCell component="th" scope="row">
                      {company.name}
                    </StyledTableCell>
                    <StyledTableCell align="right">{company.company_type}</StyledTableCell>
                    <StyledTableCell align="right">{company.url}</StyledTableCell>
                    <StyledTableCell align="right">{company.foundation_year}</StyledTableCell>
                    <StyledTableCell align="right">
                      <Button variant='outlined'
                        type='submit' sx = {{mt:20}}
                        name= {company.id} onClick={ () => fetchCompanyDetail(company.id)}
                      >
                        {/* {showDetails ? 'Hide Details' : 'Fetch Detais'} */}
                        Fetch Details
                      </Button>
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <Button variant='outlined'
                        type='submit' sx = {{mt:20}}
                        name= {company.id} onClick={ () => fetchCompanyDetail(company.id)}
                      >
                        {/* {showDetails ? 'Hide Details' : 'Fetch Detais'} */}
                        Resync
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
      </Grid>
      </Grid>
      </Container>)
  };

  return (
    <section>

      <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">

          <form alignItems="center" onSubmit={switchDetailModeHandler} >
            <div >
              <Input placeholder="Name" inputProps={ariaLabel} onChange={e => setName(e.target.value)} required style={{width:"500px"}}  />
            </div>
            <div >
              <Input placeholder="Url" inputProps={ariaLabel} required onChange={e => setUrl(e.target.value)}   style={{width:"500px", marginTop:"10px"}}  />
            </div>
            <div >
              <Input placeholder="Type" inputProps={ariaLabel} required onChange={e => setType(e.target.value)}  style={{width:"500px", marginTop:"10px"}}  />
            </div>
            <div >
              <Input placeholder="Foundation Year" inputProps={ariaLabel} onChange={e => setFoundationYear(e.target.value)} style={{width:"500px", marginTop:"10px"}}  />
            </div>

            <Grid container spacing={2}>
              <Grid item>
                <Box pt={2}>
                  <Button variant='outlined'
                      type='submit' sx = {{mt:20}} style = {{width:'217px', position:'absolute', left:'42%'}}
                      name="Fetch"
                    >
                      {/* {showDetails ? 'Hide Details' : 'Fetch Detais'} */}
                      Add
                    </Button>
                </Box>
              </Grid>

            </Grid>
          </form>

          {isFetched && <>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Item style={{float:'right', position:'relative', top:'71px', right:'32px', width:'340px', backgroundColor:'#e0e0e03b'}}>
                  <Search>
                      <SearchIconWrapper>
                        <SearchIcon />
                      </SearchIconWrapper>
                      <StyledInputBase
                        placeholder="Company Name"
                        inputProps={{ 'aria-label': 'search' }} onChange={companyNameChangeHandler}
                      />
                  </Search>
                </Item>
              </Grid>
            </Grid>
            <div>
          {/* {isFetched ? table_details : <LoadCompanyData />} */}
          {filterCall ? filter_table : table_details}

          </div></>}
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
      </section>
  )
}

export default AddData;