const { input } = require("./input.ts");

const reds = 12;
const greens = 13;
const blues = 14;

const numbersRegex = new RegExp(`\\d+`);

const games = input.split("\n");

const findId = (game: string): number => {
  const idMatch = game.match(numbersRegex);

  if (idMatch != null) {
    return parseInt(idMatch[0]);
  }
  return 0;
};

const findColorValues = (game: string, flag: string) => {
  const colorRegex = new RegExp(`\\d+${flag}`, "g");

  const colorMatches = game.match(colorRegex);

  if (colorMatches != null) {
    return colorMatches.map((match: string) =>
      parseInt(match.replace(flag, ""))
    );
  }

  return [0];
};

const validColorValues = (
  colorValues: number[],
  threshold: number
): boolean => {
  let valid = true;

  colorValues.forEach((value) => {
    if (value > threshold) {
      valid = false;
    }
  });

  return valid;
};

const sumValidGames = () =>
  games.reduce((sum: number, game: string) => {
    const id = findId(game);

    const blueValues = findColorValues(game, " b");
    const redValues = findColorValues(game, " r");
    const greenValues = findColorValues(game, " g");

    const bluesAreValid = validColorValues(blueValues, blues);
    const redsAreValid = validColorValues(redValues, reds);
    const greensAreValid = validColorValues(greenValues, greens);

    if (bluesAreValid && redsAreValid && greensAreValid) {
      return sum + id;
    }

    return sum;
  }, 0);

const sumSetPowers = () =>
  games.reduce((sum: number, game: string) => {
    const blueValues = findColorValues(game, " b");
    const redValues = findColorValues(game, " r");
    const greenValues = findColorValues(game, " g");

    const maxBlue = Math.max(...blueValues);
    const maxRed = Math.max(...redValues);
    const maxGreen = Math.max(...greenValues);

    const power = maxBlue * maxRed * maxGreen;

    return sum + power;
  }, 0);

console.log("sum of valid game ids:", sumValidGames());
console.log("sum of set powers:", sumSetPowers());

export {};
