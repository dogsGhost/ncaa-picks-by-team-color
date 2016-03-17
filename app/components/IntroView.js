import React from 'react';

const IntroView = (props) => (
  <div>
    <header className="page-header">
      <h1 className="page-heading">NCAA March Madness &mdash; by the Colors</h1>
    </header>
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
