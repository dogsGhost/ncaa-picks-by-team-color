import React, { Component } from 'react';
import IntroView from './IntroView';
import PickView from './PickView';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      startPicks: false
    };
  }

  _handleStartPicks() {
    this.setState({ startPicks: true });
  }

  render() {
    return (
      <div>
        {
          this.state.startPicks ?
            <PickView /> :
            <IntroView onClick={this._handleStartPicks.bind(this)} />
        }
      </div>
    );
  }
}
