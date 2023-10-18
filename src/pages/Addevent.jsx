import React from 'react'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Navbar from '../components/Navbar'
import './styles/addevent.css'
import './styles/eventdetail.css'
const Addevent = ()=>{
const token = localStorage.getItem('token')
const role = localStorage.getItem('role')

    const [eventData, setEventData] = useState({
        name: '',
        date: '',
        startFrom: '',
        endAt: '',
        guestcount: 0,
        room: '',
      });
    
      const navigate = useNavigate();
    
      const handleSubmit = async (e) => {
        e.preventDefault();

          // Validate required fields
    if (!eventData.name || !eventData.date || !eventData.startFrom || !eventData.endAt || !eventData.room) {
      alert('Please fill in all required fields.');
      return;
    }
    
        // Send eventData to the server to create an event
        try {
          const response = await fetch('http://localhost:5000/eventapi/events', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'auth-token': `${token}`, // Include the JWT token
            'role': role, 
            },
            body: JSON.stringify(eventData),
          });
    
          const json = await response.json();
          console.log(json);
    
          if (response.ok) {
            // Redirect to the homepage or wherever you want to go
            navigate('/');
          } else {
            alert('Event creation failed');
          }
        } catch (error) {
          console.error('Event creation error:', error);
        }
      };
    
      const onChange = (e) => {

        const {name,value} = e.target;
      
        const updatedEventData = {...eventData};

        updatedEventData[name]=value;
        if(name === 'date'){
          updatedEventData[name] = value.getTime();
        }

        setEventData(updatedEventData);
        console.log(updatedEventData);
      };
    
      return (
        <div>
       <Navbar active = "addevent"/>
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
                type="date"
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
                type="date"
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
                type="date"
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
            <button type="submit" className="btn btn-primary">
              Create Event
            </button>
            </div>
          </form>
        </div>
      );
}

export default Addevent