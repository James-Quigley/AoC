import * as R from 'ramda'

const a = (input: string): string => {
    const a = Array.from(input);
    const lastFour = a.slice(0, 3);
    for (let i = 3; i < input.length; i++) {
        lastFour.push(a[i])
        if (R.uniq(lastFour).length === 4) {
            return (i + 1).toString()
        }
        lastFour.shift()
    }
    return "fail"
}

const b = (input: string): string => {
    const a = Array.from(input);
    const lastFourteen = a.slice(0, 13);
    for (let i = 13; i < input.length; i++) {
        lastFourteen.push(a[i])
        if (R.uniq(lastFourteen).length === 14) {
            return (i + 1).toString()
        }
        lastFourteen.shift()
    }
    return "fail"
}

export default {
    a,
    b
}