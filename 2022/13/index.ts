import * as R from 'ramda'

const isOrderCorrect = (l: any[] | number, r: any[] | number): number => {
    if (typeof(l) === "number" && typeof(r) === "number") {
        if (l === r) {
            return 2
        }
        return Number(l < r)
    }
    if (Array.isArray(l) && Array.isArray(r)) {
        for (let i = 0; i < Math.max(l.length, r.length); i++) {
            if (R.isNil(l[i])) {
                return 1
            }
            if (R.isNil(r[i])) {
                return 0
            }
            const order = isOrderCorrect(l[i], r[i])
            if (order === 2) {
                continue
            }
            return order
        }
        if (l.length === r.length) {
            return 2
        }
        return 1
    }
    if (Array.isArray(l)) {
        return isOrderCorrect(l, [r])
    }
    return isOrderCorrect([l], r)
}

const a = (input: string): string => {
    const pairs = input.split("\n\n")

    let total = 0
    for (let i = 0; i < pairs.length; i++) {
        const pair = pairs[i]
        const [l, r] = pair.split("\n").map(s => JSON.parse(s))
        const order = isOrderCorrect(l, r)
        if (order === 1) {
            total += i + 1
        }
    }
    return total.toString()
}

const b = (input: string): string => {
    const packets = input.replace(/\n\n/g, "\n").split("\n").map(s => JSON.parse(s))
    const divider1 = [[2]]
    const divider2 = [[6]]
    packets.push(divider1)
    packets.push(divider2)

    const sorted = packets.sort((a, b) => {
        return isOrderCorrect(a, b) === 1 ? -1 : 1
    }).map(p => JSON.stringify(p))

    return ((sorted.indexOf(JSON.stringify(divider1)) + 1) * (sorted.indexOf(JSON.stringify(divider2)) + 1)).toString()
}

export default {
    a,
    b
}