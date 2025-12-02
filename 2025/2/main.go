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
	sum := 0
	ranges := strings.Split(data, ",")
	for _, r := range ranges {
		var start, end int
		_, err := fmt.Sscanf(r, "%d-%d", &start, &end)
		if err != nil {
			log.Fatalln(err)
		}
		// Need to iterate over all numbers in the range (inclusive)
		// Then somehow detect if the number contains the same pattern twice
		// It seems like this only happens for numbers with an even number of digits
		// Where the first half matches the second half
		for i := start; i <= end; i++ {
			s := fmt.Sprintf("%d", i)
			n := len(s)
			if n%2 != 0 {
				continue
			}
			firstHalf := s[:n/2]
			secondHalf := s[n/2:]
			if firstHalf == secondHalf {
				sum += i
			}
		}
	}
	log.Println(sum)
}

func part2(data string) {
	sum := 0
	ranges := strings.Split(data, ",")
	for _, r := range ranges {
		var start, end int
		_, err := fmt.Sscanf(r, "%d-%d", &start, &end)
		if err != nil {
			log.Fatalln(err)
		}
		// Now that assumption is wrong
		// The number can contain the pattern repeated any number of times
		// Need to iterate over all numbers in the range (inclusive)
		// Then for substring from length 1 to n/2, check if the string is made up of that substring repeated
		for i := start; i <= end; i++ {
			s := fmt.Sprintf("%d", i)
			n := len(s)
			found := false
			for l := 1; l <= n/2; l++ {
				if n%l != 0 {
					continue
				}
				substr := s[:l]
				repeated := true
				for j := l; j < n; j += l {
					if s[j:j+l] != substr {
						repeated = false
						break
					}
				}
				if repeated {
					found = true
					break
				}
			}
			if found {
				sum += i
			}
		}
	}
	log.Println(sum)
}
