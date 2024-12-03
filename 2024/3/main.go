package main

import (
	"log"
	"os"
	"regexp"
	"strconv"
)

func main() {
	testBytes, err := os.ReadFile("test.txt")
	if err != nil {
		panic(err)
	}
	testData := string(testBytes)

	test2Bytes, err := os.ReadFile("test2.txt")
	if err != nil {
		panic(err)
	}
	test2Data := string(test2Bytes)

	inputBytes, err := os.ReadFile("input.txt")
	if err != nil {
		panic(err)
	}

	inputData := string(inputBytes)

	log.Println("Part 1")
	part1(testData)
	part1(inputData)

	log.Println("Part 2")
	part2(test2Data)
	part2(inputData)

}

func part1(data string) {
	matches := regexp.MustCompile(`mul\(\d{1,3},\d{1,3}\)`).FindAllString(data, -1)
	total := 0
	for _, match := range matches {
		nums := regexp.MustCompile(`\d{1,3}`).FindAllString(match, -1)
		n1, err := strconv.Atoi(nums[0])
		if err != nil {
			log.Fatalln(err)
		}
		n2, err := strconv.Atoi(nums[1])
		if err != nil {
			log.Fatalln(err)
		}
		total += n1 * n2
	}
	log.Println(total)
}

func part2(data string) {
	matches := regexp.MustCompile(`(mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\))`).FindAllString(data, -1)
	enabled := true
	total := 0
	for _, match := range matches {
		if match == "do()" {
			enabled = true
		} else if match == "don't()" {
			enabled = false
		} else if enabled {
			nums := regexp.MustCompile(`\d{1,3}`).FindAllString(match, -1)
			n1, err := strconv.Atoi(nums[0])
			if err != nil {
				log.Fatalln(err)
			}
			n2, err := strconv.Atoi(nums[1])
			if err != nil {
				log.Fatalln(err)
			}
			total += n1 * n2
		}
	}
	log.Println(total)
}
