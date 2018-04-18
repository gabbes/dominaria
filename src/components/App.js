import React, { Component, Fragment } from 'react';
import shuffle from 'lodash.shuffle';
import DOMINARIA from '../data/dominaria.json';
import Header from './Header';
import Board from './Board';
import Setup from './Setup';
import Footer from './Footer';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      deck: shuffle([...DOMINARIA]),
      setupIsOpen: false,
      gameIsFinished: false,
      answersAreVisible: false,
      index: { left: 0, right: 1 },
      score: { wins: 0, total: 0 }
    };

    // Initialize new game with created deck
    this.startNewGame = deck => {
      this.setState({
        deck,
        setupIsOpen: false,
        gameIsFinished: false,
        index: { left: 0, right: 1 },
        score: { wins: 0, total: 0 }
      });
    };

    // Try to initialize next round of cards
    this.nextRound = () => {
      // If there are no more cards, set game as finished and return
      if (this.state.index.right + 1 >= this.state.deck.length) {
        this.setState({ gameIsFinished: true });
        return;
      }

      const index = { ...this.state.index };
      index.right++;

      while (index.left === this.state.index.left) {
        index.left = Math.floor(Math.random() * index.right);
      }

      this.setState({ index });
    };

    // Finish current round and show results
    this.finishRound = result => {
      this.setState({ answersAreVisible: true });

      if (result !== 'tie') {
        const score = { ...this.state.score };
        score.total++;

        if (result === 'win') {
          score.wins++;
        }

        this.setState({ score });
      }

      // Execute next round in 1 second
      setTimeout(() => {
        this.setState({ answersAreVisible: false });
        this.nextRound();
      }, 1000);
    };
  }

  render() {
    return (
      <Fragment>
        <Header
          deck={{
            current: this.state.index.right + 1,
            total: this.state.deck.length
          }}
          score={this.state.score}
          gameIsFinished={this.state.gameIsFinished}
          openSetup={() => this.setState({ setupIsOpen: true })}
        />
        <Board
          cards={{
            left: this.state.deck[this.state.index.left],
            right: this.state.deck[this.state.index.right]
          }}
          answersAreVisible={this.state.answersAreVisible}
          gameIsFinished={this.state.gameIsFinished}
          selectCard={this.finishRound}
        />
        <Setup
          originalDeck={DOMINARIA}
          setupIsOpen={this.state.setupIsOpen}
          startNewGame={this.startNewGame}
          closeSetup={() => this.setState({ setupIsOpen: false })}
        />
        <Footer />
      </Fragment>
    );
  }
}

export default App;
