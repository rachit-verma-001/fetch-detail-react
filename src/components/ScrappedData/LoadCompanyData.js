import * as React from 'react';
import { useState} from 'react';
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
import { localUrl, ngrokUrl } from '../../store/HostUrl';

import { useEffect, useCallback } from 'react';


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







const EmployeeData = (props) => {

  const [data, userData] = useState();
  const fetchCompanyDetail =(id) =>{
    console.log(id)


  }
  useEffect(() => {
    const axios = require('axios').default;
    try {
      axios.get(`${ngrokUrl}/api/v1/list`, {
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
          userData(response.data)

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


});




  return (
    <section>
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
      </Container>
    </section>
  )


}

export default EmployeeData