package main

import (
	"log"
	"os"
	"regexp"
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

var whiteSpaceRegex = regexp.MustCompile(`\s+`)

var otherRegex = regexp.MustCompile(`.+:\s+`)

func part1(data string) {
	parts := strings.Split(data, "\n")
	timesStr := whiteSpaceRegex.Split(otherRegex.Split(parts[0], -1)[1], -1)
	distancesStr := whiteSpaceRegex.Split(otherRegex.Split(parts[1], -1)[1], -1)

	times := make([]int, len(timesStr))
	distances := make([]int, len(distancesStr))

	for i, t := range timesStr {
		n, err := strconv.Atoi(t)
		if err != nil {
			log.Fatalln(err)
		}
		times[i] = n
	}
	for i, d := range distancesStr {
		n, err := strconv.Atoi(d)
		if err != nil {
			log.Fatalln(err)
		}
		distances[i] = n
	}

	product := 1
	for i := 0; i < len(times); i++ {
		winningWays := 0
		for x := 1; x < times[i]; x++ {

			distance := x * (times[i] - x)
			if distance > distances[i] {
				winningWays++
			}
		}
		product *= winningWays
	}
	log.Println(product)

}

func part2(data string) {
	parts := strings.Split(data, "\n")
	timesStr := whiteSpaceRegex.Split(otherRegex.Split(parts[0], -1)[1], -1)
	distancesStr := whiteSpaceRegex.Split(otherRegex.Split(parts[1], -1)[1], -1)

	timeStr := strings.Join(timesStr, "")
	distanceStr := strings.Join(distancesStr, "")

	time, err := strconv.Atoi(timeStr)
	if err != nil {
		log.Fatalln(err)
	}
	distance, err := strconv.Atoi(distanceStr)
	if err != nil {
		log.Fatalln(err)
	}

	winningWays := 0
	for x := 1; x < time; x++ {

		d := x * (time - x)
		if d > distance {
			winningWays++
		}
	}

	log.Println(winningWays)
}
