import React from 'react';

// pass in an array of ids and the array to search,
// return an array of corresponding names
const getNames = (idArray, srcArray) => {
  return idArray.map((idString) => {
    return srcArray.find((item) => item.id === idString).name;
  });
};

// take an array and return an array containing two arrays
// one containing the first half of items from the original array
// they second containing the rest of the items
const splitArray = (array) => {
  let split = [[], []];
  let len = array.length;

  array.forEach((item, index) => {
    if (index < len / 2) {
      split[0].push(item);
    } else {
      split[1].push(item);
    }
  });

  return split;
};

const createTeamNameNode = (name, index) => {
  let classes = `team-node team-${index}`;
  // remove the last word from the team name as to shorten it
  name = name.split(' ').slice(0, -1).join(' ').replace('-', ' ');
  return (
    <div key={index} className={classes}>
      {name}
    </div>
  );
};

const FinalBracket = (props) => {
  // group together all the rounds
  let rounds = [
    props.round0,
    props.round1,
    props.round2,
    props.round3,
    props.round4,
    props.round5,
    props.round6
  ];
  let teams = props.allTeams;
  // array to store our nodes
  let roundNodesList = [];

  rounds.forEach((round) => {
    // determine class based on what round we're listing
    let roundKey = {
      '64': 'first',
      '32': 'second',
      '16': 'sweet',
      '8': 'elite',
      '4': 'final',
      '2': 'championship',
      '1': 'champion'
    };
    let roundLen = round.length;
    let roundClass = roundKey[`${Math.ceil(round.length)}`] || '';
    // take a round and get the names
    // split it into 2 array, first half and second half
    let r = splitArray(getNames(round, teams));
    // send that array to a function that will take each child array
    let roundNodesChild = r.map((childArray, index) => {
      // generate a node for them
      let children = childArray.map(createTeamNameNode);
      let classes = `col col-${index} ${roundClass}`;

      // element in `roundNodesChild`
      return (
        <div
          className={classes}
          key={index + Math.random() + ''}
        >
          {children}
        </div>
      );
    });

    // add node to parent array
    roundNodesList.push(roundNodesChild);
  });
  // 1st round, 2nd round, sweet 16, elite 8, final four, championship

  return (
    <div>
    <header className="page-header">
      <h1 className="page-heading">NCAA March Madness &mdash; by the Colors</h1>
    </header>
      <div className="col-wrapper flex-container">
        {roundNodesList[0][0]}
          {roundNodesList[1][0]}
            {roundNodesList[2][0]}
              {roundNodesList[3][0]}
                {roundNodesList[4][0]}
                  {roundNodesList[5][0]}
                    {roundNodesList[6][0]}
                  {roundNodesList[5][1]}
                {roundNodesList[4][1]}
              {roundNodesList[3][1]}
            {roundNodesList[2][1]}
          {roundNodesList[1][1]}
        {roundNodesList[0][1]}
      </div>
    </div>
  );
};

export default FinalBracket;

/*
unsed code might want later:
<div className="flex-container round-names">
  <div className="flex-child">1st Round</div>
  <div className="flex-child">2nd Round</div>
  <div className="flex-child">Sweet Sixteen</div>
  <div className="flex-child">Elite Eight</div>
  <div className="flex-child">Final Four</div>
  <div className="flex-child">Championship</div>
  <div className="flex-child">CHAMPION</div>
  <div className="flex-child">Championship</div>
  <div className="flex-child">Final Four</div>
  <div className="flex-child">Elite Eight</div>
  <div className="flex-child">Sweet Sixteen</div>
  <div className="flex-child">2nd Round</div>
  <div className="flex-child">1st Round</div>
</div> 
*/
