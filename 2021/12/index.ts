import * as R from "ramda";

type Graph = {
  [key: string]: string[] | undefined;
};

const isLowercase = (s: string): boolean => s.toLowerCase() == s;

const parseGraph = (input: string) => {
  const graph: {
    [key: string]: string[] | undefined;
  } = {};
  for (let line of input.split("\n")) {
    const mapping = line.split("-");
    if (!graph[mapping[0]]) {
      graph[mapping[0]] = [];
    }
    if (!graph[mapping[1]]) {
      graph[mapping[1]] = [];
    }
    graph[mapping[0]].push(mapping[1]);
    graph[mapping[1]].push(mapping[0]);
  }
  return graph;
};

const traverse = (graph: Graph, node: string, path: string[]) => {
  path.push(node);
  if (node == "end") {
    return 1;
  }
  const neighbors = graph[node];
  const results = [];
  for (let neighbor of neighbors) {
    if (isLowercase(neighbor) && path.includes(neighbor)) {
      continue;
    }
    results.push(traverse(graph, neighbor, R.clone(path)));
  }
  return R.sum(results);
};

const a = (input: string): string => {
  const result = traverse(parseGraph(input), "start", []);
  return result.toString();
};

const traverseB = (graph: Graph, node: string, path: string[]) => {
  path.push(node);
  if (node == "end") {
    return 1;
  }
  const neighbors = graph[node];
  const results = [];
  for (let neighbor of neighbors) {
    const lowercaseDuplicateCount = R.pipe(
      R.filter(isLowercase),
      R.countBy(R.identity),
      R.values,
      R.sort(R.descend(R.identity)),
      R.nth(0),
      R.equals(2)
    )(path);
    if (
      (isLowercase(neighbor) &&
        path.includes(neighbor) &&
        lowercaseDuplicateCount) ||
      neighbor == "start"
    ) {
      continue;
    }
    results.push(traverseB(graph, neighbor, R.clone(path)));
  }
  return R.sum(results);
};

const b = (input: string): string => {
  const result = traverseB(parseGraph(input), "start", []);
  return result.toString();
};

export default {
  a,
  b,
};
