import * as R from 'ramda'

const parse2DNumInput = (input: string): number[][] => {
    return input.split("\n").map(line => line.split("").map(s => parseInt(s)))
}

const isVisibleFromLeft = (grid: number[][], row: number, col: number): boolean => {
    if (col === 0) {
        return true
    }
    return R.all(R.gt(grid[row][col]), grid[row].slice(0, col))
}

const isVisibleFromRight = (grid: number[][], row: number, col: number): boolean => {
    if (col === grid[row].length - 1) {
        return true
    }
    return R.all(R.gt(grid[row][col]), grid[row].slice(col + 1))
}

const isVisibleFromTop = (grid: number[][], row: number, col: number): boolean => {
    if (row === 0) {
        return true
    }
    return R.all(R.gt(grid[row][col]), R.map(R.nth(col), grid).slice(0, row))
}

const isVisibleFromBottom = (grid: number[][], row: number, col: number): boolean => {
    if (row === grid.length - 1) {
        return true
    }
    return R.all(R.gt(grid[row][col]), R.map(R.nth(col), grid).slice(row + 1))
}

const isVisible = (grid: number[][], row: number, col: number): boolean => {
    return R.any(Boolean, R.ap(R.map(R.apply, [isVisibleFromLeft, isVisibleFromRight, isVisibleFromTop, isVisibleFromBottom]), [[grid, row, col]]))
}

const a = (input: string): string => {
    const grid = parse2DNumInput(input)
    const visGrid = grid.map((rowVal, row, g) => {
        return rowVal.map((n, col) => {
            return isVisible(g, row, col)
        })
    })
    return visGrid.flat().filter(Boolean).length.toString()
}

const leftScore = (grid: number[][], row: number, col: number): number => {
    if (col === 0) {
        return 0
    }
    return R.min(R.takeWhile(R.gt(grid[row][col]), grid[row].slice(0, col).reverse()).length + 1, grid[row].slice(0, col).length)
}

const rightScore = (grid: number[][], row: number, col: number): number => {
    if (col === grid[row].length - 1) {
        return 0
    }
    return R.min(R.takeWhile(R.gt(grid[row][col]), grid[row].slice(col + 1)).length + 1, grid[row].slice(col + 1).length)
}

const topScore = (grid: number[][], row: number, col: number): number => {
    if (row === 0) {
        return 0
    }
    return R.min(R.takeWhile(R.gt(grid[row][col]), R.map(R.nth(col), grid).slice(0, row).reverse()).length + 1, R.map(R.nth(col), grid).slice(0, row).length)
}

const bottomScore = (grid: number[][], row: number, col: number): number => {
    if (row === grid.length - 1) {
        return 0
    }
    return R.min(R.takeWhile(R.gt(grid[row][col]), R.map(R.nth(col), grid).slice(row + 1)).length + 1, R.map(R.nth(col), grid).slice(row + 1).length)
}

const scenicScore = (grid: number[][], row: number, col: number): number => {
    const scoreFns = [leftScore, rightScore, topScore, bottomScore]
    const scoreFuncs = R.map(R.apply, scoreFns)

    const t = R.ap(scoreFuncs, [[grid, row, col]])
    return R.product(t as number[])
}

const b = (input: string): string => {
    const grid = parse2DNumInput(input)
    const scoreGrid = grid.map((rowVal, row, g) => {
        return rowVal.map((n, col) => {
            return scenicScore(g, row, col)
        })
    })
    return scoreGrid.flat().sort((a, b) => b - a)[0].toString()
}

export default {
    a,
    b
}