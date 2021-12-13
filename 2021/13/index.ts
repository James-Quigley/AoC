import * as R from "ramda";

const printGrid = (grid: string[][]) => {
  console.log(R.pipe(
    R.transpose,
    R.map(R.join("")),
    R.join("\n")
  )(grid))
}

const foldX = (grid: string[][], n: number) => {
  const first = R.slice(0, n, grid)
  const second = R.reverse(R.slice(n+1, Infinity, grid))

  const [longer, other] = R.sort(R.descend(R.length), [first, second])

  other.unshift(...R.repeat(R.repeat(".", longer[0].length), longer.length - other.length))
  return longer.map((l, i) => 
    R.zipWith((y, z) => 
      R.any(R.equals("#"), [y, z]) ? "#" : ".", l, other[i]))
}

const foldY = (grid: string[][], n: number) => {
  return grid.map(x => {
    const first = R.slice(0, n, x)
    const second = R.reverse(R.slice(n+1, Infinity, x))
    const [shorter, other] = R.sort(R.ascend(R.length), [first, second])
    shorter.unshift(...R.repeat(".", other.length - shorter.length))
    return R.zipWith((y, z) => {
      return R.any(R.equals("#"), [y, z]) ? "#" : "." 
    }, shorter, other)
  })
}

const doFold = (grid: string[][], n: number, axis: string) => axis == "x" ? foldX(grid, n) : foldY(grid, n)

const parseGrid = (input: string) => {
  const [xSize, ySize] = R.pipe(
    R.split("\n"),
    R.map(
      R.pipe(
        R.split(","),
        R.map(parseInt)
      )
    ),
    R.transpose,
    R.map(
      R.pipe(
        R.apply(Math.max),
        R.inc
      )
    )
  )(input)
  const grid = R.repeat(".", xSize).map((n) => R.repeat(".", ySize));
  for (let line of input.split("\n")) {
    const [x, y] = line.split(",").map(s => parseInt(s))
    grid[x][y] = "#"
  }
  return grid
}

const a = (input: string): string => {
  const [lines, foldArr] = input.split("\n\n")
  let grid = parseGrid(lines)
  const folds = foldArr.split("\n")
  const [axis, num] = folds[0].split(" ")[2].split("=")
  const n = parseInt(num)
  grid = doFold(grid, n, axis)
  const dots = R.pipe(R.flatten, R.countBy(R.identity), R.path(["#"]))(grid)
  return dots.toString()
};

const b = (input: string): string => {
  const [lines, foldArr] = input.split("\n\n")
  let grid = parseGrid(lines)
  const folds = foldArr.split("\n")
  for (let fold of folds) {
    const [axis, num] = fold.split(" ")[2].split("=")
    const n = parseInt(num)
    grid = doFold(grid, n, axis)
  }
  printGrid(grid)
  return ""
};

export default {
  a,
  b,
};
