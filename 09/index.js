const fs = require("fs");

const movesDefinition = {
  R: {
    x: 1,
    y: 0,
  },
  L: {
    x: -1,
    y: 0,
  },
  U: {
    x: 0,
    y: -1,
  },
  D: {
    x: 0,
    y: 1,
  },
};

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  move(direction) {
    const delta = movesDefinition[direction];
    this.x += delta.x;
    this.y += delta.y;
  }
  follow(point) {
    const distance = Math.max(
      Math.abs(this.x - point.x),
      Math.abs(this.y - point.y)
    );
    if (distance > 1) {
      // Move this point
      const directionX = point.x - this.x;
      // 0 => do nothing
      // 1 or 2 => this.x++;
      // -1 or -2 => this.x--;
      this.x += Math.abs(directionX) === 2 ? directionX / 2 : directionX;
      const directionY = point.y - this.y;
      this.y += Math.abs(directionY) === 2 ? directionY / 2 : directionY;
    }
  }
}

fs.readFile("./list.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const lines = data
    .replace(/\r/g, "")
    .trim()
    .split("\n")
    .map((line) => {
      const [letter, number] = line.split(" ");
      return {
        direction: letter,
        totalMoves: parseInt(number),
      };
    });

  function markVisited(x, y, visited) {
    visited.add(`${x}-${y}`);
  }

  function partOne() {
    const head = new Point(0, 0);
    const tail = new Point(0, 0);
    const visited = new Set();
    markVisited(0, 0, visited);

    for (const line of lines) {
      for (let i = 0; i < line.totalMoves; i++) {
        head.move(line.direction);
        tail.follow(head);
        markVisited(tail.x, tail.y, visited);
      }
    }

    console.log(visited.size);
  }

  partOne();
});
