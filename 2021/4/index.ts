import * as R from "ramda";

const isBoardWinner = (board: string, nums: string[]) => {
  const rows = board
    .split("\n")
    .map((l) => l.split(" ").filter((l) => l != ""));
  const columns = R.transpose(rows);

  for (let row of rows) {
    let win = true;
    for (let n of row) {
      if (!nums.includes(n)) {
        win = false;
        break;
      }
    }
    if (win) {
      return true;
    }
  }
  for (let column of columns) {
    let win = true;
    for (let n of column) {
      if (!nums.includes(n)) {
        win = false;
        break;
      }
    }
    if (win) {
      return true;
    }
  }
};

const getUnmarkedNumbers = (board: string, nums: string[]) => {
  const boardNumbers = R.pipe(
    R.split("\n"),
    R.map(R.split(" ")),
    R.flatten,
    R.filter((l) => l != "")
  )(board);
  return R.difference(boardNumbers, nums);
};

const a = (input: string): string => {
  const [numStr, ...boardsStrArr] = input.split("\n\n");
  const numbers = numStr.split(",");

  for (let i = 0; i < numbers.length; i++) {
    for (let board of boardsStrArr) {
      if (isBoardWinner(board, numbers.slice(0, i + 1))) {
        const unmarked = getUnmarkedNumbers(board, numbers.slice(0, i + 1));
        return (
          R.sum(R.map(parseInt, unmarked)) * parseInt(numbers[i])
        ).toString();
      }
    }
  }
  return "bad news bears";
};

const b = (input: string): string => {
  const [numStr, ...boardsStrArr] = input.split("\n\n");
  const numbers = numStr.split(",");

  let boards = boardsStrArr;
  for (let i = 0; i < numbers.length; i++) {
    let toRemove = [];
    for (let b = 0; b < boards.length; b++) {
      if (isBoardWinner(boards[b], numbers.slice(0, i + 1))) {
        toRemove.push(boards[b]);
        if (boards.length == 1) {
          const unmarked = getUnmarkedNumbers(
            boards[0],
            numbers.slice(0, i + 1)
          );
          return (
            R.sum(R.map(parseInt, unmarked)) * parseInt(numbers[i])
          ).toString();
        }
      }
    }
    boards = R.difference(boards, toRemove);
  }
  return "bad news bears";
};

export default {
  a,
  b,
};
