import * as R from "ramda";

const charsAtIndexOrderedByFrequency = (
  arr: string[],
  i: number
): [string, number][] => {
  // @ts-ignore
  return R.pipe(
    R.map(R.nth(i)),
    // @ts-ignore
    R.countBy(R.identity),
    R.toPairs,
    // @ts-ignore
    R.sort(R.descend(R.nth(1)))
  )(arr);
};

const a = (input: string): string => {
  const lines = input.split("\n");
  let gamma = "";
  let epsilon = "";
  for (let i = 0; i < lines[0].length; i++) {
    const chars = charsAtIndexOrderedByFrequency(lines, i);
    gamma += chars[0][0];
    epsilon += chars[chars.length - 1][0];
  }

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
