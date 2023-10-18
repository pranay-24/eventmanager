import React from "react";
import { Link } from "react-router-dom";

import "./styles/navBar.css";

const Navbar = (props) => {
	const id= localStorage.getItem('id');
	const role = localStorage.getItem('role');
	const { active } = props;

	return (
		<React.Fragment>
			{/* <div className="nav-container"> */}
				<nav className="navbar">
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