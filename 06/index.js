const fs = require("fs");

fs.readFile("./list.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const input = data.replace(/\r/g, "").trim();

  function isUnique(array) {
    return new Set(array).size === array.length;
  }
  function part1() {
    let slidingWindow = [];
    for (let i = 0; i < input.length; i++) {
      slidingWindow.push(input[i]);
      if (slidingWindow.length > 4) {
        slidingWindow.shift();
      }

      if (slidingWindow.length === 4 && isUnique(slidingWindow)) {
        console.log(i + 1);
        break;
      }
    }
  }

  part1();

  function part2() {
    const windowLength = 14;
    let slidingWindow = [];
    for (let i = 0; i < input.length; i++) {
      slidingWindow.push(input[i]);
      if (slidingWindow.length > windowLength) {
        slidingWindow.shift();
      }

      if (slidingWindow.length === windowLength && isUnique(slidingWindow)) {
        console.log(i + 1);
        break;
      }
    }
  }

  part2();
});
