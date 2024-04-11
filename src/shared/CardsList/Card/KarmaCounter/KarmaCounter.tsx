import React from 'react';
import './karmacounter.css';

export function KarmaCounter() {
  return (
    <div className="controls__karma-counter">
      <button className="controls__up">
        <svg width="19" height="10" viewBox="0 0 19 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.5 0L0 10H19L9.5 0Z" fill="#C4C4C4"/>
        </svg>
      </button>
      <span className="controls__karma-value">
        234
      </span>
      <button className="controls__down">
        <svg className="down" width="19" height="10" viewBox="0 0 19 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.5 0L0 10H19L9.5 0Z" fill="#C4C4C4"/>
        </svg>
      </button>
    </div>
  );
}
