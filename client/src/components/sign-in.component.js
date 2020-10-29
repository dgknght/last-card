import React, { Component } from 'react';
import Cookies from 'universal-cookie';

export default class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = { name: '', id: null };

    this.nameInput = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.nameInput.current.focus();
  }

  handleChange(e) {
    const state = {
      [e.target.name]: e.target.value
    };
    this.setState(state);
  }

  handleSubmit(e) {
    e.preventDefault();

    const cookies = new Cookies();
    cookies.set('user', this.state.name);
    this.setState({ id: 1 });
  }

  render() {
    if (this.state.id) {
      window.location.href = '/';
      return;
    }

    return (
      <div className="row">
        <div className="col-md-6">
          <h1>Sign in</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label className="control-label" htmlFor="name">Name</label>
              <input type="text" ref={this.nameInput} className="form-control" name="name" id="name" value={this.state.name} onChange={this.handleChange} required />
            </div>
            <button className="btn btn-primary" type="submit">Sign in</button>
          </form>
        </div>
      </div>
    );
  }
}
