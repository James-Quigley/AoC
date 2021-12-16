import * as R from 'ramda'

import { parseIntegerInput } from '../../utils'

const mapIncreasingTuples = R.pipe(
    R.map(
        R.apply(R.lt(R.__))
    ),
    R.map(Number)
)

const countIncreases: (arr: number[]) => number = R.pipe(
    R.aperture(2),
    mapIncreasingTuples,
    R.sum
)

const countThreecreases: (arr: number[]) => number = R.pipe(
    R.aperture(3),
    R.map(R.sum),
    countIncreases
)

const a = (input: string): string => {
    const data = parseIntegerInput(input)
    return countThreecreases(data).toString()
}

const b = (input: string): string => {
    const data = parseIntegerInput(input)
    return countIncreases(data).toString()
}

export default {
    a,
    b
}