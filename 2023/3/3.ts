const { testInput, test2, input } = require("./input.ts");

const lines = input.split("\n");

const numberRegex = new RegExp("\\d+", "g");

const sumOfValidNumbers = () => {
  return lines.reduce((sum: number, line: string, index: number) => {
    const numbers = line.matchAll(numberRegex);

    const validNumbers: number[] = [];

    for (const numberMatch of numbers) {
      const matchIndex = numberMatch.index;

      const number = numberMatch[0];

      if (matchIndex === undefined) return 0;

      const hasTopNeighbor =
        index === 0
          ? false
          : !!lines[index - 1]
              .slice(
                Math.max(matchIndex - 1, 0),
                Math.min(matchIndex + number.length + 1, line.length)
              )
              .match("[^.]");

      const hasBottomNeighbor =
        index === lines.length - 1
          ? false
          : !!lines[index + 1]
              .slice(
                Math.max(matchIndex - 1, 0),
                Math.min(matchIndex + number.length + 1, line.length)
              )
              .match("[^.]");

      const dotRegex = new RegExp("\\.", "g");

      const hasLineNeighbor =
        line
          .slice(
            Math.max(matchIndex - 1, 0),
            Math.min(matchIndex + number.length + 1, line.length)
          )
          .replace(numberRegex, "")
          .replace(dotRegex, "").length > 0;

      if (hasTopNeighbor || hasBottomNeighbor || hasLineNeighbor) {
        validNumbers.push(parseInt(number));
      }
    }

    return (
      sum + validNumbers.reduce((sum: number, num: number) => sum + num, 0)
    );
  }, 0);
};

console.log("sum:", sumOfValidNumbers());

export {};
