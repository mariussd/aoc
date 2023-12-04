const { testInput, test2, input } = require("./input.ts");

const lines = input.split("\n");

const numberRegex = new RegExp("\\d+", "g");

// part 1
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

const sumOfGears = () => {
  const gears: { [key: string]: number[] } = {};

  const gearRegex = new RegExp("\\*", "g");

  lines.forEach((line: string, index: number) => {
    const numbers = line.matchAll(numberRegex);

    for (const numberMatch of numbers) {
      const matchIndex = numberMatch.index;

      const number = numberMatch[0];

      if (matchIndex === undefined) return;

      const leftmostIndex = Math.max(matchIndex - 1, 0);
      const rightmostIndex = Math.min(
        matchIndex + number.length + 1,
        line.length
      );

      const top: string =
        index === 0
          ? ""
          : lines[index - 1].slice(leftmostIndex, rightmostIndex);

      const bottom: string =
        index === lines.length - 1
          ? ""
          : lines[index + 1].slice(leftmostIndex, rightmostIndex);

      const adjacent = line.slice(
        Math.max(matchIndex - 1, 0),
        Math.min(matchIndex + number.length + 1, line.length)
      );

      const topMatch = top.matchAll(gearRegex);
      const bottomMatch = bottom.matchAll(gearRegex);
      const adjacentMatch = adjacent.matchAll(gearRegex);

      for (const t of topMatch) {
        if (t.index === undefined) continue;

        const gearIndex = t.index + leftmostIndex;
        const gearLine = index - 1;

        if (gears[`${gearLine}-${gearIndex}`] !== undefined) {
          gears[`${gearLine}-${gearIndex}`].push(parseInt(number));
        } else {
          gears[`${gearLine}-${gearIndex}`] = [parseInt(number)];
        }
      }

      for (const a of adjacentMatch) {
        if (a.index === undefined) continue;

        const gearIndex = a.index + leftmostIndex;
        const gearLine = index;

        if (gears[`${gearLine}-${gearIndex}`] !== undefined) {
          gears[`${gearLine}-${gearIndex}`].push(parseInt(number));
        } else {
          gears[`${gearLine}-${gearIndex}`] = [parseInt(number)];
        }
      }

      for (const b of bottomMatch) {
        if (b.index === undefined) continue;

        const gearIndex = b.index + leftmostIndex;
        const gearLine = index + 1;

        if (gears[`${gearLine}-${gearIndex}`] !== undefined) {
          gears[`${gearLine}-${gearIndex}`].push(parseInt(number));
        } else {
          gears[`${gearLine}-${gearIndex}`] = [parseInt(number)];
        }
      }
    }
  });

  return Object.values(gears).reduce((sum: number, gear: number[]) => {
    if (gear.length == 2) {
      return sum + gear[0] * gear[1];
    }
    return sum;
  }, 0);
};

console.log("task 1:", sumOfValidNumbers());

console.log("task 2:", sumOfGears());

export {};
