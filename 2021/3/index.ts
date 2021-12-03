import * as R from "ramda";

const charsAtIndexOrderedByFrequency = R.curry(
  (arr: string[], i: number): [string, number][] => {
    // @ts-ignore
    return R.pipe(
      R.map(R.nth(i)),
      R.countBy(R.identity as (i: string) => string),
      R.toPairs,
      // @ts-ignore
      R.sort(R.descend(R.nth(1)))
    )(arr);
  }
);

const stringFromNthMostCommonCharAtIndex = (arr: string[], i: number) => {
  const fn = charsAtIndexOrderedByFrequency(arr);
  return R.pipe(
    R.head,
    R.length,
    R.times(R.identity),
    R.map(fn),
    R.map(R.nth(i)),
    R.map(R.nth(0)),
    R.join("")
  )(arr);
};

const a = (input: string): string => {
  const lines = input.split("\n");

  const gamma = stringFromNthMostCommonCharAtIndex(lines, 0);

  const epsilon = stringFromNthMostCommonCharAtIndex(lines, 1);

  return (parseInt(gamma, 2) * parseInt(epsilon, 2)).toString();
};

const b = (input: string): string => {
  const lines = input.split("\n");
  let oxyLines = R.clone(lines);
  let co2Lines = R.clone(lines);
  for (let i = 0; i < lines[0].length; i++) {
    const chars = charsAtIndexOrderedByFrequency(oxyLines, i);
    let keep = chars[0][0];
    if (chars.length > 1 && chars[0][1] == chars[1][1]) {
      keep = "1";
    }
    oxyLines = oxyLines.filter((v) => v[i] == keep);
    if (oxyLines.length == 1) {
      break;
    }
  }
  for (let i = 0; i < lines[0].length; i++) {
    const chars = charsAtIndexOrderedByFrequency(co2Lines, i);
    let keep = R.last(chars)[0];
    if (chars.length > 1 && chars[0][1] == chars[1][1]) {
      keep = "0";
    }
    co2Lines = co2Lines.filter((v) => v[i] == keep);
    if (co2Lines.length == 1) {
      break;
    }
  }
  return (parseInt(oxyLines[0], 2) * parseInt(co2Lines[0], 2)).toString();
};

export default {
  a,
  b,
};
