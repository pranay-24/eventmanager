import React from 'react'
import {Link, useNavigate } from 'react-router-dom'
import './styles/navbartop.css'

const Navbartop = ()=>{
    const navigate = useNavigate();
    const role = localStorage.getItem('role');

    const handleSubmit =async(e)=>{
    
    e.preventDefault();
    localStorage.setItem('role','');
    localStorage.setItem('id','');
    localStorage.setItem('token','');
    navigate('/login');

    }
    return (
<div>
    <div className="container">
        <Link to="/"><h2>Event Manager</h2></Link>
        <p>Role: {role}</p>
        <div className="">
        <button type="button" className="btn btn-primary" onClick={handleSubmit}>Logout</button>
        </div>
      
    </div>

</div>
    )

}

export default Navbartop;