import React, { Component } from 'react';

export default class Card extends Component {
  constructor(props) {
    super(props);

    this.handleDoubleClick = this.handleDoubleClick.bind(this);
  }

  handleDoubleClick() {
    if(this.props.onPlay)
      this.props.onPlay(this.props.card);
  }

  cardValue() {
    const replacements = {
      drawTwo: "+2",
      wildDrawFour: "+4"
    };
    return replacements[this.props.card.value] || this.props.card.value;
  }

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
      <div className="card-border" onDoubleClick={this.handleDoubleClick}>
        <div className={`uno-card uno-card-${this.props.card.color} uno-card-${this.props.card.value}`}>
          <span className="card-text">{this.cardValue()}</span>
        </div>
      </div>
    );
  }
}
