import * as R from 'ramda'

export const parseIntegerInput = R.pipe(
    R.split("\n"),
    R.filter(Boolean),
    R.map(parseInt)
)