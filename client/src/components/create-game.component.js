import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default class CreateGame extends Component {
  constructor(props) {
    super(props);

    this.state = { name: '', id: null };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const state = {
      [event.target.name]: event.target.value
    }
    this.setState(state);
  }

  handleSubmit(event) {
    event.preventDefault();

    fetch('/api/games', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    }).then(res => {
      if (res.status === 201) {
        res.json().then(g => {
          this.setState({ _id: g._id })
        });
      } else {
        console.error('Failure');
        res.json().then(error => {
          console.dir(error);
          this.setState({ error: error.message });
        });
      }
    }).catch(console.error);
  }

  render() {
    if (this.state._id) {
      return <Redirect to={`/games/${this.state._id}`} />
    }

    return (
      <div className="row">
        <div className="col-md-6">
          <form onSubmit={this.handleSubmit}>
            <h1>Create a game</h1>
            <div className="form-group">
              <label className="control-label" htmlFor="name">Name</label>
              <input type="text" className="form-control" name="name" id="name" placeholder="name" value={this.state.name} onChange={this.handleChange} required />
            </div>
            <button className="btn btn-primary" type="submit">Create</button>
          </form>
        </div>
      </div>
    );
  }
}
