import * as R from "ramda";

type Packet = {
    version: number
    type: number
}

type LiteralValuePacket = Packet & {
    value: number
}

type OperatorType0Packet = Packet & {
    subpacketLength: number
    subpackets: Packet[]
}

type OperatorType1Packet = Packet & {
    subpacketCount: number
    subpackets: Packet[]
}

const hexToBinary = (hex: string): string => {
    let binary = parseInt(hex, 16).toString(2)
    let prepend = R.repeat("0", 4 - binary.length).join("")
    return prepend + binary
}

const parsePacket = (binary: string[], startIdx: number): [Packet, number] => {
    const version = parseInt(binary.slice(startIdx, startIdx + 3).join(""), 2)
    const type = parseInt(R.slice(startIdx + 3, startIdx + 6, binary).join(""), 2)
    if (type == 4) {
        let idx = startIdx + 6
        let num = []
        while (true) {
            const fiveBits = binary.slice(idx, idx + 5)
            const isMore = fiveBits[0] == "1"
            num.push(...fiveBits.slice(1))
            idx += 5
            if (!isMore) {
                break
            }
        }
        const value = parseInt(num.join(""), 2)
        return [{
            version,
            type,
            value
        } as LiteralValuePacket, idx]
    }
    const lengthTypeId = binary[startIdx + 6]
    if (lengthTypeId == "0") {
        const totalLength = parseInt(binary.slice(startIdx + 7, startIdx + 7 + 15).join(""), 2)
        let idx = startIdx + 7 + 15
        let end = idx + totalLength
        let subpackets = []
        while (idx < end) {
            const [packet, newIdx] = parsePacket(binary, idx)
            subpackets.push(packet)
            idx = newIdx
        }
        let packet: OperatorType0Packet = {
            version,
            type,
            subpacketLength: totalLength,
            subpackets
        }
        return [packet, idx]
    } else {
        const subpacketCount = parseInt(binary.slice(startIdx + 7, startIdx + 7 + 11).join(""), 2)
        let idx = startIdx + 7 + 11
        let subpackets = []
        for (let i = 0; i < subpacketCount; i++) {
            const [packet, newIdx] = parsePacket(binary, idx)
            subpackets.push(packet)
            idx = newIdx
        }
        let packet: OperatorType1Packet = {
            version,
            type,
            subpacketCount,
            subpackets
        }
        return [packet, idx]
    }
}

const a = (input: string): string => {
    for (let line of input.split("\n")){
        const binaryArr = R.pipe(R.split(""), R.map(hexToBinary), R.join(""), R.split(""))(line)
        const [packet, _] = parsePacket(binaryArr, 0)
    
        let total = 0;
        let packetQueue = [packet]
        while (packetQueue.length) {
            const current = packetQueue.shift()
            total += current.version
            // @ts-ignore
            packetQueue.push(...(current.subpackets ?? []))
        }
        console.log(total)
    }
    return ""
};

const evaluatePacketValue = (packet: LiteralValuePacket | OperatorType0Packet | OperatorType1Packet):number => {
    if ("value" in packet) {
        return (packet as LiteralValuePacket).value
    }
    switch(packet.type) {
        case 0:
            return R.sum(R.map(evaluatePacketValue, packet.subpackets))
        case 1:
            return R.product(R.map(evaluatePacketValue, packet.subpackets))
        case 2:
            return Math.min(...R.map(evaluatePacketValue, packet.subpackets))
        case 3:
            return Math.max(...R.map(evaluatePacketValue, packet.subpackets))
        case 5:
            // @ts-ignore
            return evaluatePacketValue(packet.subpackets[0]) > evaluatePacketValue(packet.subpackets[1]) ? 1: 0
        case 6:
            // @ts-ignore
            return evaluatePacketValue(packet.subpackets[0]) < evaluatePacketValue(packet.subpackets[1]) ? 1: 0
        case 7:
            // @ts-ignore
            return evaluatePacketValue(packet.subpackets[0]) == evaluatePacketValue(packet.subpackets[1]) ? 1: 0
        default:
            console.log("FAIL! Packet type", packet.type, packet)
            process.exit(1)
    }
}

const b = (input: string): string => {
    const lines = input.split("\n")
    for (let line of input.split("\n")){
        const binaryArr = R.pipe(R.split(""), R.map(hexToBinary), R.join(""), R.split(""))(line)
        const [packet, _] = parsePacket(binaryArr, 0)

        // @ts-ignore
        console.log(evaluatePacketValue(packet))

    }
    return ""
};

export default {
    a,
    b,
};
