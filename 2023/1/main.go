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

	testBytes2, err := os.ReadFile("test2.txt")
	if err != nil {
		panic(err)
	}

	testData := string(testBytes)
	testData2 := string(testBytes2)

	inputBytes, err := os.ReadFile("input.txt")
	if err != nil {
		panic(err)
	}

	inputData := string(inputBytes)

	log.Println("Part 1")
	part1(testData)
	part1(inputData)

	log.Println("Part 2")
	part2(testData2)
	part2(inputData)

}

func part1(data string) {
	cleanData := regexp.MustCompile(`[^0-9\n]`).ReplaceAllString(data, "")
	lines := strings.Split(cleanData, "\n")
	total := 0
	for _, line := range lines {
		s := line
		if len(line) > 2 {
			s = string(line[0]) + string(line[len(line)-1])
		} else if len(line) == 1 {
			s = line + line
		}

		n, err := strconv.Atoi(s)
		if err != nil {
			log.Fatalln(err)
		}
		total += n
	}
	log.Println(total)
}

var numStrs = map[string]string{
	"one":   "1",
	"two":   "2",
	"three": "3",
	"four":  "4",
	"five":  "5",
	"six":   "6",
	"seven": "7",
	"eight": "8",
	"nine":  "9",
}

func part2(data string) {
	data = strings.ReplaceAll(data, "oneight", "oneeight")
	data = strings.ReplaceAll(data, "threeight", "threeeight")
	data = strings.ReplaceAll(data, "fiveight", "fiveeight")
	data = strings.ReplaceAll(data, "nineight", "nineeight")
	data = strings.ReplaceAll(data, "twone", "twoone")
	data = strings.ReplaceAll(data, "sevenine", "sevennine")
	data = strings.ReplaceAll(data, "eightwo", "eighttwo")
	lines := strings.Split(data, "\n")

	newLines := make([]string, len(lines))
	for i, line := range lines {
		for k, v := range numStrs {
			line = strings.ReplaceAll(line, k, v)
		}
		newLines[i] = line
	}
	part1(strings.Join(newLines, "\n"))
}
