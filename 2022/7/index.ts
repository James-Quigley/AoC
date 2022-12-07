import * as R from 'ramda'

interface File {
    name: string
    size: number
    directory: Directory
}

interface Directory {
    name: string
    parent?: Directory,
    children: Directory[],
    files: File[]
}

const getAllDirSizes = (d: Directory, values: {
    [key: string]: number
}): {
    [key: string]: number
} => {
    let total = 0;
    for (let f of d.files) {
        total += f.size
    }
    for (let c of d.children) {
        values = getAllDirSizes(c, values)
        total += values[getDirFullName(c)]
    }
    values[getDirFullName(d)] = total
    return values
}

const getDirFullName = (d: Directory): string => {
    let name = d.name;
    let dir = d.parent
    while (dir) {
        name = dir.name + "/" + name
        dir = dir.parent
    }
    return name
}

const a = (input: string): string => {
    const lines = input.split("\n").slice(1)


    let currentDir: Directory = {
        name: "/",
        children: [],
        files: []
    }

    let root = currentDir

    for (let line of lines) {
        if (line === "$ ls") {
            // Do nothing?
            continue
        }
        if (line === "$ cd ..") {
            currentDir = currentDir.parent
            continue
        }
        if (line.startsWith("$ cd")) {
            const [_, __, dirName] = line.split(" ");
            currentDir = currentDir.children.find((d) => d.name === dirName)
            continue
        }
        if (line.startsWith("dir ")) {
            const d: Directory = {
                name: line.replace("dir ", ""),
                parent: currentDir,
                children: [],
                files: []
            };
            currentDir.children.push(d)
            continue
        }
        // Line must designate a file
        const [sizeStr, name] = line.split(" ")
        currentDir.files.push({
            name,
            directory: currentDir,
            size: parseInt(sizeStr),
        })
    }

    const sizes = getAllDirSizes(root, {})
    return R.sum(Object.values(sizes).filter(v => v <= 100000)).toString()
}

const b = (input: string): string => {
    const lines = input.split("\n").slice(1)


    let currentDir: Directory = {
        name: "/",
        children: [],
        files: []
    }

    let root = currentDir

    for (let line of lines) {
        if (line === "$ ls") {
            // Do nothing?
            continue
        }
        if (line === "$ cd ..") {
            currentDir = currentDir.parent
            continue
        }
        if (line.startsWith("$ cd")) {
            const [_, __, dirName] = line.split(" ");
            currentDir = currentDir.children.find((d) => d.name === dirName)
            continue
        }
        if (line.startsWith("dir ")) {
            const d: Directory = {
                name: line.replace("dir ", ""),
                parent: currentDir,
                children: [],
                files: []
            };
            currentDir.children.push(d)
            continue
        }
        // Line must designate a file
        const [sizeStr, name] = line.split(" ")
        currentDir.files.push({
            name,
            directory: currentDir,
            size: parseInt(sizeStr),
        })
    }

    const sizes = getAllDirSizes(root, {})
    const usedSpace = sizes["/"]
    const totalSpace = 70000000
    const neededSpace = 30000000
    const currentFreeSpace = totalSpace - usedSpace

    const minAmountToFree = neededSpace - currentFreeSpace


    return Object.values(sizes).sort((a, b) => a - b).filter(v => v >= minAmountToFree)[0].toString()
}

export default {
    a,
    b
}