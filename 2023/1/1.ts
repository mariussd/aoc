const { input } = require("./input.ts");

const numbersAsStrings = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

const numberMap: { [key: string]: string } = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

const numbersAsStringsReversed = numbersAsStrings.map((str: string) =>
  str.split("").reverse().join()
);

const regexPatternNumbers = new RegExp(
  `(?:${numbersAsStrings.join("|")})|[1-9]`,
  "i"
);

const regexPatternNumbersReversed = new RegExp(
  `(?:${numbersAsStringsReversed.join("|")})|[1-9]`,
  "i"
);

const findFirstInteger = (str: string) => {
  const match = str.match(regexPatternNumbers);

  if (match?.length) {
    const number = match[0];

    if (number.length === 1) {
      return number;
    }

    return numberMap[number];
  }
};

const findLastInteger = (str: string) => {
  const match = str
    .split("")
    .reverse()
    .join()
    .match(regexPatternNumbersReversed);

  if (match?.length) {
    const number = match[0];

    if (number.length === 1) {
      return number;
    }

    return numberMap[number.replace(/,/g, "").split("").reverse().join("")];
  }

  return "";
};

const lines = input.split("\n");

const findCombinedInteger = (line: string) => {
  const firstInteger = findFirstInteger(line) ?? "";
  const lastInteger = findLastInteger(line) ?? "";

  return firstInteger + lastInteger;
};

const findSumOfAllCombinedIntegers = (lines: string[]) => {
  return lines.reduce((sum, line) => {
    const lineNumber = parseInt(findCombinedInteger(line)) ?? 0;

    return sum + lineNumber;
  }, 0);
};

const sum = findSumOfAllCombinedIntegers(lines);

console.log("sum", sum);

export {};
