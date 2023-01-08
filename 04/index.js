const { count } = require("console");
const fs = require("fs");

fs.readFile("./list.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const lines = data.replace(/\r/g, "").trim().split("\n");

  function countAssignmentPairs() {
    // loop over the list for each one we seperate to two intervals then each interval we separe to get numbers
    const result = lines.map((line) => {
      const [intervalOne, intervalTwo] = line
        .split(",")
        .map((interval) => interval.split("-").map(Number))
        .sort((a, b) => {
          const firstSize = a[1] - a[0];
          const secondSize = b[1] - b[0];

          return secondSize - firstSize;
        });

      const oneFullyContainsTwo =
        intervalTwo[1] <= intervalOne[1] && intervalTwo[0] >= intervalOne[0];
      return oneFullyContainsTwo ? 1 : 0;
    });

    console.log(result.reduce((a, b) => a + b, 0));
  }

  countAssignmentPairs();
});
