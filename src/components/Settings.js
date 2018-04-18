import React, { Fragment } from 'react';
import SETTINGS from '../data/settings.json';

const settings = props => (
  <div className="settings">
    {SETTINGS.map(setting => (
      <Fragment key={setting.id}>
        <h2>{setting.title}</h2>
        <ul className="options">
          {setting.data.map(option => (
            <li key={option.value}>
              <label>
                <input
                  className="option__input"
                  type="radio"
                  checked={props.filter[setting.id] === option.value}
                  onChange={() => props.click(setting.id, option.value)}
                />
                <span className="option__label">{option.title}</span>
              </label>
            </li>
          ))}
        </ul>
      </Fragment>
    ))}
  </div>
);

export default settings;
