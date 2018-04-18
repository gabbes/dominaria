import React from 'react';
import Counter from './Counter';

const header = props => (
  <header className="header">
    <Counter
      title="CARDS"
      styleName="deck-counter"
      current={props.deck.current}
      total={props.deck.total}
    />
    <Counter
      title="SCORE"
      styleName="score-counter"
      current={props.score.wins}
      total={props.score.total}
    />
    <button
      className={props.gameIsFinished ? 'new-game new-game--glow' : 'new-game'}
      onClick={props.openSetup}
    >
      NEW GAME
    </button>
  </header>
);

export default header;
