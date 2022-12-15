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

    const beacons = []
    for (let line of lines) {
        const matches = /Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)/.exec(line)
        beacons.push(matches.slice(1, 5).map(s => parseInt(s)))
    }

    for (let y = 0; y <= maxCoord; y++) {
        const targetY = y

        let ranges = []
    
        for (let [sensorX, sensorY, beaconX, beaconY] of beacons) {
            const manDist = Math.abs(sensorX - beaconX) + Math.abs(sensorY - beaconY)
            if (sensorY - manDist < targetY && targetY < sensorY + manDist) {
                const eitherSideWidth = manDist - Math.abs(sensorY - targetY)
                ranges.push([sensorX - eitherSideWidth, sensorX + eitherSideWidth])
            }
            if (sensorY === targetY && sensorY >= 0 && sensorY <= maxCoord) {
                ranges.push([sensorX, sensorX + 1])
            }
            if (beaconY === targetY && beaconY >=0 && beaconY <= maxCoord) {
                ranges.push([beaconX, beaconX + 1])
            }
        }

        // If union of ranges covers 0 -> maxCoord (inclusive)
        // Then we can continue
        ranges = ranges.sort((a, b) => a[0] - b[0])

        const unioned = []
        for (const [start, end] of ranges) {
            if (unioned.length && R.last(unioned)[1] >= start - 1) {
                unioned[unioned.length - 1][1] = Math.max(R.last(unioned)[1], end)
            } else {
                unioned.push([start, end])
            }
        }

        let inRange = false
        let idx = -1
        for (let [start, end] of unioned) {
            if (!inRange) {
                if (end >= 0) {
                    inRange = true
                }
            }

            if (inRange) {
                if (start <= 0 && end >= maxCoord) {
                    break
                }
                idx = end + 1
                break
            }
        }
        if (idx !== -1) {
            return ((idx * 4000000) + targetY).toString()
        }
    }


    return "uh oh"
}

export default {
    a,
    b
}