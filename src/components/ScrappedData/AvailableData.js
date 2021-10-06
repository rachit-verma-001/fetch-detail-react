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
    "employee_details": [
        {
            "name": "Faizan Mirza",
            "designation": "Ruby on Rails Developer",
            "connection": "• 2nd2nd degree connection",
            "city": "Pune",
            "shared_connections": "Mohit Maniar, Nilesh Navale, and 61 other shared connections",
            "image": "https://media-exp1.licdn.com/dms/image/C5103AQHdT_8kSCiF6w/profile-displayphoto-shrink_100_100/0/1571481985532?e=1637798400&v=beta&t=YHEXfabsbGxCYOtmaN5hCFfg9eP84HqVzMQvQujMxkA"
        },
        {
            "name": "Devesh Lashkari",
            "designation": "Software Engineer at Protonshub | JavaScript | React | Next.js | Vue | Nuxt.js",
            "connection": "• 2nd2nd degree connection",
            "city": "Indore",
            "shared_connections": "Vikas Rishishwar, Sidhartha Kukreja, and 247 other shared connections",
            "image": "https://media-exp1.licdn.com/dms/image/C4E03AQGgBsVhAFbwHg/profile-displayphoto-shrink_100_100/0/1597215753864?e=1637798400&v=beta&t=P63NTROsMXPnBOeLBw5VrG3e_WnK39NDeuI1AZEG4-s"
        },
        {
            "name": "Harshit Sahu",
            "designation": "Reactjs | Redux | JavaScript | ES6 | Java | HTML | CSS",
            "connection": "• 2nd2nd degree connection",
            "city": "Indore",
            "shared_connections": "Priya Geete, Roshni Jain, and 16 other shared connections",
            "image": "https://media-exp1.licdn.com/dms/image/C5603AQFGgcMcBxQWFw/profile-displayphoto-shrink_100_100/0/1616326369164?e=1637798400&v=beta&t=wS2NboMqia3aJ6QpNlda8fI9cFTveS83w7W1YsBf0Rw"
        },
        {
            "name": "Deepak Chauhan",
            "designation": "Software Engineer at Protonshub Technologies",
            "connection": "• 2nd2nd degree connection",
            "city": "Indore",
            "shared_connections": "SoftGrid Computers, Megha ., and 13 other shared connections",
            "image": "https://media-exp1.licdn.com/dms/image/C4D03AQGgDIv4rwEz9g/profile-displayphoto-shrink_100_100/0/1517267445478?e=1637798400&v=beta&t=c97zTd6r0hCz-u_nPB8_pbHRLJeW2KyVdLBz7sjDJ7Y"
        },
        {
            "name": "Rohit Khillare",
            "designation": "Software Developer at Protonshub Technologies",
            "connection": "• 2nd2nd degree connection",
            "city": "Indore",
            "shared_connections": "Prachi Kanungo, Shraddha Sharma, and 106 other shared connections",
            "image": "https://media-exp1.licdn.com/dms/image/C5603AQEljXClIVpFKg/profile-displayphoto-shrink_100_100/0/1618080914789?e=1637798400&v=beta&t=c8DoApGidlRr_DkaUqlPLd0Myhcn4h1qxN75MAmH4oA"
        },
        {
            "name": "Nikita ",
            "designation": "Sr. Business Development Manager",
            "connection": "• 2nd2nd degree connection",
            "city": "Indore",
            "shared_connections": "Tarun Shah, Tanu Goyal, and 38 other shared connections",
            "image": "https://media-exp1.licdn.com/dms/image/C5103AQFVaIIygCaZWg/profile-displayphoto-shrink_100_100/0/1570789844878?e=1637798400&v=beta&t=JVCLcbEEA_zfvWfENSkTjKDRUTtczbjOitatuC7o8P8"
        },
        {
            "name": "GAURA",
            "designation": "Senior Frontend Developer at Protonshub Technologies",
            "connection": "• 2nd2nd degree connection",
            "city": "Indore",
            "shared_connections": "Anjali Tiwari, Rakshit Khandelwal, and 37 other shared connections",
            "image": "https://media-exp1.licdn.com/dms/image/C4D03AQFDY8Dehwi_2Q/profile-displayphoto-shrink_100_100/0/1606801433671?e=1637798400&v=beta&t=-7dqH8L4dYRRsQtJjfhHXoM7AbHyaqu0drY57edmWgk"
        },
        {
            "name": "",
            "designation": "Software Engineer at Protonshub Technologies",
            "connection": "• 2nd2nd degree connection",
            "city": "Indore",
            "shared_connections": "Akanksha Dubey, yamini bangur, and 14 other shared connections",
            "image": "https://media-exp1.licdn.com/dms/image/C5103AQEtwvp69pTTNQ/profile-displayphoto-shrink_100_100/0/1532615264501?e=1637798400&v=beta&t=fdRV0sDbCStAlV8NsmfamW_ZWY3-NCNaEVvCqFmHqvY"
        },
        {
            "name": "Shabnam Mansoori",
            "designation": "Software Developer| Frontend Developer|Chat Bot| IOT| Freelancer",
            "connection": "• 2nd2nd degree connection",
            "city": "Udaipur",
            "shared_connections": "Dr. Surendra Kumar Shukla, Jitendra Gandhi, and 12 other shared connections",
            "image": "https://media-exp1.licdn.com/dms/image/C5103AQG1vRwiEuFuZA/profile-displayphoto-shrink_100_100/0/1529435552919?e=1637798400&v=beta&t=oDGc7Me6x21fz5vYXZ2cHmub0wB-V14OmiHIE7V0pIY"
        },
        {
            "name": "NIRMAL CHOUHAN",
            "designation": "Python Developer at Protonshub Technologies",
            "connection": "• 2nd2nd degree connection",
            "city": "Indore",
            "shared_connections": "Krishna Jangid, Protonshub Technologies, and 3 other shared connections",
            "image": "https://media-exp1.licdn.com/dms/image/D5635AQHgPEH5l_YyIg/profile-framedphoto-shrink_100_100/0/1628252763893?e=1632668400&v=beta&t=4b0ZIQYQ8w5sfw-uh0jWvQP2Z-j-DDqtE_1T2cKCec8"
        }
    ],
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

        const response = await axios.get('http://localhost:4000/sales_qi_linkedin');
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
