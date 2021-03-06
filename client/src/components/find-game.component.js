import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class FindGame extends Component {
  constructor(props) {
    super(props);
    this.state = { games: null };
  }

  componentDidMount() {
    fetch('/api/games')
      .then(res => res.json())
      .then(data => this.setState({ games: data }))
      .catch(e => console.log('unable to parse', e));
  }

  render() {
    let content = null;
    if (this.state.games == null) {
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
            <li key={`game-list-item-${game.id}`} className="list-group-item"><Link to={`/games/${game.id}`}>{game.name}</Link></li>
          )) }
        </ul>
      )
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
