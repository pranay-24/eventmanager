import React from 'react'
import {useEffect,useState} from 'react'
import Navbar from '../components/Navbar'
import {useParams} from 'react-router-dom'
import './styles/homepage.css'
const token = localStorage.getItem('token')
const role = localStorage.getItem('role')

const backendroute = 'https://event-backend-ewtb.onrender.com'
const localroute = 'http://localhost:5000'
const Profile = ()=>{
const [user,setUser] = useState('')
const {userId} = useParams()
console.log(userId)
useEffect(()=>{

  const requestOptions ={
    method: 'GET',
    headers:{
     'Content-type':'application/json',
     'auth-token': token, // Include the JWT token
     'role': role, 
    }
  
  }

    fetch(`${backendroute}/userapi/users/${userId}`, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      setUser(data)
    })
    .catch((error) => {
      // Handle errors
      console.error('Fetch error:', error);
    });
},[role,token,userId])

return (
    <>
    <div className="slideleft">

 
    <Navbar active = "profile"/>
    </div>
<div className="center-container">
    <div className="">
          <h2>Personal Information</h2>
          <div className="form-group">
            <div>
            <label htmlFor="name">User Name</label>
            <p>{user.name}</p>
            </div>

            <div>
            <label htmlFor="name">Email</label>
            <p>{user.email}</p>
            </div>

            <div>
            <label htmlFor="name">Password</label>
            <p>{user.password}</p>
            </div>

            <div>
            <label htmlFor="name">Role</label>
            <p>{user.role}</p>
            </div>

            <div>
            <label htmlFor="name">Mobile</label>
            <p>{user.mobile}</p>
            </div>

            <div>
            <label htmlFor="name">Address</label>
            <p>{user.address}</p>
            </div>

            <div>
            <label htmlFor="name">Uniform Size</label>
            <p>{user.uniformSize}</p>
            </div>


        </div>
    </div>

    {/* <div className="section">
          <h2>Emergency Contact</h2>
          <div className="form-group">
            <div>
            <label htmlFor="emergencyFullName">Emergency Contact FullName</label>
            <p>{user.emergencyFullName}</p>
            </div>

            <div>
           <label htmlFor="emergencyMobile">Emergency Contact Mobile</label>
            <p>{user.emergencyMobile}</p>
            </div>

            <div>
           <label htmlFor="emergencyRelationship">Emergency Contact Relationship</label>
            <p>{user.emergencyRelationship}</p>
            </div>

          </div>
    </div>
    <div className="section">
          <h2>Hospital Preference</h2>
          <div className="form-group">
          
          <div>
           <label htmlFor="preferredHospitalName">Preferred Hospital Name</label>
            <p>{user.preferredHospitalName}</p>
            </div>
           
            <div>
           <label htmlFor="preferredHospitalAddress">Preferred Hospital Address</label>
            <p>{user.preferredHospitalAddress}</p>
            </div>

            <div>
           <label htmlFor="preferredHospitalContact">Preferred Hospital Contact</label>
            <p>{user.preferredHospitalContact}</p>
            </div>

          </div>
    </div>

    <div className="section">
          <h2>Insurance Details</h2>
          <div className="form-group">
          <div>
           <label htmlFor="insuranceCompany">Insurance Company Name</label>
            <p>{user.insuranceCompany}</p>
            </div>

            <div>
           <label htmlFor="insuranceContact">Insurance Company Contact</label>
            <p>{user.insuranceContact}</p>
            </div>
            
            <div>
           <label htmlFor="insurancePolicy">Insurance Company Policy</label>
            <p>{user.insurancePolicy}</p>
            </div>

          </div>
    </div> */}

</div>
    </>
)
}

export default Profile;