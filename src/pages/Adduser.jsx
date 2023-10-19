// Adduser.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './styles/adduser.css';
import './styles/homepage.css'
const backendroute = 'https://event-backend-ewtb.onrender.com'
const localroute = 'http://localhost:5000'
const Adduser = () => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
    mobile: '',
    address: '',
    emergencyFullName: '',
    emergencyMobile: '',
    emergencyRelationship: '',
    preferredHospitalName: '',
    preferredHospitalAddress: '',
    preferredHospitalContact: '',
    insuranceCompany: '',
    insuranceContact: '',
    insurancePolicy: '',
    uniformSize: '',
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send userData to the server to create a user
    try {
      const response = await fetch(`${localroute}/userapi/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': `${token}`, // Include the JWT token
          role,
        },
        body: JSON.stringify(userData),
      });

      const json = await response.json();
      console.log(json);

      if (response.ok) {
        // Redirect to the homepage or wherever you want to go
        navigate('/');
      } else {
        alert('User creation failed');
      }
    } catch (error) {
      console.error('User creation error:', error);
    }
  };

  const onChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <div className="center-container">
      <Navbar active="adduser" />
      <form onSubmit={handleSubmit}>
        {/* Section 1: Personal Information */}
        <div className="section">
          <h2>Personal Information</h2>
          <div className="form-group">
            <div>
            <label htmlFor="name">User Name<span className="required">*</span></label>
            <input
              type="text"
              className="form-control"
              value={userData.name}
              onChange={onChange}
              id="name"
              name="name"
            />
            </div>
            
            <label htmlFor="email">Email<span className="required">*</span></label>
            <input
              type="text"
              className="form-control"
              value={userData.email}
              onChange={onChange}
              id="email"
              name="email"
            />
            <label htmlFor="password">Password<span className="required">*</span></label>
            <input
              type="text"
              className="form-control"
              value={userData.password}
              onChange={onChange}
              id="password"
              name="password"
            />
            <label htmlFor="role">Role<span className="required">*</span></label>
            <input
              type="text"
              className="form-control"
              value={userData.role}
              onChange={onChange}
              id="role"
              name="role"
            />
            <label htmlFor="mobile">Mobile</label>
            <input
              type="text"
              className="form-control"
              value={userData.mobile}
              onChange={onChange}
              id="mobile"
              name="mobile"
            />
             <label htmlFor="address">Address</label>
            <input
              type="text"
              className="form-control"
              value={userData.address}
              onChange={onChange}
              id="address"
              name="address"
            />
               <label htmlFor="uniformSize">Uniform Size</label>
            <input
              type="text"
              className="form-control"
              value={userData.uniformSize}
              onChange={onChange}
              id="uniformSize"
              name="uniformSize"
            />


          </div>
          {/* Add more personal information fields here */}
        </div>

        {/* Section 2: Emergency Contact */}
        {/* <div className="section">
          <h2>Emergency Contact</h2>
          <div className="form-group">
            <label htmlFor="emergencyFullName">Full Name</label>
            <input
              type="text"
              className="form-control"
              value={userData.emergencyFullName}
              onChange={onChange}
              id="emergencyFullName"
              name="emergencyFullName"
            />
            <label htmlFor="emergencyMobile"> Emergency Contact Mobile Number</label>
            <input
              type="text"
              className="form-control"
              value={userData.emergencyMobile}
              onChange={onChange}
              id="emergencyMobile"
              name="emergencyMobile"
            />
                  <label htmlFor="emergencyRelationship"> Emergency Contact Relationship</label>
            <input
              type="text"
              className="form-control"
              value={userData.emergencyRelationship}
              onChange={onChange}
              id="emergencyRelationship"
              name="emergencyRelationship"
            />

          </div>
        
        </div> */}

        {/* Section 3: Hospital Preference */}
        {/* <div className="section">
          <h2>Hospital Preference</h2>
          <div className="form-group">
            <label htmlFor="preferredHospitalName">Hospital Name</label>
            <input
              type="text"
              className="form-control"
              value={userData.preferredHospitalName}
              onChange={onChange}
              id="preferredHospitalName"
              name="preferredHospitalName"
            />
            
            <label htmlFor="preferredHospitalAddress">Preferred Hospital Address</label>
            <input
              type="text"
              className="form-control"
              value={userData.preferredHospitalAddress}
              onChange={onChange}
              id="preferredHospitalAddress"
              name="preferredHospitalAddress"
            />

            <label htmlFor="preferredHospitalContact">Preferred Hospital Contact</label>
            <input
              type="text"
              className="form-control"
              value={userData.preferredHospitalContact}
              onChange={onChange}
              id="preferredHospitalContact"
              name="preferredHospitalContact"
            />

          </div>
         
        </div> */}

        {/* Section 4: Insurance Details */}
        {/* <div className="section">
          <h2>Insurance Details</h2>
          <div className="form-group">
            <label htmlFor="insuranceCompany">Insurance Company</label>
            <input
              type="text"
              className="form-control"
              value={userData.insuranceCompany}
              onChange={onChange}
              id="insuranceCompany"
              name="insuranceCompany"
            />
            <label htmlFor="insuranceContact">Insurance Company Contact</label>
            <input
              type="text"
              className="form-control"
              value={userData.insuranceContact}
              onChange={onChange}
              id="insuranceContact"
              name="insuranceContact"
            />
            <label htmlFor="insurancePolicy">Insurance Policy details</label>
            <input
              type="text"
              className="form-control"
              value={userData.insurancePolicy}
              onChange={onChange}
              id="insurancePolicy"
              name="insurancePolicy"
            />

          </div>
          
        </div> */}

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary">
          Create User
        </button>
      </form>
    </div>
  );
};

export default Adduser;
