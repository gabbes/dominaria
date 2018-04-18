import React from 'react';
import Card from './Card';

const board = props => {
  // Determine results of card matchup
  const results =
    props.cards.left.score > props.cards.right.score
      ? { left: 'win', right: 'lose' }
      : props.cards.left.score < props.cards.right.score
        ? { left: 'lose', right: 'win' }
        : { left: 'tie', right: 'tie' };

  return (
    <main className={props.gameIsFinished ? 'board board--finished' : 'board'}>
      {['left', 'right'].map(id => (
        <Card
          key={id}
          name={props.cards[id].name}
          selectCard={
            props.answersAreVisible || props.gameIsFinished
              ? null
              : () => props.selectCard(results[id])
          }
        >
          {props.answersAreVisible ? (
            <div className={`answer answer--${results[id]}`}>
              <div className="answer__value">{props.cards[id].score}</div>
            </div>
          ) : null}
        </Card>
      ))}
    </main>
  );
};

export default board;
