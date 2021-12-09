import * as R from "ramda";

const parseGrid = (input: string): number[][] => {
  return R.pipe(
    R.split("\n"),
    R.map(R.pipe(R.split(""), R.map(parseInt)))
  )(input);
};

const getAdjacent = (grid: number[][], x: number, y: number): number[] =>
  R.reject(R.isNil, [
    grid?.[x - 1]?.[y],
    grid?.[x + 1]?.[y],
    grid?.[x]?.[y - 1],
    grid?.[x]?.[y + 1],
  ]);

const isMinimum = (grid: number[][], x: number, y: number): boolean =>
  R.all(R.lt(grid[x][y]), getAdjacent(grid, x, y));

const getBasinSize = (grid: number[][], x: number, y: number): number => {
  const queue = [[x, y]];
  let size = 0;
  let visited = {};
  while (queue.length) {
    const current = queue.pop();
    if (visited[`${current[0]}, ${current[1]}`]) {
      continue;
    }
    size++;
    visited[`${current[0]}, ${current[1]}`] = true;
    const neighbors = [
      [current[0] - 1, current[1]],
      [current[0] + 1, current[1]],
      [current[0], current[1] - 1],
      [current[0], current[1] + 1],
    ];
    const filteredNeighbors = neighbors
      .filter((coord) => Boolean(grid?.[coord[0]]?.[coord[1]]))
      .filter(
        (coord) => grid[current[0]][current[1]] <= grid[coord[0]][coord[1]]
      )
      .filter((coord) => grid[coord[0]][coord[1]] != 9);
    queue.push(...filteredNeighbors);
  }

  return size;
};

const a = (input: string): string => {
  const grid = parseGrid(input);
  let total = 0;
  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[x].length; y++) {
      if (isMinimum(grid, x, y)) {
        total += 1 + grid[x][y];
      }
    }
  }
  return total.toString();
};

const b = (input: string): string => {
  const grid = parseGrid(input);
  let basins = [];
  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[x].length; y++) {
      if (isMinimum(grid, x, y)) {
        basins.push(getBasinSize(grid, x, y));
      }
    }
  }
  basins = basins.sort(R.descend(R.identity));
  return R.product(R.take(3, basins)).toString();
};

export default {
  a,
  b,
};
