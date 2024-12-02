package main

import (
	"log"
	"os"
	"slices"
	"strconv"
	"strings"
)

func main() {
	testBytes, err := os.ReadFile("test.txt")
	if err != nil {
		panic(err)
	}
	testData := string(testBytes)

	inputBytes, err := os.ReadFile("input.txt")
	if err != nil {
		panic(err)
	}

	inputData := string(inputBytes)

	log.Println("Part 1")
	part1(testData)
	part1(inputData)

	log.Println("Part 2")
	part2(testData)
	part2(inputData)

}

func parseData(data string) [][]int {
	lines := strings.Split(data, "\n")
	grid := make([][]int, len(lines))
	for row, line := range lines {
		parts := strings.Split(line, " ")
		nums := make([]int, len(parts))
		for i, part := range parts {
			nums[i], _ = strconv.Atoi(part)
		}
		grid[row] = nums
	}
	return grid
}

func getDiffs(row []int) []int {
	diffs := make([]int, len(row)-1)
	for i := 1; i < len(row); i++ {
		diffs[i-1] = row[i] - row[i-1]
	}
	return diffs
}

func all(s []int, f func(int) bool) bool {
	for _, v := range s {
		if !f(v) {
			return false
		}
	}
	return true
}

func part1(data string) {
	count := 0
	grid := parseData(data)
	for _, row := range grid {
		diffs := getDiffs(row)
		if (all(diffs, func(v int) bool { return v > 0 }) || all(diffs, func(v int) bool { return v < 0 })) &&
			(all(diffs, func(v int) bool { return 1 <= v && v <= 3 }) || all(diffs, func(v int) bool { return -3 <= v && v <= -1 })) {
			count++
		}

	}
	log.Println(count)
}

func part2(data string) {
	count := 0
	grid := parseData(data)
	for _, row := range grid {
		for i := 0; i < len(row); i++ {
			s := make([]int, len(row))
			copy(s, row)
			s = slices.Delete(s, i, i+1)
			diffs := getDiffs(s)
			if (all(diffs, func(v int) bool { return v > 0 }) || all(diffs, func(v int) bool { return v < 0 })) &&
				(all(diffs, func(v int) bool { return 1 <= v && v <= 3 }) || all(diffs, func(v int) bool { return -3 <= v && v <= -1 })) {
				count++
				break
			}
		}
	}
	log.Println(count)
}
