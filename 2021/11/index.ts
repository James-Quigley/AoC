import * as R from "ramda";

const a = (input: string): string => {
  const grid = input
    .split("\n")
    .map((l) => l.split("").map((s) => parseInt(s)));
  let flashes = 0;

  const checkFlash = (x: number, y: number): void => {
    grid[x][y] = grid[x][y] + 1;
    if (grid[x][y] == 10) {
      flashes++;
      for (let i = x - 1; i <= x + 1; i++) {
        for (let j = y - 1; j <= y + 1; j++) {
          if (R.isNil(grid[i]?.[j])) {
            continue;
          }
          checkFlash(i, j);
        }
      }
    }
  };

  const reset = () => {
    for (let x = 0; x < grid.length; x++) {
      for (let y = 0; y < grid.length; y++) {
        if (grid[x][y] > 9) {
          grid[x][y] = 0;
        }
      }
    }
  };

  for (let i = 0; i < 100; i++) {
    for (let x = 0; x < grid.length; x++) {
      for (let y = 0; y < grid.length; y++) {
        checkFlash(x, y);
      }
    }
    reset();
  }
  return flashes.toString();
};

const b = (input: string): string => {
  const grid = input
    .split("\n")
    .map((l) => l.split("").map((s) => parseInt(s)));
  let flashes = 0;

  const checkFlash = (x: number, y: number): void => {
    grid[x][y] = grid[x][y] + 1;
    if (grid[x][y] == 10) {
      flashes++;
      for (let i = x - 1; i <= x + 1; i++) {
        for (let j = y - 1; j <= y + 1; j++) {
          if (R.isNil(grid[i]?.[j])) {
            continue;
          }
          checkFlash(i, j);
        }
      }
    }
  };

  const reset = () => {
    for (let x = 0; x < grid.length; x++) {
      for (let y = 0; y < grid.length; y++) {
        if (grid[x][y] > 9) {
          grid[x][y] = 0;
        }
      }
    }
  };

  let step = 0;
  while (true) {
    step++;
    for (let x = 0; x < grid.length; x++) {
      for (let y = 0; y < grid.length; y++) {
        checkFlash(x, y);
      }
    }
    reset();
    if (R.countBy(R.identity, R.flatten(grid))[0] == 100) {
      break;
    }
  }
  return step.toString();
};

export default {
  a,
  b,
};
