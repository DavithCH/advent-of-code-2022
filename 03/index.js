const fs = require("fs");

fs.readFile("./list.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const rucksacks = data.replace(/\r/g, "").trim().split("\n");

  function convertLetterToPriority(letter) {
    if (/[a-z]/.test(letter)) {
      //lower case types a to z have priotries  1 through 26
      return letter.charCodeAt(0) - 96;
    } else {
      //upper case types A to Z have priorities 27 through 52
      return letter.charCodeAt(0) - 65 + 27;
    }
  }

  function sumOfpriorities() {
    const result = rucksacks.map((item) => {
      const firstHalf = item.slice(0, item.length / 2);
      const secondHalf = item.slice(item.length / 2);

      //create new set of firstHalf array to remove duplicate items
      const firstHalfSet = new Set([...firstHalf]);

      //find intersection item in secondHalf
      const intersections = [...secondHalf].filter((item) =>
        firstHalfSet.has(item)
      );

      //remove duplicates
      const uniqueIntersections = [...new Set(intersections)];

      return convertLetterToPriority(uniqueIntersections[0]);
    });

    const sum = result.reduce((a, b) => a + b, 0);

    console.log(sum);
  }

  sumOfpriorities();

  function part2() {
    let sum = 0;

    for (let i = 0; i < rucksacks.length; i += 3) {
      // create backpacks of tree
      const backpacks = [
        [...rucksacks[i]],
        [...rucksacks[i + 1]],
        [...rucksacks[i + 2]],
      ];
      // create set of first backpack
      let set = new Set(backpacks[0]);

      // find intersection between first and second backpack
      let intersections = backpacks[1].filter((item) => set.has(item));

      // create set of intersection of first and second backpack
      set = new Set(intersections);

      // find intersection between all tree backpacks
      intersections = backpacks[2].filter((item) => set.has(item));

      //remove duplicates
      const uniqueIntersections = [...new Set(intersections)];

      sum += convertLetterToPriority(uniqueIntersections[0]);
    }

    console.log(sum);
  }

  part2();
});
