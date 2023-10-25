// Adduser.js

import React, { useState , useEffect} from 'react';
import {useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './styles/adduser.css';
const backendroute = 'https://event-backend-ewtb.onrender.com'
const localroute = 'http://localhost:5000'
const Updatevent = () => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const { eventId } = useParams();

  const [eventData, setEventData] = useState({
    name: '',
    date: '',
    startFrom: '',
    endAt: '',
    guestcount: '',
    room: '',
    
  });

  useEffect(()=>{
    const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': `${token}`,
          role,
        },
      };

      fetch(`${backendroute}/eventapi/events/${eventId}`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Populate the form fields with the eventdata
        setEventData(data);
        console.log(eventData)
      })
      .catch((error) => {
        // Handle errors
        console.error('Fetch error:', error);
      });
  },[role,token,eventId]);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send userData to the server to create a user
    try {
      const response = await fetch(`${localroute}/eventapi/events/${eventId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': `${token}`, // Include the JWT token
          role,
        },
        body: JSON.stringify(eventData),
      });

      const json = await response.json();
      console.log(json);

      if (response.ok) {
        // Redirect to the homepage or wherever you want to go
        navigate('/');
      } else {
        alert('event creation failed');
      }
    } catch (error) {
      console.error('event creation error:', error);
    }
  };

  const onChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Navbar active="Staff" />
      <div className="center-container">

     
      <form onSubmit={handleSubmit}>
            <div className="form_container">
            <div className="form_row ">
              <label htmlFor="name" className="form-label">
                Event Name<span className="required">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                value={eventData.name}
                onChange={onChange}
                id="name"
                name="name"
              />
            </div>
            <div className="form_row ">
              <label htmlFor="date" className="form-label">
                Event Date<span className="required">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                value={eventData.date}
                onChange={onChange}
                name="date"
              />
            </div>

            <div className="form_row ">
              <label htmlFor="startFrom" className="form-label">
                Start time<span className="required">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                value={eventData.startFrom}
                onChange={onChange}
                name="startFrom"
              />
            </div>

            <div className="form_row ">
              <label htmlFor="endAt" className="form-label">
                End time<span className="required">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                value={eventData.endAt}
                onChange={onChange}
                name="endAt"
              />
            </div>

            <div className="form_row ">
              <label htmlFor="date" className="form-label">
                Room<span className="required">*</span>
              </label>
              <select
            
            value={eventData.room}
            onChange={onChange}
            name="room"
          >
            <option value="">Select a room</option>
            <option value="Hall1">Hall 1</option>
            <option  value="Hall2">Hall 2</option>
            <option   value="Hall3">Hall 3</option>
            <option  value="Hall4">Hall 4</option>
            <option  value="Hall5">Hall 5</option>
            {/* Add more room options as needed */}
          </select>
            </div>

            <div className="form_row ">
              <label htmlFor="guestcount" className="form-label">
                Guest Count
              </label>
              <input
                type="text"
                className="form-control"
                value={eventData.guestcount}
                onChange={onChange}
                name="guestcount"
              />
            </div>


            {/* Add other event fields here */}
            <button type="submit" className="normal-button">
              Update Event
            </button>
            </div>
          </form>
          </div>
    </>
  );
};

export default Updatevent;
