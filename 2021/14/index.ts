import * as R from "ramda";

const simulatePolymer = (
  rules: {
    [key: string]: string;
  },
  template: string,
  n: number
): [string, number][] => {
  let counts = R.pipe(
    R.split(""),
    R.aperture(2),
    R.map(R.join("")),
    R.countBy(R.identity)
  )(template);
  for (let i = 0; i < n; i++) {
    let newCounts = R.clone(counts);
    for (let [pair, count] of Object.entries(counts)) {
      newCounts[pair] -= count;
      const newPairs = [
        pair.split("")[0] + rules[pair],
        rules[pair] + pair.split("")[1],
      ];
      for (let newPair of newPairs) {
        if (R.isNil(newCounts[newPair])) {
          newCounts[newPair] = 0;
        }
        newCounts[newPair] += count;
      }
    }
    counts = newCounts;
  }
  const letterCounts = {};
  for (let [k, v] of Object.entries(counts)) {
    const letter = k.split("")[0];
    if (R.isNil(letterCounts[letter])) {
      letterCounts[letter] = 0;
    }
    letterCounts[letter] += v;
  }
  letterCounts[template[template.length - 1]] += 1;
  const sortCountByLetter = R.pipe(
    R.toPairs,
    // @ts-expect-error
    R.sort(R.descend(R.nth(1)))
  )(letterCounts);
  return sortCountByLetter as [string, number][];
};

const a = (input: string): string => {
  const [templateStr, rulesStr] = input.split("\n\n");
  const rules = R.pipe(
    R.split("\n"),
    R.map(R.split(" -> ")),
    // @ts-expect-error
    R.fromPairs
  )(rulesStr);

  const sortCountByLetter = simulatePolymer(
    rules as {
      [key: string]: string;
    },
    templateStr,
    10
  );
  return (
    sortCountByLetter[0][1] - sortCountByLetter[sortCountByLetter.length - 1][1]
  ).toString();
};

const b = (input: string): string => {
  const [templateStr, rulesStr] = input.split("\n\n");
  const rules = R.pipe(
    R.split("\n"),
    R.map(R.split(" -> ")),
    // @ts-expect-error
    R.fromPairs
  )(rulesStr);
  const sortCountByLetter = simulatePolymer(
    rules as {
      [key: string]: string;
    },
    templateStr,
    40
  );
  return (
    R.head(sortCountByLetter)[1] - R.last(sortCountByLetter)[1]
  ).toString();
};

export default {
  a,
  b,
};
