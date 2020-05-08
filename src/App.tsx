import React, { Component } from "react";
import { Button, Header, Card } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "./App.css";
import { Deck, CardModel } from "./Models";

interface IProps {}

interface IState {
  myCards: CardModel[];
  deck: Deck;
}

class App extends Component<IProps, IState> {
  constructor(props: Readonly<IProps>) {
    super(props);
    this.state = {
      myCards: [],
      deck: new Deck(),
    };
  }
  render() {
    return (
      <div className="my-total-reader">
        <Header className="my-header" size="huge">
          Blackjack
        </Header>
        <Button
          onClick={() => {
            const rnd = Math.floor(
              Math.random() * this.state.deck.cards.length
            );
            this.state.myCards.push(this.state.deck.cards[rnd]);
            const temp = this.state.deck;
            this.state.deck.cards.splice(rnd, 1);
            this.setState({ deck: temp });
          }}
        >
          Hit
        </Button>
        <div className="cards-info">
          {this.state.myCards.map((card: CardModel) => {
            return (
              <Card className="my-card">
                <Header>{card.sign}</Header>
                {card.value}
              </Card>
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
