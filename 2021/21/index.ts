import * as R from "ramda";

const a = (input: string): string => {
    let positions = input.split("\n").map(l => parseInt(l.split(":")[1].trim()) - 1)
    let rolls = 0
    let scores = [0, 0]

    let turn = 0

    let i = 3

    while (true) {
        let roll = [i, i - 1, i - 2].map(n => n <= 0 ? n + 100 : n)
        let move = R.sum(roll)
        positions[turn] = (positions[turn] + move) % 10
        scores[turn] += positions[turn] + 1
        turn = Number(!Boolean(turn))
        rolls += 3
        i = (i + 3) % 100
        if (R.sort(R.descend(R.identity), scores)[0] >= 1000) {
            break
        }
    }
    return (R.sort(R.descend(R.identity), scores)[1] * rolls).toString()
};

const sums = [
    3,
    4,
    4,
    4,
    5,
    5,
    5,
    5,
    5,
    5,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    7,
    7,
    7,
    7,
    7,
    7,
    8,
    8,
    8,
    9,

]

let stateToKey = (game) => {
    return `${game.positions[0]},${game.positions[1]},${game.scores[0]},${game.scores[1]},${game.turn}`
}

const keyToState = (key) => {
    const [p1Pos, p2Pos, p1Score, p2Score, turn] = key.split(",").map(s => parseInt(s))
    return {
        positions: [p1Pos, p2Pos],
        scores: [p1Score, p2Score],
        turn
    }
}

const b = (input: string): string => {
    let wins = [0,0]

    let universes: {
        [key: string]: number
    } = {}

    universes[stateToKey({
        positions: input.split("\n").map(l => parseInt(l.split(":")[1].trim()) - 1),
        scores: [0,0],
        turn: 0
    })] = 1

    while(Object.values(universes).filter(Boolean).length) {
        let newUniverse: {
            [key: string]: number
        } = {}
        for (let [key, count] of Object.entries(universes).filter(([key, v]) => Boolean(v))){
            let {positions, scores, turn} = keyToState(key)
            for (let sum of sums) {
                let newPos = R.clone(positions)
                let newScores = R.clone(scores)
                newPos[turn] = (newPos[turn] + sum) % 10
                newScores[turn] += newPos[turn] + 1

                if (newScores[turn] >= 21) {
                    wins[turn]+= count
                    continue
                }
                let newKey = stateToKey({
                    positions: newPos,
                    scores: newScores,
                    turn: Number(!Boolean(turn))
                })
                if (R.isNil(newUniverse[newKey])) {
                    newUniverse[newKey] = count
                } else {
                    newUniverse[newKey] += count
                }
            }
        }
        universes = newUniverse
    }
    return R.sort(R.descend(R.identity), wins)[0].toString()
};

export default {
    a,
    b,
};
