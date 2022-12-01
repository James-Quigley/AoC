import * as R from 'ramda'


const a = (input: string): string => {
    return R.pipe(
        R.split("\n\n"),
        R.map(
            R.pipe(
                R.split("\n"),
                R.map(
                    parseInt
                ),
                R.sum
            )
        ),
        R.sort(
            R.descend(R.identity)
        )
    )(input)[0].toString()
}

const b = (input: string): string => {
    return R.pipe(
        R.split("\n\n"),
        R.map(
            R.pipe(
                R.split("\n"),
                R.map(
                    parseInt
                ),
                R.sum
            )
        ),
        // @ts-ignore pls
        R.sort(
            // @ts-ignore pls
            R.descend(R.identity)
        ),
        R.take(3),
        R.sum
    )(input).toString()
}

export default {
    a,
    b
}