import React from 'react'
import {useEffect,useState} from 'react'
import Navbar from '../components/Navbar'
import {useParams} from 'react-router-dom'
import './styles/homepage.css'
const token = localStorage.getItem('token')
//const role = localStorage.getItem('role')
const backendroute = 'https://event-backend-ewtb.onrender.com'
const localroute = 'http://localhost:5000'

const Eventdetail = ()=>{
const [ev,setEv] = useState('')
const [users,setUsers] = useState(null);
const [newUser, setNewUser] = useState('');
const [userToDelete, setUserToDelete] = useState(null);

const [taskToDelete, setTaskToDelete] = useState(null);
const [role, setRole] = useState(localStorage.getItem('role'));

const [newTask, setNewTask] = useState({
  role: '',
  name: '',
});




const isValidObjectId = (id) => {
  const objectIdPattern = /^[0-9a-fA-F]{24}$/;
  return objectIdPattern.test(id);
};

const {eventId} = useParams()

//console.log(eventId)

const fetchEventDetails = () => {
  const requestOptions ={
    method: 'GET',
    headers:{
     'Content-type':'application/json',
     'auth-token': `${token}`, // Include the JWT token
     'role': role, 
    }
  }
    fetch(`${backendroute}/eventapi/events/${eventId}`, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      setEv(data)
      console.log(data);
    })
    .catch((error) => {
      // Handle errors
      console.error('Fetch error:', error);
    });

}

useEffect(() => {
  if(role){
    fetchEventDetails();
  }
  
},[ev._id, role ]);

//Fetch users for the event and update ev.users

const fetchUsersForEvent = async () => {
  try {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'auth-token': token,
        role: role,
      },
    };

    // Replace 'usersEndpoint' with the correct API endpoint for fetching users for the event
    const usersData = await Promise.all(

      ev.users.map((userId) => {


    return  fetch(`${backendroute}/userapi/users/${userId}`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        return response.json();
      });
    
    })
    )

    // Update the state with the fetched users data
    setEv((prevEv) => ({
      ...prevEv,
      users: usersData,
    }));
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

// delete user functionality 



const handleDeleteUser = (userId) => {
  setUserToDelete(userId);
};

const confirmDeleteUser = (userId) => {
  // Fetch the delete user route and remove the user from the list
  fetch(`${backendroute}/eventapi/events/${eventId}/removeuser/${userId}`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'auth-token': token,
      role: role,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(() => {
      // Remove the user from the state
      setEv((prevEv) => ({
        ...prevEv,
        users: prevEv.users.filter((user) => user._id !== userId),
      }));
      setUserToDelete(null);
    })
    .catch((error) => {
      // Handle errors
      console.error('Fetch error:', error);
    });
};

const cancelDeleteUser = () => {
  setUserToDelete(null);
};


//delete tasks 
const handleDeleteTask = (taskId) => {
  setTaskToDelete(taskId);
};

const confirmDeleteTask = (taskId) => {
  // Fetch the delete user route and remove the user from the list
  fetch(`${backendroute}/taskapi/tasks/${eventId}/${taskId}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
      'auth-token': token,
      role: role,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(() => {
      // Remove the user from the state
      setEv((prevEv) => ({
        ...prevEv,
        tasks: prevEv.tasks.filter((task) => task._id !== taskId),
      }));
      setTaskToDelete(null);
    })
    .catch((error) => {
      // Handle errors
      console.error('Fetch error:', error);
    });
};

const cancelDeleteTask = () => {
  setTaskToDelete(null);
};

  // Fetch tasks for the event and update `ev.tasks`
const fetchTasksForEvent = async () => {
    try {
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          'auth-token': `${token}`,
          role: role,
        },
      };

      const tasksData = await Promise.all(

        ev.tasks.map((taskId) => {

       

          return fetch(`${backendroute}/taskapi/tasks/taskId/${taskId}`, requestOptions).then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok.');
            }
            return response.json();
          });
        })
      );

      setEv((prevEv) => ({
        ...prevEv,
        tasks: tasksData,
      }));
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

useEffect(()=>{
  fetchAvailableUsers();

  if (ev.tasks && ev.tasks.length > 0 ) {
    fetchTasksForEvent(); // Fetch tasks when the component mounts and tasks are available
  }

  if(ev.users && ev.users.lngth > 0 ){
    fetchUsersForEvent();
  }
},[ev.tasks])

const addUser = () => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'auth-token': token,
      role,
    },
   
  };

  fetch(`${backendroute}/eventapi/events/${eventId}/adduser/${newUser}`, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(() => {
      console.log('user added to event');
    
      fetchEventDetails();
    })
    .catch((error) => {
      // Handle errors
      console.error('Fetch error:', error);
    });

  
 
};

//fetch available users

const fetchAvailableUsers = async () => {
  try {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'auth-token': token,
        role: role,
      },
    };

    const response = await fetch(`${backendroute}/userapi/users`, requestOptions); // Adjust the endpoint accordingly
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const userData = await response.json();
    setUsers( userData) ;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};



const addTask = () => {
  setEv((prevEv) => ({
    ...prevEv,
    tasks: [...prevEv.tasks, newTask],
  }));

  const requestOptions ={
    method: 'POST',
    headers:{
     'Content-type':'application/json',
     'auth-token': `${token}`, // Include the JWT token
     'role': role, 
    },
    body: JSON.stringify(newTask)
  }

  fetch(`${backendroute}/taskapi/tasks/${eventId}`, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(() => {
      console.log('task created');
      setNewTask({
        role: '',
        name: '',
      });

      fetchEventDetails();
    })
    .catch((error) => {
      // Handle errors
      console.error('Fetch error:', error);
    });

  
 
};

return (
    <>
    <div className="">
  
    <Navbar active = "home"/>
    </div>

    <div className="slidedown">

    <div className="section">
          <h2>Event Information</h2>
          <div className="form-group">
            <div>
            <label htmlFor="">Event Name</label>
            <p>{ev.name}</p>
            </div>

            <div>
            <label htmlFor="">Start Date</label>
            <p>{ev.date}</p>
            </div>

            <div>
            <label htmlFor="">Start Time</label>
            <p>{ev.startFrom}</p>
            </div>

            <div>
            <label htmlFor="">End at Time</label>
            <p>{ev.endAt}</p>
            </div>

            <div>
            <label htmlFor="">Guest count</label>
            <p>{ev.guestcount}</p>
            </div>

            <div>
            <label htmlFor="name">Room</label>
            <p>{ev.room}</p>
            </div>

            {/* <div>
            <label htmlFor="name">Uniform Size</label>
            <p>{user.uniformSize}</p>
            </div> */}


        </div>
    </div>

    <div className="section">
  <h2>Users</h2>
  {ev.users && ev.users.length > 0 && (
    <div className="user-container">
      {ev.users.map((user, index) => (
        <div key={index}>
          <div className="user-card">
          <p>{user.name}</p>
          <span className="" onClick={() => handleDeleteUser(user._id)}> X </span>
          </div>
          {/* You can include more user details here */}
          {userToDelete === user._id && (
            <div className="delete-modal">
              <div className="modal-content">
              <p>Are you sure you want to remove the staff?</p>
              <button onClick={() => confirmDeleteUser(user._id)}>Yes</button>
              <button onClick={cancelDeleteUser}>No</button>
              </div>
             
            </div>
          )}

        </div>
      ))}
    </div>
  )}
</div>
    
    {role === 'Supervisor' && (
      <div className="section">
        <h2>Add Staff</h2>
          <div>
            <label>Select Staff: </label>
            <select
              value={newUser}
              onChange={(e) => setNewUser(e.target.value)}
            >
              <option value="">Select Staff</option>
              {users && users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name}, {user.role}
                </option>
              ))}
            </select>
            <button onClick={addUser}>Add </button>
          </div>
        
        </div>
        )}
        
    

    <div className="section">
    <h2>Tasks</h2>
        {ev.tasks && ev.tasks.length > 0 && (
          <div className="task-container">
        {  ev.tasks.map((task, index) => (
          (role === 'Supervisor' || role === task.role) && (
          <div className="task-card" key={index}>
            {/* Render task details (role, task) */}
            <div className="task-info">
            <p className="task-role">Role: {task.role}</p>
            <p>Info : {task.name}</p>
            {/* Include options for updating and deleting tasks */}
          </div>
             <button className="delete-button" onClick={() => handleDeleteTask(task._id)}>Delete</button>


             {taskToDelete === task._id && (
            <div className="delete-modal">
              <div className="modal-content">
              <p>Are you sure you want to remove the task?</p>
              <button onClick={() => confirmDeleteTask(task._id)}>Yes</button>
              <button onClick={cancelDeleteTask}>No</button>
              </div>
             
            </div>
          )}

          </div>
          )

        ))
          }
        </div>
      )}

{role === 'Supervisor' && (
    <div>
      <h2>Add Task</h2>
      {/* Input fields for role and task description */}
      <label>Task Role:</label>
      <select
        value={newTask.role}
        onChange={(e) => setNewTask({ ...newTask, role: e.target.value })}
      >
    <option value="">Select a role</option>
    <option value="Staging">Staging</option>
    <option value="AV">AV</option>
    <option value="Supervisor">Supervisor</option>
    <option value="Security">Security</option>
    <option value="Server">Server</option>
        </select> 
      <label>Task Description:</label>
      <input
        type="text"
        value={newTask.name}
        onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
      />
      <button onClick={addTask}>Add </button>
    </div>
  )}

    </div>
    {/* <div className="section">
          <h2>Emergency Contact</h2>
          <div className="form-group">
            <div>
            <label htmlFor="emergencyFullName">Emergency Contact FullName</label>
            <p>{user.emergencyFullName}</p>
            </div>

            <div>
           <label htmlFor="emergencyMobile">Emergency Contact Mobile</label>
            <p>{user.emergencyMobile}</p>
            </div>

            <div>
           <label htmlFor="emergencyRelationship">Emergency Contact Relationship</label>
            <p>{user.emergencyRelationship}</p>
            </div>

          </div>
    </div>
    <div className="section">
          <h2>Hospital Preference</h2>
          <div className="form-group">
          
          <div>
           <label htmlFor="preferredHospitalName">Preferred Hospital Name</label>
            <p>{user.preferredHospitalName}</p>
            </div>
           
            <div>
           <label htmlFor="preferredHospitalAddress">Preferred Hospital Address</label>
            <p>{user.preferredHospitalAddress}</p>
            </div>

            <div>
           <label htmlFor="preferredHospitalContact">Preferred Hospital Contact</label>
            <p>{user.preferredHospitalContact}</p>
            </div>

          </div>
    </div>

    <div className="section">
          <h2>Insurance Details</h2>
          <div className="form-group">
          <div>
           <label htmlFor="insuranceCompany">Insurance Company Name</label>
            <p>{user.insuranceCompany}</p>
            </div>

            <div>
           <label htmlFor="insuranceContact">Insurance Company Contact</label>
            <p>{user.insuranceContact}</p>
            </div>
            
            <div>
           <label htmlFor="insurancePolicy">Insurance Company Policy</label>
            <p>{user.insurancePolicy}</p>
            </div>

          </div>
    </div> */}

</div>
    </>
)
}

export default Eventdetail;