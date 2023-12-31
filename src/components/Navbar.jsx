import React,{useState} from "react";
import { Link,useNavigate } from "react-router-dom";

import "./styles/navBar.css";

const Navbar = (props) => {

	const [modalShow,setModalShow] = useState(false)
	const id= localStorage.getItem('id');
	const role = localStorage.getItem('role');
	const { active } = props;
	const navigate = useNavigate();
    

    const handleLogout =async(e)=>{
    
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('id');
    navigate('/login');

    }

	return (
		<React.Fragment>
			{/* <div className="nav-container"> */}
	
				<nav className="navbar">
				<div>
				<header className="container  ">
      <div className="col-md-3 mb-2 mb-md-0">
        <a href="/" className="d-inline-flex link-body-emphasis text-decoration-none">
         <h2><b>Event Manager</b></h2> 
        </a>
	
      </div>
	  <p>Role: {role}</p>
      <div className="col-md-3 ">
        <button className="logout-button" onClick={()=>{setModalShow(true)}}>Logout</button>
        {/* <button type="button" className="btn btn-primary">Sign-up</button> */}
		{modalShow && <div className="delete-modal">
              <div className="modal-content">
              <p>Are you sure you want to logout</p>
              <button onClick={handleLogout}>Yes</button>
              <button onClick={()=>{setModalShow(false)}}>No</button>
              </div>
             
            </div>
         }
      </div>
    </header>
	</div>
					<div className="nav-background">
						<ul className="nav-list">
							<li
								className={
									active === "home"
										? "nav-item active"
										: "nav-item"
								}
							>
								<Link to="/">Home</Link>
							</li>
							{/* <li
								className={
									active === "about"
										? "nav-item active"
										: "nav-item"
								}
							>
								<Link to="/about">About</Link>
							</li> */}
							{role=== 'Supervisor' && (<>
								<li
								className={
									active === "addevent"
										? "nav-item active"
										: "nav-item"
								}
							>
								<Link to="/addevent">Add Event</Link>
							</li>
							</>)}
							
							{role ==='Supervisor' && (<>
								<li
								className={
									active === "adduser"
										? "nav-item active"
										: "nav-item"
								}
							>
								<Link to="/adduser">Add User</Link>
							</li>
							</>)}
							
							
							<li
								className={
									active === "profile"
										? "nav-item active"
										: "nav-item"
								}
							>
								<Link to={`/users/${id}`}>Profile</Link>
							</li>
							{role=== 'Supervisor' && (<>
								<li
								className={
									active === "staff"
										? "nav-item active"
										: "nav-item"
								}
							>
								<Link to="/users">Staff</Link>
							</li>
							</>)}
						

							{/* <li
								className={
									active === "articles"
										? "nav-item active"
										: "nav-item"
								}
							>
								
								<Link to="/contact">Contact</Link>
							</li> */}
						</ul>

					
					</div>
				</nav>
			{/* </div> */}
		</React.Fragment>
	);
};

export default Navbar;