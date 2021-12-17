import * as R from "ramda";

const simulate = (
  xVel: number,
  yVel: number,
  steps: number
): [number, number][] => {
  let xPos = 0;
  let yPos = 0;
  let pos = [];
  for (let i = 0; i < steps; i++) {
    xPos += xVel;
    yPos += yVel;
    yVel--;
    xVel--;
    if (xVel < 0) {
      xVel = 0;
    }
    pos.push([xPos, yPos]);
  }
  return pos;
};

export const landsInArea = R.curry(
  (
    xMin: number,
    xMax: number,
    yMin: number,
    yMax: number,
    pos: [number, number][]
  ) => {
    for (let [x, y] of pos) {
      if (xMin <= x && x <= xMax && yMin <= y && y <= yMax) {
        return true;
      }
    }
    return false;
  }
);

const parseInput = (input: string) => {
  const [_, __, xStr, yStr] = input.split(" ");
  const [xMin, xMax] = xStr
    .substring(2)
    .split("..")
    .map((n) => parseInt(n));
  const [yMin, yMax] = yStr
    .substring(2)
    .split("..")
    .map((n) => parseInt(n));

  return [xMin, xMax, yMin, yMax];
};

const a = (input: string): string => {
  const [xMin, xMax, yMin, yMax] = parseInput(input);

  const xRange = [];
  for (let x = xMin < 0 ? xMin : 0; x <= (xMax < 0 ? 0 : xMax); x++) {
    xRange.push(x);
  }
  const maxY = yMin > 0 ? yMax : Math.abs(yMin) + 2;
  const yRange = R.range(Math.min(0, yMin) - 2, maxY);

  let highest = -1;
  for (let x of R.uniq(xRange)) {
    for (let y of yRange) {
      const pos = simulate(x, y, Math.max(Math.abs(xMax), Math.abs(yMax * 4)));

      const valid = landsInArea(xMin, xMax, yMin, yMax, pos);
      if (valid) {
        const h = R.sort(R.descend(R.nth(1)), pos)[0][1];
        if (h > highest) {
          highest = h;
        }
      }
    }
  }
  return highest.toString();
};

const b = (input: string): string => {
  const [xMin, xMax, yMin, yMax] = parseInput(input);

  const xRange = [];
  for (let x = xMin < 0 ? xMin : 0; x <= (xMax < 0 ? 0 : xMax); x++) {
    xRange.push(x);
  }
  const maxY = yMin > 0 ? yMax : Math.abs(yMin) + 1;
  const yRange = R.range(Math.min(0, yMin), maxY);

  let total = 0;
  const init = [];
  for (let x of R.uniq(xRange)) {
    for (let y of yRange) {
      if (
        landsInArea(
          xMin,
          xMax,
          yMin,
          yMax,
          simulate(x, y, Math.max(Math.abs(xMax), Math.abs(yMax * 4)))
        )
      ) {
        total++;
        init.push([x, y]);
      }
    }
  }
  return total.toString();
};

export default {
  a,
  b,
};
