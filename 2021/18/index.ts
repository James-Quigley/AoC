import * as R from "ramda";

const addDepth = (el, depth) => {
  if (typeof el == "number") {
    return {
      value: el,
      depth: depth - 1,
    };
  }
  return [addDepth(el[0], depth + 1), addDepth(el[1], depth + 1)];
};

interface Element {
  value: number;
  depth: number;
}

const add = (a: Element[], b: Element[]): Element[] => {
  return a
    .map((e) => ({
      ...e,
      depth: e.depth + 1,
    }))
    .concat(
      b.map((e) => ({
        ...e,
        depth: e.depth + 1,
      }))
    );
};

const explode = (a: Element[]): [Element[], boolean] => {
  let arr = R.clone(a);
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].depth == 4) {
      if (!R.isNil(arr[i - 1])) {
        arr[i - 1].value += arr[i].value;
      }
      if (!R.isNil(arr[i + 2])) {
        arr[i + 2].value += arr[i + 1].value;
      }

      arr[i] = {
        value: 0,
        depth: 3,
      };
      arr = R.remove(i + 1, 1, arr);
      return [arr, true];
    }
  }
  return [arr, false];
};

const split = (a: Element[]): [Element[], boolean] => {
  let arr = R.clone(a);
  for (let i = 0; i < a.length; i++) {
    if (arr[i].value >= 10) {
      const n = arr[i].value;
      const d = arr[i].depth;
      arr[i] = {
        value: Math.floor(n / 2.0),
        depth: d + 1,
      };
      arr = R.insert(
        i + 1,
        {
          value: Math.ceil(n / 2.0),
          depth: d + 1,
        },
        arr
      );
      return [arr, true];
    }
  }
  return [arr, false];
};

const reduce = (a: Element[]) => {
  let arr = R.clone(a);
  while (true) {
    let [newArr, changed] = explode(arr);
    if (changed) {
      arr = newArr;
      continue;
    }
    [newArr, changed] = split(arr);
    if (changed) {
      arr = newArr;
      continue;
    }
    break;
  }
  return arr;
};

const magnitude = (a: Element[]): number => {
  let arr = R.clone(a);
  for (let i = 4; i >= 0; i--) {
    let queue = [];
    let held = null;
    for (let e of arr) {
      if (e.depth != i) {
        queue.push(e);
        continue;
      }
      if (!held) {
        held = e;
        continue;
      }
      queue.push({
        value: 3 * held.value + 2 * e.value,
        depth: i - 1,
      });
      held = null;
    }
    arr = queue;
  }
  return arr[0].value;
};

const a = (input: string): string => {
  const lines = input.split("\n").map((l) => JSON.parse(l));
  const withDepth: Element[][] = lines
    .map((l) => addDepth(l, 0))
    .map((l) => R.flatten(l));

  const [head, ...rest] = withDepth;
  const result = rest.reduce((acc, c) => {
    return reduce(add(acc, c));
  }, head);
  return magnitude(result).toString();
};

const b = (input: string): string => {
  const lines = input.split("\n").map((l) => JSON.parse(l));
  const withDepth: Element[][] = lines
    .map((l) => addDepth(l, 0))
    .map((l) => R.flatten(l));
  const reversed = R.clone(withDepth).reverse();

  let max = 0;
  for (let i = 0; i < withDepth.length - 1; i++) {
    for (let j = i + 1; j < withDepth.length; j++) {
      max = Math.max(
        ...[
          magnitude(reduce(add(withDepth[i], withDepth[j]))),
          magnitude(reduce(add(reversed[i], reversed[j]))),
          max,
        ]
      );
    }
  }
  return max.toString();
};

export default {
  a,
  b,
};
