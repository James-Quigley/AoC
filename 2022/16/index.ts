import * as R from 'ramda'

const getReleasedPressure = (valveData:{[key:string]: {
    rate: number,
    tunnels: string[],
    isOpen: boolean
}}): number => {
    return Object.values(valveData).reduce((acc, cur) => {
        return acc + (cur.isOpen ? cur.rate : 0)
    }, 0)
}

const openValve = (valveData: {[key:string]: {
    rate: number,
    tunnels: string[],
    isOpen: boolean
}}, location: string): {[key:string]: {
    rate: number,
    tunnels: string[],
    isOpen: boolean
}} => {
    const d = JSON.parse(JSON.stringify(valveData))
    d[location].isOpen = true
    return d
}

let totalChecks = 0

const doTheThing = (valveData: {[key:string]: {
    rate: number,
    tunnels: string[],
    isOpen: boolean
}}, results, location: string, minute: number, totalPressure: number) => {
    if (minute > 30) {
        return results
    }
    totalChecks++
    const pressure = getReleasedPressure(valveData)
    if (R.isNil(results[minute])) {
        results[minute] = {}
    }
    if (R.isNil(results[minute][location])) {
        results[minute][location] = new Set()
    }
    // Need to know what our previous total pressure was?
    const newTotalPressure = pressure + totalPressure
    results[minute][location].add(newTotalPressure)

    // if all non-zero valves are open, just sit tight
    if (Object.values(valveData).reduce((acc, cur) => acc && (cur.rate === 0 || cur.isOpen), true)) {
        for (let m = minute + 1; m <= 30; m++) {
            if (R.isNil(results[m])) {
                results[m] = {}
            }
            if (R.isNil(results[m][location])) {
                results[m][location] = new Set()
            }
            results[minute][location].add(newTotalPressure + (pressure * (m - minute)))
        }
    }

    if (valveData[location].rate && !valveData[location].isOpen) {
        doTheThing(openValve(valveData, location), results, location, minute + 1, newTotalPressure)
    }

    for (let v of valveData[location].tunnels) {
        doTheThing(valveData, results, v, minute + 1, newTotalPressure)
    }

    return results
}

const a = (input: string): string => {
    const stuff = input.split("\n").map(s => {
        const [name, rateStr, tunnelsStr] = /Valve ([A-Z]{2}) has flow rate=(\d+); tunnels? leads? to valves? (.+)/.exec(s).slice(1, 4)
        return {
            name,
            rate: parseInt(rateStr),
            tunnels: tunnelsStr.split(",").map(s => s.trim())
        }
    })

    const data = {}
    for (let {name, rate, tunnels} of stuff) {
        data[name] = {rate, tunnels, isOpen: false}
    }

    let results = {}
    results = doTheThing(data, results, "AA", 1, 0)

    console.log(results)
    return ""
}

const b = (input: string): string => {
    return ""
}

export default {
    a,
    b
}