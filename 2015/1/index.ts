import * as R from 'ramda'

const a = (input: string): string => {
    const counts = R.pipe(R.split(""), R.countBy(R.identity))(input)
    return (counts["("] - counts[")"]).toString()
}

const b = (input: string): string => {
    let position = 0
    for (let i = 0; i < input.length; i++) {
        position += input[i] == "(" ? 1 : -1
        if (position < 0) {
            return (i + 1).toString()
        }
    }
}

export default {
    a,
    b
}