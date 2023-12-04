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

func part1(data string) {
	lineLength := len(strings.Split(data, "\n")[0]) + 1

	re := regexp.MustCompile(`[^0-9]+`)

	symbolRe := regexp.MustCompile(`[^0-9\.\n]`)
	numStrings := re.Split(data, -1)
	idx := 0
	total := 0
	for _, numString := range numStrings {
		if numString == "" {
			continue
		}

		foundIdx := strings.Index(data[idx:], numString)
		realIdx := idx + foundIdx

		isPartNumber := false

		// prevLineStartIdx := realIdx - lineLength

		for i := realIdx - lineLength - 1; i < realIdx-lineLength+len(numString); i++ {
			if i >= 0 && i < len(data) && symbolRe.MatchString(string(data[i])) {
				isPartNumber = true
				break
			}
		}

		if realIdx-1 >= 0 && realIdx-1 < len(data) && symbolRe.MatchString(string(data[realIdx-1])) {
			isPartNumber = true
		}
		if realIdx+len(numString) >= 0 && realIdx+len(numString) < len(data) && symbolRe.MatchString(string(data[realIdx+len(numString)])) {
			isPartNumber = true
		}

		for i := realIdx + lineLength - 1; i < realIdx+lineLength+len(numString); i++ {
			if i >= 0 && i < len(data) && symbolRe.MatchString(string(data[i])) {
				isPartNumber = true
				break
			}
		}

		if isPartNumber {
			n, err := strconv.Atoi(numString)
			if err != nil {
				log.Fatalln(err)
			}
			total += n
		}

		idx = idx + foundIdx + len(numString)
	}
}

func part2(data string) {
}
