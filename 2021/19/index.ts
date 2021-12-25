import * as R from "ramda";

const vectorDifferenceDict = (
  scanner: number[][]
): {
  [key: string]: number[][];
} => {
  const s = {};
  for (let pos of scanner) {
    for (let q of scanner) {
      const distance = [pos[0] - q[0], pos[1] - q[1], pos[2] - q[2]];
      s[distance.join(",")] = [pos, q];
    }
  }
  return s;
};

const transforms = [
  ([x, y, z]) => [x, y, z],
  ([x, y, z]) => [x, y, -z],
  ([x, y, z]) => [x, -y, z],
  ([x, y, z]) => [x, -y, -z],
  ([x, y, z]) => [-x, y, z],
  ([x, y, z]) => [-x, y, -z],
  ([x, y, z]) => [-x, -y, z],
  ([x, y, z]) => [-x, -y, -z],
  ([x, y, z]) => [z, x, y],
  ([x, y, z]) => [z, x, -y],
  ([x, y, z]) => [z, -x, y],
  ([x, y, z]) => [z, -x, -y],
  ([x, y, z]) => [-z, x, y],
  ([x, y, z]) => [-z, x, -y],
  ([x, y, z]) => [-z, -x, y],
  ([x, y, z]) => [-z, -x, -y],
  ([x, y, z]) => [y, z, x],
  ([x, y, z]) => [y, z, -x],
  ([x, y, z]) => [y, -z, x],
  ([x, y, z]) => [y, -z, -x],
  ([x, y, z]) => [-y, z, x],
  ([x, y, z]) => [-y, z, -x],
  ([x, y, z]) => [-y, -z, x],
  ([x, y, z]) => [-y, -z, -x],
  ([x, y, z]) => [x, z, y],
  ([x, y, z]) => [x, z, -y],
  ([x, y, z]) => [x, -z, y],
  ([x, y, z]) => [x, -z, -y],
  ([x, y, z]) => [-x, z, y],
  ([x, y, z]) => [-x, z, -y],
  ([x, y, z]) => [-x, -z, y],
  ([x, y, z]) => [-x, -z, -y],
  ([x, y, z]) => [y, x, z],
  ([x, y, z]) => [y, x, -z],
  ([x, y, z]) => [y, -x, z],
  ([x, y, z]) => [y, -x, -z],
  ([x, y, z]) => [-y, x, z],
  ([x, y, z]) => [-y, x, -z],
  ([x, y, z]) => [-y, -x, z],
  ([x, y, z]) => [-y, -x, -z],
  ([x, y, z]) => [z, y, x],
  ([x, y, z]) => [z, y, -x],
  ([x, y, z]) => [z, -y, x],
  ([x, y, z]) => [z, -y, -x],
  ([x, y, z]) => [-z, y, x],
  ([x, y, z]) => [-z, y, -x],
  ([x, y, z]) => [-z, -y, x],
  ([x, y, z]) => [-z, -y, -x],
];

const a = (input: string): string => {
  const scanners = input
    .split("\n\n")
    .map((s) =>
      R.drop(1, s.split("\n")).map((s) => s.split(",").map((n) => parseInt(n)))
    );

  let dict = vectorDifferenceDict(scanners[0]);

  let inPlace = 1;
  let notInPlace = R.drop(1, scanners);
  while (inPlace < scanners.length) {
    let found = false;
    for (let i = 0; i < notInPlace.length; i++) {
      // @ts-expect-error
      const rotations = transforms.map((t) => notInPlace[i].map((a) => t(a)));
      for (let rotation of rotations) {
        const rotationDiffDict = vectorDifferenceDict(rotation);

        const intersection = R.intersection(
          R.keys(dict),
          R.keys(rotationDiffDict)
        );
        const pointOfReference = dict[intersection[0]][0];
        const otherPoint = rotationDiffDict[intersection[0]][0];
        const dX = pointOfReference[0] - otherPoint[0];
        const dY = pointOfReference[1] - otherPoint[1];
        const dZ = pointOfReference[2] - otherPoint[2];

        if (intersection.length >= 132) {
          const newKeys = R.difference(R.keys(rotationDiffDict), R.keys(dict));
          dict = R.mergeLeft(
            dict,
            R.fromPairs(
              // @ts-expect-error
              newKeys.map((v) => {
                const translated = [
                  [
                    rotationDiffDict[v][0][0] + dX,
                    rotationDiffDict[v][0][1] + dY,
                    rotationDiffDict[v][0][2] + dZ,
                  ],
                  [
                    rotationDiffDict[v][1][0] + dX,
                    rotationDiffDict[v][1][1] + dY,
                    rotationDiffDict[v][1][2] + dZ,
                  ],
                ];
                return [v, translated];
              })
            )
          );
          inPlace++;
          notInPlace = R.remove(i, 1, notInPlace);
          found = true;
          break;
        }
      }
      if (found) {
        break;
      }
    }
  }

  console.log("unique", R.uniq(R.unnest(Object.values(dict))).length);
  return "";
};

const b = (input: string): string => {
  return "";
};

export default {
  a,
  b,
};
