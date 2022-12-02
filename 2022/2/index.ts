import * as R from 'ramda'

type Move = 'A' | 'B' | 'C'

interface Choice {
    move: Move,
    next?: Choice,
    prev?: Choice
}
const Rock: Choice = {
    move: 'A'
}

const Paper: Choice = {
    move: 'B'
}
const Scissors: Choice = {
    move: 'C'
}

Rock.next = Paper
Rock.prev = Scissors
Paper.next = Scissors
Paper.prev = Rock
Scissors.next = Rock
Scissors.prev = Paper

const choiceMap = {
    A: Rock,
    B: Paper,
    C: Scissors
}

const moveScore = (s: Move): number => {
    switch (s) {
        case 'A':
            return 1
        case 'B':
            return 2
        case "C":
            return 3
    }
}

const vsScore = (myMove: Move, elfMove: Move) => {
    if (myMove == elfMove) {
        return 3
    }
    if ((myMove == 'A' && elfMove == "B") || (myMove == "B" && elfMove == "C") || (myMove == "C" && elfMove == "A")) {
        return 0
    }
    return 6
}

const getScore = (round: [Move, Move]): number => {
    return moveScore(round[1]) + vsScore(round[1], round[0])
}

const doReplace = (s: string): string => {
    return s.replace(/X/g, "A").replace(/Y/g, "B").replace(/Z/g, "C") 
}

const getMove = (round: [Move, 'X' | 'Y'| 'Z']): Move => {
    if (round[1] == "Y") {
        return round[0]
    }
    return round[1] == "X" ?
        choiceMap[round[0]].prev.move :
        choiceMap[round[0]].next.move
}


const a = (input: string): string => {
    return R.pipe(
        doReplace,
        R.split("\n"),
        R.map(
            R.pipe(
                R.split(" "),
                getScore
            )
        ),
        R.sum
    )(input).toString()
}

const b = (input: string): string => {
    return R.pipe(
        R.split("\n"),
        R.map(
            R.pipe(
                R.split(" "),
                ([head, tail]: any) => ([head, getMove([head, tail])]),
                getScore
            )
        ),
        R.sum
    )(input).toString()
}

export default {
    a,
    b
}