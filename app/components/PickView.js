import React, { Component } from 'react';
import allTeams from 'json!ncaa-team-colors';
import matchUps from 'json!../json/ncaa-matchups-by-id.json';
import FinalBracket from './FinalBracket';

// number of picks made each round
const pickNumThresholds = [32, 16, 8, 4, 2, 1];

export default class PickView extends Component {
  constructor() {
    super();
    this.state = {
      // current pick user is making for current round
      pickNum: 1,
      // track the round we're on
      roundNum: 1,
      // total number of picks made
      pickCount: 1,
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

  _handlePick(e) {
    let roundNum = this.state.roundNum;
    let pickNum = this.state.pickNum;
    // get which property of `this.state` we are adding to
    let prop = `round${roundNum}`;
    let id = this._getTeamId(e.target);

    // check if this is the last pick of a round
    if (pickNum >= pickNumThresholds[roundNum - 1]) {
      // increment round
      roundNum = roundNum < 6 ? roundNum + 1: roundNum;
      // reset pick
      pickNum = 1;
    } else {
      // increment pick
      pickNum = pickNum + 1;
    }

    this.setState({
      // move on to next pick
      pickNum,
      // maybe move to next round
      roundNum,
      // increase total number of picks
      pickCount: ++this.state.pickCount,
      // add `id` value to appropriate array
      [prop]: [...this.state[prop], id]
    });
  }

  // get the iteam id from the data attr of the clicked element
  _getTeamId(ele) {
    // check if the clicked element has the attr we need
    if (ele.dataset.teamId) {
      return ele.dataset.teamId;
    } else {
      // if its not move up the tree to parent
      return ele.parentNode.dataset.teamId;
    }
    throw '_getTeamId recieved unexpected parameter';
  }

  // returns an array two objects for the two teams we want to match up
  _getCurrentTeams() {
    // based on the round, figure out which array we need to pull match ups from
    let roundNum = this.state.roundNum;
    let srcArray = roundNum === 1 ? matchUps : this.state[`round${roundNum - 1}`];

    // get the index of the first team in the current Match up
    // minus 1 accounts for pickNum starting at 1 and array index starting at 0
    // multiple by 2 because we're moving through the matchUp array in pairs
    let curIndex = (this.state.pickNum - 1) * 2;
    let curMatchUp = [
      // first team
      srcArray[curIndex],
      // second team
      srcArray[curIndex + 1]
    ];

    // get the full team objects based on values from `curMatchUp`
    return curMatchUp.map((teamId) => {
      return allTeams.find((item) => item.id === teamId);
    });
  }

  render() {
    let curTeams = this._getCurrentTeams();
    // genereate html for current teams
    let matchUpNodes = curTeams.map((team) => {
      // create a child node for each team color
      let teamColors = team.colors.map((color, index) => {
        return (
          <div className="team-color" key={index} style={{ background: color }}>
            &nbsp;
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
          this.state.round6.length ?
            <FinalBracket
              {...this.state}
              round0={matchUps}
              allTeams={allTeams}
            /> :
            <div className="match-up">
              <div className="progress">
                Round {this.state.roundNum} of 6 &mdash;
                 Pick {this.state.pickNum} of {pickNumThresholds[this.state.roundNum - 1]}
              </div>
              {matchUpNodes[0]}
              <div className="versus">versus</div>
              {matchUpNodes[1]}
            </div>
        }
      </div>
    );
  }
}
