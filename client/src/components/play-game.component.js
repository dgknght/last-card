import React, { Component } from 'react';

export default class PlayGame extends Component {

  constructor(props) {
    super(props);

    this.id = props.match.params.id;
    this.state = { game: null }
  }

  componentDidMount() {
    fetch(`/api/games/${this.id}`)
      .then(res => {
        if (res.status === 200) {
          res.json().then(game => this.setState({ game }));
        } else {
          res.json().then(error => this.setState({ error }));
        }
      });
  }
  
  render() {
    if (this.state.game != null) {
      return <h1>Play game {this.state.game.name}</h1>;
    }

    if (this.state.error != null) {
      return (
        <div className="alert alert-danger">
          {this.state.error.message}
        </div>
      )
    }

    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
}
