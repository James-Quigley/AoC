import * as R from 'ramda'

const a = (input: string): string => {
    const [stacks, instructions] = input.split("\n\n")
    const r = stacks.replace(/\[/g, "").replace(/\]/g, "").split("\n").slice(0, -1).map(s => s.replace(/\s{4}/g, " ").split(" "))
    const t = R.transpose(r).map(s => s.filter(Boolean))
    for (const line of instructions.split("\n")) {
        const [count, from, to] = /move (\d+) from (\d+) to (\d+)/.exec(line).slice(1, 4).map(s => parseInt(s))
        for (let i = count; i > 0; i--) {
            t[to - 1].unshift(t[from - 1].shift())
        }
    }
    return t.map(a => a[0]).join("")
}

const b = (input: string): string => {
    const [stacks, instructions] = input.split("\n\n")
    const r = stacks.replace(/\[/g, "").replace(/\]/g, "").split("\n").slice(0, -1).map(s => s.replace(/\s{4}/g, " ").split(" "))
    const t = R.transpose(r).map(s => s.filter(Boolean))
    for (const line of instructions.split("\n")) {
        const [count, from, to] = /move (\d+) from (\d+) to (\d+)/.exec(line).slice(1, 4).map(s => parseInt(s))
        let elems = []
        for (let i = count; i > 0; i--) {
            elems.push(t[from - 1].shift())
        }
        t[to - 1].unshift(...elems)
    }
    return t.map(a => a[0]).join("")
}

export default {
    a,
    b
}