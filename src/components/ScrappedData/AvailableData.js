import Card from '../UI/Card';
import classes from './AvailableData.module.css';
import { useState} from 'react';
const DUMMY_MEALS = [
  {
    "name": "Protonshub Technologies ",
    "tagline": "Creating new Dimensions",
    "description": "Information Technology & Services",
    "city": "Indore, Madhya Pradesh",
    "followers": "1,974 followers",
    "no_of_employees": "73 employees",
    "logo": "https://media-exp1.licdn.com/dms/image/C4D0BAQEFAmZRJg3C-A/company-logo_200_200/0/1630304681248?e=1640822400&v=beta&t=66f5by_LN7-WHI_ldyrnqhkXWAjfR8yXQQiJrZGDNRI",
    "employee_count": 10
  }
];

const AvailableData = () => {
  const [isFetched, setIsFetched] = useState(false);
  const [userData, setUserData] = useState({});
  const [showDetails, setShowDetails] = useState(false);
  let heading_title;
  let employee_details;
  let founders_details;
  const switchDetailModeHandler = async () => {
    const axios = require('axios').default;

    if (!isFetched){
      try {
        const response = await axios.get('https://react-fetch-detail.herokuapp.com/sales_qi_linkedin/sales_qi_linkedin');
        setUserData(response.data);
        setIsFetched(true);
        setShowDetails(true);
        console.log(response);
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

  //   if (!isFetched)
  //   {
  //     fetch('http://localhost:4000/sales_qi_linkedin', {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     })
  //     .then((res) => {
  //       if (res.ok) {
  //         const response_data = res.json();
  //         setIsFetched(true);
  //         setShowDetails(true);
  //         setUserData(response_data);
  //         return response_data;
  //       } else {
  //         return res.json().then((data) => {
  //           let errorMessage = data.error;
  //           throw new Error(errorMessage);
  //         });
  //       }
  //     })
  //     .catch((err) => {
  //       alert(err.message);
  //       setIsFetched(false);
  //       setShowDetails(false);
  //     });
  //   }
  //   else
  //   {
  //     if (showDetails){
  //     setShowDetails(false);
  //     }
  //     else{
  //       setShowDetails(true);
  //     }
  //   }
  };

  if (isFetched)
  {
    heading_title = DUMMY_MEALS.map((meal) => (
    <div>
      <h2>{meal.name}</h2>
      <p> {meal.tagline}</p>
      <p>Followers:{meal.followers}</p>
      <p>No of employees:{meal.no_of_employees}</p>
    </div>
    ));


    employee_details = userData.employee_data.map((user) => (
      <div>
        <Card>
          <p><u><b>Name:</b></u>  {user.name}</p>
          <p><u><b>Designation:</b></u>  {user.designation}</p>
          <p><u><b>City:</b></u>  {user.city}</p>
          <p><u><b>State:</b></u>  {user.state}</p>
          <p><u><b>Country:</b></u>  {user.country}</p>
          <p><u><b>Education:</b></u>  {user.education}</p>
          <p><u><b>Email:</b></u>  {user.email}</p>
          <p><u><b>Phone:</b></u>  {user.phone}</p>
          <p><u><b>Skills:</b></u>  {user.skills}</p>

          <img className={classes['main-image']} src={user.image} alt='Default!' />
        </Card>
      </div>
    ));

    founders_details = userData.founders_data.map((user) => (
      <div>
        <Card>
          <p><u><b>Name:</b></u>  {user.name}</p>
          <p><u><b>Designation:</b></u>  {user.designation}</p>
          <p><u><b>City:</b></u>  {user.city}</p>
          <p><u><b>State:</b></u>  {user.state}</p>
          <p><u><b>Country:</b></u>  {user.country}</p>
          <p><u><b>Education:</b></u>  {user.education}</p>
          <p><u><b>Email:</b></u>  {user.email}</p>
          <p><u><b>Phone:</b></u>  {user.phone}</p>
          <p><u><b>Skills:</b></u>  {user.skills}</p>
          <img className={classes['main-image']} src={user.image} alt='Default!' />
        </Card>
      </div>
    ));
  }

  return (
    <section className={classes.data}>
      <button
            type='button'
            className={classes.toggle}
            onClick={switchDetailModeHandler}
          >
            {showDetails ? 'Hide Details' : 'Fetch Detais'}
          </button>
      {showDetails && <div> <Card>
      <ul><li>{heading_title}</li></ul>
      </Card>

      <Card>
      <ul><li><h2>Founders Details:</h2><br></br>{founders_details}</li></ul>
      </Card>

      <Card>
      <ul><li><h2>Employee Details:</h2><br></br>{employee_details}</li></ul>
      </Card></div>}
    </section>
  );
};

export default AvailableData;
