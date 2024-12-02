package main

import (
	"log"
	"math"
	"os"
	"slices"
	"sort"
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

func parseData(data string) ([]int, []int) {
	lines := strings.Split(data, "\n")
	left, right := make([]int, len(lines)), make([]int, len(lines))
	for i, line := range lines {
		parts := strings.Split(line, "   ")
		l, err := strconv.Atoi(parts[0])
		if err != nil {
			log.Fatalln(err)
		}
		r, err := strconv.Atoi(parts[1])
		if err != nil {
			log.Fatalln(err)
		}
		left[i] = l
		right[i] = r
	}
	sort.Ints(left)
	sort.Ints(right)
	return left, right
}

func part1(data string) {
	left, right := parseData(data)
	total := 0
	for i := 0; i < len(left); i++ {
		total += int(math.Abs(float64(left[i] - right[i])))
	}
	log.Println(total)
}

func part2(data string) {
	left, right := parseData(data)
	total := 0
	for i := 0; i < len(left); i++ {
		count := 0
		start := slices.Index(right, left[i])
		if start == -1 {
			continue
		}
		for right[start] == left[i] {
			count++
			start++
		}
		total += count * left[i]
	}
	log.Println(total)
}
