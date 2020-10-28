import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class FindGame extends Component {
  constructor(props) {
    super(props);
    this.state = { games: null };

    this.handleDelete = this.handleDelete.bind(this);
  }

  loadGames() {
    fetch('/api/games')
      .then(res => {
        if (res.status === 200) {
          res.json().then(games => this.setState({ games }));
        } else {
          res.json().then(error => this.setState(error));
        }
      })
  }

  componentDidMount() {
    this.loadGames();
  }


  handleDelete(game) {
    fetch(`/api/games/${game._id}`, { method: 'DELETE' })
      .then(() => this.loadGames())
  }

  render() {
    let content = null;
    if (this.state.error != null) {
      content = (
        <div className="alert alert-danger">
          {this.state.error}
        </div>
      );
    } else if (this.state.games == null) {
      content = (
        <div className="d-flex justify-content-center">
          <div className="spinner-border">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    } else {
      content = (
        <ul className="list-group">
          { this.state.games.map(game => (
            <li key={`game-list-item-${game._id}`} className="list-group-item p-1 d-flex align-items-center">
              <Link className="ml-1 text-decoration-none" to={`/games/${game._id}`}>{game.name}</Link>
              <button className="btn btn-link text-decoration-none ml-auto" onClick={() => this.handleDelete(game)}>&times;</button>
            </li>
          )) }
        </ul>
      );
    }
    return (
      <div className="row">
        <div className="col-md-6">
          <h1>Find a game</h1>
          {content}
        </div>
      </div>
    );
  }
}
