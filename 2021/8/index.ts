import * as R from "ramda";
import combinate from "combinate";

const letters = ["a", "b", "c", "d", "e", "f", "g"];
const numToLetters: {
  [key: string]: string[];
} = {
  0: ["a", "b", "c", "e", "f", "g"],
  1: ["c", "f"],
  2: ["a", "c", "d", "e", "g"],
  3: ["a", "c", "d", "f", "g"],
  4: ["b", "c", "d", "f"],
  5: ["a", "b", "d", "f", "g"],
  6: ["a", "b", "d", "e", "f", "g"],
  7: ["a", "c", "f"],
  8: ["a", "b", "c", "d", "e", "f", "g"],
  9: ["a", "b", "c", "d", "f", "g"],
};

const lettersToNum: {
  [key: string]: string;
} = R.map(R.nth(0), R.invert(numToLetters));
// @ts-expect-error idk
const numbersByLength = R.invert(R.map(R.length, numToLetters));

const startMap: {
  [key: string]: string[];
} = R.fromPairs(letters.map((l) => [l, letters]));

const isValidMapping = (
  mapping: {
    [key: string]: string;
  },
  words: string[]
) => {
  for (let word of words) {
    const mapped = mapWord(mapping, word);
    const valid = lettersToNum[mapped.join(",")];
    if (!valid) {
      return false;
    }
  }
  return true;
};

const mapWord = (
  mapping: {
    [key: string]: string;
  },
  word: string
) => {
  let newWord = "";
  for (let i = 0; i < word.length; i++) {
    newWord += mapping[word[i]];
  }
  return Array.from(newWord).sort();
};

const a = (input: string): string => {
  const lines = input.split("\n").map((l) => l.split("|"));
  let total = 0;
  for (let line of lines) {
    const mappingPossibility = R.clone(startMap);
    const onWires = line[0].split(" ").filter(Boolean);

    // Narrow down total possibilities
    for (let word of onWires) {
      const possibilities = numbersByLength[word.length];
      let possibleLetterMappings = [];
      for (let possibility of possibilities) {
        possibleLetterMappings.push(numToLetters[possibility]);
      }
      possibleLetterMappings = R.uniq(R.flatten(possibleLetterMappings));
      for (let i = 0; i < word.length; i++) {
        mappingPossibility[word[i]] = R.intersection(
          possibleLetterMappings,
          mappingPossibility[word[i]]
        );
      }
    }

    const combo = combinate(mappingPossibility);

    const actualPossibilities = R.filter(
      R.pipe(R.values, R.uniq, R.length, R.equals(letters.length))
    )(combo);

    const validPossibilities = actualPossibilities
      .map((p) => [p, isValidMapping(p, onWires)])
      .filter((x) => x[1]);
    const mapping = validPossibilities[0][0] as unknown as {
      [x: string]: string;
    };

    for (let word of line[1].split(" ").filter(Boolean)) {
      const mapped = mapWord(mapping, word);
      const number = lettersToNum[mapped.join(",")];
      if (["1", "4", "7", "8"].includes(number)) {
        total++;
      }
    }
  }
  return total.toString();
};

const b = (input: string): string => {
  const lines = input.split("\n").map((l) => l.split("|"));
  let total = 0;
  for (let line of lines) {
    const mappingPossibility = R.clone(startMap);
    const onWires = line[0].split(" ").filter(Boolean);
    for (let word of onWires) {
      const possibilities = numbersByLength[word.length];
      let possibleLetterMappings = [];
      for (let possibility of possibilities) {
        possibleLetterMappings.push(numToLetters[possibility]);
      }
      possibleLetterMappings = R.uniq(R.flatten(possibleLetterMappings));
      for (let i = 0; i < word.length; i++) {
        mappingPossibility[word[i]] = R.intersection(
          possibleLetterMappings,
          mappingPossibility[word[i]]
        );
      }
    }

    const combo = combinate(mappingPossibility);

    const actualPossibilities = R.filter(
      R.pipe(R.values, R.uniq, R.length, R.equals(letters.length))
    )(combo);

    const validPossibilities = actualPossibilities
      .map((p) => [p, isValidMapping(p, onWires)])
      .filter((x) => x[1]);
    const mapping = validPossibilities[0][0] as unknown as {
      [x: string]: string;
    };

    let num = "";
    for (let word of line[1].split(" ").filter(Boolean)) {
      const mapped = mapWord(mapping, word);
      const number = lettersToNum[mapped.join(",")];
      num += number;
    }
    total += parseInt(num);
  }
  return total.toString();
};

export default {
  a,
  b,
};
