import * as R from 'ramda'

const a = (input: string): string => {

    const lines = R.uniq(input.split("\n"))

    const pairs = lines.map(l => 
        R.aperture(2, l.split(" -> ").map(s => 
            s.split(",").map(s => parseInt(s))
        ))
    ).flat()

    const grid = []
    for (let y = 0; y < 500; y++) {
        grid[y] = []
        for (let x = 0; x < 1000; x++) {
            grid[y][x] = "."
        }
    }
    for (let [[x1,y1], [x2,y2]] of pairs) {
        if (x1 === x2) {
            for (let y = Math.min(y1, y2); y <= Math.max(y1,y2); y++) {
                grid[y][x1] = "#"
            }
        } else {
            for (let x = Math.min(x1, x2); x <= Math.max(x1,x2); x++) {
                grid[y1][x] = "#"
            }
        }
    }

    const maxY = Math.max(...pairs.map(([p1, p2]) => ([p1[1],[p2[1]]])).flat(2))
    let units = 0;
    while (true) {
        let sandX = 500
        let sandY = 0
        let inVoid = false;
        while (true) {
            if (sandY > maxY) {
                inVoid = true
                break;
            }
            if (grid[sandY + 1][sandX] === ".") {
                sandY++
                continue
            }

            if (grid[sandY + 1][sandX - 1] === ".") {
                sandY++
                sandX--
                continue
            }

            if (grid[sandY + 1][sandX + 1] === ".") {
                sandY++
                sandX++
                continue
            }

            // Sand should stay where it is!
            grid[sandY][sandX] = "o"
            units++;
            break
        }
        if (inVoid) {
            break
        }
    }

    return units.toString()
}

const b = (input: string): string => {
    const lines = R.uniq(input.split("\n"))

    const pairs = lines.map(l => 
        R.aperture(2, l.split(" -> ").map(s => 
            s.split(",").map(s => parseInt(s))
        ))
    ).flat()

    const grid = []
    for (let y = 0; y < 500; y++) {
        grid[y] = []
        for (let x = 0; x < 1000; x++) {
            grid[y][x] = "."
        }
    }
    for (let [[x1,y1], [x2,y2]] of pairs) {
        if (x1 === x2) {
            for (let y = Math.min(y1, y2); y <= Math.max(y1,y2); y++) {
                grid[y][x1] = "#"
            }
        } else {
            for (let x = Math.min(x1, x2); x <= Math.max(x1,x2); x++) {
                grid[y1][x] = "#"
            }
        }
    }

    const maxY = Math.max(...pairs.map(([p1, p2]) => ([p1[1],[p2[1]]])).flat(2))

    for (let x = 0; x < 1000; x++) {
        grid[maxY + 2][x] = "#"
    }

    let units = 0;
    while (true) {
        let sandX = 500
        let sandY = 0
        let atSource = false;
        while (true) {
            if (grid[sandY + 1][sandX] === ".") {
                sandY++
                continue
            }

            if (grid[sandY + 1][sandX - 1] === ".") {
                sandY++
                sandX--
                continue
            }

            if (grid[sandY + 1][sandX + 1] === ".") {
                sandY++
                sandX++
                continue
            }

            // Sand should stay where it is!
            grid[sandY][sandX] = "o"
            units++;
            if (sandX === 500 && sandY === 0) {
                atSource = true
            }
            break
        }
        if (atSource) {
            break
        }
    }

    for (let row of grid) {
        console.log(row.join(""))
    }

    return units.toString()
}

export default {
    a,
    b
}