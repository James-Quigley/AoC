import * as R from "ramda";

const a = (input: string): string => {
  let h = 0;
  let depth = 0;

  const lines = input.split("\n").map((line) => line.split(" "));

  for (let [comm, unit] of lines) {
    let d = parseInt(unit);
    if (comm == "forward") {
      h += d;
      continue;
    }
    if (comm == "up") {
      d *= -1;
    }
    depth += d;
  }
  return (depth * h).toString();
};

const b = (input: string): string => {
  let h = 0;
  let depth = 0;
  let aim = 0;

  const lines = input.split("\n").map((line) => line.split(" "));

  for (let [comm, unit] of lines) {
    let d = parseInt(unit);
    if (comm == "forward") {
      h += d;
      depth += aim * d;
      continue;
    }
    if (comm == "up") {
      d *= -1;
    }
    aim += d;
  }
  return (depth * h).toString();
};

export default {
  a,
  b,
};
