package main

import (
	"fmt"
	"log"
	"os"
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
	count := 0
	dial := 50
	for _, line := range lines {
		dir := line[0]
		distStr := line[1:]
		var dist int
		_, err := fmt.Sscanf(distStr, "%d", &dist)
		if err != nil {
			log.Fatalln(err)
		}
		switch dir {
		case 'R':
			dial = (dial + dist) % 100
		case 'L':
			dial = (dial - dist + 100) % 100
		}
		if dial == 0 {
			count++
		}
	}
	log.Println(count)
}

func part2(data string) {
	lines := strings.Split(data, "\n")
	count := 0
	dial := 50
	for _, line := range lines {
		dir := line[0]
		distStr := line[1:]
		var dist int
		_, err := fmt.Sscanf(distStr, "%d", &dist)
		if err != nil {
			log.Fatalln(err)
		}
		switch dir {
		case 'R':
			for i := 0; i < dist; i++ {
				dial = (dial + 1) % 100
				if dial == 0 {
					count++
				}
			}
		case 'L':
			for i := 0; i < dist; i++ {
				dial = (dial - 1 + 100) % 100
				if dial == 0 {
					count++
				}
			}
		}
	}
	log.Println(count)
}
