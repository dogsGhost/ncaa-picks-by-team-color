import React from 'react';

const FinalBracket = (props) => {
  // pass in an array of ids, return an array of corresponding names
  const getNames = (roundArray) => {
    return roundArray.map((teamId) => {
      return props.allTeams.find((item) => item.id === teamId).name;
    });
  };

  // get array of names
  // split names in 2 groups
  // each group returns a wrapper div with each name in a child div
  let round0List = [];
  round0List[0] = getNames(props.round0).map((name, index, array) => {
    if (index < array.length / 2) {
      return (
        <div key={index} className="team-node">{name}</div>
      );
    } else {
      return false;
    }
  });
  round0List[1] = getNames(props.round0).map((name, index, array) => {
    if (index >= array.length / 2) {
      return (
        <div key={index} className="team-node">{name}</div>
      );
    } else {
      return false;
    }
  });

  // TODO: remove this, placeholder for styling purposes
  round0List[2] = getNames(props.round0).map((name, index, array) => {
    if (index < 16) {
      return (
        <div key={index} className="team-node">{name}</div>
      );
    } else {
      return false;
    }
  });
  // TODO: remove this, placeholder for styling purposes
  round0List[3] = getNames(props.round0).map((name, index, array) => {
    if (index < 16) {
      return (
        <div key={index} className="team-node">{name}</div>
      );
    } else {
      return false;
    }
  });
  // TODO: remove this, placeholder for styling purposes
  round0List[4] = getNames(props.round0).map((name, index, array) => {
    if (index < 8) {
      return (
        <div key={index} className="team-node">{name}</div>
      );
    } else {
      return false;
    }
  });
  // TODO: remove this, placeholder for styling purposes
  round0List[5] = getNames(props.round0).map((name, index, array) => {
    if (index < 8) {
      return (
        <div key={index} className="team-node">{name}</div>
      );
    } else {
      return false;
    }
  });

  // TODO: in progress
  const masterArray = [];
  // take an array of names, returns array of nodes for half the names
  // `halfToUse` param will determine which comparison we use
  // ie. return first-half of array or second-half
  const getNodes = (nameArray, halfToUse) => {
    let len = nameArray.length;
    let compareKey = {
      first: val => val < len / 2,
      second: val => val >= len / 2
    };
    let comparison = compareKey[halfToUse];

    return nameArray.map((name, index) => {
      if (comparison(index)) {
        return (
          <div key={index} className="team-node">{name}</div>
        );
      } else {
        return false;
      }
    });
  };
  // masterArray.push(getNodes(getNames(props.round0), 'first'));
  // masterArray.push(getNodes(getNames(props.round0), 'second'));

  return (
    <div className="col-wrapper">
      <div className="col">{round0List[0]}</div>
        <div className="col">{round0List[2]}</div>
          <div className="col">{round0List[4]}</div>
          <div className="col">{round0List[5]}</div>
        <div className="col">{round0List[3]}</div>
      <div className="col">{round0List[1]}</div>
    </div>
  );
};

export default FinalBracket;
