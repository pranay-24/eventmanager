import React from 'react'
import {useState,useEffect} from 'react'
import Navbar from '../components/Navbar'
import './styles/homepage.css'
import {Link} from 'react-router-dom' 

const backendroute = 'https://event-backend-ewtb.onrender.com'
const localroute = 'http://localhost:5000'
const Users = ()=>{
const token = localStorage.getItem('token')
const role = localStorage.getItem('role')
//console.log(token);
const [users,setUsers]=useState([]);

useEffect(()=>{

  const requestOptions ={
    method: 'GET',
    headers:{
     'Content-type':'application/json',
     'auth-token': `${token}`, // Include the JWT token
     'role': role, 
    }
  
  }

    fetch(`${backendroute}/userapi/users`, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      setUsers(data)
    })
    .catch((error) => {
      // Handle errors
      console.error('Fetch error:', error);
    });
},[])
    

return (
    <>
    <Navbar active = "staff"/>
    {/* <p>This is the Homepage</p> */}
    <div className="center-container">

    
    <table>
    <thead>
      <th>Name</th>
      <th>Email</th>
      <th>Role</th>
      <th>Mobile</th>
      <th>Actions</th>
    </thead>
  
    <tbody>
    {users.map((user,key)=>{
     return ( 
     <tr key={user._id}>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.role}</td>
        <td>{user.mobile}</td>
        
        <td><Link to={`/users/${user._id}`} >Details</Link>
        {role === 'Supervisor' && (
                    <>
                      {' | '}
                      <Link to={`/users/update/${user._id}`}>Update</Link>
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

export default Users