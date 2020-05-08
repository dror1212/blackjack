import { values } from "./Consts";
import { signs } from "./enums";

export class CardModel {
  sign: string;
  value: number;

  constructor(sign: string, value: number) {
    this.sign = sign;
    this.value = value;
  }
}

export class Deck {
  cards: CardModel[];

  constructor() {
    this.cards = [];
    values.forEach((value) => {
      this.cards.push(new CardModel(signs.club, value));
      this.cards.push(new CardModel(signs.diamond, value));
      this.cards.push(new CardModel(signs.heart, value));
      this.cards.push(new CardModel(signs.spade, value));
    });
  }
}
