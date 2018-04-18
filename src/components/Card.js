import React from 'react';

const card = props => (
  <div className="card">
    <img
      className="card__image"
      src={`assets/cards/${props.name}.jpg`}
      width="265"
      height="370"
      alt="Card"
      onClick={props.selectCard}
    />
    {props.children}
  </div>
);

export default card;
