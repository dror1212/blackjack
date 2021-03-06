import React, { Component } from "react";
import { Button, Header, Image } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "./App.css";
import { Deck, CardModel } from "./Models";

interface IProps {}

interface IState {
  myCards: CardModel[];
  enemyCards: CardModel[];
  deck: Deck;
  over: boolean;
  sum: number;
  enemySum: number;
  stop: boolean;
}

class App extends Component<IProps, IState> {
  constructor(props: Readonly<IProps>) {
    super(props);
    this.state = {
      myCards: [],
      enemyCards: [],
      deck: new Deck(),
      over: false,
      sum: 0,
      enemySum: 0,
      stop: false,
    };
  }
  render() {
    return (
      <div className="my-bj">
        <Header className="my-header" size="huge">
          Blackjack
        </Header>
        <Header className="score">
          {(this.state.sum > 21 ||
            (this.state.enemySum > this.state.sum && this.state.over)) &&
          this.state.enemySum <= 21
            ? "You lost"
            : this.state.over
            ? this.state.sum === this.state.enemySum
              ? "You tied"
              : "You won"
            : "Your Turn"}
        </Header>{" "}
        <Button
          className="my-button"
          onClick={() => {
            if (this.state.sum < 21 && !this.state.over) {
              let rnd = Math.floor(
                Math.random() * this.state.deck.cards.length
              );
              this.state.myCards.push(this.state.deck.cards[rnd]);
              const temp =
                this.state.deck.cards[rnd].value > 10
                  ? 10
                  : this.state.deck.cards[rnd].value;
              this.state.deck.cards.splice(rnd, 1);

              let enemyTemp = 0;
              let stop = this.state.stop;
              if (this.state.enemySum <= 16 && this.state.sum + temp <= 21) {
                rnd = Math.floor(Math.random() * this.state.deck.cards.length);
                this.state.enemyCards.push(this.state.deck.cards[rnd]);
                enemyTemp =
                  this.state.deck.cards[rnd].value > 10
                    ? 10
                    : this.state.deck.cards[rnd].value;
                this.state.deck.cards.splice(rnd, 1);
              } else {
                stop = true;
              }

              this.setState({
                sum: this.state.sum + temp,
                enemySum: this.state.enemySum + enemyTemp,
                over: this.state.enemySum + enemyTemp > 21,
                stop: stop,
              });
            }
          }}
        >
          Hit
        </Button>
        <Button
          className="my-button"
          onClick={() => {
            if (this.state.sum > 21 || this.state.over) {
              this.setState({
                myCards: [],
                enemyCards: [],
                deck: new Deck(),
                over: false,
                sum: 0,
                enemySum: 0,
                stop: false,
              });
            } else {
              let enemyTemp = 0;
              const temp = this.state.deck.cards;
              let rnd = Math.floor(Math.random() * temp.length);

              while (
                this.state.enemySum + enemyTemp < this.state.sum ||
                (this.state.enemySum + enemyTemp <= this.state.sum &&
                  this.state.enemySum + enemyTemp <= 11 &&
                  !this.state.stop)
              ) {
                this.state.enemyCards.push(temp[rnd]);
                enemyTemp += temp[rnd].value > 10 ? 10 : temp[rnd].value;
                temp.splice(rnd, 1);
                rnd = Math.floor(Math.random() * temp.length);
              }
              this.setState({
                enemySum: this.state.enemySum + enemyTemp,
                over: true,
              });
            }
          }}
        >
          {this.state.sum > 21 || this.state.over ? "Start Again" : "Finish"}
        </Button>
        <div className="cards">
          <div className="width">
            <Header className="score">{"You:"}</Header>
            <Header className="score-number">{this.state.sum}</Header>
            <div className="cards-info">
              {this.state.myCards.map((card: CardModel) => {
                return (
                  <Image
                    className="my-card"
                    src={require("../src/images/" +
                      card.value +
                      card.sign +
                      ".jpg")}
                  ></Image>
                );
              })}
            </div>
          </div>
          <div className="width">
            <Header className="score">{"Enemy:"}</Header>
            <Header className="score-number">{this.state.enemySum}</Header>
            <div className="cards-info">
              {this.state.enemyCards.map((card: CardModel) => {
                return (
                  <Image
                    className="my-card"
                    src={require("../src/images/" +
                      card.value +
                      card.sign +
                      ".jpg")}
                  ></Image>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
