const fs = require("fs");

fs.readFile("./strategy.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const rounds = data
    .replace(/\r/g, "")
    .trim()
    .split("\n")
    .map((round) => round.split(" "));

  const moveShape = {
    rock: 1,
    paper: 2,
    scissors: 3,
  };

  function score(opponentMove, ourMove) {
    // case draw
    if (opponentMove === ourMove) return ourMove + 3;
    //case we won
    if (
      (opponentMove === moveShape.rock && ourMove === moveShape.paper) ||
      (opponentMove === moveShape.paper && ourMove === moveShape.scissors) ||
      (opponentMove === moveShape.scissors && ourMove === moveShape.rock)
    ) {
      return ourMove + 6;
    }

    //we lost
    return ourMove;
  }

  const opponentInput = {
    A: moveShape.rock,
    B: moveShape.paper,
    C: moveShape.scissors,
  };

  const ourInput = {
    X: moveShape.rock,
    Y: moveShape.paper,
    Z: moveShape.scissors,
  };

  function totalScore() {
    const result = rounds.map((round) => {
      const opponentMove = opponentInput[round[0]];
      const ourMove = ourInput[round[1]];
      return score(opponentMove, ourMove);
    });
    console.log(result.reduce((a, b) => a + b, 0));
  }

  totalScore();

  const possibleSolutions = {
    A: {
      X: moveShape.scissors,
      Y: moveShape.rock,
      Z: moveShape.paper,
    },
    B: {
      X: moveShape.rock,
      Y: moveShape.paper,
      Z: moveShape.scissors,
    },
    C: {
      X: moveShape.paper,
      Y: moveShape.scissors,
      Z: moveShape.rock,
    },
  };

  function part2() {
    const result = rounds.map((round) => {
      const opponentMove = opponentInput[round[0]];
      const ourMove = possibleSolutions[round[0]][round[1]];
      return score(opponentMove, ourMove);
    });
    console.log(result.reduce((a, b) => a + b, 0));
  }

  part2();
});
