import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

import { useLocation } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Country, State, City } from 'country-state-city';
import Csv from './ExportCsv';

import { ngrokUrl } from '../../store/HostUrl';

import Select2 from 'react-select';
import makeAnimated from 'react-select/animated';
import classes from './DropDownFilter.module.css';


const animatedComponents = makeAnimated();
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

const customStyles = {
  control: (base) => ({
    ...base,
    height: 57,
    minHeight: 57,
		marginTop: -2
  })
};


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
    const [designation2, setDesignation2] = useState([''])
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    const [selectedCountry, setSelectedCountry] = useState('')
    const [city, setCity] = useState('')
    const [state2, setState2] = useState('')
		const [showName, setShowName] = useState(false)
    let countryData = Country.getAllCountries()

    let selectedCountryStates = State.getStatesOfCountry(country)
    console.log("Selected State=")
    console.log(selectedCountryStates)
    console.log("State=")
    console.log(state)
		console.log("State2=")
		console.log(state2)

    let selectedCity = City.getCitiesOfState(country, state2)
    console.log("Selected City=")
    console.log(selectedCity)


    let countryMatcher = (iso)=>{
        let countryCodesMatcher = countryData.filter(item=> item.isoCode == iso)
        return countryCodesMatcher[0]["name"]
    }


    let stateMatcher = (iso)=>{
        // let stateCodesMatcher = selectedCountryStates.filter(item=>item.name == iso)
        let stateCodesMatcher = selectedCountryStates.filter(item=>item.isoCode == iso)
            return stateCodesMatcher[0]["name"]
    }

	const Location = useLocation();

	let FilterHandler2 = () =>
	{

		let catchedCountry = '';
        console.log("Filter Designation 2=")
        console.log(designation2)
        let catchedState=''

		if (country && country!=="")
        {
            catchedCountry = countryMatcher(country)
        }

        if(state && state!=="")
        {
            catchedState= stateMatcher(state)
        }

        let EmployeeDetails = props.userData.employee_details
        let FoundersDetails = props.userData.founders_details

        let filterFinalEmployees =  []

        let filterFinalFounders = []

        const axios = require('axios').default;

		try
		{
		  let id = Location.pathname.split("/details/")[1];
          let docState = document.getElementById('demo-state').firstChild.nodeValue
          let docCountry = document.getElementById('demo-Country').firstChild.nodeValue
		  axios.get(`${ngrokUrl}/api/v1/search`, {
          headers:
			{
              'X-USER-TOKEN': localStorage.getItem('token'),
              "X-USER-EMAIL":localStorage.getItem('email')
            },
            params:{
				id: id,
                city:city,
                state: docState,
				country:docCountry,
                employee_types:designation2.map(desig=>desig.value)
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
            filterFinalEmployees = response.data.employee_details;
            filterFinalFounders = response.data.founder_details;
            localStorage.removeItem('fcity',city);
            localStorage.removeItem('fstate',state);
            localStorage.removeItem('fcountry',country);
            localStorage.removeItem('fdesignation',designation2);
            localStorage.removeItem('id', id)
            let docState2 = document.getElementById('demo-state').firstChild.nodeValue
            let docCountry2 = document.getElementById('demo-Country').firstChild.nodeValue
            localStorage.setItem('fcity',city);
            localStorage.setItem('fstate',docState2);
            localStorage.setItem('fcountry',docCountry2);
            localStorage.setItem('fdesignation',designation2.map(desig=>desig.value));
            localStorage.setItem('id', id)
            props.filteredData(filterFinalFounders,filterFinalEmployees,response.data.pagination,city,state,country,designation2);
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
    }catch (error) {
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

	let FilterHandler = ()=>{

		let catchedCountry = '';
        console.log("Filter Designation 2=")
        console.log(designation2)
        let catchedState=''

		if(country  && country !== "")
		{
			catchedCountry = countryMatcher(country)
		}

		if(state && state!=="")
		 {
    	catchedState= stateMatcher(state)
		}

    let EmployeeDetails = props.userData.employee_details
    let FoundersDetails = props.userData.founders_details

    let filterFinalEmployees =  []

		let filterFinalFounders =  FoundersDetails.filter(employ=> employ.city.includes(catchedCountry) && employ.city.includes(catchedState) &&employ["city"].includes(city)&&employ.designation.includes(designation) )

    // if(designation !=="Employees"){

    //     filterFinalEmployees= EmployeeDetails.filter(employ=> employ.city.includes(catchedCountry) && employ.city.includes(catchedState) &&employ["city"].includes(city)&&employ.designation.includes(designation) )

    // }

    // else
    // {
    //     filterFinalEmployees= EmployeeDetails.filter(employ=> employ.city.includes(catchedCountry) && employ.city.includes(catchedState) &&employ["city"].includes(city) )
    // }

    let ades = []

    if (designation2)
    {
        console.log("bedore ades = ")
        console.log(ades)

        designation2.map(designat =>
            ades.push(EmployeeDetails.filter(employ=> employ.designation.includes(designat.value)))
            )
            console.log("after ades=")
            console.log(ades)

        // filterFinalEmployees= EmployeeDetails.filter(employ=> employ.city.includes(catchedCountry) && employ.city.includes(catchedState) &&employ["city"].includes(city)&&employ.designation.includes(designation2) )

    }

    props.filteredData(filterFinalFounders,filterFinalEmployees)
    console.log(designation)

}

    const handleDesignation = (event) => {
        console.log("Before Designation2=")
        console.log(designation2)
        // console.log(event)
        setDesignation2(event)
        console.log("After Designation2=")
        console.log(designation2)
    }


    const handleChange = (event) => {
        console.log(event.target.name, "harish")
        if (event.target.name == "Company") {
            setCompany(event.target.value);

        } else if (event.target.name == "Designation") {
            setDesignation(event.target.value)
        } else if (event.target.name == "State") {
                setShowName(false)
            if (event.target.value.name){
            setState(event.target.value.name)
            setState2(event.target.value.isoCode)
            }
            else if (event.target.value)
            {
                setState(event.target.value)
                setState2(event.target.value)
            }
                    setShowName(true)
            setCity("")

        } else if (event.target.name == "Country") {
            setCountry(event.target.value)
            setState("")
            setCity("")
            setState2("")

        } else if (event.target.name == "City") {
					console.log("Before City=")
					console.log(city)
					setCity(event.target.value)
					console.log("After City=")
					console.log(city)
        }

        // else if (event.target.name == "Designation2") {
        //     setDesignation2(event.target.value)
        // }

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


    const options = [
        { value: 'Human Resource', label: 'HR' },
        { value: 'Chief Executive Officer', label: 'CEO' },
        { value: 'Chief Technology Officer', label: 'CTO' },
        { value: 'Chief Operating Officer', label: 'COO' },
        { value: 'Employees', label: 'Employees' },
				{ value: 'Founder', label: 'Founder' }
      ]

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

            <Grid item xs={6} >
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

                        // return <MenuItem value={ showName ? IndivState.name : IndivState}>{IndivState.name}</MenuItem>
                        return <MenuItem value={ IndivState.isoCode}>{IndivState.name}</MenuItem>

                        })}

                        </Select>
                    </FormControl>
                </Item>
            </Grid>

            <Grid item xs={6}>
                <Item>
                    <FormControl fullWidth>
                        <InputLabel id="City" >City</InputLabel>

                        <Select
                            labelId="City"
                            id="demo-City"
                            value={city}
                            label="City"
                            name="City"
                            onChange={handleChange}
                        >

                            <MenuItem value={""} >Select</MenuItem>

                            {selectedCity.map(cities => {
                                return <MenuItem value={cities.name}>{cities.name}</MenuItem>
                            })}

                        </Select>
                    </FormControl>
                </Item>
            </Grid>

			<Grid item xs={6} >

				<Item >
					<FormControl  fullWidth >
						<Select2 name="Designation2" placeholder = "Designation" styles={customStyles}
								closeMenuOnSelect={false}  classNamePrefix="select"
								// components={animatedComponents}
								isMulti
								options={options}
								onChange={handleDesignation}
						/>
					</FormControl>
				</Item>

			</Grid>

			</Grid>

			<Grid item mt={2} container spacing={0} direction="column" alignItems="center" justifyContent="center" >

				<Button variant="contained" onClick={FilterHandler2 } style={{ width: '240px' }}>Filter</Button>

			</Grid>

		    <Grid item xs={6} mt={2} spacing={0} direction="column" alignItems="center" justifyContent="center"><Csv/></Grid>

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