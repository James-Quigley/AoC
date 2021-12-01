import { readFileSync } from "fs";

interface Day {
    a: (string) => string
    b: (string) => string
}

const args = process.argv.slice(2);

const day: Day = require(`./${args[0]}`).default

const input = readFileSync(`./${args[0]}/input.txt`, {
    encoding: "utf-8"
}).toString()

console.log(day.a(input))
console.log(day.b(input))