import React from 'react'
import {useState,useEffect} from 'react'
import Navbar from '../components/Navbar'
import './styles/homepage.css'
import {Link} from 'react-router-dom'
import Navbartop from '../components/Navbartop'

const backendroute = 'https://event-backend-ewtb.onrender.com'

const Homepage = ()=>{
const token = localStorage.getItem('token')
const role = localStorage.getItem('role')
//console.log(token);
const [eve,setEv]=useState([]);
const [showConfirmation, setShowConfirmation] = useState(false);
const [selectedEvent, setSelectedEvent] = useState(null);

useEffect(()=>{

  const requestOptions ={
    method: 'GET',
    headers:{
     'Content-type':'application/json',
     'auth-token': `${token}`, // Include the JWT token
     'role': role, 
    }
  
  }

    fetch(`${backendroute}/eventapi/events`, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      setEv(data)
    })
    .catch((error) => {
      // Handle errors
      console.error('Fetch error:', error);
    });
},[role,token])

const showDeleteConfirmation=(event)=>{
setSelectedEvent(event)
setShowConfirmation(true);

}

const handleDeleteEvent=()=>{
const requestOptions = {
  method:"DELETE",
  headers:{
    "Content-type":"application/json",
    "auth-token":token,
    "role":role,
  }
}

fetch(`${backendroute}/eventapi/events/${selectedEvent}`,requestOptions)
.then((response)=>{

  if(!response.ok){
    throw new Error('Network response not ok');
  }

  setEv((events) => events.filter((event) => event._id !== selectedEvent));
  setShowConfirmation(false);
})
.catch((error)=>{
  console.error('delete error',error)
})
}

return (
    <>
    {/* <Navbartop /> */}
    <Navbar active = "home"/>
    {/* <p>This is the Homepage</p> */}
    <div className="center-container">
    {showConfirmation && (
      <div className="delete-modal">
        <div className="modal-content">
          <p>Are you sure you want to delete this event?</p>
          <button onClick={handleDeleteEvent}>Yes</button>
          <button onClick={() => setShowConfirmation(false)}>No</button>
        </div>
      </div>
      )}
    
    <table>
    <thead>
      <th>Name</th>
      <th>Date</th>
      <th>Start From</th>
      <th>End At</th>
      <th>Guest Count</th>
      <th>Room</th>
      <th>Actions</th>
    </thead>
  
    <tbody>
    {eve.map((ev,key)=>{
     return ( 
     <tr key={ev._id}>
        <td>{ev.name}</td>
        <td>{ev.date}</td>
        <td>{ev.startFrom}</td>
        <td>{ev.endAt}</td>
        <td>{ev.guestcount}</td>
        <td>{ev.room}</td>
        <td><Link to={`/events/${ev._id}`} >Details</Link>
        
         {role === 'Supervisor' && (
                    <>
                      {' | '}
                      <Link to={`/events/update/${ev._id}`}>Update</Link>
                      { ' | '}
                      <button className="delete-button" onClick={()=>{ showDeleteConfirmation(ev._id)}}>Delete</button>
                    </>
         )}
      </td>

     </tr>
     )
    })}
    </tbody>
     </table>
 
    </div>
    
   
    </>
)
}

export default Homepage