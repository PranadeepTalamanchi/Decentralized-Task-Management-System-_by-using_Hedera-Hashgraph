import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { createRoot } from "react-dom/client";

const Task = props => (
    <tr>
      <td>{props.task.user.name}</td>
      <td>{props.task.description}</td>
      <td>{props.task.Deadline.substring(0, 10)}</td>
      <td>
        <Link to={`/edit/${props.task._id}`}>edit</Link> |{' '}
        <button
          type="button"
          onClick={() => props.deleteTask(props.task._id)}
        >
          delete
        </button>
      </td>
    </tr>
  );
  

export default class TasksList extends Component {
  constructor(props) {
    super(props);

    this.deleteTask = this.deleteTask.bind(this);

    this.state = { tasks: [] };
  }

  componentDidMount() {
    axios
      .get('http://localhost:5000/tasks/')
      .then(response => {
        this.setState({ tasks: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  deleteTask(id) {
    axios
      .delete('http://localhost:5000/tasks/' + id)
      .then(response => {
        console.log(response.data);
      });

    this.setState({
      tasks: this.state.tasks.filter(task => task._id !== id)
    });
  }

  taskList() {
    return this.state.tasks.map(currentTask => {
      return (
        <Task
          task={currentTask}
          deleteTask={this.deleteTask}
          key={currentTask._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Task List</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>User</th>
              <th>Description</th>
              <th>Deadline</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.taskList()}</tbody>
        </table>
      </div>
    );
  }
}
