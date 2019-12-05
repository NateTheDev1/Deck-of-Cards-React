import React, { Component } from "react";

class Card extends Component {
  render() {
    return (
      <img
        src={this.props.imgURL}
        alt={this.props.imgURL}
        style={{ height: 150 }}
      />
    );
  }
}

export default Card;
