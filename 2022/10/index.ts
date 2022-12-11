import * as R from 'ramda'

const a = (input: string): string => {
    const lines = input.split("\n")
    let cycleCount = 1
    let registerVal = 1
    const vals = []
    for (let line of lines) {
        cycleCount++
        if ((cycleCount - 20) % 40 === 0) {
            vals.push(registerVal * cycleCount)
        }
        if (line.startsWith("noop")) {
            continue
        }
        cycleCount++
        const v = parseInt(line.split(" ")[1])
        registerVal += v

        if ((cycleCount - 20) % 40 === 0) {
            vals.push(registerVal * cycleCount)
        }
    }
    return R.sum(vals).toString()
}

const b = (input: string): string => {
    const lines = input.split("\n")
    let cycleCount = 1
    let registerVal = 1
    const pixelArr = []
    for (let line of lines) {
        if ([registerVal - 1, registerVal, registerVal + 1].includes((cycleCount - 1) % 40)) {
            pixelArr.push("#")
        } else {
            pixelArr.push(".")
        }
        cycleCount++
        if (line.startsWith("noop")) {
            continue
        }
        
        if ([registerVal - 1, registerVal, registerVal + 1].includes((cycleCount - 1) % 40)) {
            pixelArr.push("#")
        } else {
            pixelArr.push(".")
        }
        cycleCount++

        const v = parseInt(line.split(" ")[1])
        registerVal += v
    }
    const stuff = []
    for (let i = 0; i < pixelArr.length; i++) {
        if (i % 40 === 0) {
            stuff.push("\n")
        }
        stuff.push(pixelArr[i])
    }
    return stuff.join("")
}

export default {
    a,
    b
}