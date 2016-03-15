import React, { Component } from 'react';
import allTeams from 'json!ncaa-team-colors';
import FinalBracket from './FinalBracket';

// this is a mock array
// TODO: create real one based off match ups in `/_ref/match-ups/html`
// and id values from `allTeams`
const matchUps = [
  [allTeams[0].id, allTeams[1].id],
  [allTeams[2].id, allTeams[3].id]
];

export default class PickView extends Component {
  constructor() {
    super();
    this.state = {
      // current pick user is making
      pickNum: 1,
      // number of picks the user will make in each 'round'
      pickCount: [32, 16, 8, 4, 2],
      // correspond to the different rounds of the play offs
      round1: [], // round of 64
      round2: [], // round of 32
      round3: [], // sweet 16
      round4: [], // top 8
      round5: [], // final 4
      // this is the winner, when this is set, show the team names
      winner: ''
    };
  }

  _handlePick(e) {
    // TODO: get data-id and add it to correct round array on state
    console.log(e.target)
    // TODO: increment `this.state.pickNum`
    this.setState({
      // pickNum: this.state.pickNum++
    });
  }

  render() {
    // get the match up we want to show
    let curMatchUp = matchUps[this.state.pickNum - 1];

    // get teams based on values from `curMatchUp`
    let curTeams = curMatchUp.map((teamId) => {
      return allTeams.find((item) => item.id === teamId);
    });

    // genereate html for current teams
    let matchUpNodes = curTeams.map((team) => {
      // create a child node for each team color
      let teamColors = team.colors.map((color, index, arr) => {
        let styles = {
          background: color,
          // there can be 2 or 3 colors, this ensures the total height is 100%
          height: `${Math.round(100 / arr.length)}vh`
        };
        return (
          <div className="team-color" key={index} style={styles}>
          </div>
        );
        // we reverse the nodes so white is last rather than first
      }).reverse();

      return (
        <div
          className="team"
          dataId={team.id}
          key={team.id}
          onClick={this._handlePick.bind(this)}
        >
          {teamColors}
        </div>
      );
    });

    return (
      <div>
        {
          this.state.winner ?
            <FinalBracket /> :
            <div className="match-up">
              {matchUpNodes}
            </div>
        }
      </div>
    );
  }
}
