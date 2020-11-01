import React, { Component } from 'react';

export default class Card extends Component {
  render() {
    if (!this.props.card)
      return (
        <div className="card-border">
          <div className="uno-card face-down">
            <span className="card-text">UNO</span>
          </div>
        </div>
      );

    return (
      <div className="card-border">
        <div className={`uno-card uno-card-${this.props.card.color} uno-card-${this.props.card.value}`}>
          <span className="card-text">{this.props.card.value}</span>
        </div>
      </div>
    );
  }
}
