import * as R from "ramda";

interface Node {
  left: Node | number;
  right: Node | number;
  parent: Node | null;
}

const debug = false;

const arrToTree = (arr, parent) => {
  let node: Node = {
    left: 0,
    right: 0,
    parent,
  };
  if (Array.isArray(arr[0])) {
    node.left = arrToTree(arr[0], node);
  } else {
    node.left = arr[0];
  }
  if (Array.isArray(arr[1])) {
    node.right = arrToTree(arr[1], node);
  } else {
    node.right = arr[1];
  }
  return node;
};

const treeToArr = (el: Node | number) => {
  if (typeof el == "number") {
    return el;
  }

  return [treeToArr(el.left), treeToArr(el.right)];
};

const addTrees = (left: Node, right: Node): Node => {
  let node: Node = {
    left,
    right,
    parent: null,
  };
  if (typeof node.left != "number") {
    node.left.parent = node;
  }
  if (typeof node.right != "number") {
    node.right.parent = node;
  }
  return node;
};

const doExplode = (tree: Node, depth: number): [Node, boolean] => {
  const nodeChildren = [tree.left, tree.right].filter(
    (n) => typeof n != "number"
  ) as Node[];
  if (depth == 3 && nodeChildren.length) {
    addToNextLeft(nodeChildren[0], nodeChildren[0].left as number);
    addToNextRight(nodeChildren[0], nodeChildren[0].right as number);
    if (typeof tree.left != "number") {
      tree.left = 0;
    } else {
      tree.right = 0;
    }
    return [tree, true];
  }

  if (typeof tree.left != "number") {
    const [newLeft, didExplode] = doExplode(tree.left, depth + 1);
    tree.left = newLeft;
    if (didExplode) {
      return [tree, true];
    }
  }

  if (typeof tree.right != "number") {
    const [newRight, didExplode] = doExplode(tree.right, depth + 1);
    tree.right = newRight;
    if (didExplode) {
      return [tree, true];
    }
  }
  return [tree, false];
};

const doSplit = (tree: Node): [Node, boolean] => {
  if (typeof tree.left == "number" && tree.left >= 10) {
    const n = tree.left;
    tree.left = {
      left: Math.floor(n / 2.0),
      right: Math.ceil(n / 2.0),
      parent: tree,
    };
    return [tree, true];
  }
  if (typeof tree.left != "number") {
    const [t, didSplit] = doSplit(tree.left);
    if (didSplit) {
      tree.left = t;
      return [tree, true];
    }
  }
  if (typeof tree.right == "number" && tree.right >= 10) {
    const n = tree.right;
    tree.right = {
      left: Math.floor(n / 2.0),
      right: Math.ceil(n / 2.0),
      parent: tree,
    };
    return [tree, true];
  }
  if (typeof tree.right != "number") {
    const [t, didSplit] = doSplit(tree.right);
    if (didSplit) {
      tree.right = t;
      return [tree, true];
    }
  }
  return [tree, false];
};

const addToNextLeft = (tree: Node, n: number) => {
  let current = tree.parent;
  let prev = tree;
  while (current) {
    if (current.left != prev) {
      break;
    }
    prev = current;
    current = current.parent;
  }
  if (!current) {
    return;
  }

  prev = current;
  let side = "left";
  let thing = current.left;
  while (typeof thing != "number") {
    prev = thing;
    thing = thing.right;
    side = "right";
  }
  prev[side] = thing + n;
};

const addToNextRight = (tree: Node, n: number) => {
  let current = tree.parent;
  let prev = tree;
  while (current) {
    if (current.right != prev) {
      break;
    }
    prev = current;
    current = current.parent;
  }
  if (!current) {
    return;
  }

  prev = current;
  let side = "right";
  let thing = current.right;
  while (typeof thing != "number") {
    side = "left";
    prev = thing;
    thing = thing.left;
  }
  prev[side] = thing + n;
};

const reduceTree = (tree: Node): Node => {
  let newTree = tree;

  while (true) {
    const [t, didExplode] = doExplode(newTree, 0);
    newTree = t;
    if (didExplode && debug) {
      console.log("exploded:", JSON.stringify(treeToArr(newTree)));
    }
    if (!didExplode) {
      const [t, didSplit] = doSplit(newTree);
      newTree = t;
      if (didSplit && debug) {
        console.log("splitted:", JSON.stringify(treeToArr(newTree)));
      }
      if (!didSplit) {
        break;
      }
    }
  }

  return newTree;
};

const magnitude = (el: Node | number): number => {
  if (typeof el == "number") {
    return el;
  }
  return 3 * magnitude(el.left) + 2 * magnitude(el.right);
};

const a = (input: string): string => {
  const lines = input.split("\n").map((l) => JSON.parse(l));
  let tree = arrToTree(lines[0], null);
  for (let i = 1; i < lines.length; i++) {
    const lineTree = arrToTree(lines[i], null);
    tree = addTrees(tree, lineTree);
    tree = reduceTree(tree);
  }

  console.log(JSON.stringify(treeToArr(tree)));

  return magnitude(tree).toString();
};

const b = (input: string): string => {
  const trees = input.split("\n").map((l) => arrToTree(JSON.parse(l), null));
  const reversed = R.clone(trees).reverse();

  let max = 0;
  for (let i = 0; i < trees.length - 1; i++) {
    for (let j = i + 1; j < trees.length; j++) {
      const r = reduceTree(addTrees(trees[i], trees[j]));
      console.log(JSON.stringify(treeToArr(r)));
      const m = magnitude(r);
      if (m > max) {
        max = m;
      }
      const r2 = reduceTree(addTrees(reversed[i], reversed[j]));
      console.log(JSON.stringify(treeToArr(r2)));
      const rm = magnitude(r2);
      if (rm > max) {
        max = rm;
      }
    }
  }

  return max.toString();
};

export default {
  a,
  b,
};
