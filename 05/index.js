const fs = require("fs");

fs.readFile("./list.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const lines = data.replace(/\r/g, "").trimEnd();

  const [rawStacks, rawMoves] = lines
    .split("\n\n")
    .map((line) => line.split("\n"));

  const parsedRawStacks = rawStacks.map((line) =>
    [...line].filter((value, index) => index % 4 === 1)
  );

  const indexes = parsedRawStacks.pop();
  const stacks = {};

  for (const line of parsedRawStacks) {
    for (let i = 0; i < line.length; i++) {
      if (line[i] !== " ") {
        //Add line[i]  to the stacks of indexes[i]
        if (!stacks[indexes[i]]) {
          stacks[indexes[i]] = [];
        }
        stacks[indexes[i]].unshift(line[i]);
      }
    }
  }

  const moves = [];
  for (const move of rawMoves) {
    const match = /move (\d+) from (\d+) to (\d+)/g.exec(move);
    moves.push({
      count: parseInt(match[1]),
      from: parseInt(match[2]),
      to: parseInt(match[3]),
    });
  }

  function playMove(stacks, move) {
    for (let i = 0; i < move.count; i++) {
      const crate = stacks[move.from].pop();
      stacks[move.to].push(crate);
    }
  }

  function findCrateOnTopofEachStacks() {
    const localStacks = JSON.parse(JSON.stringify(stacks));
    for (const move of moves) {
      playMove(localStacks, move);
    }
    const result = indexes
      .map((value) => {
        const stack = localStacks[value];
        return stack[stack.length - 1];
      })
      .join("");

    console.log(result);
  }

  findCrateOnTopofEachStacks();

  function playMoveTwo(stacks, move) {
    const crates = stacks[move.from].splice(-move.count, move.count);
    stacks[move.to] = stacks[move.to].concat(crates);
  }

  function part2() {
    const localStacks = JSON.parse(JSON.stringify(stacks));
    for (const move of moves) {
      playMoveTwo(localStacks, move);
    }

    const result = indexes
      .map((value) => {
        const stack = localStacks[value];
        return stack[stack.length - 1];
      })
      .join("");

    console.log(result);
  }

  part2();
});
