import React, { Component } from 'react';
import shuffle from 'lodash.shuffle';
import Settings from './Settings';

class Setup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: '',
      filter: {
        color: '',
        rarity: '',
        score: 0
      }
    };

    // Change filter of given type to recieved value
    this.changeFilter = (type, value) => {
      // If an error was previously show, remove it
      if (this.state.error) {
        this.setState({ error: '' });
      }

      const filter = { ...this.state.filter };
      filter[type] = value;
      this.setState({ filter });
    };

    // Create a new deck of cards based on assigned filters
    this.createNewGame = () => {
      let deck = [...this.props.originalDeck];

      // Loop through each filter and apply them if assigned
      Object.keys(this.state.filter).forEach(type => {
        if (this.state.filter[type]) {
          deck = deck.filter(card => {
            // If filter type is set as number, filter greater than, else equal
            return Number.isInteger(this.state.filter[type])
              ? card[type] >= this.state.filter[type]
              : card[type] === this.state.filter[type];
          });
        }
      });

      // If the deck came out less than 2 cards, through error and return
      if (deck.length < 2) {
        this.setState({ error: 'Too few cards found matching filters.' });
        return;
      }

      this.props.startNewGame(shuffle(deck));
    };
  }

  render() {
    // If setup is not currently set as open, return null
    if (!this.props.setupIsOpen) {
      return null;
    }

    return (
      <aside className="setup">
        <div className="setup__container">
          <header className="setup__header">
            <button className="setup__close" onClick={this.props.closeSetup}>
              CLOSE
            </button>
          </header>
          <Settings filter={this.state.filter} click={this.changeFilter} />
          <button
            className={
              this.state.error
                ? 'setup__submit setup__submit--error'
                : 'setup__submit'
            }
            onClick={this.createNewGame}
          >
            CREATE NEW GAME
          </button>
          {this.state.error ? (
            <p className="error">{this.state.error}</p>
          ) : null}
        </div>
      </aside>
    );
  }
}

export default Setup;
