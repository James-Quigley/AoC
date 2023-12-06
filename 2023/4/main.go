package main

import (
	"log"
	"math"
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
	lines := strings.Split(data, "\n")
	total := 0
	for _, line := range lines {
		lineValuePower := -1

		lineParts := strings.Split(line, ": ")

		numParts := strings.Split(lineParts[1], " | ")
		winningNumStrs := strings.Split(numParts[0], " ")
		winningNums := make(map[int]bool)
		for _, winningNumStr := range winningNumStrs {
			if winningNumStr == "" {
				continue
			}
			winningNum, err := strconv.Atoi(winningNumStr)
			if err != nil {
				log.Fatalln(err)
			}
			winningNums[winningNum] = true
		}
		myNumStrs := strings.Split(numParts[1], " ")
		for _, myNumStr := range myNumStrs {
			if myNumStr == "" {
				continue
			}
			myNum, err := strconv.Atoi(myNumStr)
			if err != nil {
				log.Fatalln(err)
			}
			if winningNums[myNum] {
				lineValuePower++
			}
		}

		if lineValuePower >= 0 {
			total += int(math.Pow(float64(2), float64(lineValuePower)))
		}
	}
	log.Println(total)
}

type Card struct {
	ID              int
	WinningNumCount int
}

var spaceSplit = regexp.MustCompile(`\s+`)

func ParseCard(s string) Card {
	card := Card{}
	parts := strings.Split(s, ": ")
	id, err := strconv.Atoi(spaceSplit.Split(parts[0], -1)[1])
	if err != nil {
		log.Fatalln(err)
	}
	card.ID = id

	numParts := strings.Split(parts[1], " | ")
	winningNumStrs := strings.Split(numParts[0], " ")
	winningNums := make(map[int]bool)
	for _, winningNumStr := range winningNumStrs {
		if winningNumStr == "" {
			continue
		}
		winningNum, err := strconv.Atoi(winningNumStr)
		if err != nil {
			log.Fatalln(err)
		}
		winningNums[winningNum] = true
	}
	myNumStrs := strings.Split(numParts[1], " ")
	for _, myNumStr := range myNumStrs {
		if myNumStr == "" {
			continue
		}
		myNum, err := strconv.Atoi(myNumStr)
		if err != nil {
			log.Fatalln(err)
		}
		if winningNums[myNum] {
			card.WinningNumCount++
		}
	}
	return card
}

func part2(data string) {
	lines := strings.Split(data, "\n")
	total := 0

	cards := make(map[int][]Card)
	for i, line := range lines {
		card := ParseCard(line)
		cards[i+1] = append(cards[i+1], card)
	}

	for i := 1; i <= len(cards); i++ {
		for {
			if len(cards[i]) == 0 {
				break
			}
			card := cards[i][0]
			total++
			if len(cards[i]) == 1 {
				cards[i] = make([]Card, 0)
			} else {
				cards[i] = cards[i][1:]
			}

			for j := i + 1; j < i+1+card.WinningNumCount; j++ {
				cards[j] = append(cards[j], cards[j][0])
			}
		}
	}
	log.Println(total)
}
