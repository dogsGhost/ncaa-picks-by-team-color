import React, { Component } from 'react';
import allTeams from 'json!ncaa-team-colors';
import matchUps from 'json!../json/ncaa-matchups-by-id.json';
import FinalBracket from './FinalBracket';

// since we know how many picks a user will make each round
// we can track what `pickNum` will be when a round ends
const pickCountThresholds = [32, 48, 56, 60, 62, 63];

export default class PickView extends Component {
  constructor() {
    super();
    this.state = {
      // current pick user is making
      pickNum: 1,
      // correspond to the different rounds of the play offs
      round1: [], // round of 64
      round2: [], // round of 32
      round3: [], // sweet 16
      round4: [], // top 8
      round5: [], // final 4
      // this is the winner, when this is set, show the team names
      round6: []
    };
  }

  // used to determine what array we store the winner in
  // returns a number corresponding to what round
  _getRound() {
    let i = pickCountThresholds.length;
    let index = 0;

    while (i > 0) {
      if (this.state.pickNum <= pickCountThresholds[i - 1]) {
        index = i;
      }
      i--;
    }
console.log(this.state.pickNum, index);
    return index;
  }

  _handlePick(e) {
    // get which property of `this.state` we are going to use
    let prop = `round${this._getRound()}`;

    let id = '';
    // check if the clicked element has the attr we need
    if (e.target.dataset.teamId) {
      id = e.target.dataset.teamId;
    } else {
      // if its not move up the tree to parent
      id = e.target.parentNode.dataset.teamId;
    }

    this.setState({
      // move on to next pick
      pickNum: ++this.state.pickNum,
      // add `id` value to appropriate array
      [prop]: [...this.state[prop], [id]]
    });
  }

  render() {
    // get the index of the first team in the current Match up
    // minus 1 accounts for pickNum starting at 1 and array index starting at 0
    // multiple by 2 because we're moving through the matchUp array in pairs
    let curIndex = (this.state.pickNum - 1) * 2;
    let curMatchUp = [
      // first team
      matchUps[curIndex],
      // second team
      matchUps[curIndex + 1]
    ];

    // get teams based on values from `curMatchUp`
    let curTeams = curMatchUp.map((teamId) => {
      return allTeams.find((item) => item.id === teamId);
    });

    // genereate html for current teams
    let matchUpNodes = curTeams.map((team) => {
      // create a child node for each team color
      let teamColors = team.colors.map((color, index, arr) => {
        let styles = {
          background: color
        };
        return (
          <div className="team-color" key={index} style={styles}>
          </div>
        );
      });

      return (
        <div
          className="team"
          data-team-id={team.id}
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
              {matchUpNodes[0]}

              <div className="versus">
                versus
              </div>

              {matchUpNodes[1]}

              <div className="progress">Pick {this.state.pickNum} of 63</div>
            </div>
        }
      </div>
    );
  }
}
