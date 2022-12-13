import * as djikstrajs from 'dijkstrajs'

const buildGraph = (grid: string[][]) => {
    const graph = {}
    for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[r].length; c++) {
            const neighborCoords = [
                [r, c + 1],
                [r, c - 1],
                [r + 1, c],
                [r - 1, c],
            ].filter(([neighborR, neighborCol]) => {
                // If coordinates are valid
                if (neighborR < 0 || neighborR >= grid.length) {
                    return false
                }
                if (neighborCol < 0 || neighborCol >= grid[0].length) {
                    return false
                }
                return true
            }).filter(([neighborRow, neighborCol]) => {
                // If is valid based on alphabet rules
                if (grid[r][c] === "E") {
                    return true
                }
                if (grid[neighborRow][neighborCol] !== "E" && grid[neighborRow][neighborCol] <= grid[r][c]) {
                    return true
                }
                if ((grid[r][c] === "z" || grid[r][c] === "y") && grid[neighborRow][neighborCol] === "E") {
                    return true
                }
                if (String.fromCharCode(grid[r][c].charCodeAt(0) + 1) === grid[neighborRow][neighborCol]) {
                    return true
                }
            })
            graph[`${r},${c}`] = {}
            for (let [neighborR, neighborC] of neighborCoords) {
                graph[`${r},${c}`][`${neighborR},${neighborC}`] = 1
            }
        }
    }

    return graph
}

const a = (input: string): string => {
    const grid = input.split("\n").map(l => l.split(""))
    const startRow = grid.findIndex(l => l.includes("S"))
    const startCol = grid[startRow].findIndex(c => c === "S")
    const endRow = grid.findIndex(l => l.includes("E"))
    const endCol = grid[endRow].findIndex(c => c === "E")

    grid[startRow][startCol] = "a"

    const graph = buildGraph(grid)
    const p = djikstrajs.find_path(graph, `${startRow},${startCol}`, `${endRow},${endCol}`)

    return (p.length - 1).toString()
}

const b = (input: string): string => {
    const grid = input.split("\n").map(l => l.split(""))
    const endRow = grid.findIndex(l => l.includes("E"))
    const endCol = grid[endRow].findIndex(c => c === "E")
    
    let startRow = grid.findIndex(l => l.includes("S"))
    let startCol = grid[startRow].findIndex(c => c === "S")
    grid[startRow][startCol] = "a"

    const graph = buildGraph(grid)
    const paths = []
    for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[r].length; c++) {
            if (grid[r][c] === "a") {
                try {
                    paths.push(djikstrajs.find_path(graph, `${r},${c}`, `${endRow},${endCol}`).length - 1)
                } catch (e) {}
            }
        }
    }
    return Math.min(...paths).toString()

}

export default {
    a,
    b
}