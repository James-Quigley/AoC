import * as R from "ramda";

const costs = {
    A: 1,
    B: 10,
    C: 100,
    D: 1000
}

const homes = {
    A: 2,
    B: 4,
    C: 6,
    D: 8
}

const isWinner = (hallway): boolean => {
    for (let i = 2; i <= 8; i += 2) {
        if (hallway[i].includes(".") || R.uniq(hallway[i]).length != 1) {
            return false
        }
    }
    return true
}

const canGetHome = (hallway, i: number): boolean => {
    // If path is clear
    // And home is empty or contains the same value as hallway[i]
    const letter = hallway[i]
    return canMoveToPosition(hallway, i, homes[letter]) && (R.all(R.equals("."), hallway[homes[letter]]) || R.all(R.equals(letter), hallway[homes[letter]].filter(x => x != ".")))
}

const canMoveToPosition = (hallway, target: number, source: number): boolean => {
    const [min, max] = R.sort(R.ascend(R.identity), [target, source])
    const inBetween = hallway.slice(min + 1, max)
    const obstructed = inBetween.filter(x => !Array.isArray(x)).filter(x => x != ".").length > 0
    return !obstructed
}

const solve = (cache: {
    [key: string]: number
}, hallway, cost) => {
    if (isWinner(hallway)) {
        return cost
    }
    const cacheKey = R.flatten(hallway).join("")
    const cacheCost = cache[cacheKey] ?? Infinity
    if (cacheCost < cost) {
        return Infinity
    }
    cache[cacheKey] = cost
    for (let i = 0; i < hallway.length; i++) {
        const spot = hallway[i]
        if (typeof spot == "string" && spot != ".") {
            if (canGetHome(hallway, i)) {
                let length = 0
                for (let x = hallway[homes[spot]].length - 1; x >= 0; x--) {
                    length++
                    if (hallway[homes[spot]][x] == ".") {
                        hallway[homes[spot]][x] = spot
                        break
                    }
                }
                hallway[i] = "."
                return solve(cache, R.clone(hallway), cost + ((Math.abs(i - homes[spot]) + hallway[homes[spot]].length - length + 1) * costs[spot]))
            }
        }
    }

    const c = []
    for (let i = 2; i <= 8; i += 2) {
        if (!R.all(R.equals(R.invertObj(homes)[i]), hallway[i].filter(x => x != "."))) {
            let spot = null
            let length = 0
            for (let x = 0; x < hallway[i].length; x++) {
                length++
                if (hallway[i][x] != ".") {
                    spot = hallway[i][x]
                    break
                }
            }
            if (spot) {
                for (let x = 0; x < hallway.length; x++) {
                    if (hallway[x] == ".") {
                        if (canMoveToPosition(hallway, x, i)) {
                            const newHallway = R.clone(hallway)
                            newHallway[i][length - 1] = "."
                            newHallway[x] = spot
                            c.push(solve(cache, newHallway, cost + ((Math.abs(i - x) + length) * costs[spot])))
                        }
                    }
                }
            }
        }
    }
    if (!c.length) {
        return Infinity
    }
    return Math.min(...c)
}

const a = (input: string): string => {
    const amphipods = input.replace(/[#\.\s\n]*/g, "")
    const hallway = R.repeat(".", 11)
    const rooms = [[], [], [], []]
    for (let i = 0; i < amphipods.length; i++) {
        rooms[i % 4].push(amphipods[i])
    }
    for (let i = 0; i < rooms.length; i++) {
        // @ts-ignore let me do bad things
        hallway[i * 2 + 2] = rooms[i]
    }
    const cost = solve({}, hallway, 0)
    return cost.toString()
};

const b = (input: string): string => {
    const insert = [
        "#D#C#B#A#",
        "#D#B#A#C#"
    ]
    const amphipods = R.insertAll(3, insert, input.split("\n")).join("\n").replace(/[#\.\s\n]*/g, "")
    const hallway = R.repeat(".", 11)
    const rooms = [[], [], [], []]
    for (let i = 0; i < amphipods.length; i++) {
        rooms[i % 4].push(amphipods[i])
    }
    for (let i = 0; i < rooms.length; i++) {
        // @ts-ignore let me do bad things
        hallway[i * 2 + 2] = rooms[i]
    }
    const cost = solve({}, hallway, 0)
    return cost.toString()
};

export default {
    a,
    b,
};
