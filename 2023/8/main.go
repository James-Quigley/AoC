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
	test2Bytes, err := os.ReadFile("test2.txt")
	if err != nil {
		panic(err)
	}

	test2Data := string(test2Bytes)
	part2TestBytes, err := os.ReadFile("part2Test.txt")
	if err != nil {
		panic(err)
	}

	part2TestData := string(part2TestBytes)

	inputBytes, err := os.ReadFile("input.txt")
	if err != nil {
		panic(err)
	}

	inputData := string(inputBytes)

	log.Println("Part 1")
	part1(testData)
	part1(test2Data)
	part1(inputData)

	log.Println("Part 2")
	part2(part2TestData)
	part2(inputData)

}

var randomCharRegex = regexp.MustCompile(`[,()]`)

func part1(data string) {
	parts := strings.Split(data, "\n\n")

	ruleStr := parts[0]

	m := make(map[string][]string)
	for _, line := range strings.Split(parts[1], "\n") {
		p := strings.Split(line, " = ")
		m[p[0]] = strings.Split(string(randomCharRegex.ReplaceAll([]byte(p[1]), []byte(""))), " ")
	}

	location := "AAA"
	steps := 0
	for location != "ZZZ" {
		rule := ruleStr[steps%len(ruleStr)]
		newLocation := 0
		if string(rule) == "R" {
			newLocation++
		}
		location = m[location][newLocation]
		steps++
	}
	log.Println(steps)
}

func allHaveSuffix(nodes []string, suffix string) bool {
	for _, node := range nodes {
		if !strings.HasSuffix(node, suffix) {
			return false
		}
	}
	return true
}

func GCD(a, b int) int {
	for b != 0 {
		t := b
		b = a % b
		a = t
	}
	return a
}

func LCM(a, b int, integers ...int) int {
	result := a * b / GCD(a, b)

	for i := 0; i < len(integers); i++ {
		result = LCM(result, integers[i])
	}

	return result
}

func part2(data string) {
	parts := strings.Split(data, "\n\n")

	ruleStr := parts[0]

	m := make(map[string][]string)
	for _, line := range strings.Split(parts[1], "\n") {
		p := strings.Split(line, " = ")
		m[p[0]] = strings.Split(string(randomCharRegex.ReplaceAll([]byte(p[1]), []byte(""))), " ")
	}

	locations := make([]string, 0)
	for k, _ := range m {
		if strings.HasSuffix(k, "A") {
			locations = append(locations, k)
		}
	}

	timesAtZ := make([][]int, len(locations))
	for i, location := range locations {
		startingLocation := location
		steps := 0
		timesAtZ[i] = make([]int, 0)

		visited := make(map[string]bool)
		for location != startingLocation || steps == 0 {
			visited[location+" - "+strconv.Itoa(steps%len(ruleStr))] = true
			rule := ruleStr[steps%len(ruleStr)]
			newLocation := 0
			if string(rule) == "R" {
				newLocation++
			}
			location = m[location][newLocation]
			steps++

			if strings.HasSuffix(location, "Z") {
				timesAtZ[i] = append(timesAtZ[i], steps)
			}

			if visited[location+" - "+strconv.Itoa(steps%len(ruleStr))] {
				break
			}
		}
	}

	t := make([]int, len(timesAtZ))
	for i, _ := range timesAtZ {
		t[i] = timesAtZ[i][0]
	}
	log.Println(LCM(t[0], t[1], t[2:]...))
}
