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

func getDifferences(nums []int) []int {
	differences := make([]int, len(nums)-1)
	for i := 1; i < len(nums); i++ {
		differences[i-1] = nums[i] - nums[i-1]
	}
	return differences
}

func allTheSame(nums []int) bool {
	for i := 1; i < len(nums); i++ {
		if nums[i] != nums[i-1] {
			return false
		}
	}
	return true
}

func getNextNum(nums []int) int {
	if allTheSame(nums) {
		return nums[0]
	}
	return nums[len(nums)-1] + getNextNum(getDifferences(nums))
}

func getPrevNum(nums []int) int {
	if allTheSame(nums) {
		return nums[0]
	}
	return nums[0] - getPrevNum(getDifferences(nums))
}

func part1(data string) {
	lines := strings.Split(data, "\n")
	total := 0
	for _, line := range lines {
		numStrs := strings.Split(line, " ")
		nums := make([]int, len(numStrs))
		for i, numStr := range numStrs {
			n, err := strconv.Atoi(numStr)
			if err != nil {
				log.Fatalln(err)
			}
			nums[i] = n
		}
		total += getNextNum(nums)
	}
	log.Println(total)
}

func part2(data string) {
	lines := strings.Split(data, "\n")
	total := 0
	for _, line := range lines {
		numStrs := strings.Split(line, " ")
		nums := make([]int, len(numStrs))
		for i, numStr := range numStrs {
			n, err := strconv.Atoi(numStr)
			if err != nil {
				log.Fatalln(err)
			}
			nums[i] = n
		}
		total += getPrevNum(nums)
	}
	log.Println(total)
}
