package main

import (
	"fmt"
	"log"
	"math"
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
	sum := 0
	banks := strings.Split(data, "\n")
	for _, bank := range banks {
		batteryStrs := strings.Split(bank, "")
		batteries := convertStringArrayToIntArray(batteryStrs)
		largestIdx := findLargestIdxInArr(batteries[:len(batteries)-1])
		secondLargestIdx := largestIdx + 1 + findLargestIdxInArr(batteries[largestIdx+1:])
		sum += ((batteries[largestIdx] * 10) + batteries[secondLargestIdx])
	}
	log.Println(sum)
}

func convertStringArrayToIntArray(strs []string) []int {
	ints := make([]int, len(strs))
	for i := 0; i < len(strs); i++ {
		var val int
		_, err := fmt.Sscanf(strs[i], "%d", &val)
		if err != nil {
			log.Fatalln(err)
		}
		ints[i] = val
	}
	return ints
}

func findLargestIdxInArr(arr []int) int {
	largestIndex := 0
	largestValue := 0
	for i := 0; i < len(arr); i++ {
		if arr[i] > largestValue {
			largestValue = arr[i]
			largestIndex = i
		}
	}
	return largestIndex
}

func part2(data string) {
	sum := 0
	joltageLength := 12
	banks := strings.Split(data, "\n")
	for _, bank := range banks {
		batteryStrs := strings.Split(bank, "")
		batteries := convertStringArrayToIntArray(batteryStrs)
		indexesToTurnOn := make([]int, 0)
		for j := joltageLength - 1; j >= 0; j-- {
			currentLargestIdx := -1
			if len(indexesToTurnOn) > 0 {
				currentLargestIdx = indexesToTurnOn[len(indexesToTurnOn)-1]
			}
			idx := findLargestIdxInArr(batteries[currentLargestIdx+1:len(batteries)-j]) + currentLargestIdx + 1
			indexesToTurnOn = append(indexesToTurnOn, idx)
		}
		batterySum := 0
		for i, idx := range indexesToTurnOn {
			batterySum += int(float64(batteries[idx]) * math.Pow(10, float64(joltageLength-1-i)))
		}
		sum += batterySum
	}
	log.Println(sum)
}
