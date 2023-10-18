import React, {useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import './styles/login.css'

const Login = (props) => {
    const [credentials, setCredentials] = useState({email: "", password: ""}) 
    let navigate = useNavigate();
    const authToken = localStorage.getItem('token');
    useEffect(() => {
        // Check if the user is already authenticated
        
        if (authToken) {
            // If the user is authenticated, navigate to the homepage
            navigate('/');
        }
    }, [authToken]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/authapi/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });
        const json = await response.json()
        console.log(json);
        if (json.success){
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            localStorage.setItem('role',json.role); 
            localStorage.setItem('id',json.id)
            navigate('/');

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
