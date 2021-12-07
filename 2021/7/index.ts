import * as R from "ramda";

const a = (input: string): string => {
  const nums = R.pipe(R.split(","), R.map(parseInt))(input);

  const position = R.median(nums);
  const cost = R.pipe(
    R.map(R.subtract(position)),
    R.map(Math.abs),
    R.sum
  )(nums);
  return cost.toString();
};

const b = (input: string): string => {
  const nums = R.pipe(R.split(","), R.map(parseInt))(input);

  const mean = Math.floor(R.mean(nums));
  const cost = R.pipe(
    R.map(R.pipe(R.subtract(mean), Math.abs, R.inc, R.range(1), R.sum)),
    R.sum
  )(nums);
  return cost.toString();
};

export default {
  a,
  b,
};
