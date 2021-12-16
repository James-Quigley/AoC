import * as R from 'ramda'

const a = (input: string): string => {
    const lines = input.split("\n")
    let total = 0
    for (let line of lines) {
        const sideAreas = R.pipe(
            R.split("x"),
            R.map(parseInt),
            (a) => [a, R.remove(1, 1, a)],
            R.map(R.aperture(2)),
            R.unnest,
            R.map(
                R.product
            ),
            R.sort(
                R.ascend(R.identity)
            )
        )(line)
        total += R.pipe(R.map(R.multiply(2)), R.sum, R.add(sideAreas[0]))(sideAreas)
    }
    return total.toString()
}

const b = (input: string): string => {
    const lines = input.split("\n")
    let total = 0
    for (let line of lines) {
        const sideLengths = R.pipe(
            R.split("x"),
            R.map(parseInt),
            R.sort(
                R.ascend(R.identity)
            )
        )(line)

        total += R.product(sideLengths) + (R.sum(R.take(2, sideLengths)) * 2)
    }
    return total.toString()
}

export default {
    a,
    b
}