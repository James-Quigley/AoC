import * as R from 'ramda'

class Monkey {

    items: number[]
    operator: (n: number) => number
    divisibleBy: number
    trueThrow: number
    falseThrow: number

    inspections = 0

    constructor(s: string) {
        const [itemStr, operationStr, testStr, trueStr, falseStr] = s.split("\n").slice(1).map(s => s.trim())
        this.items = itemStr.replace("Starting items: ", "").replace(" ", "").split(",").map(s => parseInt(s))

        const o = operationStr.replace("Operation: new = old ", "").split(" ")
        
        if (o[1] === "old"){
            if (o[0] === "*") {
                this.operator = R.curry(Math.pow)(R.__, 2)
            } else {
                this.operator = x => x + x;
            }
        } else {
            if (o[0] === "*") {
                this.operator = R.multiply(parseInt(o[1]))
            } else {
                this.operator = R.add(parseInt(o[1]))
            }
        }


        this.divisibleBy = parseInt(testStr.replace("Test: divisible by ", ""))
        this.trueThrow = parseInt(trueStr.replace("If true: throw to monkey ", ""))
        this.falseThrow = parseInt(falseStr.replace("If false: throw to monkey ", ""))
    }

    checkItem(): number[]{
        this.inspections++
        let item = this.items.shift()
        item = this.operator(item)
        item = Math.floor(item / 3)
        const r = [item, 0]
        if (item % this.divisibleBy === 0) {
            r[1] = this.trueThrow
        } else {
            r[1] = this.falseThrow
        }
        return r
    }
}

class Monkey2 {

    items: number[]
    operator: (n: number) => number
    divisibleBy: number
    trueThrow: number
    falseThrow: number

    inspections = 0

    constructor(s: string) {
        const [itemStr, operationStr, testStr, trueStr, falseStr] = s.split("\n").slice(1).map(s => s.trim())
        this.items = itemStr.replace("Starting items: ", "").replace(" ", "").split(",").map(s => parseInt(s))

        const o = operationStr.replace("Operation: new = old ", "").split(" ")
        
        if (o[1] === "old"){
            if (o[0] === "*") {
                this.operator = R.curry(Math.pow)(R.__, 2)
            } else {
                this.operator = x => x + x;
            }
        } else {
            if (o[0] === "*") {
                this.operator = R.multiply(parseInt(o[1]))
            } else {
                this.operator = R.add(parseInt(o[1]))
            }
        }


        this.divisibleBy = parseInt(testStr.replace("Test: divisible by ", ""))
        this.trueThrow = parseInt(trueStr.replace("If true: throw to monkey ", ""))
        this.falseThrow = parseInt(falseStr.replace("If false: throw to monkey ", ""))
    }

    checkItem(): number[]{
        this.inspections++
        let item = this.items.shift()
        item = this.operator(item)
        // 2 * 3 * 5 * 7 * 11 * 13 * 17 * 19 = 9_699_690
        item = item % 9699690
        const r = [item, 0]
        if (item % this.divisibleBy === 0) {
            r[1] = this.trueThrow
        } else {
            r[1] = this.falseThrow
        }
        return r
    }
}

const a = (input: string): string => {
    const monkeys = input.split("\n\n").map(s => new Monkey(s))


    for (let i = 0; i < 20; i++) {
        for (let monkey of monkeys) {
            while (monkey.items.length) {
                const [item, to] = monkey.checkItem()
                monkeys[to].items.push(item)
            }
        }
    }

    const scores = monkeys.map(m => m.inspections).sort((a,b) => b-a)

    return (scores[0] * scores[1]).toString()
}

const b = (input: string): string => {
    const monkeys = input.split("\n\n").map(s => new Monkey2(s))


    for (let i = 0; i < 10000; i++) {
        for (let monkey of monkeys) {
            while (monkey.items.length) {
                const [item, to] = monkey.checkItem()
                monkeys[to].items.push(item)
            }
        }
    }

    const scores = monkeys.map(m => m.inspections).sort((a,b) => b-a)

    return (scores[0] * scores[1]).toString()
}

export default {
    a,
    b
}