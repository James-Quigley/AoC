import * as R from 'ramda'

const a = (input: string): string => {
    const lines = input.split("\n")

    const gridSize = 10000

    let headX = gridSize / 2
    let headY = gridSize / 2
    let tailX = headX
    let tailY = headY

    const tailVisited: {
        [key: string]: boolean
    } = {}

    tailVisited[`${tailX},${tailY}`] = true

    for (let line of lines) {
        const [dir, countStr] = line.split(" ")
        const count = parseInt(countStr)

        let headXMod = ["U", "D"].includes(dir) ? 0 :
            dir === "L" ? -1 : 1
        
        let headYMod = ["L", "R"].includes(dir) ? 0 :
        dir === "D" ? -1 : 1

        for (let i = 0; i < count; i++) {
            headX = headX + headXMod
            headY = headY + headYMod
            const xDiff = headX - tailX
            const yDiff = headY - tailY
            if (Math.abs(xDiff) > 1 || Math.abs(yDiff) > 1) {
                // Tail needs to move
                tailX += headXMod
                tailY += headYMod
                if (Math.abs(xDiff) === 1) {
                    tailX += xDiff
                }
                if (Math.abs(yDiff) === 1) {
                    tailY += yDiff
                }
            }
            tailVisited[`${tailX},${tailY}`] = true
        }
    }

    return Object.values(tailVisited).length.toString()
}

const printGrid = (gridSize: number, positions: number[][]) => {
    const grid = []
    for (let x = 0; x < gridSize; x++) {
        grid[x] = []
        for (let y = 0; y < gridSize; y++) {
            grid[x][y] = "."
        }
    }
    for (let i = 9; i >= 0; i--) {
        grid[positions[i][1]][positions[i][0]] = `${i}`
    }
    console.log(grid.map(l => l.join("")).reverse().join("\n"))
    console.log("\n\n")
}

const printVisited = (gridSize: number, visited: {[key: string]: boolean}) => {
    const grid = []
    for (let x = 0; x < gridSize; x++) {
        grid[x] = []
        for (let y = 0; y < gridSize; y++) {
            grid[x][y] = "."
        }
    }
    for (let k of Object.keys(visited)) {
        const [x, y] = k.split(",").map(s => parseInt(s))
        grid[y][x] = `X`
    }
    grid[gridSize/2][gridSize/2] = "s"
    console.log(grid.map(l => l.join("")).reverse().join("\n"))
    console.log("\n\n")
}

const b = (input: string): string => {
    const lines = input.split("\n")

    const gridSize = 50

    const positions = R.repeat([gridSize/2, gridSize/2], 10)

    const tailVisited: {
        [key: string]: boolean
    } = {}

    tailVisited[`${gridSize/2},${gridSize/2}`] = true

    for (let line of lines) {
        const [dir, countStr] = line.split(" ")
        const count = parseInt(countStr)

        let headXMod = ["U", "D"].includes(dir) ? 0 :
        dir === "L" ? -1 : 1
    
        let headYMod = ["L", "R"].includes(dir) ? 0 :
        dir === "D" ? -1 : 1

        for (let i = 0; i < count; i++) {
            // Adjust position of head based on dir
            positions[0] = [positions[0][0] + headXMod, positions[0][1] + headYMod]
            for (let j = 1; j < positions.length; j++) {
                // Adjust position of knot.
                // moved based on a diff with position of j - 1
                const xDiff = positions[j-1][0] - positions[j][0]
                const yDiff = positions[j-1][1] - positions[j][1]
                if (Math.abs(xDiff) > 1 || Math.abs(yDiff) > 1) {
                    // Knot needs to move
                    if (Math.abs(xDiff) > Math.abs(yDiff)) {
                        // Need to move one in xDiff dir
                        positions[j] = [positions[j][0] + (xDiff > 0 ? 1 : -1) , positions[j][1]]
                    } else if (xDiff === yDiff) {
                        positions[j] = [positions[j][0] + (xDiff > 0 ? 1 : -1) , positions[j][1] + (yDiff > 0 ? 1 : -1)]
                    } else {
                        // Need to move one in xDiff dir
                        positions[j] = [positions[j][0], positions[j][1] + (yDiff > 0 ? 1 : -1)]
                    }
                    if (Math.abs(xDiff) === 1) {
                        positions[j] = [positions[j][0] + xDiff, positions[j][1]]
                    }
                    if (Math.abs(yDiff) === 1) {
                        positions[j] = [positions[j][0], positions[j][1] + yDiff]
                    }
                }
            }
            tailVisited[`${positions[9][0]},${positions[9][1]}`] = true
            // printGrid(gridSize, positions)
        }
    }
    printVisited(gridSize, tailVisited)
    return Object.values(tailVisited).length.toString()
}

export default {
    a,
    b
}