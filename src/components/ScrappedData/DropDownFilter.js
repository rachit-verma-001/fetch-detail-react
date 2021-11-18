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

export default function DropDownFilter(props) {

    //   const [firstName, setUserFirstName] = useState();
    //   const[filteredCompany, setFilteredCompany] = useState();
    //   const[filterCall, setFilterCall] = useState(false);

    const [company, setCompany] = useState('');
    const [designation, setDesignation] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    const [selectedCountry, setSelectedCountry] = useState('')
    const [city, setCity] = useState('')
    


    let countryData = Country.getAllCountries()
    
    let selectedCountryStates = State.getStatesOfCountry(country)
    let selectedCity = City.getCitiesOfState(country, state)
    console.log(selectedCity)



let countryMatcher = (iso)=>{
    let countryCodesMatcher = countryData.filter(item=> item.isoCode == iso)
        return countryCodesMatcher[0]["name"]
    
}


let stateMatcher = (iso)=>{
    let stateCodesMatcher = selectedCountryStates.filter(item=>item.isoCode ==iso)
         return stateCodesMatcher[0]["name"]
}



let FilterHandler = ()=>{
    let catchedCountry = '';
    let catchedState=''
 if(country  && country !== ""){ 
   catchedCountry = countryMatcher(country)}
 if(state && state!==""){
    catchedState= stateMatcher(state)}


    let EmployeeDetails = props.userData.employee_details
    let FoundersDetails = props.userData.founders_details
  
    let filterFinalEmployees =  []
    let filterFinalFounders =  FoundersDetails.filter(employ=> employ.city.includes(catchedCountry) && employ.city.includes(catchedState) &&employ["city"].includes(city)&&employ.designation.includes(designation) ) 
            
    if(designation !=="Employees"){

        filterFinalEmployees= EmployeeDetails.filter(employ=> employ.city.includes(catchedCountry) && employ.city.includes(catchedState) &&employ["city"].includes(city)&&employ.designation.includes(designation) )

    }else{
        filterFinalEmployees= EmployeeDetails.filter(employ=> employ.city.includes(catchedCountry) && employ.city.includes(catchedState) &&employ["city"].includes(city) )
    }

        
    props.filteredData(filterFinalFounders,filterFinalEmployees)
    console.log(designation)    
    
    
}


    const handleChange = (event) => {
        console.log(event.target.name, "harish")
        if (event.target.name == "Company") {
            setCompany(event.target.value);

        } else if (event.target.name == "Designation") {
            setDesignation(event.target.value)
        } else if (event.target.name == "State") {
            setState(event.target.value)
            setCity("")

        } else if (event.target.name == "Country") {
            setCountry(event.target.value)
            setState("")
            setCity("")
            
        } else if (event.target.name == "City") {
            setCity(event.target.value)
        }

    };



 

//  let extractedLocations = EmployeeDataLocation.map(employee =>{
//    let splitLocation =  employee.city.split(",")
    
//      let EmployeeCity = splitLocation[0]
//      let EmployeeState = splitLocation[1]
//      let EmployeeCountry = splitLocation[2]

//      console.log(EmployeeCity,EmployeeState)
  

//  })

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
                        <InputLabel id="Country">Country</InputLabel>
                        <Select
                            labelId="Country"
                            id="demo-Country"
                            value={country}
                            label="country"
                            name="Country"
                            onChange={handleChange}
                        >
                            <MenuItem value={""} > Select</MenuItem>
                            {countryData.map(count => {
                                // console.log(count.isoCode)

                                                            
                                return   <MenuItem value={count.isoCode}>{count.name}</MenuItem>
                                
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
                             <MenuItem value={""}  > Select</MenuItem>
                            {selectedCountryStates.map(IndivState => {
                                // console.log(IndivState.isoCode)

                                
                               
                                return <MenuItem value={IndivState.isoCode}>{IndivState.name}</MenuItem>
                                 

                            })}
                        </Select>
                    </FormControl>
                </Item>
            </Grid>

            <Grid item xs={6}>
                <Item>
                    <FormControl fullWidth>
                        <InputLabel id="City">City</InputLabel>
                        <Select
                            labelId="City"
                            id="demo-City"
                            value={city}
                            label="City"
                            name="City"
                            onChange={handleChange}
                        >
                            <MenuItem value={""} > Select</MenuItem>
                            {selectedCity.map(cities => {
                                    
                                
                                
                                    return     <MenuItem value={cities.name}>{cities.name}</MenuItem>
                                

                            })}

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
                            placeHolder = "Select"
                        >
                            <MenuItem value={""}  > Select</MenuItem>
                            <MenuItem value={"Chief Executive Officer"}>CEO</MenuItem>
                            <MenuItem value={"Founder "}>Founder</MenuItem>
                            <MenuItem value={"CTO"}>CTO</MenuItem>
                            <MenuItem value={"COO"}>COO</MenuItem>   
                            <MenuItem value={"CXO"}>CXO</MenuItem>
                            <MenuItem value={"Employees"}>Employees</MenuItem>   
                                                     
                            {/* <MenuItem value={"Software Engineer"}>Software Engineer</MenuItem>
                            <MenuItem value={"Developer"}>Developer</MenuItem>
                            <MenuItem value={"Business Development"}>Business Development</MenuItem> */}
                            <MenuItem value={"Human Resources"}>Human Resources</MenuItem>
                            {/* <MenuItem value={"Designer"}>Designer</MenuItem> */}
                            




                        </Select>
                    </FormControl>
                </Item>
            </Grid>
        </Grid>

        <Grid item mt={2} container spacing={0} direction="column" alignItems="center" justifyContent="center" >
            <Button variant="contained"   onClick={FilterHandler } style={{ width: '240px' }}>Filter</Button>
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