import * as R from 'ramda'

let groupByN = R.curry((n: number, data: string[][]): string[][][] => {
    let result = [];
    for (let i = 0; i < data.length; i += n) result.push(data.slice(i, i + n));
    return result;
  });

const a = (input: string): string => {
    return R.pipe(
        R.split("\n"),
        R.map(
            R.pipe(
                (line) => {
                    const a = Array.from(line)
                    return R.intersection(
                        R.take(a.length / 2, a),
                        R.drop(a.length / 2, a)
                    )[0].charCodeAt(0) - 96
                },
                R.ifElse(
                    R.gt(0),
                    R.add(58),
                    R.identity,
                )
            )
        ),
        R.sum
    )(input).toString()
}

const b = (input: string): string => {
    return R.pipe(
        R.split("\n"),
        R.map(
            Array.from
        ) as (a: string[]) => string[][],
        groupByN(3),
        // @ts-ignore
        R.map(
            R.pipe(
                // @ts-ignore
                R.aperture(2),
                R.map(
                    R.apply(R.intersection)
                ),
                R.apply(R.intersection)
            )
        ),
        R.flatten,
        R.map(
            R.pipe(
                (c: string) => c.charCodeAt(0),
                R.subtract(R.__, 96),
                R.ifElse(
                    R.gt(0),
                    R.add(58),
                    R.identity,
                )
            )
        ),
        R.sum
    )(input).toString()
}

export default {
    a,
    b
}