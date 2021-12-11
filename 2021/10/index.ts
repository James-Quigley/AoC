import * as R from "ramda";

const brackets = {
  ")": "(",
  "]": "[",
  "}": "{",
  ">": "<",
};

const openers = Object.values(brackets);
const closers = Object.keys(brackets);
const costs = [3, 57, 1197, 25137];
const autocompleteCosts = [1, 2, 3, 4];

const costPerCloser = R.zipObj(closers, costs);
const autoCostsPerOpener = R.zipObj(openers, autocompleteCosts);

const a = (input: string): string => {
  const lines = input.split("\n").map((l) => l.split(""));
  let total = 0;
  for (let line of lines) {
    let stack = [];
    for (let char of line) {
      if (openers.includes(char)) {
        stack.unshift(char);
        continue;
      }
      if (stack[0] != brackets[char]) {
        total += costPerCloser[char];
        break;
      } else {
        stack.shift();
      }
    }
  }

  return total.toString();
};

const b = (input: string): string => {
  const lines = input.split("\n").map((l) => l.split(""));
  let scores = [];
  for (let line of lines) {
    let stack = [];
    let total = 0;
    let invalid = false;
    for (let char of line) {
      if (openers.includes(char)) {
        stack.unshift(char);
        continue;
      }
      if (stack[0] != brackets[char]) {
        invalid = true;
        break;
      } else {
        stack.shift();
      }
    }

    if (!invalid) {
      while (stack.length) {
        total = total * 5 + autoCostsPerOpener[stack.shift()];
      }
      scores.push(total);
    }
  }

  scores = R.sort(R.descend(R.identity), scores);
  return scores[Math.floor(scores.length / 2)].toString();
};

export default {
  a,
  b,
};
