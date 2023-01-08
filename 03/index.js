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
});
