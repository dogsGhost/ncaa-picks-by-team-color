import React from 'react';

const IntroView = (props) => (
  <div className="content-wrapper">
    <p>Pick your bracket based on teams colors.</p>
    <button
      className="btn btn-primary"
      onClick={props.onClick}
      type="button"
    >
      Start
    </button>
  </div>
);

export default IntroView;
