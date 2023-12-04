package main

import (
	"log"
	"os"
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

var bag = map[string]int{
	"red":   12,
	"green": 13,
	"blue":  14,
}

func part1(data string) {
	lines := strings.Split(data, "\n")
	total := 0
	for _, line := range lines {
		parts := strings.Split(line, ": ")
		gameID, err := strconv.Atoi(strings.Split(parts[0], " ")[1])
		if err != nil {
			log.Fatalln(err)
		}

		subsets := strings.Split(parts[1], "; ")

		isPossible := true
		for _, subset := range subsets {
			colorStr := strings.Split(subset, ", ")
			for _, color := range colorStr {

				colorParts := strings.Split(color, " ")
				colorNumber, err := strconv.Atoi(colorParts[0])
				if err != nil {
					log.Fatalln(err)
				}
				if colorNumber > bag[colorParts[1]] {
					isPossible = false
					break
				}
			}
		}
		if isPossible {
			total += gameID
		}
	}
	log.Println(total)
}

func part2(data string) {
	lines := strings.Split(data, "\n")
	total := 0
	for _, line := range lines {
		parts := strings.Split(line, ": ")
		subsets := strings.Split(parts[1], "; ")
		minColors := make(map[string]int)
		for _, subset := range subsets {
			colorStr := strings.Split(subset, ", ")
			for _, color := range colorStr {

				colorParts := strings.Split(color, " ")
				colorNumber, err := strconv.Atoi(colorParts[0])
				if err != nil {
					log.Fatalln(err)
				}
				if colorNumber > minColors[colorParts[1]] {
					minColors[colorParts[1]] = colorNumber
				}
			}
		}
		power := minColors["red"] * minColors["green"] * minColors["blue"]
		total += power
	}
	log.Println(total)
}
