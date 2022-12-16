import { readFileSync } from "fs";
import { PerformanceObserver, performance } from 'node:perf_hooks';


interface Day {
  a: (input: string) => string;
  b: (input: string) => string;
}

const args = process.argv.slice(2);

const day: Day = require(`./${args[0]}/${args[1]}`).default;

const input = readFileSync(`./${args[0]}/${args[1]}/${args[2] ?? "input"}.txt`, {
  encoding: "utf-8",
}).toString();

const obs = new PerformanceObserver((items) => {
  console.log(items.getEntries().map(e => `${e.name}: ${e.duration}ms`));
  obs.disconnect()
});
obs.observe({ type: 'measure' });

performance.mark("A")
const a = day.a(input)
performance.measure("Part 1", "A")
console.log("Part 1: ", a);

performance.mark("B")
const b = day.b(input)
performance.measure("Part 2", "B")
console.log("Part 2: ", b);
