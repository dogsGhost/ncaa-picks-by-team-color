import React from 'react';
import Header from './Header';

const IntroView = (props) => (
  <div>
    <Header />
    <div className="content-wrapper">
      <p>Pick your bracket based on team colors.</p>
      <button
        className="btn btn-primary"
        onClick={props.onClick}
        type="button"
      >
        Start
      </button>
    </div>
  </div>
);

export default IntroView;
