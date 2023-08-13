import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Route} from "react-router-dom";
import { createRoot } from "react-dom/client";

import Navbar from "./components/navbar.component.js" 
import TasksList from "./components/tasks-list.component"; 
import EditTask from "./components/edit-task.component"; 
import CreateTask from "./components/create-task.component";  
import CreateUser from "./components/create-user.component";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br/> 
        <Route path = "/" exact component={TasksList} />
        <Route path = "/edit/:id" component={EditTask} />
        <Route path = "/create" component={CreateTask} />
        <Route path = "/user" component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;

/* <header className="App-header">
<img src={logo} className="App-logo" alt="logo" />
<p>
  Edit <code>src/App.js</code> and save to reload.
</p>
<a
  className="App-link"
  href="https://reactjs.org"
  target="_blank"
  rel="noopener noreferrer"
>
  Learn React
</a>
</header> */