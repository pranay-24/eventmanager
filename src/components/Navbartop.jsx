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
    {/* <div classNameName="container">
        <Link to="/"><h2>Event Manager</h2></Link>
        <p>Role: {role}</p>
        <div classNameName="">
        <button classNameName="logout-button" onClick={handleSubmit}>Logout</button>
        </div> */}
        <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-1 mb-2 ">
      <div className="col-md-3 mb-2 mb-md-0">
        <a href="/" className="d-inline-flex link-body-emphasis text-decoration-none">
          Event Manager
        </a>
      </div>

    

      <div className="col-md-3 text-end">
        <button className="logout-button">Login</button>
       
      </div>
    </header>
    {/* </div> */}

</div>
    )

}

export default Navbartop;