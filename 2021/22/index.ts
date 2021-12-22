import * as R from "ramda";

interface Line {
    on: boolean
    x: [number, number]
    y: [number, number]
    z: [number, number]
}

const parseLine = (line: string): Line => {
    const parts = line.split(" ")
    const isOn = parts[0] == "on"
    const thing = parts[1].split(",")
    const [x, y, z] = thing.map(l => l.split("=")[1].split("..").map(n => parseInt(n)))
    return {
        on: isOn,
        x: [x[0], x[1]],
        y: [y[0], y[1]],
        z: [z[0], z[1]],
    }
}

const a = (input: string): string => {
    const lines = input.split("\n").map(parseLine).map(l => {
        const newL = l

        newL.x = rangeOverlap(l.x, [-50, 50])
        newL.y = rangeOverlap(l.y, [-50, 50])
        newL.z = rangeOverlap(l.z, [-50, 50])

        return newL
    }).filter(l => {
        return !(l.x[1] - l.x[0] < 1 || l.y[1] - l.y[0] < 1 || l.z[1] - l.z[0] < 1)
    })
    let total = 0
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i]
        if (!line.on) {
            continue
        }

        total += countWhereNoIntersections(line, lines.slice(i+1))
    }
    return total.toString()
};

const rangeOverlap = (a: [number, number], b: [number, number]): [number, number] => {
    if (a[1] <= b[0] || a[0] >= b[1]) {
        return [0,0]
    }
    return [Math.max(a[0], b[0]), Math.min(a[1], b[1])]
}

const countWhereNoIntersections = (line: Line, rest: Line[]): number => {
    let total = (line.x[1] - line.x[0] + 1)  * (line.y[1] - line.y[0] + 1) * (line.z[1] - line.z[0] + 1)
    const conflicts = []
    for (let other of rest) {
        const oX = rangeOverlap(line.x, other.x)
        const oY = rangeOverlap(line.y, other.y)
        const oZ = rangeOverlap(line.z, other.z)
        if (oX[1] - oX[0] < 1 || oY[1] - oY[0] < 1 || oZ[1] - oZ[0] < 1) {
            continue
        }
        const overlap = {
            on: other.on,
            x: oX,
            y: oY,
            z: oZ
        }
        conflicts.push(overlap)
    }
    for (let i = 0; i < conflicts.length; i++) {
        const conflictTotal = countWhereNoIntersections(conflicts[i], conflicts.slice(i+1))
        total -= conflictTotal
    }
    return total
}

const b = (input: string): string => {
    const lines = input.split("\n").map(parseLine)
    let total = BigInt(0)
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i]
        if (!line.on) {
            continue
        }

        total += BigInt(countWhereNoIntersections(line, lines.slice(i+1)))
    }
    return total.toString()
};

export default {
    a,
    b,
};
