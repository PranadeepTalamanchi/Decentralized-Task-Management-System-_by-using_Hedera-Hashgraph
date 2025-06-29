import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { createRoot } from "react-dom/client";

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">TaskTracker</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/" className="nav-link">Tasks</Link>
            </li>
            <li className="navbar-item">
              <Link to="/create" className="nav-link">Create Task Log</Link>
            </li>
            <li className="navbar-item">
              <Link to="/user" className="nav-link">Create User</Link>
            </li>
            {/* Add more navigation links as needed */}
          </ul>
        </div>
      </nav>
    );
  }
}
