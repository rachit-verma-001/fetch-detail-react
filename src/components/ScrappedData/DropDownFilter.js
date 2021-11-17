import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Country, State, City } from 'country-state-city';


// import { company_name } from './AddData';
let company_name = ""
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

export default function DropDownFilter() {

    //   const [firstName, setUserFirstName] = useState();
    //   const[filteredCompany, setFilteredCompany] = useState();
    //   const[filterCall, setFilterCall] = useState(false);

    const [company, setCompany] = useState('');
    const [designation, setDesignation] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    const [selectedCountry,setSelectedCountry] = useState('')

    let countryData = Country.getAllCountries()
    let stateData = State.getAllStates()
   let selectedCountryStates = State.getStatesOfCountry(country)
   


    const handleChange = (event) => {
        console.log(event.target.name, "harish")
        if (event.target.name == "Company") {
            setCompany(event.target.value);

        } else if (event.target.name == "Designation") {
            setDesignation(event.target.value)
        } else if (event.target.name == "State") {
            setState(event.target.value)
        } else if (event.target.name == "Country") {
            setCountry(event.target.value)
        }



    };

    //   const handleDesignationChange = (event) => {
    //     setDesignation(event.target.value);
    //   };

    //   const handleStateCompanyChange = (event) => {
    //     setState(event.target.value);
    //   };

    //   const handlecountryCompanyChange = (event) => {
    //     setCountry(event.target.value);
    //   };


    //   const firstNameChangeHandler = (event) => {
    //     setUserFirstName(event.target.value);
    //   };

    //   const [lastName, setUserLastName] = useState();

    //   const lastNameChangeHandler = (event) => {
    //     setUserLastName(event.target.value);
    //   };

    //   const [email, setUserEmail] = useState();

    //   const emailChangeHandler = (event) => {
    //     setUserEmail(event.target.value);
    //   };

    //   const [city, setUserCity] = useState();

    //   const cityChangeHandler = (event) => {
    //     setUserCity(event.target.value);
    //   };

    //   const [designation, setUserDesignation] = useState();

    //   const designationChangeHandler = (event) => {
    //     setUserDesignation(event.target.value);
    //   };





    return (<>

        <Grid container spacing={2}>
            <Grid item xs={6}>
                <Item>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Company</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={company}
                            label="Company"
                            name="Company"

                            onChange={handleChange}
                        >
                            <MenuItem value={10}>Prtons</MenuItem>
                            <MenuItem value={20}>Postman</MenuItem>
                            <MenuItem value={30}>Adobe</MenuItem>
                        </Select>
                    </FormControl>
                </Item>
            </Grid>

            <Grid item xs={6}>
                <Item>
                    <FormControl fullWidth>
                        <InputLabel id="Designation">Designation</InputLabel>
                        <Select
                            labelId="Designation"
                            id="demo-designation"
                            value={designation}
                            label="Designation"
                            name="Designation"
                            onChange={handleChange}
                        >
                            <MenuItem value={10}>HR</MenuItem>
                            <MenuItem value={20}>CEO</MenuItem>
                            <MenuItem value={30}>CXO</MenuItem>
                        </Select>
                    </FormControl>
                </Item>
            </Grid>


            <Grid item xs={6}>
                <Item>
                    <FormControl fullWidth>
                        <InputLabel id="Country">Country</InputLabel>
                        <Select
                            labelId="Country"
                            id="demo-Country"
                            value={country}
                            label="country"
                            name="Country"
                            onChange={handleChange}
                        >
                            {countryData.map(count => {
                                // console.log(count.isoCode)
                                return <MenuItem value={count.isoCode}>{count.name}</MenuItem>
                                

                            })}

                        </Select>
                    </FormControl>
                </Item>
            </Grid>

            <Grid item xs={6}>
                <Item>
                    <FormControl fullWidth>
                        <InputLabel id="State">State</InputLabel>
                        <Select
                            labelId="State"
                            id="demo-state"
                            value={state}
                            label="state"
                            name="State"
                            onChange={handleChange}
                        >
                            {selectedCountryStates.map(IndivState=>{
                            
                            return <MenuItem value={10}>{IndivState.name}</MenuItem>

                            })}
                            

                        </Select>
                    </FormControl>
                </Item>
            </Grid>






        </Grid>

        <Grid item mt={2} container spacing={0} direction="column" alignItems="center" justifyContent="center" >
            <Button variant="contained" style={{ width: '240px' }}>Filter</Button>
        </Grid>
        <ToastContainer position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover />

    </>
    )
}