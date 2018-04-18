import React from 'react';

const counter = props => (
  <div className={`${props.styleName} counter`}>
    <p className="counter__title">{props.title} </p>
    <p className="counter__count">
      {props.current}
      <span className="counter__divider">/</span>
      {props.total}
    </p>
  </div>
);

export default counter;
