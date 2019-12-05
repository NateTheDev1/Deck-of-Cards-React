import React, { Component } from "react";
import "./Deck.css";
import Card from "./Card";
import axios from "axios";

class Deck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      remaining: undefined,
      isLoading: true,
      deckID: undefined
    };
    this.handleRestart = this.handleRestart.bind(this);
  }

  async componentDidMount() {
    const url = `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`;
    let response = await axios.get(url);
    console.log(response);
    let data = response.data;
    this.setState({
      remaining: data.remaining,
      isLoading: false,
      deckID: data.deck_id
    });
  }

  handleDraw = e => {
    const url = `https://deckofcardsapi.com/api/deck/${
      this.state.deckID
    }/draw/?count=1`;
    axios.get(url).then(response => {
      console.log(response);
      let data = response.data;
      this.setState({
        remaining: data.remaining,
        cards: [...this.state.cards, { img: data.cards[0].image }]
      });
    });
  };

  async handleRestart() {
    this.setState({ isLoading: true });
    const url = `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`;
    let response = await axios.get(url);
    console.log(response);
    let data = response.data;
    this.setState({
      remaining: data.remaining,
      isLoading: false,
      deckID: data.deck_id,
      cards: []
    });
  }

  render() {
    const cards = this.state.cards.map(card => <Card imgURL={card.img} />);
    return (
      <div>
        {this.state.isLoading ? (
          <div className="loader" />
        ) : (
          <div>
            <h1>Deck Of Cards</h1>
            <p>{this.state.remaining} Cards Remaining</p>
            <button onClick={this.handleRestart}>Restart</button>
            {this.state.remaining === 0 ? (
              <h1>OUT OF CARDS</h1>
            ) : (
              <button onClick={this.handleDraw}>Deal Me A Card!</button>
            )}
            <br />
            <br />
            <div>{cards}</div>
          </div>
        )}
      </div>
    );
  }
}

export default Deck;
