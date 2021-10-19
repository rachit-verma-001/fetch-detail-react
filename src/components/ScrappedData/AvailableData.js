import Card from '../UI/Card';
import classes from './AvailableData.module.css';
import { useState} from 'react';

const AvailableData = () => {
  const [isFetched, setIsFetched] = useState(false);
  const [userData, setUserData] = useState({});
  const [showDetails, setShowDetails] = useState(false);
  let heading_title;
  let employee_details;
  let founders_details;
  const switchDetailModeHandler = async () => {
    // const axios = require('axios').default;

    if (!isFetched){
      try {
        // const response = await axios.get('https://react-fetch-detail.herokuapp.com/sales_qi_linkedin');
        const response =  {
          "company_detail": [
              {
                  "id": 2,
                  "name": "Protonshub Technologies ",
                  "tagline": "Creating new Dimensions",
                  "description": "Information Technology & Services",
                  "city": "Indore, Madhya Pradesh",
                  "followers": "2,087 followers",
                  "no_of_employees": 72,
                  "logo": "https://media-exp1.licdn.com/dms/image/C4D0BAQEFAmZRJg3C-A/company-logo_200_200/0/1630304681248?e=1642032000&v=beta&t=1aoSCTp-5JMI-qjEOtNYfYOml3Axsu53PGsumoP9Jmw",
                  "founders_count": 3,
                  "created_at": "2021-10-13T07:16:21.242Z",
                  "updated_at": "2021-10-14T10:27:33.753Z"
              }
          ],
          "founder_details": [
              {
                  "id": 198,
                  "first_name": "Rakshit",
                  "last_name": "Khandelwal",
                  "city": "Indore",
                  "description": "Provides services - IT Consulting, Web Development, Application Development, Database Development, Mobile Application Development, Cloud Application Development, SaaS Development",
                  "email": "rakshit.khandelwal@protonshub.in",
                  "connection": null,
                  "designation": "Chief Executive Officer at Protonshub Technologies",
                  "image": "https://media-exp1.licdn.com/dms/image/C4E16AQGKLeJKoqpCuA/profile-displaybackgroundimage-shrink_200_800/0/1629362066486?e=1639612800&v=beta&t=iksFddxRfrb4r5NqcjVi6ERBCDkIqYMjyqhgXLhwmto",
                  "created_at": "2021-10-13T07:22:59.727Z",
                  "updated_at": "2021-10-13T07:22:59.727Z",
                  "role_id": 2,
                  "mobile_no": null,
              },
              {
                  "id": 199,
                  "first_name": "Sachin",
                  "last_name": "Mishra",
                  "city": "Indore",
                  "description": "Provides services - Brand Design, Mobile Application Development, Graphic Design, IT Consulting, Application Development, Custom Software Development, Database Development, Enterprise Content Management, iOS Development, Business Analytics",
                  "email": "sachin.mishra@protonshub.in",
                  "connection": null,
                  "designation": "Co-Founder & COO @ Protonshub Technologies | Helping startups to hire Remote Software Developers on a contract basis",
                  "image": "https://media-exp1.licdn.com/dms/image/C4E16AQFTHja03S7TOg/profile-displaybackgroundimage-shrink_200_800/0/1629352541443?e=1639612800&v=beta&t=_9csepCMuHWxUZb-qls7kYWt9W3_dIjtL_rGH0zdts4",
                  "created_at": "2021-10-13T07:23:09.243Z",
                  "updated_at": "2021-10-13T07:23:09.243Z",
                  "role_id": 2,
                  "mobile_no": null
              },
              {
                  "id": 200,
                  "first_name": "Tushar",
                  "last_name": "Pal",
                  "city": "Indore",
                  "description": "Provides services - Mobile Application Development, Web Development, Application Development, Custom Software Development, iOS Development, Cloud Application Development, Cloud Management",
                  "email": "tushar.pal@protonshub.in",
                  "connection": null,
                  "designation": "Co-Founder at Protonshub Technologies",
                  "image": "https://media-exp1.licdn.com/dms/image/C4E16AQG9uxKUeyBWIw/profile-displaybackgroundimage-shrink_200_800/0/1629362191126?e=1639612800&v=beta&t=qbpW73Ey1c1JxAlmwR4RbTtBhe6IMW2jzVE7Geab3yA",
                  "created_at": "2021-10-13T07:23:19.379Z",
                  "updated_at": "2021-10-13T07:23:19.379Z",
                  "role_id": 2,
                  "mobile_no": null
              }
          ],
          "employee_details": [
              {
                  "id": 190,
                  "first_name": "Shabnam",
                  "last_name": "Mansoori",
                  "city": "Udaipur",
                  "description": "Dr. Surendra Kumar Shukla, Jitendra Gandhi, and 13 other shared connections",
                  "email": "shabnam.mansoori@protonshub.in",
                  "connection": "• 2nd2nd degree connection",
                  "designation": "Software Developer| Frontend Developer|Chat Bot| IOT| Freelancer",
                  "image": "https://media-exp1.licdn.com/dms/image/C4E03AQHvi0PwPvj97A/profile-displayphoto-shrink_100_100/0/1632992654591?e=1639612800&v=beta&t=a2AJJ6aXv3SDtRP4ErZbOA8I44Mt7YprTU6XKKRts0s",
                  "created_at": "2021-10-13T07:16:09.110Z",
                  "updated_at": "2021-10-13T07:16:09.110Z",
                  "role_id": 1,
                  "mobile_no": null
              },
              {
                  "id": 191,
                  "first_name": "Nikita ",
                  "last_name": " ",
                  "city": "Indore",
                  "description": "Tarun Shah, Tanu Goyal, and 40 other shared connections",
                  "email": "nikita.@protonshub.in",
                  "connection": "• 2nd2nd degree connection",
                  "designation": "Sr. Business Development Manager",
                  "image": "https://media-exp1.licdn.com/dms/image/C5103AQFVaIIygCaZWg/profile-displayphoto-shrink_100_100/0/1570789844878?e=1639612800&v=beta&t=GRZs8sQpJSrn-Iv6ifOU9eKfc34LR0Tj3plYnFs-4t8",
                  "created_at": "2021-10-13T07:16:09.153Z",
                  "updated_at": "2021-10-13T07:16:09.153Z",
                  "role_id": 1,
                  "mobile_no": null
              },
              {
                  "id": 192,
                  "first_name": "Deepak",
                  "last_name": "Raghuwanshi",
                  "city": "Indore",
                  "description": "Sidhartha Kukreja, Munesh Singh, and 50 other shared connections",
                  "email": "deepak.raghuwanshi@protonshub.in",
                  "connection": "• 2nd2nd degree connection",
                  "designation": "Sr. Software Engineer at Protonshub Technologies",
                  "image": "https://media-exp1.licdn.com/dms/image/C5103AQFxkA4lE9NA5w/profile-displayphoto-shrink_100_100/0/1523589721632?e=1639612800&v=beta&t=jOI_9vvcs1BZbUARQkWv-hyCcc0k3VrtUJzMPtFMiGA",
                  "created_at": "2021-10-13T07:16:09.180Z",
                  "updated_at": "2021-10-13T07:16:09.180Z",
                  "role_id": 1,
                  "mobile_no": null
              },
              {
                  "id": 193,
                  "first_name": "Anshul",
                  "last_name": "Awasthi",
                  "city": "Indore",
                  "description": "Megha ., Ritika Khandelwal, and 26 other shared connections",
                  "email": "anshul.awasthi@protonshub.in",
                  "connection": "• 2nd2nd degree connection",
                  "designation": "Protonshub Technologies",
                  "image": "https://media-exp1.licdn.com/dms/image/C5603AQEwgL6kybz2Mw/profile-displayphoto-shrink_100_100/0/1517459120223?e=1639612800&v=beta&t=YJoxtnlCZH3OqtfbM2tpoHIkODQaFaPEMTSQ9ZGt8KY",
                  "created_at": "2021-10-13T07:16:15.086Z",
                  "updated_at": "2021-10-13T07:16:15.086Z",
                  "role_id": 1,
                  "mobile_no": null
              },
              {
                  "id": 194,
                  "first_name": "GAURA",
                  "last_name": "GAURA",
                  "city": "Indore",
                  "description": "Anjali Tiwari, Rakshit Khandelwal, and 38 other shared connections",
                  "email": "gaura.@protonshub.in",
                  "connection": "• 2nd2nd degree connection",
                  "designation": "Senior Frontend Developer at Protonshub Technologies",
                  "image": "https://media-exp1.licdn.com/dms/image/C4D03AQFDY8Dehwi_2Q/profile-displayphoto-shrink_100_100/0/1606801433671?e=1639612800&v=beta&t=Q_P3itnvhL8vJiG8IlU9NAGjkCBFN223SvLpZvfiDiM",
                  "created_at": "2021-10-13T07:16:15.102Z",
                  "updated_at": "2021-10-13T07:16:15.102Z",
                  "role_id": 1,
                  "mobile_no": null
              },
              {
                  "id": 195,
                  "first_name": "Bhavesh",
                  "last_name": "Raina",
                  "city": "Quality Assurance Engineer | ISTQB Certified Foundation Level |ISTQB Agile Certified|Certified Automation Specialist |",
                  "description": "Madhya Pradesh, India",
                  "email": "bhavesh.raina@protonshub.in",
                  "connection": "Bhavesh RainaView Bhavesh Raina’s profile",
                  "designation": "• 2nd2nd degree connection",
                  "image": null,
                  "created_at": "2021-10-13T07:16:15.118Z",
                  "updated_at": "2021-10-13T07:16:15.118Z",
                  "role_id": 1,
                  "mobile_no": null
              },
              {
                  "id": 201,
                  "first_name": "Chinmaya",
                  "last_name": "Bhondwe",
                  "city": "Indore",
                  "description": "Dinesh Sahu, Aditya P Shrivastava, and 37 other shared connections",
                  "email": "chinmaya.bhondwe@protonshub.in",
                  "connection": "• 2nd2nd degree connection",
                  "designation": "Machine Learning Engineer | NLP | Flask | DRF | Python",
                  "image": "https://media-exp1.licdn.com/dms/image/C5103AQEbGQXRVa6Gfw/profile-displayphoto-shrink_100_100/0/1544207773234?e=1639612800&v=beta&t=3_ULdvGDdJEl2tSTL_RQ69Ihx6P8zho8OjMJnbVAfH0",
                  "created_at": "2021-10-14T08:22:26.839Z",
                  "updated_at": "2021-10-14T08:22:26.839Z",
                  "role_id": 1,
                  "mobile_no": null
              },
              {
                  "id": 202,
                  "first_name": "Shubham",
                  "last_name": "Sethi",
                  "city": "Indore",
                  "description": "Anjali Tiwari, Sapna Tomar, and 27 other shared connections",
                  "email": "shubham.sethi@protonshub.in",
                  "connection": "• 2nd2nd degree connection",
                  "designation": "React.JS Developer | Front End Developer | Web Developer",
                  "image": "https://media-exp1.licdn.com/dms/image/C4D03AQGUWx6o_VFRIw/profile-displayphoto-shrink_100_100/0/1633516854424?e=1639612800&v=beta&t=InW_x65xFN5juvTj2TuIevGea09d9T_qkX-LP6N1br0",
                  "created_at": "2021-10-14T08:22:35.032Z",
                  "updated_at": "2021-10-14T08:22:35.032Z",
                  "role_id": 1,
                  "mobile_no": null
              }
          ]
      }

      // setUserData(response.data);
        setUserData(response);
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

  };

  if (isFetched)
  {
    heading_title = (
    <div>
      <h2>{userData.company_detail[0].name}</h2>
      <p> {userData.company_detail[0].tagline}</p>
      <p>Followers:{userData.company_detail[0].followers}</p>
      <p>No of employees:{userData.company_detail[0].no_of_employees}</p>
    </div>
    );


      employee_details = userData.employee_details.map((user) => (
      <div>
        <Card>
          <p><u><b>Name:</b></u>  {user.first_name + " " + user.last_name}</p>
          <p><u><b>Designation:</b></u>  {user.designation}</p>
          <p><u><b>City:</b></u>  {user.city}</p>
          <p><u><b>Connections:</b></u>  {user.connection}</p>
          <p><u><b>Email:</b></u>  {user.email}</p>
          <p><u><b>Phone:</b></u>  {user.mobile_no}</p>

          <p><u><b>Description:</b></u>  {user.description}</p>
          <img className={classes['main-image']} src={user.image} alt='Default!' />
        </Card>
      </div>
    ));

    founders_details = userData.founder_details.map((user) => (
      <div>
        <Card>
          <p><u><b>Name:</b></u>  {user.first_name + " " + user.last_name}</p>
          <p><u><b>Designation:</b></u>  {user.designation}</p>
          <p><u><b>City:</b></u>  {user.city}</p>
          <p><u><b>Email:</b></u>  {user.email}</p>
          <p><u><b>Phone:</b></u>  {user.mobile_no}</p>
          <p><u><b>Description:</b></u>  {user.description}</p>
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
