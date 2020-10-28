import React, { Component } from 'react';

export default class PlayGame extends Component {

  constructor(props) {
    super(props);

    this.id = props.match.params.id;
    this.state = { game: null }
  }

  componentDidMount() {
    fetch(`/api/games/${this.id}`)
      .then(res => res.json())
      .then(data => this.setState({ game: data }));
  }
  
  render() {
    if (this.state.game == null) {
      return (
        <div className="d-flex justify-content-center">
          <div className="spinner-border">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    }

    return <h1>Play game {this.state.game.name}</h1>;
  }
}
