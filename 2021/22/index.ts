import * as R from "ramda";

const createCube = (size: number): boolean[][][] => {
    let cube = []
    for (let x = 0; x <= size; x++) {
        cube[x] = []
        for (let y = 0; y <= size; y++) {
            cube[x][y] = []
            for (let z = 0; z <= size; z++) {
                cube[x][y][z] = false
            }
        }
    }
    return cube
}

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
    let cube = createCube(100)
    for (let line of input.split("\n")) {
        const {on, x, y, z} = parseLine(line)
        for (let i = x[0]; i <= x[1]; i++) {
            if (-50 > i || i > 50) {
                continue
            }
            for (let j = y[0]; j <= y[1]; j++) {
                if (-50 > j || j > 50) {
                    continue
                }
                for (let k = z[0]; k <= z[1]; k++) {
                    if (-50 > k || k > 50) {
                        continue
                    }
                    cube[i+50][j+50][k+50] = on
                }
            }
        }
    }
    return R.flatten(cube).filter(Boolean).length.toString()
};


const getLineNumbers = (line): number[] => R.flatten([line.x, line.y, line.z])

const maxDimensionRange = (input: string) => {
    const lineNumbers = input.split("\n").map(parseLine).map(getLineNumbers)
    const numbers = R.sort(R.ascend(R.identity), R.flatten(lineNumbers))
    return [numbers[0], numbers[numbers.length - 1]]
}

const b = (input: string): string => {
    const [min, max] = maxDimensionRange(input)
    let cube = createCube(max - min)
    for (let line of input.split("\n")) {
        const {on, x, y, z} = parseLine(line)
        for (let i = x[0]; i <= x[1]; i++) {
            for (let j = y[0]; j <= y[1]; j++) {
                for (let k = z[0]; k <= z[1]; k++) {
                    cube[i+max][j+max][k+max] = on
                }
            }
        }
    }
    return R.flatten(cube).filter(Boolean).length.toString()
};

export default {
    a,
    b,
};
