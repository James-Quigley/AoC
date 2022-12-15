import * as R from 'ramda'

const a = (input: string): string => {
    const lines = input.split("\n")
    const isTest = lines[0] === "Sensor at x=2, y=18: closest beacon is at x=-2, y=15"

    const targetY = isTest ? 10 : 2000000

    const target = {}

    for (let line of lines) {
        const matches = /Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)/.exec(line)
        const [sensorX, sensorY, beaconX, beaconY] = matches.slice(1, 5).map(s => parseInt(s))
        const manDist = Math.abs(sensorX - beaconX) + Math.abs(sensorY - beaconY)
        if (sensorY - manDist < targetY && targetY < sensorY + manDist) {
            const eitherSideWidth = manDist - Math.abs(sensorY - targetY)
            for (let x = sensorX - eitherSideWidth; x <= sensorX + eitherSideWidth; x++) {
                target[x] = "#"
            }
        }
        if (sensorY === targetY) {
            target[sensorX] = "S"
        }
        if (beaconY === targetY) {
            target[beaconX] = "B"
        }
    }

    return Object.values(target).filter(s => s !== "B").length.toString()
}

const b = (input: string): string => {
    const lines = input.split("\n")
    const isTest = lines[0] === "Sensor at x=2, y=18: closest beacon is at x=-2, y=15"

    const maxCoord = isTest ? 20 : 4000000

    const target: {
        [key: string]: Set<number>
    } = {}

    for (let line of lines) {
        const matches = /Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)/.exec(line)
        const [sensorX, sensorY, beaconX, beaconY] = matches.slice(1, 5).map(s => parseInt(s))
        const manDist = Math.abs(sensorX - beaconX) + Math.abs(sensorY - beaconY)

        for (let y = sensorY - manDist; y <= sensorY + manDist; y++) {
            if (R.isNil(target[y])) {
                target[y] = new Set()
            }
            const eitherSideWidth = manDist - Math.abs(sensorY - y)
            for (let x = sensorX - eitherSideWidth; x <= sensorX + eitherSideWidth; x++) {
                if (x >=0 && x <= maxCoord) {
                    target[y].add(x)
                }
            }
        }
        if (sensorY >= 0 && sensorX >=0 && sensorY <= maxCoord && sensorX <= maxCoord) {
            target[sensorY].add(sensorX)
        }
        if (beaconY >= 0 && beaconX >=0 && beaconY <= maxCoord && beaconX <= maxCoord) {
            target[beaconY].add(beaconX)
        }
    }

    return "uh oh"
}

const b2 = (input: string): string => {
    const lines = input.split("\n")
    const isTest = lines[0] === "Sensor at x=2, y=18: closest beacon is at x=-2, y=15"

    const maxCoord = isTest ? 20 : 4000000

    for (let y = 0; y <= maxCoord; y++) {
        const targetY = y

        const target = {}
    
        for (let line of lines) {
            const matches = /Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)/.exec(line)
            const [sensorX, sensorY, beaconX, beaconY] = matches.slice(1, 5).map(s => parseInt(s))
            const manDist = Math.abs(sensorX - beaconX) + Math.abs(sensorY - beaconY)
            if (sensorY - manDist < targetY && targetY < sensorY + manDist) {
                const eitherSideWidth = manDist - Math.abs(sensorY - targetY)
                for (let x = sensorX - eitherSideWidth; x <= sensorX + eitherSideWidth; x++) {
                    if (x >=0 && x <= maxCoord) {
                        target[x] = "#"
                    }
                }
            }
            if (sensorY === targetY && sensorY >= 0 && sensorY <= maxCoord) {
                target[sensorX] = "S"
            }
            if (beaconY === targetY && beaconY >=0 && beaconY <= maxCoord) {
                target[beaconX] = "B"
            }
        }

        const diff = R.difference(
            R.range(0, maxCoord + 1),
            Object.keys(target).map(s => parseInt(s))
        )
        if (diff.length) {
            return ((diff[0] * 4000000) + targetY).toString()
        }
    }


    return "uh oh"
}

export default {
    a,
    b
}