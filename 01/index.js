const fs = require("fs");

fs.readFile("./list.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const elves = data.replace(/\r/g, "").trim().split("\n\n");

  function getHighestCalories() {
    const highestCalories = elves.map((elf) => {
      const calories = elf.split("\n").map(Number);
      return calories.reduce((prev, current) => prev + current, 0);
    });

    console.log(Math.max(...highestCalories));
  }
  getHighestCalories();
});
