import * as R from "ramda";

const getNeighborsBinaryNum = (grid: string[][], x: number, y: number, other: string): number => {
    let str = ""
    for (let i = x - 1; i <= x + 1; i++) {
        for (let j = y - 1; j <= y + 1; j++) {
            const s = grid?.[i]?.[j]
            str += s ?? other
        }
    }
    return parseInt(str.split("").map(s => Number(s == "#").toString()).join(""), 2)
}

const padGrid = (grid: string[][], char: string): string[][] => {
    return [R.repeat(char, grid[0].length + 2), ...grid.map(x => [char, ...x, char]), R.repeat(char, grid[0].length + 2)]
}

const a = (input: string): string => {
    const [enhancementAlg, gridStr] = input.split("\n\n")
    let grid = gridStr.split("\n").map(l => l.split(""))
    grid = padGrid(grid, ".")

    for (let i = 0; i < 2; i++) {
        const other = enhancementAlg[0] == "." ? "." : i % 2 == 0 ? enhancementAlg[enhancementAlg.length - 1] : enhancementAlg[0]
        let newGrid = R.clone(grid)
        for (let x = 0; x < grid.length; x++) {
            for (let y = 0; y < grid[0].length; y++) {
                const n = getNeighborsBinaryNum(grid, x, y, other)
                newGrid[x][y] = enhancementAlg.split("")[n]
            }
        }
        grid = newGrid
        const pad = enhancementAlg[0] == "." ? "." : i % 2 == 0 ? enhancementAlg[0] : enhancementAlg[enhancementAlg.length - 1]
        grid = padGrid(grid, pad)
    }
    return R.pipe(R.flatten, R.map((s) => Number(s == "#")), R.sum)(grid).toString()
};

const b = (input: string): string => {
    const [enhancementAlg, gridStr] = input.split("\n\n")
    let grid = gridStr.split("\n").map(l => l.split(""))
    grid = padGrid(grid, ".")

    for (let i = 0; i < 50; i++) {
        const other = enhancementAlg[0] == "." ? "." : i % 2 == 0 ? enhancementAlg[enhancementAlg.length - 1] : enhancementAlg[0]
        let newGrid = R.clone(grid)
        for (let x = 0; x < grid.length; x++) {
            for (let y = 0; y < grid[0].length; y++) {
                const n = getNeighborsBinaryNum(grid, x, y, other)
                newGrid[x][y] = enhancementAlg.split("")[n]
            }
        }
        grid = newGrid
        const pad = enhancementAlg[0] == "." ? "." : i % 2 == 0 ? enhancementAlg[0] : enhancementAlg[enhancementAlg.length - 1]
        grid = padGrid(grid, pad)
    }

    return R.pipe(R.flatten, R.map((s) => Number(s == "#")), R.sum)(grid).toString()
};

export default {
    a,
    b,
};
