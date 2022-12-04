import * as R from 'ramda'

const isTotalOverlapping = ([a, b]: string[]): boolean => {
    const [aStart, aEnd] = a.split("-").map((s) => parseInt(s))
    const [bStart, bEnd] = b.split("-").map((s) => parseInt(s))

    if (aStart <= bStart && aEnd >= bEnd) {
        return true
    }
    if (bStart <= aStart && bEnd >= aEnd) {
        return true
    }
    return false
}

const isPartialOverlapping = ([a, b]: string[]): boolean => {
    const [aStart, aEnd] = a.split("-").map((s) => parseInt(s))
    const [bStart, bEnd] = b.split("-").map((s) => parseInt(s))

    if (aStart <= bStart && aEnd >= bStart) {
        return true
    }
    if (bStart <= aStart && bEnd >= aStart) {
        return true
    }
    return false
}

const a = (input: string): string => {
    return R.pipe(
        R.split("\n"),
        R.map(
            R.pipe(
                R.split(","),
                isTotalOverlapping
            )
        ),
        R.flatten,
        R.count(Boolean)
    )(input).toString()
}

const b = (input: string): string => {
    return R.pipe(
        R.split("\n"),
        R.map(
            R.pipe(
                R.split(","),
                isPartialOverlapping
            )
        ),
        R.flatten,
        R.count(Boolean)
    )(input).toString()
}

export default {
    a,
    b
}