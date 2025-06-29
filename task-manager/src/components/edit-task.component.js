import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { createRoot } from "react-dom/client";

export default class EditTask extends Component {
  constructor(props) {
    super(props);

    this.onChangeUser = this.onChangeUser.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDeadline = this.onChangeDeadline.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      user: '',
      description: '',
      deadline: new Date(),
      users: []
    };
  }

  componentDidMount() {
    axios.get(`http://localhost:5000/tasks/${this.props.match.params.id}`)
      .then(response => {
        this.setState({
          user: response.data.user,
          description: response.data.description,
          deadline: new Date(response.data.Deadline)
        });
      })
      .catch(function (error) {
        console.log(error);
      });

    axios.get('http://localhost:5000/users/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.name)
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onChangeUser(e) {
    this.setState({
      user: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onChangeDeadline(date) {
    this.setState({
      deadline: date
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const task = {
      user: this.state.user,
      description: this.state.description,
      deadline: this.state.deadline
    };

    console.log(task);

    axios.post(`http://localhost:5000/tasks/update/${this.props.match.params.id}`, task)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
      <div>
        <h3>Edit Task</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>User: </label>
            <select
              ref="userInput"
              required
              className="form-control"
              value={this.state.user}
              onChange={this.onChangeUser}>
              {
                this.state.users.map(function (user) {
                  return <option
                    key={user}
                    value={user}>{user}
                  </option>;
                })
              }
            </select>
          </div>
          <div className="form-group">
            <label>Description: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
            />
          </div>
          <div className="form-group">
            <label>Deadline: </label>
            <div>
              <DatePicker
                selected={this.state.deadline}
                onChange={this.onChangeDeadline}
              />
            </div>
          </div>

          <div className="form-group">
            <input type="submit" value="Edit Task" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}
