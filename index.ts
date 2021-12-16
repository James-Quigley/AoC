import { readFileSync } from "fs";

interface Day {
  a: (input: string) => string;
  b: (input: string) => string;
}

const args = process.argv.slice(2);

const day: Day = require(`./${args[0]}/${args[1]}`).default;

const input = readFileSync(`./${args[0]}/${args[1]}/${args[2] ?? "input"}.txt`, {
  encoding: "utf-8",
}).toString();

console.log(day.a(input));
console.log(day.b(input));
