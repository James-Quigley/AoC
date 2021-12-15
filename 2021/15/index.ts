import * as R from "ramda";
import * as dijkstra from "dijkstrajs";

const parseGrid = (input: string) =>
  R.pipe(R.split("\n"), R.map(R.pipe(R.split(""), R.map(parseInt))))(input);

const printGrid = (grid: number[][]) => {
  console.log(R.pipe(R.map(R.join("")), R.join("\n"))(grid));
};

const a = (input: string): string => {
  const grid = parseGrid(input);

  const graph = {};
  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[0].length; y++) {
      const neighbors = [
        [x, y - 1],
        [x, y + 1],
        [x - 1, y],
        [x + 1, y],
      ].filter(([x, y]) => !R.isNil(grid?.[x]?.[y]));

      const neighborCosts = neighbors.reduce((acc, [x, y]) => {
        acc[`${x},${y}`] = grid[x][y];
        return acc;
      }, {});

      graph[`${x},${y}`] = neighborCosts;
    }
  }
  const path = dijkstra.find_path(
    graph,
    `0,0`,
    `${grid.length - 1},${grid[0].length - 1}`
  );
  const cost = R.pipe(
    R.tail,
    // @ts-expect-error
    R.map(R.split(",")),
    R.map(([x, y]) => grid[x][y]),
    R.sum
  )(path);
  return cost.toString();
};

const incGrid = (grid: number[][], n: number) =>
  R.pipe(
    R.map(R.map(R.pipe(R.add(n), R.modulo(R.__, 9), (n) => (n == 0 ? 9 : n))))
  )(grid);

const b = (input: string): string => {
  const grid = parseGrid(input);
  const bigGrid = [];
  for (let i = 0; i < grid.length * 5; i++) {
    bigGrid[i] = [];
    for (let j = 0; j < grid.length * 5; j++) {
      bigGrid[i][j] = 0;
    }
  }
  for (let x = 0; x < 5; x++) {
    for (let y = 0; y < 5; y++) {
      const gridPart = incGrid(grid, x + y);
      for (let i = 0; i < gridPart.length; i++) {
        const bigGridX = grid.length * x + i;
        for (let j = 0; j < gridPart[0].length; j++) {
          const bigGridY = grid[0].length * y + j;
          bigGrid[bigGridX][bigGridY] = gridPart[i][j];
        }
      }
    }
  }

  const graph = {};
  for (let x = 0; x < bigGrid.length; x++) {
    for (let y = 0; y < bigGrid[0].length; y++) {
      const neighbors = [
        [x, y - 1],
        [x, y + 1],
        [x - 1, y],
        [x + 1, y],
      ].filter(([x, y]) => !R.isNil(bigGrid?.[x]?.[y]));

      const neighborCosts = neighbors.reduce((acc, [x, y]) => {
        acc[`${x},${y}`] = bigGrid[x][y];
        return acc;
      }, {});

      graph[`${x},${y}`] = neighborCosts;
    }
  }
  const path = dijkstra.find_path(
    graph,
    `0,0`,
    `${bigGrid.length - 1},${bigGrid[0].length - 1}`
  );
  const cost = R.pipe(
    R.tail,
    // @ts-expect-error
    R.map(R.split(",")),
    R.map(([x, y]) => bigGrid[x][y]),
    R.sum
  )(path);
  return cost.toString();
};

export default {
  a,
  b,
};
