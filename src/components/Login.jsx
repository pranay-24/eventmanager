import React, {useState,useEffect} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './styles/login.css'
const backendroute = 'https://event-backend-ewtb.onrender.com'
const Login = (props) => {
    const [credentials, setCredentials] = useState({email: "", password: ""}) 
    //const [authToken,setAuthToken] = useState(localStorage.getItem('token'))
    let navigate = useNavigate();
   // const location = useLocation();
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${backendroute}/authapi/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });
        const json = await response.json()
        console.log(json);
        if ( json.success ){
            console.log(json.success);
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            //setAuthToken(json.authtoken);
            localStorage.setItem('role',json.role); 
            localStorage.setItem('id',json.id)
        
            setTimeout(() => {
                navigate('/');
              }, 1000);
          
        }
        else{
            alert("Invalid credentials");
        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    return (
       <div className="login-container"> 
        <div className="form-container">
            <form  onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                    {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
        <div className="description">
        <h2>Welcome to Event Manager App</h2>
        <p>
          This application is useful for event supervisors and event staff in planning for an event. Supervisors can manage events and employees working in facility. Staff can view the tasks assigned to them. 
        </p>
      </div> 
    </div>
    )
}

export default Login
