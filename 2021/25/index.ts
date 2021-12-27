import * as R from "ramda";

const printGrid = (grid: string[][]) => {
  console.log(R.pipe(R.map(R.join("")), R.join("\n"))(grid));
};

const tick = (grid: string[][]): string[][] => {
  let copy = R.clone(grid);

  for (let x = 0; x < copy.length; x++) {
    for (let y = 0; y < copy[0].length; y++) {
      if (grid[x][y] == ">") {
        if (y == copy[0].length - 1 && grid[x][0] == ".") {
          copy[x][0] = ">";
          copy[x][y] = ".";
        } else if (grid[x]?.[y + 1] == ".") {
          copy[x][y + 1] = ">";
          copy[x][y] = ".";
        }
      }
    }
  }

  const copy2 = R.clone(copy);

  for (let x = 0; x < copy2.length; x++) {
    for (let y = 0; y < copy2[0].length; y++) {
      if (copy[x][y] == "v") {
        if (x == copy2.length - 1 && copy[0][y] == ".") {
          copy2[0][y] = "v";
          copy2[x][y] = ".";
        } else if (copy?.[x + 1]?.[y] == ".") {
          copy2[x + 1][y] = "v";
          copy2[x][y] = ".";
        }
      }
    }
  }
  return copy2;
};

const a = (input: string): string => {
  let grid = input.split("\n").map((l) => l.split(""));
  let ticks = 1;
  while (true) {
    const newGrid = tick(grid);
    if (R.flatten(newGrid).join("") == R.flatten(grid).join("")) {
      break;
    }
    ticks++;
    grid = newGrid;
  }
  return ticks.toString();
};

const b = (input: string): string => {
  return "";
};

export default {
  a,
  b,
};
