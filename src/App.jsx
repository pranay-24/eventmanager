import { useState,useEffect } from 'react'

import './App.css'
import { BrowserRouter,Routes, Route, Navigate } from "react-router-dom";
import Login from './components/Login';
import Addevent from './pages/Addevent';
import Adduser from './pages/Adduser';
import Profile from './pages/Profile';
import Homepage from './pages/Homepage';
import Updateuser from './pages/Updateuser';
import Updatevent from './pages/UpdateEvent';

import Eventdetail from './pages/Eventdetail'

import Users from './pages/Users';


function App() {
  //const [count, setCount] = useState(0)
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    console.log(token)
    console.log(role)

    if (token != null && role != null) {
      // User is authenticated, set the authenticated state to true
      console.log("app is reloaded", )
      setAuthenticated(true);
      console.log(authenticated)
    } else {
      // User is not authenticated
      setAuthenticated(false);
    }
  }, []);

  if (authenticated === null) {
    // While checking authentication, you can display a loading message or spinner
    return <div>Loading...</div>;
  }

  
  return (
    <>

      
      <BrowserRouter>
      
      <Routes>
      <Route
          path="/"
          element={authenticated ? <Homepage /> : <Login />}
        />
      <Route path="/login" element={<Login />} />
      <Route
         path="/addevent"
         element={authenticated ? <Addevent /> : <Login />}
       />
        <Route
         path="/events/update/:eventId"
         element={authenticated ? <Updatevent /> : <Login />}
       />

        <Route
         path="/adduser"
         element={authenticated ? <Adduser /> : <Login />}
       />

         {/* <Route
         path="/addperson"
         element={authenticated ? <Addperson /> : <Navigate to="/login" />}
       /> */}

        {/* <Route
         path="/persons"
         element={authenticated ? <Persons /> : <Navigate to="/login" />}
       /> */}

      <Route path="/events/:eventId" element={authenticated? <Eventdetail /> : <Login />} />

      <Route
         path="/profile"
         element={authenticated ? <Profile /> :<Login />}
       />
       
      <Route path="/users/:userId" element={authenticated? <Profile /> : <Login />} />
     
     

      <Route path="/users/update/:userId" element={authenticated? <Updateuser /> : <Login />} />

      <Route path="/users" element={authenticated? <Users /> : <Login />} />

      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
