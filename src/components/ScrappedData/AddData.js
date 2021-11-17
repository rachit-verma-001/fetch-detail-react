import { Link } from 'react-router-dom';
import { useTable, useFilters, useGlobalFilter, useAsyncDebounce } from 'react-table'
import 'bootstrap/dist/css/bootstrap.min.css';
// import { useEffect, useCallback } from 'react';
import React, { useState, useEffect, useCallback } from 'react';
import Button from '@material-ui/core/Button';
// import Grid from '@mui/material/Grid';
import Box from '@material-ui/core/Box';
import Input from '@mui/material/Input';
import 'react-toastify/dist/ReactToastify.css';
// import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Container, Grid} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TextField from '@mui/material/TextField';

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


// Define a default UI for filtering
function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
}) {
    const count = preGlobalFilteredRows.length
    const [value, setValue] = React.useState(globalFilter)
    const onChange = useAsyncDebounce(value => {
        setGlobalFilter(value || undefined)
    }, 200)

    return (
        <span style={{marginLeft:"13px"}}>
            Search:{' '}
            <input
            style={{width:"17%", marginLeft:"12px"}}
                className="form-control"
                value={value || ""}
                onChange={e => {
                    setValue(e.target.value);
                    onChange(e.target.value);
                }}
                placeholder={`${count} records...`}
            />
        </span>
    )
}

function DefaultColumnFilter({
    column: { filterValue, preFilteredRows, setFilter },
}) {
    const count = preFilteredRows.length

    return (
        <input
            className="form-control"
            value={filterValue || ''}
            onChange={e => {
                setFilter(e.target.value || undefined)
            }}
            placeholder={`Search ${count} records...`}
        />
    )
}

function Table({ columns, data }) {

    const defaultColumn = React.useMemo(
        () => ({
            // Default Filter UI
            Filter: DefaultColumnFilter,
        }),
        []
    )
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
        preGlobalFilteredRows,
        setGlobalFilter,
    } = useTable(
        {
            columns,
            data,
            defaultColumn,
        },
        useFilters,
        useGlobalFilter
    )

    return (
        <div style={{marginTop:"67px"}}>
            <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
            />
            <table style={{marginTop:"19px"}} className="table" {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>
                                    {column.render('Header')}
                                    {/* Render the columns filter UI */}
                                    <div>{column.canFilter ? column.render('Filter') : null}</div>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <br />
          </div>
    )
}



function FilterTableComponent() {
    const columns = React.useMemo(
        () => [
                    {
                        Header: 'Name',
                        accessor: 'name',
                    },
                    {
                        Header: 'Type',
                        accessor: 'company_type'
                    },
                   {
                        Header: 'Url',
                        accessor: 'url'
                    },
                    {
                        Header: 'Foundation Year',
                        accessor: 'foundation_year'
                    },
                    {
                        filterable: false,
                        Header: 'Details',
                        accessor: 'link',
                        disableFilters:true,
                        Cell: ({ row }) =>
                        <Button variant='outlined'
                        type='submit' sx = {{mt:20}}
                        name= {row.original.id} onClick={ () => fetchCompanyDetail(row.original.id)}
                      > Fetch Details</Button>
                    },

                    {
                      filterable: false,
                      disableFilters:true,
                      Header: 'Sync',
                      accessor: 'link2',
                      Cell: ({ row }) =>
                      <Button variant='outlined'
                        type='submit' sx = {{mt:20}}
                        // disabled = {resyncing}
                        name= {row.original.id} onClick={ () => resyncCompanyDetail(row.original.id)}
                      >
                        {/* {resyncing ? "Resyncing" : "Resync"} */}
                        Resync
                        </Button>
                  },
                  {
                    filterable: false,
                    disableFilters:true,
                    Header: 'Delete',
                    accessor: 'link3',
                    Cell: ({ row }) =>
                    <Button variant='outlined'
                    type='submit' sx = {{mt:20}}
                    name= {row.original.id} onClick={ () => destroyCompanyDetail(row.original.id)}
                  > Destroy</Button>
                },
        ],
        []
    )

    const [isLoading, setIsLoading] = useState(false);
    const [isFetched, setIsFetched] = useState(false);
    const [url, setUrl] = useState('');
    const [userData, setUserData] = useState([]);
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [foundationYear, setFoundationYear] = useState('');
    const [count, setCount] = useState(0);
    const[filterCall, setFilterCall] = useState(false);
    const [resyncing, setResyncing] = useState(false);

    const [value, setValue] = useState(new Date());

    const destroyCompanyDetail = (id) => {
      const axios = require('axios').default;

      axios.delete(`http://localhost:4000/api/v1/companies/${id}`, {
        headers:{
          'X-USER-TOKEN': localStorage.getItem('token'),
          "X-USER-EMAIL":localStorage.getItem('email')
        },
      }).then(function(response){
        if (response.data.success === true){
          setCount(count+1);
          // toast.success("Delete Sucess",{
          //   position: "top-right",
          // autoClose: 5000,
          // hideProgressBar: false,
          // closeOnClick: true,
          // pauseOnHover: true,
          // draggable: true,
          // progress: undefined,
          // })
          // const axios = require('axios').default;
          axios.get("http://localhost:4000/api/v1/companies", {
            headers:{
              'X-USER-TOKEN': localStorage.getItem('token'),
              "X-USER-EMAIL":localStorage.getItem('email')
            }
          }).then(function(response){
            if (response.data.success === true){
              setUserData(response.data.companies);
            }
            else{
          // toast.error(response.data.message,  {
          //   position: "top-right",
          // autoClose: 5000,
          // hideProgressBar: false,
          // closeOnClick: true,
          // pauseOnHover: true,
          // draggable: true,
          // progress: undefined,
          // });
            }
          })
        }
        else{
      toast.error(response.data.message,  {
        position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
        }
      })
    }

    useEffect(() => {
      const axios = require('axios').default;
      axios.get("http://localhost:4000/api/v1/companies", {
        headers:{
          'X-USER-TOKEN': localStorage.getItem('token'),
          "X-USER-EMAIL":localStorage.getItem('email')
        }
      }).then(function(response){
        if (response.data.success === true){
          setUserData(response.data.companies);
        }
        else{
      toast.error(response.data.message,  {
        position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
        }
      })
  },[count]);


    const switchDetailModeHandler = async (event) => {
      // let sent_url;
      event.preventDefault();
      const axios = require('axios').default;

        const headers = {
          'X-USER-TOKEN': localStorage.getItem('token'),
          "X-USER-EMAIL":localStorage.getItem('email')
        }

        const data = {
          name:name,
          company_type:type,
          url:url,
          foundation_year:value
        }

        axios.post("http://localhost:4000/api/v1/companies",data, {
            headers: headers
          }).then(function (response) {
          setIsLoading(false);
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
            axios.get("http://localhost:4000/api/v1/companies", {
              headers: headers
            }).then(function(response){
              if (response.data.success === true){
                setUserData(response.data.companies);
              }
              else{
            toast.error(response.data.message,  {
              position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
              }
            })

          // userData.push(response.data.company)
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


    };

    const history = useHistory();
    const fetchCompanyDetail =(id) =>{
      console.log(id)
      history.push(`/details/${id}`)
    }
    const resyncCompanyDetail = (id) => {
      const axios = require('axios').default;

      setResyncing(true);

      axios.get(`http://localhost:4000/api/v1/resync?company_id=${id}`, {
        headers:{
          'X-USER-TOKEN': localStorage.getItem('token'),
          "X-USER-EMAIL":localStorage.getItem('email')
        },
      }).then(function(response){
        if (response.data.success === true){
          setResyncing(false);
          toast.success("Resync Sucess",{
            position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          })
        }
        else{
          setResyncing(false);
      toast.error(response.data.message,  {
        position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
        }
      })
    }

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

          <div style = {{marginLeft:"-17px"}}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Box m={2}>
                <DatePicker
                  inputFormat="yyyy"
                  views={['year']}
                  label="Foundation Year"
                  minDate={new Date('1900-03-01')}
                  maxDate={new Date('2023-06-01')}
                  value={value}
                  onChange={setValue}

                  renderInput={(params) => <TextField {...params} helperText={null} />}
                />
              </Box>
            </LocalizationProvider>
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
          </Grid>
        {< Table columns={columns} data={userData} />}
      </section>
    )
}

export default FilterTableComponent;