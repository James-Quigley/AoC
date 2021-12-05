import * as R from "ramda";

interface Line {
  x1;
  y1;
  x2;
  y2: number;
}

const yMxB = (line: Line) => {
  const m = (line.y2 - line.y1) / (line.x2 - line.x1);
  const b = line.y1 - m * line.x1;
  return (x: number) => m * x + b;
};

const a = (input: string): string => {
  const lines = input
    .split("\n")
    .map((line) => {
      const [l, r] = line.split("->");
      const [x1, y1] = l.split(",").map((s) => parseInt(s));
      const [x2, y2] = r.split(",").map((s) => parseInt(s));
      return {
        x1,
        y1,
        x2,
        y2,
      } as Line;
    })
    .filter((line) => line.x1 == line.x2 || line.y1 == line.y2);
  const grid = R.repeat(0, 1000).map((n) => R.repeat(0, 1000));
  for (let line of lines) {
    const fx = yMxB(line);
    const domain = R.range(
      Math.min(line.x1, line.x2),
      Math.max(line.x1, line.x2) + 1
    );
    const range = R.range(
      Math.min(line.y1, line.y2),
      Math.max(line.y1, line.y2) + 1
    );
    if (line.x2 != line.x1) {
      for (let x of domain) {
        const y = fx(x);
        grid[x][y]++;
      }
    } else {
      for (let y of range) {
        grid[line.x1][y]++;
      }
    }
  }
  return R.flatten(grid)
    .filter((x) => x > 1)
    .length.toString();
};

const b = (input: string): string => {
  const lines = input.split("\n").map((line) => {
    const [l, r] = line.split("->");
    const [x1, y1] = l.split(",").map((s) => parseInt(s));
    const [x2, y2] = r.split(",").map((s) => parseInt(s));
    return {
      x1,
      y1,
      x2,
      y2,
    } as Line;
  });
  const grid = R.repeat(0, 1000).map((n) => R.repeat(0, 1000));
  for (let line of lines) {
    const fx = yMxB(line);
    const domain = R.range(
      Math.min(line.x1, line.x2),
      Math.max(line.x1, line.x2) + 1
    );
    const range = R.range(
      Math.min(line.y1, line.y2),
      Math.max(line.y1, line.y2) + 1
    );
    if (line.x2 != line.x1) {
      for (let x of domain) {
        const y = fx(x);
        grid[x][y]++;
      }
    } else {
      for (let y of range) {
        grid[line.x1][y]++;
      }
    }
  }
  return R.flatten(grid)
    .filter((x) => x > 1)
    .length.toString();
};

export default {
  a,
  b,
};
