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
});
